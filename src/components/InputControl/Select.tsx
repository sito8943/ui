import { forwardRef, ForwardedRef, HTMLProps, ReactNode } from "react";

export interface SelectControlProps extends HTMLProps<HTMLSelectElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: "primary" | "secondary" | "basics" | undefined;
  orientation?: "column" | "row" | undefined;
  label: string | undefined;
  helperText?: string | undefined;
}

const SelectControl = forwardRef(function (
  props: SelectControlProps,
  ref: ForwardedRef<HTMLSelectElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    orientation = "column",
    color = basics,
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
          <select
            {...rest}
            ref={ref as ForwardedRef<HTMLSelectElement>}
            className={`${leftComponent ? "!pl-0" : ""} ${
              rightComponent ? "!pr-0" : ""
            } ${rest.className ?? ""}`}
          >
            {rest.children}
          </select>
          {rightComponent && rightComponent !== null ? (
            <div>{rightComponent}</div>
          ) : null}
        </div>
      ) : (
        <select {...rest} ref={ref as ForwardedRef<HTMLSelectElement>}>
          {rest.children}
        </select>
      )}
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default SelectControl;
