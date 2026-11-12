import { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  CONTEXT_MENU_SUBMENU_SELECTOR,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
} from "@/main";

const position = { x: 24, y: 32 };

type MenuProps = {
  onClose?: () => void;
  onPick?: (value: string) => void;
  closeOnPointerDownOutside?: boolean;
};

const Menu = ({
  onClose = vi.fn(),
  onPick = vi.fn(),
  closeOnPointerDownOutside,
}: MenuProps) => (
  <ContextMenu
    open
    position={position}
    onClose={onClose}
    ariaLabel="Actions"
    closeOnPointerDownOutside={closeOnPointerDownOutside}
  >
    <ContextMenuItem onClick={() => onPick("open")}>Open</ContextMenuItem>
    <ContextMenuSubmenu label="Sort by">
      <ContextMenuItem checked onClick={() => onPick("name")}>
        Name
      </ContextMenuItem>
      <ContextMenuItem checked={false} onClick={() => onPick("date")}>
        Date
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem disabled>Size</ContextMenuItem>
    </ContextMenuSubmenu>
    <ContextMenuItem onClick={() => onPick("refresh")}>Refresh</ContextMenuItem>
  </ContextMenu>
);

/** Like `useContextMenu` consumers: picking an item closes the menu. */
const ClosingMenu = ({ onPick }: { onPick: (value: string) => void }) => {
  const [open, setOpen] = useState(true);
  const pick = (value: string) => {
    onPick(value);
    setOpen(false);
  };

  return (
    <ContextMenu
      open={open}
      position={position}
      onClose={() => setOpen(false)}
      ariaLabel="Actions"
    >
      <ContextMenuSubmenu label="Sort by">
        <ContextMenuItem onClick={() => pick("name")}>Name</ContextMenuItem>
      </ContextMenuSubmenu>
    </ContextMenu>
  );
};

const getTrigger = () => screen.getByRole("menuitem", { name: "Sort by" });
const querySubmenu = () => screen.queryByRole("menu", { name: "Sort by" });

describe("ContextMenuSubmenu", () => {
  it("renders a closed parent row with a chevron and popup semantics", () => {
    render(<Menu />);

    const trigger = getTrigger();
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      trigger.querySelector(".sito-ui-context-menu__submenu-indicator svg"),
    ).toBeInTheDocument();
    expect(querySubmenu()).not.toBeInTheDocument();
  });

  it("opens on hover and closes after the grace delay", () => {
    vi.useFakeTimers();
    render(<Menu />);
    const trigger = getTrigger();

    fireEvent.pointerEnter(trigger);
    const submenu = screen.getByRole("menu", { name: "Sort by" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(submenu).toHaveAttribute("aria-orientation", "vertical");
    expect(submenu.matches(CONTEXT_MENU_SUBMENU_SELECTOR)).toBe(true);
    expect(submenu.parentElement).toBe(document.body);

    // Pointer travels from the row onto the flyout within the delay.
    fireEvent.pointerLeave(trigger);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.pointerEnter(submenu);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(querySubmenu()).toBeInTheDocument();

    fireEvent.pointerLeave(submenu);
    act(() => {
      vi.advanceTimersByTime(139);
    });
    expect(querySubmenu()).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(querySubmenu()).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens with ArrowRight, navigates, and closes back with ArrowLeft or Escape", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<Menu onClose={handleClose} />);
    const trigger = getTrigger();

    await user.keyboard("{ArrowDown}");
    expect(trigger).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    const name = screen.getByRole("menuitemcheckbox", { name: "Name" });
    const date = screen.getByRole("menuitemcheckbox", { name: "Date" });
    expect(name).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(date).toHaveFocus();
    // Wraps within the flyout and skips the disabled row.
    await user.keyboard("{ArrowDown}");
    expect(name).toHaveFocus();
    await user.keyboard("{End}");
    expect(date).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(querySubmenu()).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Name" }),
    ).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(querySubmenu()).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(handleClose).not.toHaveBeenCalled();

    // Escape on the parent row still closes the whole menu.
    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("opens and focuses the first sub-item with Enter", async () => {
    const user = userEvent.setup();
    render(<Menu />);

    await user.keyboard("{ArrowDown}{Enter}");

    expect(
      screen.getByRole("menuitemcheckbox", { name: "Name" }),
    ).toHaveFocus();
  });

  it("closes when focus moves to a sibling row", async () => {
    const user = userEvent.setup();
    render(<Menu />);

    fireEvent.pointerEnter(getTrigger());
    expect(querySubmenu()).toBeInTheDocument();

    getTrigger().focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Refresh" })).toHaveFocus();
    await vi.waitFor(() => expect(querySubmenu()).not.toBeInTheDocument());
  });

  it("treats a press inside the flyout as inside the menu", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const handlePick = vi.fn();
    render(<Menu onClose={handleClose} onPick={handlePick} />);

    await user.hover(getTrigger());
    await user.click(screen.getByRole("menuitemcheckbox", { name: "Date" }));

    expect(handlePick).toHaveBeenCalledWith("date");
    expect(handleClose).not.toHaveBeenCalled();
    // The picked row closes the flyout and focus returns to its parent row.
    expect(querySubmenu()).not.toBeInTheDocument();
    expect(getTrigger()).toHaveFocus();
  });

  it("closes the flyout on a press outside it while the menu stays open", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Outside</button>
        <Menu closeOnPointerDownOutside={false} />
      </>,
    );

    await user.hover(getTrigger());
    expect(querySubmenu()).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(querySubmenu()).not.toBeInTheDocument();
    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
  });

  it("closes with the whole menu when a sub-item closes it", async () => {
    const user = userEvent.setup();
    const handlePick = vi.fn();
    render(<ClosingMenu onPick={handlePick} />);

    await user.hover(getTrigger());
    await user.click(screen.getByRole("menuitem", { name: "Name" }));

    expect(handlePick).toHaveBeenCalledWith("name");
    expect(querySubmenu()).not.toBeInTheDocument();
    await vi.waitFor(() =>
      expect(
        screen.queryByRole("menu", { name: "Actions" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("supports nested submenus", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const handlePick = vi.fn();
    render(
      <ContextMenu
        open
        position={position}
        onClose={handleClose}
        ariaLabel="Actions"
      >
        <ContextMenuSubmenu label="Share">
          <ContextMenuSubmenu label="Export as">
            <ContextMenuItem onClick={() => handlePick("pdf")}>
              PDF
            </ContextMenuItem>
          </ContextMenuSubmenu>
        </ContextMenuSubmenu>
      </ContextMenu>,
    );

    await user.keyboard("{ArrowRight}{ArrowRight}");
    const pdf = screen.getByRole("menuitem", { name: "PDF" });
    expect(pdf).toHaveFocus();

    await user.click(pdf);
    expect(handlePick).toHaveBeenCalledWith("pdf");
    expect(handleClose).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("menu", { name: "Share" }),
    ).not.toBeInTheDocument();
  });

  it("flips the flyout to the left and clamps it to the viewport", () => {
    render(<Menu />);
    const trigger = getTrigger();
    vi.spyOn(trigger, "getBoundingClientRect").mockReturnValue({
      left: window.innerWidth - 150,
      right: window.innerWidth - 10,
      top: window.innerHeight - 20,
      bottom: window.innerHeight,
      width: 140,
      height: 20,
      x: window.innerWidth - 150,
      y: window.innerHeight - 20,
      toJSON: () => ({}),
    });
    const offsetWidth = vi
      .spyOn(HTMLElement.prototype, "offsetWidth", "get")
      .mockReturnValue(120);
    const offsetHeight = vi
      .spyOn(HTMLElement.prototype, "offsetHeight", "get")
      .mockReturnValue(100);

    fireEvent.pointerEnter(trigger);
    const submenu = screen.getByRole("menu", { name: "Sort by" });

    expect(submenu.style.left).toBe(`${window.innerWidth - 150 - 120 - 2}px`);
    expect(submenu.style.top).toBe(`${window.innerHeight - 100 - 8}px`);

    offsetWidth.mockRestore();
    offsetHeight.mockRestore();
  });

  it("does not open while disabled", () => {
    render(
      <ContextMenu open position={position} onClose={vi.fn()} ariaLabel="A">
        <ContextMenuSubmenu label="Sort by" disabled>
          <ContextMenuItem>Name</ContextMenuItem>
        </ContextMenuSubmenu>
      </ContextMenu>,
    );

    fireEvent.pointerEnter(getTrigger());
    expect(querySubmenu()).not.toBeInTheDocument();
  });
});
