import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HomeIntroduction } from '@/components/home-introduction/home-introduction';

import { PortfolioShell } from './portfolio-shell';

const left = (
  <div className="flex h-full items-center justify-center">
    <HomeIntroduction />
  </div>
);

const meta = {
  title: 'Components/PortfolioShell',
  component: PortfolioShell,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    left,
  },
} satisfies Meta<typeof PortfolioShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CaseStudiesSelected: Story = {};

export const GallerySelected: Story = {
  args: {
    initialTab: 'gallery',
  },
};

export const AboutSelected: Story = {
  args: {
    initialTab: 'about',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
