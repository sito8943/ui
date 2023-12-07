import { forwardRef, ForwardedRef } from "react";

// types
import { TextareaControlProps } from "./types";

const TextareaControl = forwardRef(function (
  props: TextareaControlProps,
  ref: ForwardedRef<HTMLTextAreaElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    orientation = "column",
    color = "basics",
    label,
    ...rest
  } = props;

  return (
    <div className={`input-control ${orientation} ${color}`}>
      <label htmlFor={props.id}>{label}</label>
      <textarea {...rest} ref={ref as ForwardedRef<HTMLTextAreaElement>} />
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default TextareaControl;
