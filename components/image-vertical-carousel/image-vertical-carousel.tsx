'use client';

import clsx from 'clsx';
import {
  animate,
  motion,
  useMotionValue,
  type MotionStyle,
} from 'motion/react';
import type {
  ComponentPropsWithoutRef,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  CaseStudyCard,
  type CaseStudyCardProps,
} from '@/components/case-study-card/case-study-card';

export interface ImageVerticalCarouselItem {
  card: CaseStudyCardProps;
  id: string;
  label: string;
}

export interface ImageVerticalCarouselProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  compact?: boolean;
  initialIndex?: number;
  items: readonly ImageVerticalCarouselItem[];
  onActiveIndexChange?: (index: number) => void;
}

interface Pose {
  coverOpacity: number;
  lowerSlab: number;
  opacity: number;
  originY: number;
  rotateX: number;
  scale: number;
  upperSlab: number;
  y: number;
  zIndex: number;
}

// A light trackpad scroll is many small ticks. Add them up, then step once.
const WHEEL_STEP_DELTA = 24;
// The first card of a gesture swallows a longer flick before a fast scroll can start.
const WHEEL_LOCK_FIRST = 520;
// After that, a scroll that is still going can take the next card.
const WHEEL_LOCK_REPEAT = 120;
const WHEEL_GESTURE_GAP = 520;
// A follow-up tick continues the fold instead of restarting the one-card ease-in.
const WHEEL_FOLLOW_EASE = [0.16, 0.84, 0.24, 1] as const;
const WHEEL_FOLLOW_MS = 0.26;
const SWIPE_THRESHOLD = 35;
const LANDING_FOLDED_SCALE = 0.74;
const COMPACT_CARD_OFFSET = 260;
const LANDING_UPPER_OFFSET = 428;
const LANDING_LOWER_OFFSET = 448;
const COMPACT_PERSPECTIVE = 1100;
const LANDING_PERSPECTIVE = 620;
const COMPACT_UPPER_HINGE_ORIGIN = 312 / 384;
const COMPACT_FOLD_ANGLE = 65;
const LANDING_FOLD_ANGLE = 78;
// Cards past the adjacent slot keep traveling and fade out across this span.
const EXIT_SPAN = 0.4;
// The hinge leads the cover: the image holds through the start of the fold.
const COVER_LEAD = 0.12;
const FOLD_EASE = [0.2, 0.78, 0.2, 1] as const;
// Stay slow, then accelerate, then overshoot past the resting card.
const LANDING_HINGE_EASE = [0.86, 0, 0.38, 1.62] as const;
const COMPACT_STEP_MS = 0.72;
const LANDING_STEP_MS = 0.64;

function wrapIndex(index: number, itemCount: number) {
  return ((index % itemCount) + itemCount) % itemCount;
}

function circularOffset(index: number, progress: number, itemCount: number) {
  const raw = index - progress;
  const positive = ((raw % itemCount) + itemCount) % itemCount;
  if (positive > itemCount / 2) return positive - itemCount;
  return positive;
}

function getWheelDeltaInPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

interface LandingPose {
  foldAngle: number;
  lowerOffset: number;
  upperOffset: number;
}

const DEFAULT_LANDING_POSE: LandingPose = {
  foldAngle: LANDING_FOLD_ANGLE,
  lowerOffset: LANDING_LOWER_OFFSET,
  upperOffset: LANDING_UPPER_OFFSET,
};

function getPose(
  offset: number,
  compact: boolean,
  landing: LandingPose = DEFAULT_LANDING_POSE,
): Pose {
  const distance = Math.abs(offset);
  const fold = Math.min(distance, 1);
  const slot = compact
    ? COMPACT_CARD_OFFSET
    : offset < 0
      ? landing.upperOffset
      : landing.lowerOffset;
  const exit = distance <= 1 ? 1 : clamp01(1 - (distance - 1) / EXIT_SPAN);
  const shellOpacity = (compact ? 1 - 0.3 * fold : 1) * exit;
  const coverFade = clamp01((fold - COVER_LEAD) / (1 - COVER_LEAD));

  return {
    y: offset * slot,
    scale: compact ? 1 : 1 - (1 - LANDING_FOLDED_SCALE) * fold,
    rotateX:
      Math.sign(offset) *
      -(compact ? COMPACT_FOLD_ANGLE : landing.foldAngle) *
      fold,
    opacity: shellOpacity,
    zIndex: Math.round(40 - distance * 10),
    originY:
      offset < 0
        ? compact
          ? COMPACT_UPPER_HINGE_ORIGIN
          : 1
        : offset > 0
          ? 0
          : 0.5,
    coverOpacity: compact ? 1 : 1 - coverFade,
    upperSlab: !compact && offset < 0 ? coverFade : 0,
    lowerSlab: !compact && offset > 0 ? coverFade : 0,
  };
}

function CarouselCard({
  compact,
  index,
  isActive,
  item,
  itemCount,
  landing,
  progress,
}: {
  compact: boolean;
  index: number;
  isActive: boolean;
  item: ImageVerticalCarouselItem;
  itemCount: number;
  landing: LandingPose;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const initialPose = getPose(
    circularOffset(index, progress.get(), itemCount),
    compact,
    landing,
  );
  const y = useMotionValue(initialPose.y);
  const scale = useMotionValue(initialPose.scale);
  const rotateX = useMotionValue(initialPose.rotateX);
  const opacity = useMotionValue(initialPose.opacity);
  const originY = useMotionValue(initialPose.originY);
  const coverOpacity = useMotionValue(initialPose.coverOpacity);
  const upperSlab = useMotionValue(initialPose.upperSlab);
  const lowerSlab = useMotionValue(initialPose.lowerSlab);
  const zIndex = useMotionValue(initialPose.zIndex);

  useEffect(() => {
    const apply = () => {
      const pose = getPose(
        circularOffset(index, progress.get(), itemCount),
        compact,
        landing,
      );
      y.set(pose.y);
      scale.set(pose.scale);
      rotateX.set(pose.rotateX);
      opacity.set(pose.opacity);
      originY.set(pose.originY);
      coverOpacity.set(pose.coverOpacity);
      upperSlab.set(pose.upperSlab);
      lowerSlab.set(pose.lowerSlab);
      zIndex.set(pose.zIndex);
    };

    apply();
    return progress.on('change', apply);
  }, [
    compact,
    coverOpacity,
    landing,
    index,
    itemCount,
    lowerSlab,
    opacity,
    originY,
    progress,
    rotateX,
    scale,
    upperSlab,
    y,
    zIndex,
  ]);

  return (
    <motion.div
      aria-hidden={!isActive}
      className={clsx(
        'absolute top-1/2 left-1/2 aspect-[445/384] transition-[width] duration-700 ease-[cubic-bezier(0.2,0.78,0.2,1)] motion-reduce:transition-none',
        compact ? 'w-[min(20rem,78%)]' : 'w-[30.5rem]',
        isActive ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      inert={isActive ? undefined : true}
      style={{ translate: '-50% -50%', zIndex }}
    >
      <motion.div
        className="h-full"
        style={{
          y,
          perspective: compact ? COMPACT_PERSPECTIVE : LANDING_PERSPECTIVE,
          perspectiveOrigin: '50% 50%',
        }}
      >
        <motion.div
          className="h-full"
          style={
            {
              opacity,
              originY,
              rotateX,
              scale,
              '--case-study-cover-opacity': coverOpacity,
              '--case-study-upper-slab': upperSlab,
              '--case-study-lower-slab': lowerSlab,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            } as MotionStyle
          }
        >
          <CaseStudyCard
            {...item.card}
            className={clsx('max-w-none', item.card.className)}
            compact={compact || !isActive}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ImageVerticalCarousel({
  'aria-label': ariaLabel = 'Featured case studies',
  className,
  compact = false,
  initialIndex = 0,
  items,
  onActiveIndexChange,
  ...props
}: ImageVerticalCarouselProps) {
  const itemCount = items.length;
  const startingIndex =
    itemCount === 0 ? 0 : wrapIndex(initialIndex, itemCount);
  const [activeIndex, setActiveIndex] = useState(startingIndex);
  const progress = useMotionValue(startingIndex);
  const activeIndexRef = useRef(startingIndex);
  const intendedRef = useRef(startingIndex);
  const modeRef = useRef<'idle' | 'step'>('idle');
  const runRef = useRef(0);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const settleTimerRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isPointerOverRef = useRef(false);
  const pointerStartRef = useRef<{ id: number; y: number } | null>(null);
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);
  const compactRef = useRef(compact);
  const itemCountRef = useRef(itemCount);
  onActiveIndexChangeRef.current = onActiveIndexChange;
  compactRef.current = compact;
  itemCountRef.current = itemCount;

  const commitIndex = (index: number) => {
    const count = itemCountRef.current;
    if (count === 0) return;
    const wrapped = wrapIndex(Math.round(index), count);
    if (wrapped === activeIndexRef.current) return;
    activeIndexRef.current = wrapped;
    setActiveIndex(wrapped);
    onActiveIndexChangeRef.current?.(wrapped);
  };

  const stepTo = (destination: number) => {
    const count = itemCountRef.current;
    if (count === 0) return;

    window.clearTimeout(settleTimerRef.current);
    runRef.current += 1;
    const runId = runRef.current;
    animationRef.current?.stop();
    intendedRef.current = destination;
    modeRef.current = 'step';

    const distance = Math.abs(destination - progress.get());
    if (distance < 0.02) {
      progress.set(destination);
      modeRef.current = 'idle';
      commitIndex(destination);
      return;
    }

    const onComplete = () => {
      if (runRef.current !== runId) return;
      modeRef.current = 'idle';
    };

    const full = compactRef.current ? COMPACT_STEP_MS : LANDING_STEP_MS;
    const duration = Math.max(0.22, Math.min(full, full * distance));
    animationRef.current = animate(progress, destination, {
      duration,
      ease: compactRef.current ? [...FOLD_EASE] : [...LANDING_HINGE_EASE],
      onComplete,
    });
  };

  const stepBy = (direction: number) => {
    const origin =
      modeRef.current === 'step'
        ? intendedRef.current
        : Math.round(progress.get());
    stepTo(origin + direction);
  };

  const followTo = (destination: number) => {
    const count = itemCountRef.current;
    if (count === 0) return;

    runRef.current += 1;
    const runId = runRef.current;
    animationRef.current?.stop();
    intendedRef.current = destination;
    modeRef.current = 'step';

    const distance = Math.abs(destination - progress.get());
    if (distance < 0.02) {
      progress.set(destination);
      modeRef.current = 'idle';
      commitIndex(destination);
      return;
    }

    animationRef.current = animate(progress, destination, {
      duration: Math.min(WHEEL_FOLLOW_MS, Math.max(0.12, distance * 0.16)),
      ease: [...WHEEL_FOLLOW_EASE],
      onComplete: () => {
        if (runRef.current !== runId) return;
        modeRef.current = 'idle';
      },
    });
  };

  const wheelStep = (direction: number) => {
    const origin =
      modeRef.current === 'step'
        ? intendedRef.current
        : Math.round(progress.get());
    const destination = origin + direction;
    if (modeRef.current === 'step') {
      followTo(destination);
      return;
    }
    stepTo(destination);
  };

  const goToIndex = (index: number) => {
    const count = itemCountRef.current;
    if (count === 0) return;
    stepTo(progress.get() + circularOffset(index, progress.get(), count));
  };

  const apiRef = useRef({
    commitIndex,
    goToIndex,
    stepBy,
    stepTo,
    wheelStep,
  });
  apiRef.current = {
    commitIndex,
    goToIndex,
    stepBy,
    stepTo,
    wheelStep,
  };

  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      apiRef.current.commitIndex(value);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || itemCount < 2) return;

    let wheelLockedUntil = 0;
    let pendingDelta = 0;
    let pendingDirection = 0;
    let lastWheelEventAt = 0;
    let gestureHasStepped = false;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const pixels = getWheelDeltaInPixels(event);
      const distance = Math.abs(pixels);
      if (distance === 0) return;

      event.preventDefault();

      const now = performance.now();
      const direction = Math.sign(pixels);
      if (
        now - lastWheelEventAt > WHEEL_GESTURE_GAP ||
        (pendingDirection !== 0 && direction !== pendingDirection)
      ) {
        pendingDelta = 0;
        pendingDirection = direction;
        gestureHasStepped = false;
      }

      lastWheelEventAt = now;
      if (now < wheelLockedUntil) return;

      pendingDirection = direction;
      pendingDelta += distance;
      if (pendingDelta < WHEEL_STEP_DELTA) return;

      pendingDelta = 0;
      wheelLockedUntil =
        now + (gestureHasStepped ? WHEEL_LOCK_REPEAT : WHEEL_LOCK_FIRST);
      gestureHasStepped = true;
      apiRef.current.wheelStep(direction);
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [itemCount, progress]);

  useEffect(() => {
    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!isPointerOverRef.current || event.defaultPrevented) return;
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

      event.preventDefault();
      apiRef.current.stepBy(event.key === 'ArrowDown' ? 1 : -1);
    };

    window.addEventListener('keydown', handleWindowKeyDown);
    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(settleTimerRef.current);
      animationRef.current?.stop();
    };
  }, []);

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
      apiRef.current.stepBy(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      apiRef.current.stepBy(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      apiRef.current.goToIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      apiRef.current.goToIndex(itemCount - 1);
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

    apiRef.current.stepBy(Math.sign(distance));
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
      <div
        className={clsx(
          'absolute overflow-hidden transition-[inset] duration-700 ease-[cubic-bezier(0.2,0.78,0.2,1)] motion-reduce:transition-none',
          compact ? 'inset-[0_2.75rem_0_0]' : 'inset-[0_3.875rem_0_0]',
        )}
      >
        <div
          className={clsx(
            'absolute inset-y-0 w-[min(33rem,100%)] -translate-x-1/2 transition-[left] duration-700 ease-[cubic-bezier(0.2,0.78,0.2,1)] motion-reduce:transition-none',
            compact ? 'left-1/2' : 'left-[44%]',
          )}
          onPointerEnter={handleCardsPointerEnter}
          onPointerLeave={handleCardsPointerLeave}
        >
          {items.map((item, index) => (
            <CarouselCard
              compact={compact}
              index={index}
              isActive={index === activeIndex}
              item={item}
              itemCount={itemCount}
              key={item.id}
              landing={DEFAULT_LANDING_POSE}
              progress={progress}
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
              onClick={() => apiRef.current.goToIndex(index)}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}
