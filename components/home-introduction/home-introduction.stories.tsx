import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HomeIntroduction } from './home-introduction';

const meta = {
  title: 'Components/HomeIntroduction',
  component: HomeIntroduction,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen max-w-2xl items-center bg-[#f1f1ee] dark:bg-[#131412]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeIntroduction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
