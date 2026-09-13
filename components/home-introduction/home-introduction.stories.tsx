import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import {
  TabsContext,
  type LandingTab,
} from '@/components/portfolio-shell/portfolio-shell';
import { HomeIntroduction } from './home-introduction';

function HomeIntroductionPreview({ initialTab }: { initialTab: LandingTab }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <HomeIntroduction />
    </TabsContext.Provider>
  );
}

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

export const Default: Story = {
  render: () => <HomeIntroductionPreview initialTab="case-studies" />,
};

export const GallerySelected: Story = {
  render: () => <HomeIntroductionPreview initialTab="gallery" />,
};

export const AboutSelected: Story = {
  render: () => <HomeIntroductionPreview initialTab="about" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <HomeIntroductionPreview initialTab="case-studies" />,
};
