import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Utilities/Pressable",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const cardStyle = {
  padding: 16,
  width: 200,
  borderRadius: 12,
  border: "1px solid var(--sito-ui-color-border)",
  background: "var(--sito-ui-color-surface)",
  color: "var(--sito-ui-color-text)",
};

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        className="sito-ui-pressable"
        role="button"
        tabIndex={0}
        style={cardStyle}
      >
        Pressable card
      </div>
      <div
        className="sito-ui-pressable"
        role="button"
        tabIndex={0}
        aria-disabled="true"
        style={{ ...cardStyle, opacity: 0.6 }}
      >
        Disabled card
      </div>
    </div>
  ),
};
