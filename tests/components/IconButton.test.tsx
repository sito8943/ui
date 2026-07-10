import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "../../src/main";

describe("IconButton", () => {
  it("requires and forwards an accessible label for icon-only buttons", () => {
    render(<IconButton aria-label="Close" icon="x" />);

    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toHaveAttribute("data-sito-ui", "icon-button");
    expect(button).toHaveClass("sito-ui-icon-button--md");
    expect(button).not.toHaveClass("sito-ui-icon-button--with-content");
    expect(screen.getByText("x")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies container size separately from icon size", () => {
    render(<IconButton aria-label="Open" icon="o" iconSize={16} size="sm" />);

    const button = screen.getByRole("button", { name: "Open" });

    expect(button).toHaveClass("sito-ui-button--sm");
    expect(button).toHaveClass("sito-ui-icon-button--sm");
    expect(button).toHaveStyle({
      "--sito-ui-icon-button-icon-size": "16px",
    });
  });

  it("uses visible text as the accessible name when children are provided", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton icon="+" onClick={handleClick}>
        Add
      </IconButton>,
    );

    const button = screen.getByRole("button", { name: "Add" });

    expect(button).toHaveClass("sito-ui-icon-button--with-content");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("hides the icon while loading and keeps the button disabled", () => {
    render(<IconButton aria-label="Save" icon="s" loading />);

    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toBeDisabled();
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.queryByText("s")).not.toBeInTheDocument();
  });
});
