// @emotion/css
import { CSSInterpolation, injectGlobal } from "@emotion/css";

// css
import "../../index.css";

// animations
import "../../assets/animations/appear.css";
import "../../assets/animations/grow.css";
import "../../assets/animations/shake.css";

// components
import "../../assets/styles/button.css";
import "../../assets/styles/icon-button.css";
import "../../assets/styles/image.css";
import "../../assets/styles/input.css";
// complex components
import "../../assets/styles/loading.css";
import "../../assets/styles/notification.css";
import "../../assets/styles/switch.css";
import "../../assets/styles/splash-screen.css";

// providers
import { useMode } from "providers/ModeProvider/ModeProvider";

import { createContext, useContext, useEffect, useMemo } from "react";

// types
import { ColorVariants, StyleProviderData, StyleProviderProps } from "./types";

// default values
import { defaultTheme } from "./data";

const StyleContext = createContext({} as StyleProviderData);

const getSelector = (key: string, colorKey: string, extra: string = "") =>
  `${key === "light" ? "" : `.${key}`} ${extra}${
    extra.length && colorKey.length ? "." : ""
  }${colorKey}`;

const StyleProvider = (props: StyleProviderProps) => {
  const { mode } = useMode();
  const { children, theme } = props;

  const colors = useMemo(() => {
    if (theme) return theme[mode] || defaultTheme[mode] || defaultTheme.dark;
    else return defaultTheme[mode] || defaultTheme.light;
  }, [mode]);

  useEffect(() => {
    const preStyles: CSSInterpolation = {};
    const renderedTheme = { ...defaultTheme, ...theme };
    for (const key of Object.keys(renderedTheme)) {
      // basic background and text
      preStyles[getSelector(key, "body")] = {
        backgroundColor: renderedTheme[key].basics.dark,
        color: renderedTheme[key].basics.text,
      };
      // colors classes
      for (const colorKey of Object.keys(renderedTheme[key])) {
        const parsedColorKey: ColorVariants = colorKey as ColorVariants;
        // color class
        preStyles[getSelector(key, colorKey)] = {
          color: renderedTheme[key][parsedColorKey].default,
        };
        // color button class
        // text hover styles
        const hoverStyles = {
          color: renderedTheme[key][parsedColorKey].light,
          backgroundColor: `${renderedTheme[key][parsedColorKey].light}2f`,
        };
        // text hover classes
        preStyles[getSelector(key, colorKey, ".button:hover")] = hoverStyles;
        preStyles[getSelector(key, colorKey, "button:hover")] = hoverStyles;
        // filled styles
        const filledStyles = {
          color: renderedTheme[key][parsedColorKey].text,
          backgroundColor: renderedTheme[key][parsedColorKey].default,
        };
        // filled class
        preStyles[getSelector(key, colorKey, ".filled")] = filledStyles;
        // filled hover styles
        const filledHoverStyles = {
          color: renderedTheme[key][parsedColorKey].text,
          backgroundColor: renderedTheme[key][parsedColorKey].light,
        };
        // filled hover classes
        preStyles[getSelector(key, colorKey, ".button.filled:hover")] =
          filledHoverStyles;
        preStyles[getSelector(key, colorKey, "button.filled:hover")] =
          filledHoverStyles;
        // outlined styles
        const outlinedStyles = {
          color: renderedTheme[key][parsedColorKey].default,
          borderColor: renderedTheme[key][parsedColorKey].default,
        };
        // outlined class
        preStyles[getSelector(key, colorKey, ".outlined")] = outlinedStyles;
        // outlined hover styles
        const outlinedHoverStyles = {
          color: renderedTheme[key][parsedColorKey].text,
          borderColor: renderedTheme[key][parsedColorKey].light,
          backgroundColor: renderedTheme[key][parsedColorKey].light,
        };
        // outlined hover classes
        preStyles[getSelector(key, colorKey, ".button.outlined:hover")] =
          outlinedHoverStyles;
        preStyles[getSelector(key, colorKey, "button.outlined:hover")] =
          outlinedHoverStyles;
      }
    }
    console.log(preStyles);
    injectGlobal({ ...preStyles });
  }, []);

  return (
    <StyleContext.Provider value={{ colors }}>{children}</StyleContext.Provider>
  );
};

// hooks
// eslint-disable-next-line react-refresh/only-export-components
const useStyle = (): StyleProviderData => {
  const context = useContext(StyleContext);
  if (!context) throw new Error("modeContext must be used within a Provider");
  return context;
};

export { StyleProvider, useStyle };
