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

// providers
import { useMode } from "providers/ModeProvider/ModeProvider";

import { createContext, useContext, useEffect, useMemo } from "react";

// types
import { ColorVariants, StyleProviderData, StyleProviderProps } from "./types";

// default values
import { defaultTheme } from "./data";

const StyleContext = createContext({} as StyleProviderData);

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
    Object.keys(renderedTheme).forEach((key) => {
      // basic background and text
      preStyles[`${key === "light" ? "" : `.${key}`} body`] = {
        backgroundColor: renderedTheme[key].basics.dark,
        color: renderedTheme[key].basics.text,
      };
      // colors classes
      Object.keys(renderedTheme[key]).forEach((colorKey: string) => {
        const parsedColorKey: ColorVariants = colorKey as ColorVariants;
        // color class
        preStyles[`${key === "light" ? "" : `.${key}`} .${colorKey}`] = {
          color: renderedTheme[key][parsedColorKey].default,
        };
        // color button class
        // text hover
        preStyles[
          `${key === "light" ? "" : `.${key}`} .button.${colorKey}:hover`
        ] = preStyles[
          `${key === "light" ? "" : `.${key}`}  button.${colorKey}:hover`
        ] = {
          color: renderedTheme[key][parsedColorKey].light,
          backgroundColor: `${renderedTheme[key][parsedColorKey].light}2f`,
        };
        // filled
        preStyles[`${key === "light" ? "" : `.${key}`}  .filled.${colorKey}`] =
          {
            color: renderedTheme[key][parsedColorKey].text,
            backgroundColor: renderedTheme[key][parsedColorKey].default,
          };
        // filled hover
        preStyles[
          `${key === "light" ? "" : `.${key}`} .button.filled.${colorKey}:hover`
        ] = preStyles[
          `${key === "light" ? "" : `.${key}`} button.filled.${colorKey}:hover`
        ] = {
          color: renderedTheme[key][parsedColorKey].text,
          backgroundColor: renderedTheme[key][parsedColorKey].light,
        };
        // outlined
        preStyles[`${key === "light" ? "" : `.${key}`} .outlined.${colorKey}`] =
          {
            color: renderedTheme[key][parsedColorKey].default,
            borderColor: renderedTheme[key][parsedColorKey].default,
          };
        // outlined hover
        preStyles[
          `${
            key === "light" ? "" : `.${key}`
          } .button.outlined.${colorKey}:hover`
        ] = preStyles[
          `${
            key === "light" ? "" : `.${key}`
          } button.outlined.${colorKey}:hover`
        ] = {
          color: renderedTheme[key][parsedColorKey].text,
          borderColor: renderedTheme[key][parsedColorKey].light,
          backgroundColor: renderedTheme[key][parsedColorKey].light,
        };
      });
    });
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
