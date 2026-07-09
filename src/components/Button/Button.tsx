import { type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
// types
import {
  BUTTON_COLOR_VARIANTS,
  BUTTON_VARIANTS,
  type ButtonProps,
} from "./types";

const Button = forwardRef(function (
  props: ButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>,
) {
  const {
    color = BUTTON_COLOR_VARIANTS.DEFAULT,
    type = "button",
    variant = BUTTON_VARIANTS.TEXT,
    loading = false,
    loadingIndicator,
    loadingLabel = "Loading",
    disabled,
    className,
    children,
    ...rest
  } = props;

  const buttonClassName = classNames(
    "sito-ui-button",
    `sito-ui-button--${variant}`,
    `sito-ui-button--${color}`,
    loading && "sito-ui-button--loading",
    className,
  );

  const renderedLoadingIndicator =
    loadingIndicator === undefined ? (
      <span
        className="sito-ui-button__spinner"
        aria-hidden="true"
        data-sito-ui="button-spinner"
      />
    ) : (
      loadingIndicator
    );

  return (
    <button
      data-sito-ui="button"
      {...rest}
      type={type}
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || rest["aria-busy"]}
      className={buttonClassName}
    >
      {loading ? (
        <>
          {renderedLoadingIndicator}
          <span className="sito-ui-button__loading-label">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </button>
  );
});

export default Button;
