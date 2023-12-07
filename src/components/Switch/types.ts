import { InputHTMLAttributes } from "react";

// styles
import { ColorVariants } from "providers/StyleProvider";

export interface SwitcherProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: boolean | undefined;
  activeColor?: ColorVariants | undefined;
  inactiveColor?: ColorVariants | undefined;
  label: string | undefined;
}
