import type { ReactNode } from "react";

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

export type IconButtonProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "size"
> &
  IconButtonAccessibleLabelProps & {
    icon: ReactNode;
    iconClassName?: string;
    iconSize?: number | string;
    size?: IconButtonSize;
  };
