import { forwardRef, ForwardedRef, HTMLProps } from "react";
import Tippy from "@tippyjs/react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  tooltip?: string | undefined;
  color?: "primary" | "secondary" | "inherit" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = forwardRef(function (
  props: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { tooltip, color = "primary", type = "button", ...rest } = props;

  if (!tooltip || !tooltip.length)
    return (
      <button
        type={type}
        ref={ref}
        {...rest}
        className={`button ${color} ${rest.className}`}
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
        className={`button ${color} ${rest.className}`}
      >
        {rest.children}
      </button>
    </Tippy>
  );
});

export default Button;
