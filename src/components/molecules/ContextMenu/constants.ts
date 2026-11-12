export const CONTEXT_MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled])';

export const CONTEXT_MENU_VIEWPORT_PADDING = 8;

/** Fallback exit duration when `--sito-ui-motion-duration-normal` is unset. */
export const CONTEXT_MENU_EXIT_DURATION_MS = 300;

export const CONTEXT_MENU_ITEM_COLORS = {
  DEFAULT: "default",
  ERROR: "error",
} as const;

/** Fallback for `--sito-ui-context-menu-submenu-close-delay`. */
export const CONTEXT_MENU_SUBMENU_CLOSE_DELAY_MS = 140;

/** Horizontal gap (px) between a submenu row and its flyout. */
export const CONTEXT_MENU_SUBMENU_GAP = 2;

/** Upward shift (px) so the flyout's first row lines up with its parent row. */
export const CONTEXT_MENU_SUBMENU_ALIGN_OFFSET = 4;

/** Matches submenu flyouts, for consumers that own outside-press dismissal. */
export const CONTEXT_MENU_SUBMENU_SELECTOR =
  '[data-sito-ui="context-menu-submenu"]';
