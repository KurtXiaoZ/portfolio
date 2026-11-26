'use client';

import clsx from 'clsx';
import { useEffect, useState, type RefObject } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

const SCROLL_THRESHOLD = 10;

interface CaseStudyNavigationProps {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export function CaseStudyNavigation({ scrollRef }: CaseStudyNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const pane = scrollRef.current;
    if (!pane) return;

    const getScrollTop = () =>
      Math.max(
        0,
        Math.min(pane.scrollTop, pane.scrollHeight - pane.clientHeight),
      );

    let previousScrollTop = getScrollTop();
    let direction = 0;
    let distance = 0;

    function handleScroll() {
      const scrollTop = getScrollTop();
      const delta = scrollTop - previousScrollTop;
      previousScrollTop = scrollTop;
      if (delta === 0) return;

      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) {
        direction = nextDirection;
        distance = 0;
      }

      distance += Math.abs(delta);
      if (distance >= SCROLL_THRESHOLD) setIsVisible(direction < 0);
    }

    pane.addEventListener('scroll', handleScroll, { passive: true });
    return () => pane.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  return (
    <nav
      aria-label="Case study navigation"
      className={clsx(
        'pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-white via-white/95 via-70% to-transparent pt-3 transition-[opacity,translate] duration-150 ease-out focus-within:translate-y-0 focus-within:opacity-100 motion-reduce:transition-none dark:from-[#131412] dark:via-[#131412]/95',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
      )}
    >
      <div
        className={clsx(
          'mx-auto w-full max-w-3xl px-7 focus-within:pointer-events-auto max-[960px]:px-4 max-[560px]:px-2',
          isVisible && 'pointer-events-auto',
        )}
      >
        <BackToWorkLink />
      </div>
    </nav>
  );
}
