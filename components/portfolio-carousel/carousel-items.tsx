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
        <VideoCover
          poster="/images/case-studies/checkout-latency-ryp-streaming.jpg"
          priority
          src="/videos/case-studies/checkout-latency-ryp-streaming.mp4"
        />
      ),
      compactCover: (
        <VideoThumbnail poster="/images/case-studies/checkout-latency-ryp-streaming.jpg" />
      ),
      imageAlt:
        'PayPal checkout progressively loading payment options and details',
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
      imageAlt: 'Developer toolbar alongside a checkout screen',
      tags: ['Developer experience', 'Tooling'],
      title: 'A developer toolkit, built into checkout',
    },
  },
  {
    id: 'atomic-events',
    label: 'Standardizing interaction telemetry at scale',
    card: {
      href: '/work/atomic-events',
      cover: (
        <VideoCover
          poster="/images/case-studies/atomic-events-circular-orbit-thumbnail-enhanced.jpg"
          src="/videos/case-studies/atomic-events-circular-orbit-thumbnail-enhanced.mp4"
        />
      ),
      compactCover: (
        <VideoThumbnail poster="/images/case-studies/atomic-events-circular-orbit-thumbnail-enhanced.jpg" />
      ),
      imageAlt:
        'PayPal checkout alongside a circular state machine tracking customer interactions',
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
        <VideoCover
          poster="/images/case-studies/bnpl-platform-us-pay-monthly.jpg"
          src="/videos/case-studies/bnpl-platform-us-pay-monthly.mp4"
        />
      ),
      compactCover: (
        <VideoThumbnail poster="/images/case-studies/bnpl-platform-us-pay-monthly.jpg" />
      ),
      imageAlt: 'PayPal checkout launching an embedded Pay Monthly application',
      tags: ['Platform', 'Fintech'],
      title: 'Building an embedded platform for BNPL products',
    },
  },
] satisfies readonly ImageVerticalCarouselItem[];

function VideoCover({
  poster,
  priority = false,
  src,
}: {
  poster: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className="relative overflow-hidden bg-white">
      <VideoThumbnail poster={poster} priority={priority} />
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 h-full w-full object-contain motion-reduce:hidden"
        loop
        muted
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function VideoThumbnail({
  poster,
  priority = false,
}: {
  poster: string;
  priority?: boolean;
}) {
  return (
    <Image
      alt=""
      className="bg-white object-contain"
      fill
      priority={priority}
      sizes="445px"
      src={poster}
    />
  );
}
