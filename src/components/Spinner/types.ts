import type { HTMLAttributes } from "react";

export interface SpinnerProps
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    "aria-hidden" | "aria-label" | "children" | "role"
  > {
  label?: string | undefined;
}
