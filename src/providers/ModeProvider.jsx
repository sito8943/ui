import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const ModeContext = createContext();

const ModeProvider = ({ children }) => {
  function setModeState(value) {
    setMode(value);
  }

  const [modeState, setMode] = useState(localStorage.theme ?? "dark");

  const toggleModeState = useCallback(() => {
    setMode(modeState === "dark" ? "light" : "dark");
  }, [modeState]);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (modeState === "dark") {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
    if (modeState === "OS")
      // Whenever the user explicitly chooses to respect the OS preference
      localStorage.removeItem("theme");
  }, [modeState]);

  const value = { modeState, setModeState, toggleModeState };
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

ModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined)
    throw new Error("modeContext must be used within a Provider");
  return context;
};

export { ModeProvider, useMode };
