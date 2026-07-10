import type { Meta, StoryObj } from "@storybook/react-vite";

import { DialogActions } from "../src/main";

const meta = {
  title: "Primitives/DialogActions",
  component: DialogActions,
  tags: ["autodocs"],
  args: {
    primaryText: "Save",
    cancelText: "Cancel",
    alignEnd: false,
    disabled: false,
    isLoading: false,
    onCancel: () => undefined,
  },
} satisfies Meta<typeof DialogActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithExtraAction: Story = {
  args: {
    extraActions: [
      {
        id: "preview",
        children: "Preview",
        type: "button",
        variant: "outlined",
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
