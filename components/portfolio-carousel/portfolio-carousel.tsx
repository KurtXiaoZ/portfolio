'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  VerticalCarousel,
  type VerticalCarouselItem,
} from '@/components/vertical-carousel/vertical-carousel';

interface PortfolioCarouselProps {
  implementedSlugs: readonly string[];
  items: readonly VerticalCarouselItem[];
}

export function PortfolioCarousel({
  implementedSlugs,
  items,
}: PortfolioCarouselProps) {
  const params = useParams<{ slug?: string }>();
  const router = useRouter();
  const selectedSlug = params.slug ?? null;

  useEffect(() => {
    for (const slug of implementedSlugs) {
      // Warm implemented articles while the visitor explores the carousel,
      // without adding their full content to the homepage payload.
      router.prefetch(`/work/${slug}`);
    }
  }, [implementedSlugs, router]);

  const selectedIndex = items.findIndex((item) => item.id === selectedSlug);

  return (
    <VerticalCarousel
      initialIndex={selectedIndex >= 0 ? selectedIndex : 0}
      items={items}
    />
  );
}
