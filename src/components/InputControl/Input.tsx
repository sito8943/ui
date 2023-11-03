import { forwardRef, ForwardedRef, HTMLProps, ReactNode } from "react";

// styles.css
import "./styles.css";

export interface InputControlProps extends HTMLProps<HTMLInputElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  orientation?: "column" | "row" | undefined;
  label?: string | undefined;
}

const InputControl = forwardRef(function (
  props: InputControlProps,
  ref: ForwardedRef<HTMLInputElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    orientation = "column",
    color = "inherit",
    leftComponent,
    rightComponent,
    label,
    ...rest
  } = props;

  return (
    <div className={`input-control ${orientation} ${color}`}>
      <label htmlFor={props.id}>{label}</label>
      {leftComponent || rightComponent ? (
        <div className="sub">
          {leftComponent && leftComponent !== null ? (
            <div>{leftComponent}</div>
          ) : null}
          <input
            {...rest}
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={`${leftComponent ? "!pl-0" : ""} ${
              rightComponent ? "!pr-0" : ""
            } ${rest.className ?? ""}`}
          />
          {rightComponent && rightComponent !== null ? (
            <div>{rightComponent}</div>
          ) : null}
        </div>
      ) : (
        <input {...rest} ref={ref as ForwardedRef<HTMLInputElement>} />
      )}
    </div>
  );
});

export default InputControl;
