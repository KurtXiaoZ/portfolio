import type { ReactNode } from 'react';

import { PortfolioShell } from '@/components/portfolio-shell/portfolio-shell';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <PortfolioShell left={children} />;
}
