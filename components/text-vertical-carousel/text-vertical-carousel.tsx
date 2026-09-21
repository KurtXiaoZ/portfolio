'use client';

import clsx from 'clsx';
import {
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import Link from 'next/link';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ImageVerticalCarouselItem } from '@/components/image-vertical-carousel/image-vertical-carousel';

export type TextVerticalCarouselItem = ImageVerticalCarouselItem;

export interface TextVerticalCarouselProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  compact?: boolean;
  initialIndex?: number;
  items: readonly TextVerticalCarouselItem[];
  onActiveIndexChange?: (index: number) => void;
}

const WHEEL_EVENT_THRESHOLD = 12;
const WHEEL_GESTURE_GAP = 200;
const FAST_WHEEL_SPEED = 1;
const SWIPE_THRESHOLD = 35;
const ITEM_TRANSITION = {
  duration: 0.58,
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

function getItemVisualState(delta: number) {
  const distance = Math.abs(delta);
  const direction = Math.sign(delta);
  const itemGap = 112;

  if (distance === 0) {
    return { opacity: 1, scale: 1, y: 0 };
  }

  if (distance === 1) {
    return { opacity: 0.58, scale: 0.84, y: direction * itemGap };
  }

  if (distance === 2) {
    return { opacity: 0.24, scale: 0.7, y: direction * itemGap * 1.92 };
  }

  return { opacity: 0, scale: 0.62, y: direction * itemGap * 2.65 };
}

function TextCarouselItem({
  active,
  delta,
  item,
  movement,
  onSelect,
  reducedMotion,
}: {
  active: boolean;
  delta: number;
  item: TextVerticalCarouselItem;
  movement: number;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const previousDeltaRef = useRef(delta);
  const isVisible = Math.abs(delta) <= 2;
  const [initialState] = useState(() => getItemVisualState(delta));
  const itemY = useMotionValue(initialState.y);
  const itemScale = useMotionValue(initialState.scale);
  const itemOpacity = useMotionValue(initialState.opacity);

  useEffect(() => {
    let cancelled = false;
    const previousDelta = previousDeltaRef.current;
    previousDeltaRef.current = delta;
    const state = getItemVisualState(delta);
    const positionChanged = previousDelta !== delta;
    const virtualDelta = positionChanged ? previousDelta - movement : delta;
    const crossedLoopBoundary = positionChanged && virtualDelta !== delta;

    const stopAnimations = () => {
      itemY.stop();
      itemScale.stop();
      itemOpacity.stop();
    };

    const animateIntoState = () => {
      animate(itemY, state.y, ITEM_TRANSITION);
      animate(itemScale, state.scale, ITEM_TRANSITION);
      animate(itemOpacity, state.opacity, ITEM_TRANSITION);
    };

    const moveInvisiblyTo = (
      nextState: ReturnType<typeof getItemVisualState>,
    ) => {
      // Opacity must update first. Motion values render independently, so
      // moving a partially faded row before hiding it can expose one frame of
      // the row teleporting across the loop seam.
      itemOpacity.set(0);
      itemY.set(nextState.y);
      itemScale.set(nextState.scale);
    };

    stopAnimations();

    if (reducedMotion) {
      itemY.set(state.y);
      itemScale.set(state.scale);
      itemOpacity.set(state.opacity);

      return stopAnimations;
    }

    if (!isVisible) {
      if (Math.abs(previousDelta) <= 2 && positionChanged) {
        // Keep an outgoing row moving with the rest of the stack. Its virtual
        // delta preserves the navigation direction even when circular deltas
        // place its hidden destination on the opposite side.
        const exitState = getItemVisualState(virtualDelta);
        animate(itemY, exitState.y, ITEM_TRANSITION);
        animate(itemScale, exitState.scale, ITEM_TRANSITION);
        animate(itemOpacity, 0, { ...ITEM_TRANSITION, duration: 0.4 });
      } else {
        // Hidden rows can be repositioned without exposing the loop seam.
        moveInvisiblyTo(state);
      }

      return () => {
        cancelled = true;
        stopAnimations();
      };
    }

    const wasVisible = Math.abs(previousDelta) <= 2;

    if (crossedLoopBoundary && wasVisible) {
      // A multi-slot selection can require one visible row to leave one edge
      // and re-enter at the other. Complete that exit before recycling it so
      // the row never cuts across the center or appears to swap positions.
      const exitState = getItemVisualState(virtualDelta);

      void Promise.all([
        animate(itemY, exitState.y, {
          ...ITEM_TRANSITION,
          duration: 0.24,
        }),
        animate(itemScale, exitState.scale, {
          ...ITEM_TRANSITION,
          duration: 0.24,
        }),
        animate(itemOpacity, 0, { duration: 0.2 }),
      ]).then(() => {
        if (cancelled) return;

        const entryState = getItemVisualState(Math.sign(delta) * 3);
        moveInvisiblyTo(entryState);
        animate(itemY, state.y, { ...ITEM_TRANSITION, duration: 0.34 });
        animate(itemScale, state.scale, {
          ...ITEM_TRANSITION,
          duration: 0.34,
        });
        animate(itemOpacity, state.opacity, {
          ...ITEM_TRANSITION,
          delay: 0.04,
          duration: 0.3,
        });
      });

      return () => {
        cancelled = true;
        stopAnimations();
      };
    }

    if (!wasVisible) {
      const renderedSide = Math.sign(itemY.get());
      const targetSide = Math.sign(state.y);
      const isOnTargetSide =
        targetSide === 0 || renderedSide === 0 || renderedSide === targetSide;

      if (!isOnTargetSide) {
        // A rapid follow-up gesture can reverse a row while its previous exit
        // is still visible. Only recycle it when its rendered position is on
        // the wrong side; otherwise continue smoothly from the current pose.
        moveInvisiblyTo(getItemVisualState(Math.sign(state.y || movement) * 3));
      }
    }

    animateIntoState();

    return () => {
      cancelled = true;
      stopAnimations();
    };
  }, [
    animate,
    delta,
    isVisible,
    itemOpacity,
    itemScale,
    itemY,
    movement,
    reducedMotion,
  ]);

  const content = (
    <>
      <span
        className={clsx(
          'block font-[family-name:var(--font-ibm-plex-mono,_monospace)] leading-[1.35] font-normal tracking-normal',
          'text-[1.375rem]',
        )}
      >
        {item.card.title}
      </span>
      <span
        className={clsx(
          'mt-1.5 flex flex-wrap gap-x-1.5 font-[family-name:var(--font-ibm-plex-sans,_sans-serif)] leading-[1.44] font-normal tracking-[0.05em] text-[#8f908a] dark:text-[#96988f]',
          'text-[0.6875rem]',
        )}
      >
        {item.card.tags.map((tag, index) => (
          <span key={tag}>
            {index > 0 && <span aria-hidden="true">/ </span>}
            {tag}
          </span>
        ))}
      </span>
    </>
  );

  return (
    <motion.div
      aria-hidden={!isVisible}
      className={clsx(
        'absolute top-1/2 left-1/2 w-[calc(100%_-_3rem)] max-w-[35rem] -translate-x-1/2 -translate-y-1/2 origin-left text-[#555650] dark:text-[#c8c9c2]',
        !isVisible && 'pointer-events-none',
      )}
      initial={false}
      ref={scope}
      style={{
        opacity: itemOpacity,
        scale: itemScale,
        y: itemY,
        zIndex: 10 - Math.abs(delta),
      }}
    >
      {active ? (
        <Link
          className="block rounded-sm text-[#4c4d48] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#d9dad3] dark:focus-visible:outline-[#c6ec39]"
          href={item.card.href}
        >
          {content}
        </Link>
      ) : (
        <button
          aria-label={`Show case study: ${item.label}`}
          className="block w-full cursor-pointer rounded-sm border-0 bg-transparent p-0 text-left text-inherit outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:focus-visible:outline-[#c6ec39]"
          onClick={onSelect}
          tabIndex={isVisible ? 0 : -1}
          type="button"
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}

const COMPACT_INACTIVE_MARKER_WIDTH = 20;
const COMPACT_MARKER_STEP = 20;

function CompactTextCarousel({
  activeIndex,
  className,
  items,
  props,
}: {
  activeIndex: number;
  className?: string;
  items: readonly TextVerticalCarouselItem[];
  props: Omit<
    ComponentPropsWithoutRef<'div'>,
    'aria-label' | 'children' | 'className'
  >;
}) {
  const [previewedIndex, setPreviewedIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div {...props} className={clsx('relative min-h-0 flex-1', className)} />
    );
  }

  const previewItem =
    previewedIndex === null ? null : (items[previewedIndex] ?? null);
  const centeredIndex =
    previewedIndex === null ? 0 : previewedIndex - (items.length - 1) / 2;
  const previewOffset = Math.max(
    -80,
    Math.min(80, centeredIndex * COMPACT_MARKER_STEP),
  );
  const previewStyle = {
    '--compact-preview-offset': `${previewOffset}px`,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={clsx('relative min-h-0 flex-1 overflow-hidden', className)}
    >
      <div className="absolute top-1/2 left-4 z-20 flex -translate-y-1/2 flex-col max-[760px]:right-3 max-[760px]:bottom-2 max-[760px]:left-3 max-[760px]:top-auto max-[760px]:translate-y-0 max-[760px]:flex-row max-[760px]:justify-center">
        {items.map((item, index) => {
          const isCurrent = index === activeIndex;
          const isPreviewed = index === previewedIndex;
          const isActive = isCurrent || isPreviewed;
          const markerWidth = isActive ? 52 : COMPACT_INACTIVE_MARKER_WIDTH;

          return (
            <div key={item.id}>
              <Link
                className="group flex h-5 w-14 items-center rounded-sm outline-none max-[760px]:w-8 max-[760px]:justify-center"
                href={item.card.href}
                onPointerEnter={() => setPreviewedIndex(index)}
                onPointerLeave={() => setPreviewedIndex(null)}
              >
                <motion.span
                  animate={{ width: markerWidth }}
                  className={clsx(
                    'block h-[3px] max-w-full origin-left transition-colors duration-200',
                    isActive
                      ? 'bg-[#20211d] dark:bg-[#f0f0e9]'
                      : 'bg-[#cfd0ce] dark:bg-[#5f615b]',
                  )}
                  transition={{
                    duration: 0.24,
                    ease: [0.2, 0.78, 0.2, 1],
                  }}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute top-1/2 right-5 left-20 z-10 [transform:translateY(calc(-50%+var(--compact-preview-offset)))] max-[760px]:top-auto max-[760px]:right-5 max-[760px]:bottom-14 max-[760px]:left-5 max-[760px]:[transform:none] max-[760px]:text-center"
        style={previewStyle}
      >
        {previewItem && (
          <span className="inline-block max-w-[24rem] font-[family-name:var(--font-ibm-plex-mono,_monospace)] text-base leading-[1.4] font-normal tracking-normal text-[#20211d] dark:text-[#f0f0e9]">
            {previewItem.card.title}
          </span>
        )}
      </div>
    </div>
  );
}

export function TextVerticalCarousel({
  'aria-label': ariaLabel = 'Featured case studies',
  className,
  compact = false,
  initialIndex = 0,
  items,
  onActiveIndexChange,
  ...props
}: TextVerticalCarouselProps) {
  const itemCount = items.length;
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(() =>
    itemCount === 0 ? 0 : wrapIndex(initialIndex, itemCount),
  );
  const [movement, setMovement] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ id: number; y: number } | null>(null);

  const setActive = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) return;

      const wrappedIndex = wrapIndex(nextIndex, itemCount);
      if (wrappedIndex === activeIndexRef.current) return;

      setMovement(
        getCircularDelta(wrappedIndex, activeIndexRef.current, itemCount),
      );
      activeIndexRef.current = wrappedIndex;
      setActiveIndex(wrappedIndex);
      onActiveIndexChange?.(wrappedIndex);
    },
    [itemCount, onActiveIndexChange],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (compact || !viewport || itemCount < 2) return;

    let wheelEventCount = 0;
    let wheelDirection = 0;
    let lastWheelEventAt = 0;
    let gestureHasMoved = false;
    let gestureIsFast = false;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const now = performance.now();
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

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
      event.preventDefault();

      if (!gestureHasMoved) {
        gestureHasMoved = true;
        setActive(activeIndexRef.current + direction);
        return;
      }

      if (!gestureIsFast) return;

      wheelEventCount += 1;
      if (wheelEventCount < WHEEL_EVENT_THRESHOLD) return;

      wheelEventCount = 0;
      setActive(activeIndexRef.current + direction);
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [compact, itemCount, setActive]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    if (event.target instanceof Element && event.target.closest('a, button')) {
      return;
    }

    pointerStartRef.current = { id: event.pointerId, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerStart = pointerStartRef.current;
    if (!pointerStart || pointerStart.id !== event.pointerId) return;

    const distance = pointerStart.y - event.clientY;
    pointerStartRef.current = null;

    if (Math.abs(distance) <= SWIPE_THRESHOLD) return;
    setActive(activeIndexRef.current + Math.sign(distance));
  };

  const cancelPointerGesture = () => {
    pointerStartRef.current = null;
  };

  if (compact) {
    return (
      <CompactTextCarousel
        activeIndex={activeIndex}
        className={className}
        items={items}
        props={props}
      />
    );
  }

  return (
    <div
      {...props}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={clsx(
        'relative min-h-0 flex-1 touch-pan-x overflow-hidden outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#657800] dark:focus-visible:outline-[#c6ec39]',
        className,
      )}
      onKeyDown={handleKeyDown}
      onPointerCancel={cancelPointerGesture}
      onPointerDown={handlePointerDown}
      onPointerUp={finishPointerGesture}
      ref={viewportRef}
      role="region"
      tabIndex={0}
    >
      <div className="absolute inset-y-0 left-1/2 w-full max-w-[44rem] -translate-x-1/2">
        {items.map((item, index) => {
          const delta = getCircularDelta(index, activeIndex, itemCount);

          return (
            <TextCarouselItem
              active={index === activeIndex}
              delta={delta}
              item={item}
              key={item.id}
              movement={movement}
              onSelect={() => setActive(index)}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>
    </div>
  );
}
