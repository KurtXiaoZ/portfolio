import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tab } from './tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div role="tablist" aria-label="Portfolio sections">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Case Studies',
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
