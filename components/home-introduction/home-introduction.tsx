'use client';

import { usePathname } from 'next/navigation';

import { getLandingView } from '@/components/portfolio-shell/portfolio-routes';
import { Tab } from '@/components/tab/tab';

export function HomeIntroduction() {
  const activeView = getLandingView(usePathname());

  return (
    <div className="w-full max-w-[30rem] px-8 min-[761px]:max-[900px]:px-4 min-[900px]:translate-x-11 min-[1280px]:max-w-[38rem] max-[560px]:px-5">
      <h1 className="mb-6 font-[family-name:var(--font-ibm-plex-sans-condensed)] text-[2.75rem] leading-none font-normal not-italic tracking-normal text-[#10110f] dark:text-[#f0f0e9]">
        Kurt Xiao
      </h1>
      <p className="max-w-[26rem] font-[family-name:var(--font-ibm-plex-mono)] text-base leading-[1.44] font-normal not-italic tracking-normal text-[#555650] min-[1280px]:max-w-[34rem] dark:text-[#a8aaa2]">
        <span className="block text-balance">
          Senior full-stack engineer{' '}
          <span className="whitespace-nowrap">at PayPal</span>
        </span>{' '}
        <span className="block text-balance">
          building checkout experiences and engineering platforms
        </span>
      </p>
      <nav
        aria-label="Portfolio sections"
        className="mt-5 flex flex-wrap gap-x-7 gap-y-2"
      >
        <Tab active={activeView === 'case-studies'} href="/">
          Work
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
