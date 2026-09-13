export type LandingView = 'case-studies' | 'gallery' | 'about';

export function getLandingView(pathname: string): LandingView {
  if (pathname === '/gallery') return 'gallery';
  if (pathname === '/about') return 'about';

  return 'case-studies';
}
