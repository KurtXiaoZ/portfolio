import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  VerticalCarousel,
  type VerticalCarouselItem,
} from './vertical-carousel';

const artwork = {
  speed: (
    <div className="relative overflow-hidden bg-[#f8f8f2] dark:bg-[#20211e]">
      <span className="absolute top-[18%] left-[-12%] h-4 w-[124%] -rotate-12 rounded-full bg-current/10" />
      <span className="absolute top-[44%] left-[18%] h-4 w-[124%] -rotate-12 rounded-full bg-current/10" />
      <span className="absolute top-[68%] left-[-28%] h-4 w-[124%] -rotate-12 rounded-full bg-[#c9ef3e]" />
    </div>
  ),
  flags: (
    <div className="grid grid-cols-3 gap-2 bg-[#f8f8f2] p-6 dark:bg-[#20211e]">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <span
          className={
            index % 2 === 0
              ? 'rounded-lg border border-current/15'
              : 'rounded-lg bg-[#c9ef3e]/50'
          }
          key={index}
        />
      ))}
    </div>
  ),
  signal: (
    <div className="flex items-center justify-center gap-2.5 bg-[#f8f8f2] dark:bg-[#20211e]">
      {[30, 66, 110, 156, 110, 66, 30].map((height, index) => (
        <span
          className={
            index === 3
              ? 'w-2 rounded-full bg-[#c9ef3e]'
              : 'w-2 rounded-full bg-current/15'
          }
          key={`${height}-${index}`}
          style={{ height }}
        />
      ))}
    </div>
  ),
  platform: (
    <div className="relative bg-[#f8f8f2] dark:bg-[#20211e]">
      <span className="absolute top-7 left-10 h-24 w-36 -rotate-6 rounded-lg border border-current/15 bg-[#f1f1ee] shadow-lg dark:bg-[#131412]" />
      <span className="absolute top-12 right-7 h-24 w-36 rotate-6 rounded-lg border border-current/15 bg-[#f1f1ee] shadow-lg dark:bg-[#131412]" />
      <span className="absolute right-1/4 bottom-5 h-24 w-36 -rotate-1 rounded-lg border border-current/15 bg-[#f1f1ee] shadow-lg dark:bg-[#131412]" />
    </div>
  ),
  toolbar: (
    <div className="grid place-items-center bg-[#f8f8f2] dark:bg-[#20211e]">
      <span className="h-31 w-3/4 -rotate-3 rounded-lg bg-[#171814] dark:bg-[#f0f0e9]" />
      <span className="absolute bottom-6 h-9 w-36 rounded-lg bg-[#f1f1ee] shadow-lg dark:bg-[#131412]" />
    </div>
  ),
};

const items: readonly VerticalCarouselItem[] = [
  {
    id: 'checkout-performance',
    label: 'Halving first-page load latency',
    card: {
      href: '#checkout-performance',
      image: artwork.speed,
      imageAlt: 'Abstract visualization of accelerated page loading',
      tags: ['PayPal', 'Performance'],
      title: 'Halving first-page load latency',
    },
  },
  {
    id: 'feature-flags',
    label: 'Resolving 150+ feature flags in under 200ms',
    card: {
      href: '#feature-flags',
      image: artwork.flags,
      imageAlt: 'Abstract grid representing a feature flag platform',
      tags: ['PayPal', 'Platform'],
      title: 'Resolving 150+ feature flags in under 200ms',
    },
  },
  {
    id: 'telemetry',
    label: 'Standardizing interaction telemetry at scale',
    card: {
      href: '#telemetry',
      image: artwork.signal,
      imageAlt: 'Abstract visualization of converging telemetry signals',
      tags: ['PayPal', 'Observability'],
      title: 'Standardizing interaction telemetry at scale',
    },
  },
  {
    id: 'bnpl',
    label: 'Building an embedded platform for BNPL products',
    card: {
      href: '#bnpl',
      image: artwork.platform,
      imageAlt: 'Abstract composition of embedded product surfaces',
      tags: ['PayPal', 'Experiences'],
      title: 'Building an embedded platform for BNPL products',
    },
  },
  {
    id: 'developer-toolbar',
    label: 'Building a developer toolbar for 200+ engineers',
    card: {
      href: '#developer-toolbar',
      image: artwork.toolbar,
      imageAlt: 'Abstract developer toolbar interface',
      tags: ['Passion project', 'Developer experience'],
      title: 'Building a developer toolbar for 200+ engineers',
    },
  },
];

const meta = {
  title: 'Components/VerticalCarousel',
  component: VerticalCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#f1f1ee] px-6 text-[#171814] dark:bg-[#131412] dark:text-[#f0f0e9]">
        <div className="mx-auto max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof VerticalCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartsInTheMiddle: Story = {
  args: {
    initialIndex: 2,
  },
};
