import type { ButtonHTMLAttributes, ReactNode } from "react";

export const BUTTON_COLOR_VARIANTS = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
  INFO: "info",
} as const;

export const BUTTON_VARIANTS = {
  TEXT: "text",
  SUBMIT: "submit",
  OUTLINED: "outlined",
} as const;

export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type ButtonColor =
  (typeof BUTTON_COLOR_VARIANTS)[keyof typeof BUTTON_COLOR_VARIANTS];

export type ButtonSize =
  (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonBaseProps = {
  color?: ButtonColor | undefined;
  size?: ButtonSize | undefined;
  variant?: ButtonVariant | undefined;
  loading?: boolean | undefined;
  loadingIndicator?: ReactNode;
  loadingLabel?: string | undefined;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "type">,
    ButtonBaseProps {
  type?: "button" | "submit" | "reset" | undefined;
}
