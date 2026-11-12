export const CONTEXT_MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled])';

export const CONTEXT_MENU_VIEWPORT_PADDING = 8;

/** Fallback exit duration when `--sito-ui-motion-duration-normal` is unset. */
export const CONTEXT_MENU_EXIT_DURATION_MS = 300;

export const CONTEXT_MENU_ITEM_COLORS = {
  DEFAULT: "default",
  ERROR: "error",
} as const;
