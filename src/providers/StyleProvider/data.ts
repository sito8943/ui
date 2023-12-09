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
  error: {
    text: "#f7f7f7",
    light: "#d63333",
    default: "#CC0000",
    dark: "#8e0000",
  },
  warning: {
    text: "#101010",
    light: "#e2bf33",
    default: "#DBAF00",
    dark: "#997a00",
  },
  success: {
    text: "#f7f7f7",
    light: "#559b33",
    default: "#007733",
    dark: "#1e5b00",
  },
  info: {
    text: "#f7f7f7",
    light: "#3397b9",
    default: "#007EA8",
    dark: "#005875",
  },
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
  error: {
    text: "#f7f7f7",
    light: "#d63333",
    default: "#CC0000",
    dark: "#8e0000",
  },
  warning: {
    text: "#101010",
    light: "#e2bf33",
    default: "#DBAF00",
    dark: "#997a00",
  },
  success: {
    text: "#f7f7f7",
    light: "#559b33",
    default: "#007733",
    dark: "#1e5b00",
  },
  info: {
    text: "#f7f7f7",
    light: "#3397b9",
    default: "#007EA8",
    dark: "#005875",
  },
};

export const defaultTheme: UiTheme = {
  dark: defaultDark,
  light: defaultLight,
};
