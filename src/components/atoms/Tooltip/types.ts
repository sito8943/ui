import type { ReactElement } from "react";

export type TooltipSide = "top" | "bottom";
export type TooltipAlign = "start" | "center" | "end";

export type TooltipProps = {
  label: string;
  /** Keyboard shortcut shown after the label, e.g. `"Esc"` or `"⌘K"`. */
  hotkey?: string | undefined;
  side?: TooltipSide | undefined;
  align?: TooltipAlign | undefined;
  children: ReactElement;
  className?: string | undefined;
};
