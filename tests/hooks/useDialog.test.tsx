import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { useDialog } from "../../src/main";

type UseDialogHarnessProps = {
  initialOpen?: boolean;
};

const UseDialogHarness = ({ initialOpen = false }: UseDialogHarnessProps) => {
  const dialog = useDialog(initialOpen);

  return (
    <div>
      <span data-testid="state">{dialog.open ? "open" : "closed"}</span>
      <button type="button" onClick={dialog.handleOpen}>
        Open
      </button>
      <button type="button" onClick={dialog.handleClose}>
        Close
      </button>
      <button type="button" onClick={() => dialog.setOpen(true)}>
        Set open
      </button>
    </div>
  );
};

describe("useDialog", () => {
  it("uses the provided initial state and exposes explicit handlers", async () => {
    const user = userEvent.setup();

    render(<UseDialogHarness />);

    expect(screen.getByTestId("state")).toHaveTextContent("closed");

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByTestId("state")).toHaveTextContent("open");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByTestId("state")).toHaveTextContent("closed");

    await user.click(screen.getByRole("button", { name: "Set open" }));
    expect(screen.getByTestId("state")).toHaveTextContent("open");
  });

  it("can start open", () => {
    render(<UseDialogHarness initialOpen />);

    expect(screen.getByTestId("state")).toHaveTextContent("open");
  });
});
