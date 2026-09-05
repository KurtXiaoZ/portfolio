import type { VerticalCarouselItem } from '@/components/vertical-carousel/vertical-carousel';

export const carouselItems = [
  {
    id: 'checkout-redesign',
    label: 'Reimagining checkout for global shoppers',
    card: {
      href: '#checkout-redesign',
      image: <div className="bg-[#d8ff64]" />,
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
      image: <div className="bg-[#ff8b66]" />,
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
      image: <div className="bg-[#8ab4ff]" />,
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
      image: <div className="bg-[#d9b8ff]" />,
      imageAlt: 'Placeholder artwork for developer tools',
      tags: ['Developer experience', 'Tooling'],
      title: 'Making local development feel instant',
    },
  },
] satisfies readonly VerticalCarouselItem[];
