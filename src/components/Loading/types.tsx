import { HTMLProps } from "react";

export interface LoadingProps extends HTMLProps<HTMLDivElement> {
  color?: "primary" | "secondary" | "basics" | undefined;
  colorInverted?: boolean | undefined;
  loaderClass?: "string" | undefined;
  strokeWidth?: "string" | undefined;
}
