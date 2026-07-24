import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
} from "../../src/main";

const position = { x: 24, y: 32 };

describe("ContextMenu", () => {
  it("does not render while closed", () => {
    render(
      <ContextMenu
        open={false}
        position={position}
        onClose={vi.fn()}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
      </ContextMenu>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders menu semantics and moves focus between enabled items", async () => {
    const user = userEvent.setup();

    render(
      <ContextMenu
        open
        position={position}
        onClose={vi.fn()}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem disabled>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Refresh</ContextMenuItem>
      </ContextMenu>,
    );

    const menu = screen.getByRole("menu", { name: "Actions" });
    const open = screen.getByRole("menuitem", { name: "Open" });
    const refresh = screen.getByRole("menuitem", { name: "Refresh" });

    expect(menu).toHaveAttribute("aria-orientation", "vertical");
    expect(open).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(refresh).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(open).toHaveFocus();

    await user.keyboard("{End}");
    expect(refresh).toHaveFocus();
  });

  it("closes with Escape and restores focus after it unmounts", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<button type="button">Explorer row</button>);
    const trigger = screen.getByRole("button", { name: "Explorer row" });
    trigger.focus();

    const { rerender } = render(
      <ContextMenu
        open
        position={position}
        onClose={handleClose}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
      </ContextMenu>,
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(1);

    rerender(
      <ContextMenu
        open={false}
        position={position}
        onClose={handleClose}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
      </ContextMenu>,
    );

    expect(trigger).toHaveFocus();
  });

  it("closes after a pointer press outside", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <>
        <button type="button">Outside</button>
        <ContextMenu
          open
          position={position}
          onClose={handleClose}
          ariaLabel="Actions"
        >
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenu>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("exposes its element and allows consumers to own dismissal", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const menuRef = createRef<HTMLDivElement>();

    render(
      <>
        <button type="button">Outside</button>
        <ContextMenu
          ref={menuRef}
          open
          position={position}
          onClose={handleClose}
          ariaLabel="Actions"
          closeOnEscape={false}
          closeOnTab={false}
          closeOnPointerDownOutside={false}
        >
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenu>
      </>,
    );

    expect(menuRef.current).toBe(
      screen.getByRole("menu", { name: "Actions" }),
    );

    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("updates its element ref when a closed menu opens", () => {
    const menuRef = createRef<HTMLDivElement>();
    const handleClose = vi.fn();
    const renderMenu = (open: boolean) => (
      <ContextMenu
        ref={menuRef}
        open={open}
        position={position}
        onClose={handleClose}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
      </ContextMenu>
    );

    const { rerender } = render(renderMenu(false));
    expect(menuRef.current).toBeNull();

    rerender(renderMenu(true));

    expect(menuRef.current).toBe(
      screen.getByRole("menu", { name: "Actions" }),
    );
  });
});
