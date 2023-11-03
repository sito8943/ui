import { forwardRef, ForwardedRef, HTMLProps, ReactNode } from "react";

// styles.css
import "./styles.css";

export interface TextAreaControlProps extends HTMLProps<HTMLTextAreaElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  orientation?: "column" | "row" | undefined;
  label?: string | undefined;
}

const TextAreaControl = forwardRef(function (
  props: TextAreaControlProps,
  ref: ForwardedRef<HTMLTextAreaElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    orientation = "column",
    color = "inherit",
    label,
    ...rest
  } = props;

  return (
    <div className={`input-control ${orientation} ${color}`}>
      <label htmlFor={props.id}>{label}</label>
      <textarea {...rest} ref={ref as ForwardedRef<HTMLTextAreaElement>} />
    </div>
  );
});

export default TextAreaControl;
