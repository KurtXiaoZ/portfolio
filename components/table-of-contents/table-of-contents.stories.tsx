import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TableOfContents } from './table-of-contents';

const meta = {
  title: 'Components/Table of Contents',
  component: TableOfContents,
  parameters: {
    layout: 'centered',
  },
  args: {
    links: [
      { href: '#challenge', text: 'The challenge' },
      { href: '#approach', text: 'Approach' },
      { href: '#outcome', text: 'Outcome' },
    ],
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
