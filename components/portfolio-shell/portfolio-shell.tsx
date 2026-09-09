'use client';

import clsx from 'clsx';
import { motion, useAnimate } from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

const PANE_TRANSITION = {
  duration: 0.8,
  ease: [0.2, 0.78, 0.2, 1],
} as const;

function LeftPane({ children }: { children: ReactNode }) {
  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const [scope, animate] = useAnimate();
  const previousPathname = useRef(pathname);
  const contentOffset = params.slug === undefined ? -24 : 24;

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    const controls = animate(
      scope.current,
      {
        clipPath: ['inset(0% 0% 0% 5%)', 'inset(0% 0% 0% 0%)'],
        opacity: [0, 1],
        x: [contentOffset, 0],
      },
      { ...PANE_TRANSITION, delay: 0.14, duration: 0.66 },
    );

    return () => controls.stop();
  }, [animate, contentOffset, pathname, scope]);

  return (
    <div className="absolute inset-0 overflow-y-auto" ref={scope}>
      {children}
    </div>
  );
}

export function PortfolioShell({ left, right }: PortfolioShellProps) {
  const params = useParams<{ slug?: string }>();
  const selectedSlug = params.slug ?? null;
  const isCaseStudyOpen = selectedSlug !== null;

  return (
    <main className="flex h-dvh overflow-hidden bg-[#f1f1ee] text-[#171814] max-[760px]:flex-col dark:bg-[#131412] dark:text-[#f0f0e9]">
      <motion.div
        animate={{ width: isCaseStudyOpen ? '67%' : '50%' }}
        className={clsx(
          'relative min-h-0 flex-none overflow-hidden transition-[height] duration-700 ease-out max-[760px]:!w-full',
          isCaseStudyOpen ? 'max-[760px]:h-[68dvh]' : 'max-[760px]:h-[46dvh]',
        )}
        initial={false}
        transition={PANE_TRANSITION}
      >
        <LeftPane>{left}</LeftPane>
      </motion.div>

      <motion.div
        animate={{ width: isCaseStudyOpen ? '33%' : '50%' }}
        className={clsx(
          'flex min-h-0 flex-none overflow-hidden transition-[height] duration-700 ease-out max-[760px]:!w-full',
          isCaseStudyOpen ? 'max-[760px]:h-[32dvh]' : 'max-[760px]:h-[54dvh]',
        )}
        initial={false}
        transition={PANE_TRANSITION}
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
