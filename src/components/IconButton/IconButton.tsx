// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// components
import Button, { ButtonProps } from "../Button/Button";

// styles
import "./styles.css";
import { Ref, useRef } from "react";

interface IconButtonProps extends ButtonProps {
  icon: IconProp;
}

function IconButton(props: IconButtonProps) {
  const { icon, ...rest } = props;

  const ref = useRef(rest.ref);
  return (
    <Button
      {...rest}
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={`hover:bg-pdark-hover icon-button ${rest.className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}

export default IconButton;
