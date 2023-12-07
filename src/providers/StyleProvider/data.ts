import { ColorPalette, UiTheme } from "./types";

export const defaultDark: ColorPalette = {
  basics: {
    text: "#f7f7f7",
    dark: "#101010",
    default: "#303030",
    light: "#4e4e4e",
  },
  primary: {
    text: "#ededed",
    light: "#F74037", // 500
    default: "#E83636", // 600
    dark: "#D62C30", // 700
  },
  secondary: {
    text: "#f7f7f7",
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
  basics: {
    text: "#101010",
    dark: "#e1e1e1",
    default: "#ededed",
    light: "#f7f7f7",
  },
  primary: {
    text: "#ededed",
    light: "#F74037", // 500
    default: "#E83636", // 600
    dark: "#D62C30", // 700
  },
  secondary: {
    text: "#f7f7f7",
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
