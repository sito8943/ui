import type { ElementType, ReactNode } from "react";

// types
import type { ButtonProps } from "../Button";

export const ICON_BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type IconButtonSize =
  (typeof ICON_BUTTON_SIZES)[keyof typeof ICON_BUTTON_SIZES];

type IconButtonAccessibleLabelProps =
  | {
      "aria-label": string;
      children?: ReactNode;
    }
  | {
      "aria-label"?: string;
      children: ReactNode;
    };

export type IconButtonOwnProps = {
  icon: ReactNode;
  iconClassName?: string;
  iconSize?: number | string;
  size?: IconButtonSize;
};

/**
 * `IconButton` props for the rendered element `E` (`<button>` by default; see
 * `ButtonProps` for `as`).
 */
export type IconButtonProps<E extends ElementType = "button"> = Omit<
  ButtonProps<E>,
  "aria-label" | "children" | "size"
> &
  IconButtonAccessibleLabelProps &
  IconButtonOwnProps;
