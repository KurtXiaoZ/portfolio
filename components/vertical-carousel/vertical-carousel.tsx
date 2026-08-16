'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import type {
  ComponentPropsWithoutRef,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

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
  ComponentPropsWithoutRef<'section'>,
  'children'
> {
  initialIndex?: number;
  items: readonly VerticalCarouselItem[];
  onActiveIndexChange?: (index: number) => void;
}

interface VisualState {
  blur: number;
  opacity: number;
  rotateX: number;
  scale: number;
  y: number;
  zIndex: number;
}

const WHEEL_EVENT_THRESHOLD = 12;
const WHEEL_GESTURE_GAP = 200;
const FAST_WHEEL_SPEED = 1;
const SWIPE_THRESHOLD = 35;

function clampIndex(index: number, itemCount: number) {
  return Math.max(0, Math.min(itemCount - 1, index));
}

function getWheelDeltaInPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function getVisualState(delta: number): VisualState {
  const direction = Math.sign(delta);
  const distance = Math.abs(delta);

  return {
    y: delta === 0 ? 0 : direction * (255 + Math.max(0, distance - 1) * 118),
    scale:
      delta === 0 ? 1 : Math.max(0.61, 0.84 - Math.max(0, distance - 1) * 0.1),
    rotateX: delta === 0 ? 0 : direction * -68,
    opacity:
      distance === 0 ? 1 : distance === 1 ? 0.44 : distance === 2 ? 0.13 : 0,
    blur: distance > 1 ? 1.5 : 0,
    zIndex: 20 - distance,
  };
}

export function VerticalCarousel({
  'aria-label': ariaLabel = 'Featured case studies',
  className,
  initialIndex = 0,
  items,
  onActiveIndexChange,
  ...props
}: VerticalCarouselProps) {
  const itemCount = items.length;
  const [activeIndex, setActiveIndex] = useState(() =>
    itemCount === 0 ? 0 : clampIndex(initialIndex, itemCount),
  );
  const activeIndexRef = useRef(activeIndex);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ id: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const instructionsId = useId();
  const prefersReducedMotion = useReducedMotion();

  const setActive = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) return;

      const clampedIndex = clampIndex(nextIndex, itemCount);
      if (clampedIndex === activeIndexRef.current) return;

      activeIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);
      onActiveIndexChange?.(clampedIndex);
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
      const canMove =
        (direction > 0 && currentIndex < itemCount - 1) ||
        (direction < 0 && currentIndex > 0);

      if (!canMove) {
        wheelEventCount = 0;
        return;
      }

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;

    suppressClickRef.current = false;
    pointerStartRef.current = { id: event.pointerId, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerStart = pointerStartRef.current;
    if (!pointerStart || pointerStart.id !== event.pointerId) return;

    const distance = pointerStart.y - event.clientY;
    pointerStartRef.current = null;

    if (Math.abs(distance) <= SWIPE_THRESHOLD) return;

    suppressClickRef.current = true;
    setActive(activeIndexRef.current + Math.sign(distance));
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 500);
  };

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={clsx(
        'relative min-h-166 overflow-hidden text-[#171814] dark:text-[#f0f0e9]',
        className,
      )}
      {...props}
    >
      <div
        ref={viewportRef}
        aria-describedby={instructionsId}
        className="absolute inset-[0_3.875rem_0_0] overflow-hidden perspective-[1100px] perspective-origin-[50%_50%] outline-none [touch-action:pan-x] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#657800] max-[560px]:inset-[0_2.75rem_0_0] dark:focus-visible:outline-[#c6ec39]"
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          event.preventDefault();
          event.stopPropagation();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault();
            setActive(activeIndexRef.current + 1);
          } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            setActive(activeIndexRef.current - 1);
          } else if (event.key === 'Home') {
            event.preventDefault();
            setActive(0);
          } else if (event.key === 'End') {
            event.preventDefault();
            setActive(itemCount - 1);
          }
        }}
        onPointerCancel={() => {
          pointerStartRef.current = null;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={finishPointerGesture}
        tabIndex={0}
      >
        {items.map((item, index) => {
          const delta = index - activeIndex;
          const state = getVisualState(delta);
          const isActive = delta === 0;

          return (
            <div
              aria-hidden={!isActive}
              className={clsx(
                'absolute top-1/2 left-1/2 w-[min(20.5rem,82%)] [-webkit-backface-visibility:hidden]',
                isActive ? 'pointer-events-auto' : 'pointer-events-none',
              )}
              inert={isActive ? undefined : true}
              key={item.id}
              style={{ translate: '-50% -50%', zIndex: state.zIndex }}
            >
              <motion.div
                animate={{
                  filter: `blur(${state.blur}px)`,
                  opacity: state.opacity,
                  rotateX: state.rotateX,
                  scale: state.scale,
                  y: state.y,
                }}
                initial={false}
                style={{
                  transformOrigin: 'center',
                  transformStyle: 'preserve-3d',
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        filter: { duration: 0.48 },
                        opacity: { duration: 0.48 },
                        rotateX: {
                          duration: 0.72,
                          ease: [0.2, 0.78, 0.2, 1],
                        },
                        scale: {
                          duration: 0.72,
                          ease: [0.2, 0.78, 0.2, 1],
                        },
                        y: {
                          duration: 0.72,
                          ease: [0.2, 0.78, 0.2, 1],
                        },
                      }
                }
              >
                <CaseStudyCard
                  {...item.card}
                  className={clsx('max-w-none', item.card.className)}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      <div
        className="absolute top-1/2 right-5.75 flex -translate-y-1/2 flex-col gap-2.75 max-[560px]:right-3.5"
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
    </section>
  );
}
