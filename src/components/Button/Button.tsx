import { type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
// types
import {
  BUTTON_COLOR_VARIANTS,
  BUTTON_VARIANTS,
  type ButtonProps,
} from "./types";

const Button = forwardRef(function (
  props: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>,
) {
  const {
    color = BUTTON_COLOR_VARIANTS.DEFAULT,
    type = "button",
    variant = BUTTON_VARIANTS.TEXT,
    className,
    children,
    ...rest
  } = props;

  const buttonClassName = classNames(
    "sito-ui-button",
    `sito-ui-button--${variant}`,
    `sito-ui-button--${color}`,
    className,
  );

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
