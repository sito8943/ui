import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconButton } from "../src/main";

const sizeOptions = ["sm", "md", "lg"] as const;

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    "aria-label": "Add item",
    icon: "+",
    iconSize: "20px",
    size: "md",
    variant: "outlined",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {};

export const WithText: Story = {
  args: {
    "aria-label": undefined,
    children: "Add",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <IconButton aria-label="Small" icon="+" size="sm" />
      <IconButton aria-label="Medium" icon="+" size="md" />
      <IconButton aria-label="Large" icon="+" size="lg" />
    </div>
  ),
};
