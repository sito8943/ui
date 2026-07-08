import { forwardRef, type ForwardedRef } from "react";

// components
import { Button } from "components/Button/";

// types
import type { IconButtonProps } from "./types";

const IconButton = forwardRef(function (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { icon, className, ...rest } = props;
  const iconButtonClassName = ["sito-ui-icon-button", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      {...rest}
      ref={ref}
      type="button"
      data-sito-ui="icon-button"
      className={iconButtonClassName}
    >
      {icon}
    </Button>
  );
});

export default IconButton;
