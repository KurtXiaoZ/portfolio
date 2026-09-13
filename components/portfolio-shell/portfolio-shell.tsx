'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { useParams, usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  carouselItems,
  implementedCaseStudySlugs,
} from '@/app/carousel-items.mock';
import { AboutPanel } from '@/components/about-panel/about-panel';
import { GalleryPanel } from '@/components/gallery-panel/gallery-panel';
import { PortfolioCarousel } from '@/components/portfolio-carousel/portfolio-carousel';

export type LandingTab = 'case-studies' | 'gallery' | 'about';

interface TabsContextValue {
  activeTab: LandingTab;
  setActiveTab: (tab: LandingTab) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error('useTabs must be used within PortfolioShell');
  }

  return context;
}

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

interface PortfolioShellProps {
  initialTab?: LandingTab;
  left: ReactNode;
}

function RightPane({ activeTab }: { activeTab: LandingTab }) {
  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="absolute inset-0 flex min-h-0 overflow-hidden"
          exit={{ opacity: 0, x: -24 }}
          initial={{ opacity: 0, x: 24 }}
          key={activeTab}
          transition={{ duration: 0.32, ease: [0.2, 0.78, 0.2, 1] }}
        >
          {activeTab === 'case-studies' && (
            <PortfolioCarousel
              implementedSlugs={implementedCaseStudySlugs}
              items={carouselItems}
            />
          )}
          {activeTab === 'gallery' && <GalleryPanel />}
          {activeTab === 'about' && <AboutPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function PortfolioShell({
  initialTab = 'case-studies',
  left,
}: PortfolioShellProps) {
  const params = useParams<{ slug?: string }>();
  const [activeTab, setActiveTab] = useState<LandingTab>(initialTab);
  const selectedSlug = params.slug ?? null;
  const isCaseStudyOpen = selectedSlug !== null;

  useLayoutEffect(() => {
    if (!isCaseStudyOpen) return;

    // Keep the tab state authoritative when the persistent shell enters its
    // route-driven reading mode.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTab('case-studies');
  }, [isCaseStudyOpen]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
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
          <RightPane activeTab={activeTab} />
        </motion.div>
      </main>
    </TabsContext.Provider>
  );
}
