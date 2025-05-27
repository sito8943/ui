import { ReactNode } from "react";

// types
import { ButtonProps } from "components/Button/";

export interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
  size: "small" | "normal" | "large";
}
