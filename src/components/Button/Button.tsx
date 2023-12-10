import { forwardRef, ForwardedRef } from "react";
import Tippy from "@tippyjs/react";

// providers
import { useStyle } from "providers/StyleProvider/";

// types
import { ButtonProps } from "./types";

// styles
import { makeStyles } from "./styles";

const Button = forwardRef(function (
  props: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    tooltip,
    color = "primary",
    type = "button",
    shape = "text",
    ...rest
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color, shape);

  return (
    <Tippy
      content={tooltip}
      className={!tooltip || !tooltip.length ? "!hidden" : ""}
    >
      <button
        type={type}
        ref={ref}
        {...rest}
        className={`button ${shape} ${styles.root} ${rest.className}`}
      >
        {rest.children}
      </button>
    </Tippy>
  );
});

export default Button;
