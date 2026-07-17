import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "../../src/main";

const getDialogBackdrop = () => {
  const backdrop = document.querySelector<HTMLElement>(
    '[data-sito-ui="dialog-backdrop"]',
  );

  if (!backdrop) {
    throw new Error("Expected dialog backdrop to render.");
  }

  return backdrop;
};

describe("Dialog", () => {
  it("does not render while closed", () => {
    render(
      <Dialog ariaLabel="Settings" open={false} onClose={vi.fn()}>
        Settings content
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders accessible dialog semantics and calls onClose from close controls", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Dialog title="Settings" open onClose={handleClose} closeOnBackdropClick>
        Settings content
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: "Settings" });
    const backdrop = getDialogBackdrop();

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    await user.keyboard("{Escape}");
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(3);
  });

  it("keeps Escape and backdrop close behavior configurable", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Dialog
        ariaLabel="Preferences"
        open
        onClose={handleClose}
        closeOnEscape={false}
        closeOnBackdropClick={false}
      >
        Preferences content
      </Dialog>,
    );

    const backdrop = getDialogBackdrop();

    await user.keyboard("{Escape}");
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("only lets the topmost dialog handle dismissal", async () => {
    const user = userEvent.setup();
    const handleOuterClose = vi.fn();
    const handleInnerClose = vi.fn();

    const { rerender } = render(
      <>
        <Dialog
          dialogId="outer-dialog"
          title="Outer dialog"
          open
          onClose={handleOuterClose}
          closeOnBackdropClick
        >
          Outer content
        </Dialog>
        <Dialog
          title="Inner dialog"
          open
          onClose={handleInnerClose}
          closeOnBackdropClick
        >
          Inner content
        </Dialog>
      </>,
    );

    await user.keyboard("{Escape}");

    expect(handleInnerClose).toHaveBeenCalledTimes(1);
    expect(handleOuterClose).not.toHaveBeenCalled();

    const outerBackdrop = document.querySelector<HTMLElement>(
      '#backdrop-outer-dialog',
    );
    outerBackdrop?.click();

    expect(handleOuterClose).not.toHaveBeenCalled();

    rerender(
      <>
        <Dialog
          dialogId="outer-dialog"
          title="Outer dialog"
          open
          onClose={handleOuterClose}
          closeOnBackdropClick
        >
          Outer content
        </Dialog>
        <Dialog
          title="Inner dialog"
          open={false}
          onClose={handleInnerClose}
          closeOnBackdropClick
        >
          Inner content
        </Dialog>
      </>,
    );

    await user.keyboard("{Escape}");

    expect(handleOuterClose).toHaveBeenCalledTimes(1);
  });

  it("submits form content through the dialog submit handler", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Dialog
        title="Create item"
        open
        onClose={vi.fn()}
        onSubmit={handleSubmit}
      >
        <label htmlFor="item-name">Name</label>
        <input id="item-name" />
        <button type="submit">Create</button>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit.mock.calls[0]?.[0].defaultPrevented).toBe(true);
  });

  it("forwards class hooks for higher-level dialog wrappers", () => {
    render(
      <Dialog
        title="Wrapped dialog"
        open
        onClose={vi.fn()}
        headerClassName="wrapper-header"
        titleClassName="wrapper-title"
        closeButtonClassName="wrapper-close"
      >
        Dialog content
      </Dialog>,
    );

    expect(screen.getByText("Wrapped dialog").parentElement).toHaveClass(
      "wrapper-header",
    );
    expect(screen.getByText("Wrapped dialog")).toHaveClass("wrapper-title");
    expect(
      screen.getByRole("button", { name: "Close dialog" }),
    ).toHaveClass("wrapper-close");
  });

  it("moves focus to the requested initial target and restores previous focus", () => {
    render(<button type="button">Open settings</button>);

    const launcher = screen.getByRole("button", { name: "Open settings" });
    launcher.focus();

    const { unmount } = render(
      <Dialog
        title="Settings"
        open
        onClose={vi.fn()}
        initialFocus="first-input"
      >
        <label htmlFor="setting-name">Name</label>
        <input id="setting-name" />
        <button type="submit">Save</button>
      </Dialog>,
    );

    expect(screen.getByLabelText("Name")).toHaveFocus();

    unmount();

    expect(launcher).toHaveFocus();
  });

  it("keeps the portal mounted during a configured exit duration", () => {
    vi.useFakeTimers();

    const handleExitComplete = vi.fn();
    const handleClose = vi.fn();
    const { rerender } = render(
      <Dialog
        title="Profile"
        open
        onClose={handleClose}
        exitDurationMs={50}
        onExitComplete={handleExitComplete}
      >
        Profile content
      </Dialog>,
    );

    rerender(
      <Dialog
        title="Profile"
        open={false}
        onClose={handleClose}
        exitDurationMs={50}
        onExitComplete={handleExitComplete}
      >
        Profile content
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Profile" })).toHaveAttribute(
      "data-state",
      "closing",
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(
      screen.queryByRole("dialog", { name: "Profile" }),
    ).not.toBeInTheDocument();
    expect(handleExitComplete).toHaveBeenCalledTimes(1);
  });
});
