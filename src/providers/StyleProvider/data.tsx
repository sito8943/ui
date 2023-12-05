import { ColorPalette, UiTheme } from "./types";

export const defaultDark: ColorPalette = {
  background: { default: "#101010", alter: "#303030", extra: "#4e4e4e" },
  text: { default: "#f7f7f7", alter: "#ededed", extra: "#e1e1e1" },
  primary: {
    light: "#F74037", // 500
    default: "#E83636", // 600
    dark: "#D62C30", // 700
  },
  secondary: {
    light: "#008CFF", // 600
    default: "#0079F2", // 700
    dark: "#0C67E0", // 800
  },
  error: "#CC0000",
  warning: "#FF8800",
  success: "#007733",
  info: "#0099CC",
};

export const defaultLight: ColorPalette = {
  background: { default: "#f7f7f7", alter: "#ededed", extra: "#e1e1e1" },
  text: { default: "#101010", alter: "#303030", extra: "#4e4e4e" },
  primary: {
    light: "#F74037", // 500
    default: "#E83636", // 600
    dark: "#D62C30", // 700
  },
  secondary: {
    light: "#008CFF", // 600
    default: "#0079F2", // 700
    dark: "#0C67E0", // 800
  },
  error: "#CC0000",
  warning: "#FF8800",
  success: "#007733",
  info: "#0099CC",
};

export const defaultTheme: UiTheme = {
  dark: defaultDark,
  light: defaultLight,
};
