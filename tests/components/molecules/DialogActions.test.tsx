import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DialogActions, type DialogActionsProps } from "@/main";

const RouterLink = (_props: { to: string }) => null;

const polymorphicTypeExamples: DialogActionsProps[] = [
  {
    primaryText: "Sign in",
    primaryProps: { as: "a", href: "/sign-in/" },
  },
  {
    primaryText: "Sign in",
    primaryProps: { as: RouterLink, to: "/sign-in/" },
  },
  {
    primaryText: "Continue",
    primaryProps: { color: "primary", variant: "outlined", disabled: true },
    cancelText: "Back",
    cancelProps: { as: RouterLink, to: "/back/" },
  },
];

void polymorphicTypeExamples;

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

  it("disables all actions while loading", async () => {
    const user = userEvent.setup();
    const handleExtra = vi.fn();

    render(
      <DialogActions
        primaryText="Save"
        cancelText="Cancel"
        onCancel={vi.fn()}
        extraActions={[
          {
            id: "help",
            as: "a",
            href: "/help/",
            children: "Help",
            onClick: handleExtra,
          },
        ]}
        isLoading
      />,
    );

    expect(screen.getByRole("button", { name: "LoadingSave" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Help" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("link", { name: "Help" })).toHaveAttribute(
      "tabindex",
      "-1",
    );

    await user.click(screen.getByRole("link", { name: "Help" }));

    expect(handleExtra).not.toHaveBeenCalled();
  });

  it("supports link actions and omits the cancel action when not provided", async () => {
    const user = userEvent.setup();
    const handleNavigation = vi.fn();

    render(
      <DialogActions
        primaryText="Sign in"
        primaryAriaLabel="Sign in"
        isLoading
        primaryProps={{
          as: "a",
          href: "/sign-in/",
          onClick: handleNavigation,
        }}
      />,
    );

    const primaryLink = screen.getByRole("link", { name: "Sign in" });
    expect(primaryLink).toHaveAttribute("href", "/sign-in/");
    expect(primaryLink).toHaveAttribute("aria-disabled", "true");
    expect(primaryLink).toHaveAttribute("tabindex", "-1");
    expect(
      screen.queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();

    await user.click(primaryLink);

    expect(handleNavigation).not.toHaveBeenCalled();
  });

  it("supports a link as the optional cancel action", () => {
    render(
      <DialogActions
        primaryText="Sign up"
        cancelText="Sign in"
        cancelProps={{ as: "a", href: "/sign-in/" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/sign-in/",
    );
  });
});
