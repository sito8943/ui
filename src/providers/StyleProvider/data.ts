import { ColorType, UiTheme } from "./types";

export const defaultDark: ColorType = {
  text: "#f7f7f7",
  dark: "#101010",
  default: "#202020",
  light: "#303030",
};

export const defaultLight: ColorType = {
  text: "#101010",
  dark: "#e1e1e1",
  default: "#ededed",
  light: "#f7f7f7",
};

const commonColors = {
  primary: {
    text: "#ededed",
    light: "#d74d54", // 500
    default: "#CD212A", // 600
    dark: "#8f171d", // 700
  },
  secondary: {
    text: "#f7f7f7",
    light: "#364b67", // 600
    default: "#041E42", // 700
    dark: "#02152e", // 800
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

const createColorPalette = (basics: ColorType, commons: any) => ({
  basics,
  ...commons,
});

export const defaultTheme: UiTheme = {
  dark: createColorPalette(defaultDark, commonColors),
  light: createColorPalette(defaultLight, commonColors),
};
