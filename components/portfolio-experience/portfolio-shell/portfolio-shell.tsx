'use client';

import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const PANE_TRANSITION = {
  duration: 0.8,
  ease: [0.2, 0.78, 0.2, 1],
} as const;

function LeftPane({
  children,
  contentOffset,
  prefersReducedMotion,
}: {
  children: ReactNode;
  contentOffset: number;
  prefersReducedMotion: boolean | null;
}) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      animate={{
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        x: 0,
      }}
      aria-hidden={!isPresent}
      className="absolute inset-0 overflow-y-auto"
      exit={{
        opacity: 0,
        x: prefersReducedMotion ? 0 : contentOffset,
      }}
      inert={isPresent ? undefined : true}
      initial={{
        clipPath: prefersReducedMotion
          ? 'inset(0% 0% 0% 0%)'
          : 'inset(0% 0% 0% 5%)',
        opacity: 0,
        x: prefersReducedMotion ? 0 : contentOffset,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { ...PANE_TRANSITION, delay: 0.14 }
      }
    >
      {children}
    </motion.div>
  );
}

export function PortfolioShell({ left, right }: PortfolioShellProps) {
  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const selectedSlug = params.slug ?? null;
  const isCaseStudyOpen = selectedSlug !== null;
  const transition = prefersReducedMotion ? { duration: 0 } : PANE_TRANSITION;
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
        <AnimatePresence initial={false} mode="sync">
          <LeftPane
            contentOffset={contentOffset}
            key={pathname}
            prefersReducedMotion={prefersReducedMotion}
          >
            {left}
          </LeftPane>
        </AnimatePresence>
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
