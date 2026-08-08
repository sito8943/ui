import { type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
import type { SpinnerProps } from "./types";

const Spinner = forwardRef(function (
  props: SpinnerProps,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const { className, label, ...rest } = props;
  const isAccessible = label !== undefined;

  return (
    <span
      data-sito-ui="spinner"
      {...rest}
      ref={ref}
      aria-hidden={isAccessible ? undefined : true}
      aria-label={label}
      role={isAccessible ? "status" : undefined}
      className={classNames("sito-ui-spinner", className)}
    />
  );
});

export default Spinner;
