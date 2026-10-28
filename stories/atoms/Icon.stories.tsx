import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, Icon, IconButton } from "../../src/main";

const Star = (props: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path
      d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
      fill={props.filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders a glyph and blurs between glyphs when it changes. Re-rendering the same glyph does not animate. Reduced-motion preferences swap instantly.",
      },
    },
  },
  args: {
    icon: "★",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Swap: Story = {
  render: () => {
    const [filled, setFilled] = useState(false);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Icon icon={<Star filled={filled} />} style={{ fontSize: 32 }} />
        <Button variant="outlined" onClick={() => setFilled((on) => !on)}>
          Toggle
        </Button>
      </div>
    );
  },
};

export const InIconButton: Story = {
  render: () => {
    const [starred, setStarred] = useState(false);

    return (
      <IconButton
        aria-label={starred ? "Unstar" : "Star"}
        aria-pressed={starred}
        icon={<Star filled={starred} />}
        variant="outlined"
        onClick={() => setStarred((on) => !on)}
      />
    );
  },
};
