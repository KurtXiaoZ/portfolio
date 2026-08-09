import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CaseStudyCard } from './case-study-card';

const artwork = (
  // Storybook serves this static fixture directly; application code can pass next/image.
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/images/case-studies/checkout-performance.svg"
    alt=""
    className="object-cover"
  />
);

const meta = {
  title: 'Components/CaseStudyCard',
  component: CaseStudyCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '#checkout-performance',
    image: artwork,
    imageAlt: 'Abstract visualization of accelerated page loading',
    tags: ['PayPal', 'Performance'],
    title: 'Halving first-page load latency',
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
