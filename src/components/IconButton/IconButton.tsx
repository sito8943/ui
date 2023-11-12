import { forwardRef, ForwardedRef } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// components
import Button, { ButtonProps } from "../Button/Button";

export interface IconButtonProps extends ButtonProps {
  icon: IconProp;
}

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
