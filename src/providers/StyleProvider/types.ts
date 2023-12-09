import { ReactNode } from "react";

export interface UiTheme {
  [key: string]: ColorPalette;
}

export interface ColorPalette {
  primary: ColorType;
  secondary: ColorType;
  basics: ColorType;
  error: ColorType;
  warning: ColorType;
  success: ColorType;
  info: ColorType;
}

export type ColorType = {
  text: string;
  light: string;
  default: string;
  dark: string;
};

export type ColorVariants =
  | "primary"
  | "secondary"
  | "basics"
  | "error"
  | "warning"
  | "success"
  | "info";

export interface StyleProviderProps {
  children: ReactNode;
  theme?: UiTheme;
}

export interface StyleProviderData {
  colors: ColorPalette;
}
