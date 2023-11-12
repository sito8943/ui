import "../index.css";

// animations
import "../assets/animations/appear.css";
import "../assets/animations/grow.css";
import "../assets/animations/shake.css";

// components
import "../assets/styles/button.css";
import "../assets/styles/icon-button.css";
import "../assets/styles/image.css";
import "../assets/styles/input.css";
// complex components
import "../assets/styles/loading.css";
import "../assets/styles/notification.css";
import "../assets/styles/switch.css";
import "../assets/styles/totop.css";

import { createContext, useContext, ReactNode } from "react";

export interface StyleProviderProps {
  children: ReactNode;
}

const StyleContext = createContext({});

export const StyleProvider = (props: StyleProviderProps) => {
  const { children } = props;

  return <StyleContext.Provider value={{}}>{children}</StyleContext.Provider>;
};

// hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useStyle = (): {} => {
  const context = useContext(StyleContext);
  if (!context) throw new Error("modeContext must be used within a Provider");
  return context;
};
