'use client';

import { usePathname } from 'next/navigation';

import { getLandingView } from '@/components/portfolio-shell/portfolio-routes';
import { Tab } from '@/components/tab/tab';

export function HomeIntroduction() {
  const activeView = getLandingView(usePathname());

  return (
    <div className="w-full max-w-md px-8 max-[560px]:px-6">
      <h1 className="mb-4 text-5xl leading-none font-medium tracking-[-0.045em] text-[#171814] dark:text-[#f0f0e9]">
        Kurt Xiao
      </h1>
      <p className="max-w-sm text-lg leading-7 text-[#62635d] dark:text-[#a8aaa2]">
        Senior full-stack engineer building thoughtful products and dependable
        systems.
      </p>
      <nav
        aria-label="Portfolio sections"
        className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
      >
        <Tab active={activeView === 'case-studies'} href="/">
          Case Studies
        </Tab>
        <Tab active={activeView === 'gallery'} href="/gallery">
          Gallery
        </Tab>
        <Tab active={activeView === 'about'} href="/about">
          About
        </Tab>
      </nav>
    </div>
  );
}
