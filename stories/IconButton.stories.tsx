import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { IconButton } from "../src/main";

// Stand-in for a router `Link` (React Router, TanStack Router, ...).
const RouterLink = forwardRef<
  HTMLAnchorElement,
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { to: string }
>(function RouterLink({ to, ...rest }, ref) {
  return <a ref={ref} href={to} {...rest} />;
});

const sizeOptions = ["sm", "md", "lg"] as const;

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Hold the icon button to see its stronger press scale. Press motion uses a dedicated 100ms transition; reduced-motion preferences disable the scale.",
      },
    },
  },
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
      <IconButton aria-label="Small" icon="+" size="sm" variant="outlined" />
      <IconButton aria-label="Medium" icon="+" size="md" variant="outlined" />
      <IconButton aria-label="Large" icon="+" size="lg" variant="outlined" />
    </div>
  ),
};

export const AsButton: Story = {
  render: () => (
    <IconButton as="button" aria-label="Add" icon="+" variant="outlined" />
  ),
};

export const AsAnchor: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <IconButton
        as="a"
        href="data:text/plain,Hello"
        download="hello.txt"
        aria-label="Download"
        icon="↓"
        variant="outlined"
      />
      <IconButton
        as="a"
        href="#top"
        aria-label="Disabled link"
        icon="↑"
        variant="outlined"
        disabled
      />
    </div>
  ),
};

export const AsRouterLink: Story = {
  render: () => (
    <IconButton
      as={RouterLink}
      to="#top"
      aria-label="Exit"
      icon="×"
      variant="outlined"
    />
  ),
};
