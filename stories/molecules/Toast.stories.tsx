import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  type ToastColor,
  type ToastPlacement,
  ToastProvider,
  useToast,
} from "@/main";

const ColorDemo = ({ color }: { color: ToastColor }) => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      onClick={() => toast({ message: `A ${color} notification`, color })}
    >
      Show {color} toast
    </Button>
  );
};

const ActionDemo = () => {
  const toast = useToast();

  return (
    <Button
      variant="outlined"
      onClick={() =>
        toast({
          message: "Slide deleted",
          action: {
            label: "Undo",
            onClick: () => toast({ message: "Restored" }),
          },
        })
      }
    >
      Delete slide
    </Button>
  );
};

const UpdateDemo = () => {
  const toast = useToast();

  const save = () => {
    const id = toast({ message: "Saving…", duration: 0, dismissible: false });
    window.setTimeout(() => {
      toast.update(id, {
        message: "Saved",
        color: "success",
        duration: 3000,
        dismissible: true,
      });
    }, 1500);
  };

  return (
    <Button variant="outlined" onClick={save}>
      Save
    </Button>
  );
};

type DemoArgs = {
  placement: ToastPlacement;
  demo: "color" | "action" | "update";
  color: ToastColor;
};

const meta = {
  title: "Molecules/Toast",
  tags: ["autodocs"],
  args: { placement: "bottom-right", demo: "color", color: "default" },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    color: {
      control: "select",
      options: ["default", "success", "error", "warning"],
    },
  },
  render: ({ placement, demo, color }) => (
    <ToastProvider placement={placement}>
      <div style={{ padding: 24 }}>
        {demo === "action" ? <ActionDemo /> : null}
        {demo === "update" ? <UpdateDemo /> : null}
        {demo === "color" ? <ColorDemo color={color} /> : null}
      </div>
    </ToastProvider>
  ),
} satisfies Meta<DemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { color: "default" } };
export const Success: Story = { args: { color: "success" } };
export const Error: Story = { args: { color: "error" } };
export const Warning: Story = { args: { color: "warning" } };
export const WithAction: Story = { args: { demo: "action" } };
export const UpdateInPlace: Story = { args: { demo: "update" } };
