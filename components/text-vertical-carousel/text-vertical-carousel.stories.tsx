import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { carouselItems } from '@/app/carousel-items.mock';

import { TextVerticalCarousel } from './text-vertical-carousel';

const meta = {
  title: 'Components/TextVerticalCarousel',
  component: TextVerticalCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    initialIndex: 4,
    items: carouselItems,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen bg-white px-6 text-[#171814] dark:bg-[#131412] dark:text-[#f0f0e9]">
        <div className="mx-auto flex w-full max-w-4xl flex-1">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof TextVerticalCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReferenceComposition: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const StartsAtFirstItem: Story = {
  args: {
    initialIndex: 0,
  },
};
