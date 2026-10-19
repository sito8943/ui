import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Tooltip } from "../src/main";

const meta = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    label: "Tooltip label",
    children: <Button variant="outlined">Hover or focus</Button>,
  },
  argTypes: {
    side: { control: "select", options: ["top", "bottom"] },
    align: { control: "select", options: ["start", "center", "end"] },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopStart: Story = { args: { side: "top", align: "start" } };
export const TopCenter: Story = { args: { side: "top", align: "center" } };
export const TopEnd: Story = { args: { side: "top", align: "end" } };
export const BottomStart: Story = { args: { side: "bottom", align: "start" } };
export const BottomCenter: Story = { args: { side: "bottom", align: "center" } };
export const BottomEnd: Story = { args: { side: "bottom", align: "end" } };

export const DisabledTrigger: Story = {
  args: {
    label: "This action is unavailable",
    children: <Button disabled>Unavailable</Button>,
  },
};
