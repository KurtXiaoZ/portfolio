import type { ReactNode } from 'react';

import {
  carouselItems,
  implementedCaseStudySlugs,
} from '@/app/carousel-items.mock';
import { PortfolioCarousel } from '@/components/portfolio-experience/portfolio-carousel/portfolio-carousel';
import { PortfolioShell } from '@/components/portfolio-experience/portfolio-shell/portfolio-shell';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <PortfolioShell
      left={<div className="h-full">{children}</div>}
      right={
        <PortfolioCarousel
          implementedSlugs={implementedCaseStudySlugs}
          items={carouselItems}
        />
      }
    />
  );
}
