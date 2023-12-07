import { HTMLProps } from "react";

export interface ImageProps extends HTMLProps<HTMLImageElement> {
  container: HTMLProps<HTMLDivElement>;
}
