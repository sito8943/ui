import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../src/main";

const colorOptions = [
  "default",
  "primary",
  "secondary",
  "error",
  "warning",
  "success",
  "info",
] as const;

const variantOptions = ["text", "submit", "outlined"] as const;
const sizeOptions = ["sm", "md", "lg"] as const;

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Save",
    color: "primary",
    size: "md",
    variant: "submit",
  },
  argTypes: {
    color: {
      control: "select",
      options: colorOptions,
    },
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
    loadingLabel: "Saving",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="submit" color="primary">
        Submit
      </Button>
      <Button variant="submit" color="error">
        Delete
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button size="sm" variant="outlined">
        Small
      </Button>
      <Button size="md" variant="outlined">
        Medium
      </Button>
      <Button size="lg" variant="outlined">
        Large
      </Button>
    </div>
  ),
};
