import Image from 'next/image';

import type { VerticalCarouselItem } from '@/components/vertical-carousel/vertical-carousel';

export const implementedCaseStudySlugs = [
  'checkout-performance',
  'feature-flag-system',
] as const;

export const carouselItems = [
  {
    id: 'checkout-performance',
    label: 'Halving first-page load latency',
    card: {
      href: '/work/checkout-performance',
      cover: (
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="(max-width: 760px) 82vw, (max-width: 1200px) 41vw, 328px"
          src="/images/case-studies/checkout-performance.svg"
        />
      ),
      imageAlt: 'Abstract visualization of accelerated page loading',
      tags: ['PayPal', 'Performance'],
      title: 'Halving first-page load latency',
    },
  },
  {
    id: 'feature-flag-system',
    label: 'Resolving 150+ feature flags in under 200ms',
    card: {
      href: '/work/feature-flag-system',
      cover: <div className="bg-[#ff8b66]" />,
      imageAlt: 'Abstract artwork for a feature flag platform',
      tags: ['Platform', 'Node.js'],
      title: 'Resolving 150+ feature flags in under 200ms',
    },
  },
  {
    id: 'design-system',
    label: 'Scaling a design system across teams',
    card: {
      href: '#design-system',
      cover: <div className="bg-[#8ab4ff]" />,
      imageAlt: 'Placeholder artwork for a design system',
      tags: ['Design systems', 'Leadership'],
      title: 'Scaling a design system across teams',
    },
  },
  {
    id: 'developer-tools',
    label: 'Making local development feel instant',
    card: {
      href: '#developer-tools',
      cover: <div className="bg-[#d9b8ff]" />,
      imageAlt: 'Placeholder artwork for developer tools',
      tags: ['Developer experience', 'Tooling'],
      title: 'Making local development feel instant',
    },
  },
  {
    id: 'interaction-telemetry',
    label: 'Standardizing interaction telemetry at scale',
    card: {
      href: '#interaction-telemetry',
      cover: <div className="bg-[#70d6c7]" />,
      imageAlt: 'Placeholder artwork for interaction telemetry',
      tags: ['Observability', 'Platform'],
      title: 'Standardizing interaction telemetry at scale',
    },
  },
  {
    id: 'bnpl-platform',
    label: 'Building an embedded platform for BNPL products',
    card: {
      href: '#bnpl-platform',
      cover: <div className="bg-[#ffc857]" />,
      imageAlt: 'Placeholder artwork for an embedded BNPL platform',
      tags: ['Platform', 'Fintech'],
      title: 'Building an embedded platform for BNPL products',
    },
  },
] satisfies readonly VerticalCarouselItem[];
