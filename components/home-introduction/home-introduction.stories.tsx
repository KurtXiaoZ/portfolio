import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HomeIntroduction } from './home-introduction';

const meta = {
  title: 'Components/HomeIntroduction',
  component: HomeIntroduction,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen max-w-2xl items-center bg-white dark:bg-[#131412]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeIntroduction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HomeIntroduction />,
};

export const GallerySelected: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/gallery',
      },
    },
  },
};

export const AboutSelected: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <HomeIntroduction />,
};
