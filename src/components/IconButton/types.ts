import type { ReactNode } from "react";

// types
import type { ButtonProps } from "../Button";

type IconButtonAccessibleLabelProps =
  | {
      "aria-label": string;
      children?: ReactNode;
    }
  | {
      "aria-label"?: string;
      children: ReactNode;
    };

export type IconButtonProps = Omit<ButtonProps, "aria-label" | "children"> &
  IconButtonAccessibleLabelProps & {
    icon: ReactNode;
    iconClassName?: string;
  };
