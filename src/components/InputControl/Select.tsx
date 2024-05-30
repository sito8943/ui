import { forwardRef, ForwardedRef, useMemo } from "react";

// providers
import { useStyle } from "providers/StyleProvider";

// types
import { SelectControlProps } from "./types";

// styles
import { makeStyles } from "./styles";

const SelectControl = forwardRef(function (
  props: SelectControlProps,
  ref: ForwardedRef<HTMLSelectElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    helperTextClassName = "basics",
    orientation = "column",
    color = "basics",
    leftComponent,
    rightComponent,
    label,
    labelClassName = "basics",
    ...rest
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  const selectElement = useMemo(
    () => (
      <select
        {...rest}
        ref={ref as ForwardedRef<HTMLSelectElement>}
        className={`${leftComponent ? "s-no-padding-left" : ""} ${
          rightComponent ? "s-no-padding-right" : ""
        } ${styles.input} ${rest.className ?? ""}`}
      >
        {rest.children}
      </select>
    ),
    [leftComponent, rightComponent, rest, ref, styles]
  );

  return (
    <div className={`input-control ${orientation}`}>
      <label className={labelClassName} htmlFor={props.id}>
        {label}
      </label>
      {leftComponent || rightComponent ? (
        <div className={`sub ${styles.input}`}>
          {leftComponent && leftComponent !== null ? (
            <div>{leftComponent}</div>
          ) : null}
          {selectElement}
          {rightComponent && rightComponent !== null ? (
            <div>{rightComponent}</div>
          ) : null}
        </div>
      ) : (
        selectElement
      )}
      {helperText && helperText.length ? (
        <p className={helperTextClassName}>{helperText}</p>
      ) : null}
    </div>
  );
});

export default SelectControl;
