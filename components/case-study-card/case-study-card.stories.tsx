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
    cover: artwork,
    imageAlt: 'Abstract visualization of accelerated page loading',
    tags: ['PayPal', 'Performance'],
    title: 'Reducing checkout latency across the stack',
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};
