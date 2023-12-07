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

  if (!tooltip || !tooltip.length)
    return (
      <button
        type={type}
        ref={ref}
        {...rest}
        className={`button ${shape} ${styles} ${rest.className}`}
      >
        {rest.children}
      </button>
    );

  return (
    <Tippy content={tooltip}>
      <button
        type={type}
        ref={ref}
        {...rest}
        className={`button ${shape} ${styles} ${rest.className}`}
      >
        {rest.children}
      </button>
    </Tippy>
  );
});

export default Button;
