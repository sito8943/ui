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
    orientation = "column",
    color = "basics",
    leftComponent,
    rightComponent,
    label,
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
        } s-input ${rest.className ?? ""}`}
      >
        {rest.children}
      </select>
    ),
    [leftComponent, rightComponent, rest, ref]
  );

  return (
    <div className={`input-control ${styles.root} ${orientation} ${color}`}>
      <label htmlFor={props.id}>{label}</label>
      {leftComponent || rightComponent ? (
        <div className={`sub s-input`}>
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
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default SelectControl;
