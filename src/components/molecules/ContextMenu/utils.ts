import type { PointerEvent as ReactPointerEvent } from "react";

import { CONTEXT_MENU_ITEM_SELECTOR } from "./constants";

/**
 * Focuses the hovered menu item so pointer and keyboard share one current row.
 * @param event Pointer event from a menu item button.
 */
export const focusHoveredItem = (
  event: ReactPointerEvent<HTMLButtonElement>,
) => {
  const item = event.currentTarget;
  if (item.disabled || item.ownerDocument.activeElement === item) return;
  item.focus({ preventScroll: true });
};

/**
 * Lists the enabled items of a menu element, without nested flyouts (they are
 * portaled outside it).
 * @param menu Menu element.
 * @returns Enabled `menuitem` / `menuitemcheckbox` elements in DOM order.
 */
export const getMenuItems = (menu: HTMLElement | null) =>
  Array.from(
    menu?.querySelectorAll<HTMLElement>(CONTEXT_MENU_ITEM_SELECTOR) ?? [],
  );

/**
 * Resolves the item a navigation key moves focus to.
 * @param key Keyboard key.
 * @param items Enabled menu items.
 * @param activeElement Currently focused element.
 * @returns The next item, or `null` when the key does not navigate.
 */
export const getNavigationTarget = (
  key: string,
  items: HTMLElement[],
  activeElement: Element | null,
) => {
  if (items.length === 0) return null;

  const currentIndex =
    activeElement instanceof HTMLElement ? items.indexOf(activeElement) : -1;

  switch (key) {
    case "ArrowDown":
      return items[(currentIndex + 1 + items.length) % items.length] ?? null;
    case "ArrowUp":
      return items[(currentIndex - 1 + items.length) % items.length] ?? null;
    case "Home":
      return items[0] ?? null;
    case "End":
      return items[items.length - 1] ?? null;
    default:
      return null;
  }
};
