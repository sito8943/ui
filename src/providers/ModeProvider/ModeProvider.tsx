import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// types
import { ModeProviderData, ModeProviderProps } from "./types";

const ModeContext = createContext({} as ModeProviderData);

export const ModeProvider = (props: ModeProviderProps) => {
  const { children } = props;

  const [mode, setMode] = useState<"dark" | "light" | "OS">(
    localStorage.theme ?? "dark"
  );

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode]);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (mode === "dark") {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
    if (mode === "OS")
      // Whenever the user explicitly chooses to respect the OS preference
      localStorage.removeItem("theme");
  }, [mode]);

  const value = { mode, setMode, toggleMode };
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

// hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useMode = (): ModeProviderData => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("modeContext must be used within a Provider");
  return context;
};
