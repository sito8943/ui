import { ReactNode } from "react";

export interface ModeProviderData {
  mode: "dark" | "light" | "OS";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light" | "OS">>;
  toggleMode: () => void;
}

export interface ModeProviderProps {
  children: ReactNode;
}
