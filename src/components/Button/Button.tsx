import { forwardRef, ForwardedRef } from "react";

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
  const { color = "primary", type = "button", shape = "text", ...rest } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color, shape);

  return (
    <button
      type={type}
      ref={ref}
      {...rest}
      className={`button ${shape} ${styles.root} ${rest.className}`}
    >
      {rest.children}
    </button>
  );
});

export default Button;
