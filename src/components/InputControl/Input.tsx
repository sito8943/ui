import { forwardRef, ForwardedRef, HTMLProps } from "react";

// styles.css
import "./styles.css";

export interface InputControlProps extends HTMLProps<HTMLInputElement> {
  color?: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  orientation?: "column" | "row" | undefined;
  label?: string | undefined;
}

const InputControl = forwardRef(function (
  props: InputControlProps,
  ref: ForwardedRef<HTMLInputElement> | ForwardedRef<HTMLSelectElement>
) {
  const { orientation = "column", color = "inherit", label, ...rest } = props;

  return (
    <div className={`input-control ${orientation} ${color}`}>
      <label htmlFor={props.id}>{label}</label>
      <input {...rest} ref={ref as ForwardedRef<HTMLInputElement>} />
    </div>
  );
});

export default InputControl;
