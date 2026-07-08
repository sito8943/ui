import { forwardRef, ForwardedRef } from "react";

// types
import {
  BUTTON_COLOR_VARIANTS,
  BUTTON_SHAPES,
  ButtonProps,
} from "./types";

const Button = forwardRef(function (
  props: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    color = BUTTON_COLOR_VARIANTS.PRIMARY,
    type = "button",
    shape = BUTTON_SHAPES.TEXT,
    className,
    children,
    ...rest
  } = props;

  const buttonClassName = [
    "button",
    shape,
    `button--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} ref={ref} {...rest} className={buttonClassName}>
      {children}
    </button>
  );
});

export default Button;
