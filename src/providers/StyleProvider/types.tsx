import { ReactNode } from "react";

export interface UiTheme {
  [key: string]: ColorPalette;
}

export interface ColorPalette {
  background?: { default: string; alter: string; extra: string };
  text?: { default: string; alter: string; extra: string };
  primary?: { default: string; dark: string; light: string };
  secondary?: { default: string; dark: string; light: string };
  error?: string;
  warning?: string;
  success?: string;
  info?: string;
}

export interface StyleProviderProps {
  children: ReactNode;
  theme: UiTheme;
}

export interface StyleProviderData {
  colors: ColorPalette;
}
