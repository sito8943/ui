import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "@/main";

const position = { x: 24, y: 32 };

const renderPlainMenu = (open: boolean) => (
  <ContextMenu
    open={open}
    position={position}
    onClose={vi.fn()}
    ariaLabel="Actions"
  >
    <ContextMenuItem>Open</ContextMenuItem>
  </ContextMenu>
);

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

    expect(menuRef.current).toBe(screen.getByRole("menu", { name: "Actions" }));

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

    expect(menuRef.current).toBe(screen.getByRole("menu", { name: "Actions" }));
  });
  it("stays mounted while it closes, ignores input, then unmounts", () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    const renderMenu = (open: boolean) => (
      <ContextMenu
        open={open}
        position={position}
        onClose={handleClose}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
      </ContextMenu>
    );

    const { rerender } = render(renderMenu(true));
    const menu = screen.getByRole("menu", { name: "Actions" });
    expect(menu).toHaveAttribute("data-state", "open");

    rerender(renderMenu(false));

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(menu).toHaveAttribute("inert");

    fireEvent.keyDown(menu, { key: "Escape" });
    fireEvent.pointerDown(document.body);
    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(menu).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("opens again while it closes", () => {
    vi.useFakeTimers();

    const { rerender } = render(renderPlainMenu(true));
    rerender(renderPlainMenu(false));
    rerender(renderPlainMenu(true));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const menu = screen.getByRole("menu", { name: "Actions" });
    expect(menu).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("menuitem", { name: "Open" })).toHaveFocus();
    vi.useRealTimers();
  });

  it("unmounts at once when reduced motion is preferred", () => {
    const matchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    const { rerender } = render(renderPlainMenu(true));
    rerender(renderPlainMenu(false));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    window.matchMedia = matchMedia;
  });

  it("exposes checked items as menuitemcheckbox with a trailing check", () => {
    render(
      <ContextMenu open position={position} onClose={vi.fn()} ariaLabel="View">
        <ContextMenuItem checked>Hidden files</ContextMenuItem>
        <ContextMenuItem checked={false}>Previews</ContextMenuItem>
        <ContextMenuItem>Refresh</ContextMenuItem>
      </ContextMenu>,
    );

    const hidden = screen.getByRole("menuitemcheckbox", {
      name: "Hidden files",
    });
    const previews = screen.getByRole("menuitemcheckbox", { name: "Previews" });
    const refresh = screen.getByRole("menuitem", { name: "Refresh" });

    expect(hidden).toHaveAttribute("aria-checked", "true");
    expect(
      hidden.querySelector(".sito-ui-context-menu__check svg"),
    ).not.toBeNull();
    expect(previews).toHaveAttribute("aria-checked", "false");
    expect(previews.querySelector(".sito-ui-context-menu__check")).toBeNull();
    expect(refresh).not.toHaveAttribute("aria-checked");
    // Checkbox rows take part in keyboard navigation.
    expect(hidden).toHaveFocus();
  });

  it("marks destructive items with the error color", () => {
    render(
      <ContextMenu open position={position} onClose={vi.fn()} ariaLabel="File">
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem color="error">Delete</ContextMenuItem>
      </ContextMenu>,
    );

    const open = screen.getByRole("menuitem", { name: "Open" });
    const remove = screen.getByRole("menuitem", { name: "Delete" });

    expect(open).toHaveAttribute("data-color", "default");
    expect(remove).toHaveAttribute("data-color", "error");
    expect(remove).toHaveClass("sito-ui-context-menu__item--error");
    expect(open).not.toHaveClass("sito-ui-context-menu__item--error");
  });

  it("focuses the hovered item so pointer and keyboard share one row", async () => {
    const user = userEvent.setup();
    const handlePointerEnter = vi.fn();

    render(
      <ContextMenu
        open
        position={position}
        onClose={vi.fn()}
        ariaLabel="Actions"
      >
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem disabled>Rename</ContextMenuItem>
        <ContextMenuItem onPointerEnter={handlePointerEnter}>
          Refresh
        </ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenu>,
    );

    const open = screen.getByRole("menuitem", { name: "Open" });
    const refresh = screen.getByRole("menuitem", { name: "Refresh" });

    await user.hover(refresh);
    expect(refresh).toHaveFocus();
    expect(handlePointerEnter).toHaveBeenCalledTimes(1);

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();

    // Disabled rows never take focus.
    await user.hover(screen.getByRole("menuitem", { name: "Rename" }));
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();

    await user.hover(open);
    expect(open).toHaveFocus();
  });
});
