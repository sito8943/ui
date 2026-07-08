import { forwardRef, type ForwardedRef } from "react";

// types
import {
  BUTTON_COLOR_VARIANTS,
  BUTTON_SHAPES,
  type ButtonProps,
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
    "sito-ui-button",
    `sito-ui-button--${shape}`,
    `sito-ui-button--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      data-sito-ui="button"
      {...rest}
      type={type}
      ref={ref}
      className={buttonClassName}
    >
      {children}
    </button>
  );
});

export default Button;
