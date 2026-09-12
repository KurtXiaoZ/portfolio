export const LANDING_TABS = ['case-studies', 'gallery', 'about'] as const;

export type LandingTab = (typeof LANDING_TABS)[number];
