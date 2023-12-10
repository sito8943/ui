import { HTMLProps } from "react";

// types
import { ColorVariants } from "providers/StyleProvider/types";

export interface LoadingProps extends HTMLProps<HTMLDivElement> {
  color?: ColorVariants | undefined;
  colorInverted?: boolean | undefined;
  loaderClass?: string | undefined;
  strokeWidth?: string | undefined;
}
