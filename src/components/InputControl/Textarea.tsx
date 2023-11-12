import { forwardRef, ForwardedRef, HTMLProps, ReactNode } from "react";

export interface TextareaControlProps extends HTMLProps<HTMLTextAreaElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  orientation?: "column" | "row" | undefined;
  label: string | undefined;
  helperText?: string | undefined;
}

const TextareaControl = forwardRef(function (
  props: TextareaControlProps,
  ref: ForwardedRef<HTMLTextAreaElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    orientation = "column",
    color = "inherit",
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
