import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "../src/main";

const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    label: "Loading",
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Spinner label="Small" style={{ fontSize: 12 }} />
      <Spinner label="Medium" style={{ fontSize: 16 }} />
      <Spinner label="Large" style={{ fontSize: 24 }} />
    </div>
  ),
};
