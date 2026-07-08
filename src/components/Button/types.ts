import type { ButtonHTMLAttributes } from "react";

export const BUTTON_COLOR_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  BASICS: "basics",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
  INFO: "info",
} as const;

export const BUTTON_SHAPES = {
  FILLED: "filled",
  OUTLINED: "outlined",
  TEXT: "text",
} as const;

type ButtonColorVariant =
  (typeof BUTTON_COLOR_VARIANTS)[keyof typeof BUTTON_COLOR_VARIANTS];

type ButtonShape = (typeof BUTTON_SHAPES)[keyof typeof BUTTON_SHAPES];

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "type"> {
  color?: ButtonColorVariant | undefined;
  shape?: ButtonShape | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}
