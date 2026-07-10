import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DialogActions } from "../../src/main";

describe("DialogActions", () => {
  it("renders primary, extra, and cancel actions with stable button behavior", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();
    const handleExtra = vi.fn();
    const handlePrimary = vi.fn();

    render(
      <DialogActions
        primaryText="Save"
        cancelText="Cancel"
        onPrimaryClick={handlePrimary}
        onCancel={handleCancel}
        extraActions={[
          {
            id: "archive",
            children: "Archive",
            onClick: handleExtra,
            type: "button",
            variant: "outlined",
          },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "submit",
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    await user.click(screen.getByRole("button", { name: "Archive" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(handlePrimary).toHaveBeenCalledTimes(1);
    expect(handleExtra).toHaveBeenCalledTimes(1);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("disables primary and cancel actions while loading", () => {
    render(
      <DialogActions
        primaryText="Save"
        cancelText="Cancel"
        onCancel={vi.fn()}
        isLoading
      />,
    );

    expect(screen.getByRole("button", { name: "LoadingSave" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });
});
