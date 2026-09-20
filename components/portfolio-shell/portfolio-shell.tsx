'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

import {
  carouselItems,
  implementedCaseStudySlugs,
} from '@/app/carousel-items.mock';
import { AboutPanel } from '@/components/about-panel/about-panel';
import { GalleryPanel } from '@/components/gallery-panel/gallery-panel';
import { PortfolioCarousel } from '@/components/portfolio-carousel/portfolio-carousel';
import {
  getLandingView,
  type LandingView,
} from '@/components/portfolio-shell/portfolio-routes';

const PANE_TRANSITION = {
  duration: 0.8,
  ease: [0.2, 0.78, 0.2, 1],
} as const;

function LeftPane({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();
  const previousPathname = useRef(pathname);
  const isCaseStudyOpen = pathname.startsWith('/work/');
  const contentOffset = isCaseStudyOpen ? 24 : -24;

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    const wasCaseStudyOpen = previousPathname.current.startsWith('/work/');
    previousPathname.current = pathname;

    // Landing routes share the same introduction. Only their right-pane
    // content changes, so keep the left pane visually stable between them.
    if (!wasCaseStudyOpen && !isCaseStudyOpen) return;

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
  }, [animate, contentOffset, isCaseStudyOpen, pathname, scope]);

  return (
    <div className="absolute inset-0 overflow-y-auto" ref={scope}>
      {children}
    </div>
  );
}

interface PortfolioShellProps {
  left: ReactNode;
}

function RightPane({ activeView }: { activeView: LandingView }) {
  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="absolute inset-0 flex min-h-0 overflow-hidden"
          exit={{ opacity: 0, x: -24 }}
          initial={{ opacity: 0, x: 24 }}
          key={activeView}
          transition={{ duration: 0.32, ease: [0.2, 0.78, 0.2, 1] }}
        >
          {activeView === 'case-studies' && (
            <PortfolioCarousel
              implementedSlugs={implementedCaseStudySlugs}
              items={carouselItems}
            />
          )}
          {activeView === 'gallery' && <GalleryPanel />}
          {activeView === 'about' && <AboutPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function PortfolioShell({ left }: PortfolioShellProps) {
  const pathname = usePathname();
  const activeView = getLandingView(pathname);
  const isCaseStudyOpen = pathname.startsWith('/work/');

  return (
    <main className="flex h-dvh overflow-hidden bg-white text-[#171814] max-[760px]:flex-col dark:bg-[#131412] dark:text-[#f0f0e9]">
      <motion.div
        animate={{ width: isCaseStudyOpen ? '67%' : '50%' }}
        className={clsx(
          'relative min-h-0 flex-none overflow-hidden transition-[height] duration-700 ease-out max-[760px]:!w-full',
          isCaseStudyOpen ? 'max-[760px]:h-[68dvh]' : 'max-[760px]:h-[46dvh]',
        )}
        initial={false}
        transition={PANE_TRANSITION}
      >
        <LeftPane>
          <div className="h-full">{left}</div>
        </LeftPane>
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
        <RightPane activeView={activeView} />
      </motion.div>
    </main>
  );
}
