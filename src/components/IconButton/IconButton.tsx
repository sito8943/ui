import { type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
import { Button } from "../Button";
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
    loading = false,
    className,
    ...rest
  } = props;
  const iconButtonClassName = classNames("sito-ui-icon-button", className);

  return (
    <Button
      {...rest}
      ref={ref}
      type={type}
      variant={variant}
      color={color}
      loading={loading}
      data-sito-ui="icon-button"
      className={iconButtonClassName}
    >
      {loading ? null : (
        <span className={iconClassName} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
});

export default IconButton;
