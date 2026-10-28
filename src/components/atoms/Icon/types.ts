import type { HTMLAttributes, ReactNode } from "react";

export interface IconProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "aria-hidden" | "aria-label" | "children" | "role"
> {
  /** The glyph to render: an SVG, an icon-font element, text, etc. */
  icon: ReactNode;
  /**
   * Identity of the glyph. When set, only a change of `iconKey` plays the
   * swap; otherwise the glyph is compared by element type and props.
   */
  iconKey?: string | number | undefined;
  /** Accessible name. Without it the icon is decorative (`aria-hidden`). */
  label?: string | undefined;
}
