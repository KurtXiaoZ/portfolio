'use client';

import clsx from 'clsx';
import { motion, useAnimate, useMotionValue } from 'motion/react';
import type {
  ComponentPropsWithoutRef,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CaseStudyCard,
  type CaseStudyCardProps,
} from '@/components/case-study-card/case-study-card';

export interface VerticalCarouselItem {
  card: CaseStudyCardProps;
  id: string;
  label: string;
}

export interface VerticalCarouselProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  compact?: boolean;
  initialIndex?: number;
  items: readonly VerticalCarouselItem[];
  onActiveIndexChange?: (index: number) => void;
}

interface VisualState {
  /** Controls whether the card is active, adjacent, or hidden. */
  opacity: number;
  /** Tilts the card around its horizontal axis to create the folded pose. */
  rotateX: number;
  /** Sizes the active card and slightly reduces adjacent folded cards. */
  scale: number;
  /** Positions the card in the active, upper, or lower carousel slot. */
  y: number;
  /** Keeps cards closer to the active slot above more distant cards. */
  zIndex: number;
}

const WHEEL_EVENT_THRESHOLD = 12;
const WHEEL_GESTURE_GAP = 200;
const FAST_WHEEL_SPEED = 1;
const SWIPE_THRESHOLD = 35;
const CARD_SCALE = 1.24;
const CARD_OFFSET = 380;
const COMPACT_CARD_OFFSET = 300;
const FOLD_TRANSITION = {
  duration: 0.72,
  ease: [0.2, 0.78, 0.2, 1],
} as const;

function wrapIndex(index: number, itemCount: number) {
  return ((index % itemCount) + itemCount) % itemCount;
}

function getCircularDelta(
  index: number,
  activeIndex: number,
  itemCount: number,
) {
  const delta = index - activeIndex;
  const halfwayPoint = itemCount / 2;

  if (delta > halfwayPoint) return delta - itemCount;
  if (delta < -halfwayPoint) return delta + itemCount;

  return delta;
}

function getWheelDeltaInPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function getVisualState(delta: number, compact = false): VisualState {
  const direction = Math.sign(delta);
  const distance = Math.abs(delta);
  const cardOffset = compact ? COMPACT_CARD_OFFSET : CARD_OFFSET;
  let opacity = 0;

  if (distance === 0) {
    opacity = 1;
  } else if (distance === 1) {
    opacity = 0.7;
  }

  return {
    // Edge hinges leave the folded card's center closer to the active slot.
    // Give the hinge enough travel to park the card above or below it.
    y: delta === 0 ? 0 : direction * cardOffset,
    scale: delta === 0 ? CARD_SCALE : CARD_SCALE * 0.94,
    rotateX: delta === 0 ? 0 : direction * -58,
    opacity,
    zIndex: 20 - distance,
  };
}

function getHingeOrigin(delta: number) {
  if (delta < 0) return 1;
  if (delta > 0) return 0;
  return 0.5;
}

function CarouselCard({
  compact,
  delta,
  item,
}: {
  compact: boolean;
  delta: number;
  item: VerticalCarouselItem;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const previousDeltaRef = useRef(delta);
  const [initialState] = useState(() => ({
    ...getVisualState(delta, compact),
    originY: getHingeOrigin(delta),
  }));
  // Bind values from mount, including for initially hidden cards. Recycling
  // must update existing values so .set() schedules a render before revealing
  // the card, even when the following animation has the same target.
  const cardY = useMotionValue(initialState.y);
  const cardScale = useMotionValue(initialState.scale);
  const cardOpacity = useMotionValue(initialState.opacity);
  const cardOriginY = useMotionValue(initialState.originY);
  const cardRotateX = useMotionValue(initialState.rotateX);
  const isActive = delta === 0;

  useEffect(() => {
    const previousDelta = previousDeltaRef.current;
    previousDeltaRef.current = delta;
    const state = getVisualState(delta, compact);

    if (Math.abs(delta) > 1) {
      // Freeze the actual rendered pose, including an interrupted fold.
      // A departing neighbor only fades; it has no further spatial target.
      cardY.stop();
      cardScale.stop();
      cardOriginY.stop();
      cardRotateX.stop();
      cardOpacity.stop();
      animate(cardOpacity, 0, {
        duration: 0.24,
      });
      return;
    }

    const isChangingSides =
      previousDelta !== 0 &&
      delta !== 0 &&
      Math.sign(previousDelta) !== Math.sign(delta);
    const hingeDelta = isActive ? previousDelta : delta;
    const originY = getHingeOrigin(hingeDelta);

    if (Math.abs(previousDelta) > 1 || isChangingSides) {
      // Reintroduce recycled cards from their new edge while invisible,
      // never by rotating or translating across the back of the carousel.
      const entryState = getVisualState(Math.sign(hingeDelta), compact);
      cardY.stop();
      cardScale.stop();
      cardOpacity.stop();
      cardOriginY.stop();
      cardRotateX.stop();
      cardY.set(entryState.y);
      cardScale.set(entryState.scale);
      cardOpacity.set(0);
      cardOriginY.set(originY);
      cardRotateX.set(entryState.rotateX);
    }

    const isEnteringAdjacentSlot =
      Math.abs(delta) === 1 && (Math.abs(previousDelta) > 1 || isChangingSides);

    if (isEnteringAdjacentSlot) {
      // Let the previous adjacent card clear this slot before revealing its
      // replacement.
      animate(cardOpacity, state.opacity, {
        delay: 0.32,
        duration: 0.4,
        ease: 'easeInOut',
      });
    } else {
      animate(cardOpacity, state.opacity, FOLD_TRANSITION);
    }

    animate(cardY, state.y, FOLD_TRANSITION);
    animate(cardScale, state.scale, FOLD_TRANSITION);
    animate(cardOriginY, originY, FOLD_TRANSITION);
    animate(cardRotateX, state.rotateX, FOLD_TRANSITION);
  }, [
    animate,
    cardOpacity,
    cardOriginY,
    cardRotateX,
    cardScale,
    cardY,
    compact,
    delta,
    isActive,
  ]);

  return (
    <div
      ref={scope}
      aria-hidden={!isActive}
      className={clsx(
        'absolute top-1/2 left-1/2 w-[min(20.5rem,82%)]',
        isActive ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      inert={isActive ? undefined : true}
      style={{
        translate: '-50% -50%',
        zIndex: getVisualState(delta, compact).zIndex,
      }}
    >
      <motion.div
        style={{
          scale: cardScale,
          y: cardY,
          perspective: 1100,
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          style={{
            opacity: cardOpacity,
            originY: cardOriginY,
            rotateX: cardRotateX,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <CaseStudyCard
            {...item.card}
            className={clsx('max-w-none', item.card.className)}
            compact={compact}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function VerticalCarousel({
  'aria-label': ariaLabel = 'Featured case studies',
  className,
  compact = false,
  initialIndex = 0,
  items,
  onActiveIndexChange,
  ...props
}: VerticalCarouselProps) {
  const itemCount = items.length;
  const [activeIndex, setActiveIndex] = useState(() =>
    itemCount === 0 ? 0 : wrapIndex(initialIndex, itemCount),
  );
  const activeIndexRef = useRef(activeIndex);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isPointerOverRef = useRef(false);
  const pointerStartRef = useRef<{ id: number; y: number } | null>(null);

  const setActive = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) return;

      const wrappedIndex = wrapIndex(nextIndex, itemCount);
      if (wrappedIndex === activeIndexRef.current) return;

      activeIndexRef.current = wrappedIndex;
      setActiveIndex(wrappedIndex);
      onActiveIndexChange?.(wrappedIndex);
    },
    [itemCount, onActiveIndexChange],
  );

  useEffect(() => {
    if (itemCount === 0) return;
    setActive(activeIndexRef.current);
  }, [itemCount, setActive]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || itemCount < 2) return;

    let wheelEventCount = 0;
    let wheelDirection = 0;
    let lastWheelEventAt = 0;
    let gestureHasMoved = false;
    let gestureIsFast = false;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const now = performance.now();
      const direction = Math.sign(event.deltaY);
      const isNewGesture =
        direction !== wheelDirection ||
        now - lastWheelEventAt > WHEEL_GESTURE_GAP;
      const elapsed = isNewGesture ? 16 : Math.max(now - lastWheelEventAt, 1);
      const speed = Math.abs(getWheelDeltaInPixels(event)) / elapsed;

      if (isNewGesture) {
        wheelDirection = direction;
        wheelEventCount = 0;
        gestureHasMoved = false;
        gestureIsFast = false;
      }

      lastWheelEventAt = now;
      gestureIsFast = gestureIsFast || speed >= FAST_WHEEL_SPEED;

      const currentIndex = activeIndexRef.current;
      event.preventDefault();

      if (!gestureHasMoved) {
        gestureHasMoved = true;
        setActive(currentIndex + direction);
        return;
      }

      if (!gestureIsFast) return;

      wheelEventCount += 1;
      if (wheelEventCount < WHEEL_EVENT_THRESHOLD) return;

      wheelEventCount = 0;
      setActive(currentIndex + direction);
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [itemCount, setActive]);

  useEffect(() => {
    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!isPointerOverRef.current || event.defaultPrevented) {
        return;
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

      const direction = event.key === 'ArrowDown' ? 1 : -1;

      event.preventDefault();
      setActive(activeIndexRef.current + direction);
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, [setActive]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    // Capturing an interactive element's pointer would retarget its click to
    // this container. Leave links and buttons alone so their native click
    // handlers can run.
    if (event.target instanceof Element && event.target.closest('a, button')) {
      return;
    }

    pointerStartRef.current = { id: event.pointerId, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isPointerOverRef.current && event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(activeIndexRef.current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(activeIndexRef.current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(itemCount - 1);
    }
  };

  const handleCardsPointerEnter = () => {
    isPointerOverRef.current = true;
  };

  const handleCardsPointerLeave = () => {
    isPointerOverRef.current = false;
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerStart = pointerStartRef.current;
    if (!pointerStart || pointerStart.id !== event.pointerId) return;

    const distance = pointerStart.y - event.clientY;
    pointerStartRef.current = null;

    if (Math.abs(distance) <= SWIPE_THRESHOLD) return;

    setActive(activeIndexRef.current + Math.sign(distance));
  };

  return (
    <div
      {...props}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={clsx(
        'relative min-h-0 flex-1 overflow-hidden text-[#171814] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#657800] dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]',
        className,
      )}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={finishPointerGesture}
      ref={viewportRef}
      role="region"
      tabIndex={0}
    >
      <div className="absolute inset-[0_3.875rem_0_0] overflow-hidden">
        <div
          className="absolute inset-y-0 left-1/2 w-[min(25.42rem,100%)] -translate-x-1/2"
          onPointerEnter={handleCardsPointerEnter}
          onPointerLeave={handleCardsPointerLeave}
        >
          {items.map((item, index) => (
            <CarouselCard
              compact={compact}
              delta={getCircularDelta(index, activeIndex, itemCount)}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div
        className="absolute top-1/2 right-5.75 flex -translate-y-1/2 flex-col gap-2.75"
        role="group"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              aria-label={`Show case study ${index + 1}: ${item.label}`}
              aria-pressed={isActive}
              className={clsx(
                'size-1.5 cursor-pointer rounded-full border-0 bg-current p-0 opacity-35 transition-opacity duration-300 motion-reduce:transition-none',
                isActive && 'opacity-100',
              )}
              key={item.id}
              onClick={() => setActive(index)}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}
