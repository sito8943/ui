import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import type { CONTEXT_MENU_ITEM_COLORS } from "./constants";

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export type ContextMenuProps = {
  open: boolean;
  position: ContextMenuPosition;
  onClose: () => void;
  ariaLabel: string;
  children?: ReactNode;
  className?: string;
  portalContainer?: Element | DocumentFragment | null;
  viewportPadding?: number;
  closeOnEscape?: boolean;
  closeOnTab?: boolean;
  closeOnPointerDownOutside?: boolean;
  clampToViewport?: boolean;
};

export type ContextMenuItemColor =
  (typeof CONTEXT_MENU_ITEM_COLORS)[keyof typeof CONTEXT_MENU_ITEM_COLORS];

export interface ContextMenuItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "color"
> {
  leading?: ReactNode;
  shortcut?: ReactNode;
  /**
   * Toggle state. When set (even `false`) the item becomes a
   * `menuitemcheckbox` with `aria-checked`; `true` shows a trailing check.
   */
  checked?: boolean;
  /** `"error"` marks a destructive action. Defaults to `"default"`. */
  color?: ContextMenuItemColor;
}

export type ContextMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;
