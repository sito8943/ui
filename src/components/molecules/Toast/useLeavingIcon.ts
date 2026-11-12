import { type ReactNode, type RefObject, useEffect, useState } from "react";

import { getCssDurationMs, prefersReducedMotion } from "@/utils";
import { DEFAULT_TOAST_ICON_EXIT_DURATION_MS } from "./constants";

/**
 * Keeps the last icon on screen while it animates out after `icon` is removed
 * (e.g. a spinner when "Saving…" becomes "Saved").
 * @param icon Current icon.
 * @param toastRef Toast element, read for `--sito-ui-toast-icon-exit-duration`.
 * @returns The icon to render and whether it is leaving.
 */
export const useLeavingIcon = (
  icon: ReactNode,
  toastRef: RefObject<HTMLElement | null>,
) => {
  const [lastIcon, setLastIcon] = useState<ReactNode>(icon);

  // Remember the newest icon during render so it can stay while leaving.
  if (icon && icon !== lastIcon) setLastIcon(icon);

  const leaving = !icon && Boolean(lastIcon);

  useEffect(() => {
    if (!leaving) return;

    const exitDuration =
      prefersReducedMotion() || !toastRef.current
        ? 0
        : getCssDurationMs(
            toastRef.current,
            "--sito-ui-toast-icon-exit-duration",
            DEFAULT_TOAST_ICON_EXIT_DURATION_MS,
          );
    const timeout = window.setTimeout(() => setLastIcon(null), exitDuration);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [leaving, toastRef]);

  return { icon: icon || lastIcon, leaving };
};
