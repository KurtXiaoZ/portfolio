import Image from 'next/image';

import type { ImageVerticalCarouselItem } from '@/components/image-vertical-carousel/image-vertical-carousel';

export const implementedCaseStudySlugs = [
  'atomic-events',
  'bnpl-platform',
  'checkout-latency-reduction',
  'developer-toolbar',
  'feature-flag-system',
] as const;

export const carouselItems = [
  {
    id: 'checkout-latency-reduction',
    label: 'Reducing checkout latency across the stack',
    card: {
      href: '/work/checkout-latency-reduction',
      cover: (
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="445px"
          src="/images/case-studies/checkout-performance.svg"
        />
      ),
      imageAlt: 'Abstract demo artwork representing reduced latency',
      tags: ['PayPal', 'Performance'],
      title: 'Reducing checkout latency across the stack',
    },
  },
  {
    id: 'feature-flag-system',
    label: 'Feature Flag Platform',
    card: {
      href: '/work/feature-flag-system',
      cover: (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="445px"
          src="/images/case-studies/feature-flag-system-placeholder.svg"
        />
      ),
      imageAlt: 'Illustrative feature flag controls for a checkout experience',
      tags: ['Platform', 'Experimentation'],
      title: 'Feature Flag Platform',
    },
  },
  {
    id: 'developer-toolbar',
    label: 'A developer toolkit, built into checkout',
    card: {
      href: '/work/developer-toolbar',
      cover: (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="445px"
          src="/images/case-studies/developer-toolbar-placeholder.svg"
        />
      ),
      imageAlt: 'Illustrative developer toolbar alongside a checkout screen',
      tags: ['Developer experience', 'Tooling'],
      title: 'A developer toolkit, built into checkout',
    },
  },
  {
    id: 'atomic-events',
    label: 'Standardizing interaction telemetry at scale',
    card: {
      href: '/work/atomic-events',
      cover: <AtomicEventsCover />,
      compactCover: <AtomicEventsThumbnail />,
      imageAlt: 'PayPal checkout applying rewards across two payment methods',
      tags: ['TypeScript', 'Observability'],
      title: 'Standardizing interaction telemetry at scale',
    },
  },
  {
    id: 'bnpl-platform',
    label: 'Building an embedded platform for BNPL products',
    card: {
      href: '/work/bnpl-platform',
      cover: (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="445px"
          src="/images/case-studies/bnpl-platform-placeholder.svg"
        />
      ),
      imageAlt: 'Illustrative checkout with an embedded BNPL application',
      tags: ['Platform', 'Fintech'],
      title: 'Building an embedded platform for BNPL products',
    },
  },
] satisfies readonly ImageVerticalCarouselItem[];

function AtomicEventsCover() {
  return (
    <div className="relative overflow-hidden bg-[#eff5fb]">
      <AtomicEventsThumbnail />
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        loop
        muted
        playsInline
        poster="/images/case-studies/atomic-events-apply-rewards-thumbnail.jpg"
        preload="metadata"
      >
        <source
          src="/videos/case-studies/atomic-events-apply-rewards-thumbnail.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

function AtomicEventsThumbnail() {
  return (
    <Image
      alt=""
      className="object-cover"
      fill
      sizes="445px"
      src="/images/case-studies/atomic-events-apply-rewards-thumbnail.jpg"
    />
  );
}
