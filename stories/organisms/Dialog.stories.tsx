import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, Dialog, DialogActions, useDialog } from "@/main";

const DialogDemo = () => {
  const dialog = useDialog(false);

  return (
    <div style={{ padding: 24 }}>
      <Button variant="submit" color="primary" onClick={dialog.handleOpen}>
        Open dialog
      </Button>
      <Dialog
        title="Project settings"
        open={dialog.open}
        onClose={dialog.handleClose}
        closeOnBackdropClick
        initialFocus="first-input"
      >
        <div style={{ display: "grid", gap: 16, padding: "0 24px 24px" }}>
          <label style={{ display: "grid", gap: 6 }}>
            Name
            <input
              style={{ font: "inherit", padding: 8 }}
              defaultValue="Quarterly plan"
            />
          </label>
          <DialogActions
            primaryText="Save"
            cancelText="Cancel"
            onPrimaryClick={dialog.handleClose}
            onCancel={dialog.handleClose}
            primaryType="button"
          />
        </div>
      </Dialog>
    </div>
  );
};

const ExitTransitionDemo = () => {
  const [open, setOpen] = useState(false);
  const [closingCount, setClosingCount] = useState(0);

  return (
    <div style={{ padding: 24 }}>
      <Button variant="submit" color="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <span style={{ marginLeft: 12 }}>Closed {closingCount} times</span>
      <Dialog
        title="Exit transition"
        open={open}
        onClose={() => setOpen(false)}
        exitDurationMs={220}
        onExitComplete={() => setClosingCount((count) => count + 1)}
      >
        <div style={{ display: "grid", gap: 16, padding: "0 24px 24px" }}>
          <p style={{ margin: 0 }}>Review the details before closing.</p>
          <DialogActions
            primaryText="Done"
            cancelText="Cancel"
            onPrimaryClick={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            primaryType="button"
          />
        </div>
      </Dialog>
    </div>
  );
};

const ScrollingDialogDemo = () => {
  const dialog = useDialog(false);

  return (
    <div style={{ padding: 24 }}>
      <Button variant="submit" color="primary" onClick={dialog.handleOpen}>
        Open tall dialog
      </Button>
      <Dialog
        title="Terms of use"
        open={dialog.open}
        onClose={dialog.handleClose}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index} style={{ margin: "0 0 16px" }}>
            Section {index + 1}. The header and the actions stay visible while
            this content scrolls under them.
          </p>
        ))}
        <DialogActions
          primaryText="Accept"
          cancelText="Cancel"
          onPrimaryClick={dialog.handleClose}
          onCancel={dialog.handleClose}
          primaryType="button"
          alignEnd
        />
      </Dialog>
    </div>
  );
};

const meta = {
  title: "Organisms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const ExitTransition: Story = {
  render: () => <ExitTransitionDemo />,
};

export const Scrolling: Story = {
  render: () => <ScrollingDialogDemo />,
};
