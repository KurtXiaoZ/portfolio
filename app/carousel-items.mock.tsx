import type { VerticalCarouselItem } from '@/components/vertical-carousel/vertical-carousel';

export const carouselItems = [
  {
    id: 'checkout-redesign',
    label: 'Reimagining checkout for global shoppers',
    card: {
      href: '#checkout-redesign',
      cover: <div className="bg-[#d8ff64]" />,
      imageAlt: 'Placeholder artwork for a checkout redesign',
      tags: ['Product engineering', 'Web'],
      title: 'Reimagining checkout for global shoppers',
    },
  },
  {
    id: 'feature-platform',
    label: 'Building a faster experimentation platform',
    card: {
      href: '#feature-platform',
      cover: <div className="bg-[#ff8b66]" />,
      imageAlt: 'Placeholder artwork for an experimentation platform',
      tags: ['Platform', 'Performance'],
      title: 'Building a faster experimentation platform',
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
