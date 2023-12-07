import { ReactNode } from "react";

export interface UiTheme {
  [key: string]: ColorPalette;
}

export interface ColorPalette {
  basics: { text: string; default: string; dark: string; light: string };
  primary: { text: string; default: string; dark: string; light: string };
  secondary: { text: string; default: string; dark: string; light: string };
  error: string;
  warning: string;
  success: string;
  info: string;
}

export type ColorVariants = "primary" | "secondary" | "basics";

export interface StyleProviderProps {
  children: ReactNode;
  theme?: UiTheme;
}

export interface StyleProviderData {
  colors: ColorPalette;
}
