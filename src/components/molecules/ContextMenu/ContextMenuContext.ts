import { createContext } from "react";

import { CONTEXT_MENU_VIEWPORT_PADDING } from "./constants";
import type { ContextMenuContextValue } from "./types";

const noop = () => undefined;

/**
 * Component-local context: lets `ContextMenuSubmenu` follow its menu's
 * lifecycle and register its portaled flyout for outside-press checks.
 */
export const ContextMenuContext = createContext<ContextMenuContextValue>({
  isInteractive: true,
  portalContainer: undefined,
  viewportPadding: CONTEXT_MENU_VIEWPORT_PADDING,
  registerFlyout: () => noop,
});
