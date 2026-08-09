import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tag } from './tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'PayPal',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
