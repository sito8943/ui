import { forwardRef, ForwardedRef } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { Button } from "components/Button/";

// types
import { IconButtonProps } from "./types";

const IconButton = forwardRef(function (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { icon, ...rest } = props;

  return (
    <Button
      {...rest}
      ref={ref}
      type="button"
      className={`icon-button ${rest.className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
});

export default IconButton;
