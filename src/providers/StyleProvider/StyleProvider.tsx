// @emotion/css
import { injectGlobal } from "@emotion/css";

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

// theme
import * as theme from "../../assets/styles/theme";

import { createContext, useContext, useEffect, useMemo } from "react";

// types
import { StyleProviderData, StyleProviderProps } from "./types";

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
    injectGlobal({
      background: colors.basics.dark,
      color: colors.basics.text,
    });
  }, [colors]);

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

export { StyleProvider, useStyle, theme };
