import { HTMLProps } from "react";

// style types
import { ColorVariants } from "providers/StyleProvider/types";

export type ButtonShapes = "filled" | "outlined" | "text";

export interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, "size"> {
  color?: ColorVariants | undefined;
  shape?: ButtonShapes | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}
