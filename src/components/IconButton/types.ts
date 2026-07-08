import type { ReactNode } from "react";

// types
import type { ButtonProps } from "components/Button/";

export interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
}
