'use client';

import clsx from 'clsx';
import { motion, useAnimate, useReducedMotion } from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

const PANE_TRANSITION = {
  duration: 0.8,
  ease: [0.2, 0.78, 0.2, 1],
} as const;

function LeftPane({
  children,
  contentOffset,
  shouldReduceMotion,
}: {
  children: ReactNode;
  contentOffset: number;
  shouldReduceMotion: boolean;
}) {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    const controls = shouldReduceMotion
      ? animate(
          scope.current,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            x: 0,
          },
          { duration: 0 },
        )
      : animate(
          scope.current,
          {
            clipPath: ['inset(0% 0% 0% 5%)', 'inset(0% 0% 0% 0%)'],
            opacity: [0, 1],
            x: [contentOffset, 0],
          },
          { ...PANE_TRANSITION, delay: 0.14, duration: 0.66 },
        );

    return () => controls.stop();
  }, [animate, contentOffset, pathname, scope, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-y-auto" ref={scope}>
      {children}
    </div>
  );
}

export function PortfolioShell({ left, right }: PortfolioShellProps) {
  const params = useParams<{ slug?: string }>();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion === true;
  const selectedSlug = params.slug ?? null;
  const isCaseStudyOpen = selectedSlug !== null;
  const transition = shouldReduceMotion ? { duration: 0 } : PANE_TRANSITION;
  const contentOffset = selectedSlug === null ? -24 : 24;

  return (
    <main className="flex h-dvh overflow-hidden bg-[#f1f1ee] text-[#171814] max-[760px]:flex-col dark:bg-[#131412] dark:text-[#f0f0e9]">
      <motion.div
        animate={{ width: isCaseStudyOpen ? '67%' : '50%' }}
        className={clsx(
          'relative min-h-0 flex-none overflow-hidden transition-[height] duration-700 ease-out max-[760px]:!w-full',
          isCaseStudyOpen ? 'max-[760px]:h-[68dvh]' : 'max-[760px]:h-[46dvh]',
        )}
        initial={false}
        transition={transition}
      >
        <LeftPane
          contentOffset={contentOffset}
          shouldReduceMotion={shouldReduceMotion}
        >
          {left}
        </LeftPane>
      </motion.div>

      <motion.div
        animate={{ width: isCaseStudyOpen ? '33%' : '50%' }}
        className={clsx(
          'flex min-h-0 flex-none overflow-hidden transition-[height] duration-700 ease-out max-[760px]:!w-full',
          isCaseStudyOpen ? 'max-[760px]:h-[32dvh]' : 'max-[760px]:h-[54dvh]',
        )}
        initial={false}
        transition={transition}
      >
        {right}
      </motion.div>
    </main>
  );
}

interface PortfolioShellProps {
  left: ReactNode;
  right: ReactNode;
}
