import { type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
// types
import type { IconButtonProps } from "./types";

const IconButton = forwardRef(function (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    children,
    icon,
    iconClassName,
    type = "button",
    variant = "text",
    color = "default",
    className,
    ...rest
  } = props;
  const iconButtonClassName = classNames(
    "sito-ui-icon-button",
    `sito-ui-icon-button--${variant}`,
    `sito-ui-icon-button--${color}`,
    className,
  );

  return (
    <button
      data-sito-ui="icon-button"
      {...rest}
      ref={ref}
      type={type}
      className={iconButtonClassName}
    >
      <span className={iconClassName} aria-hidden="true">
        {icon}
      </span>
      {children}
    </button>
  );
});

export default IconButton;
