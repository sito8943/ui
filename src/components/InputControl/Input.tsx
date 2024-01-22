import { forwardRef, ForwardedRef, useMemo } from "react";

// providers
import { useStyle } from "providers/StyleProvider";

// types
import { InputControlProps } from "./types";

// styles
import { makeStyles } from "./styles";

const InputControl = forwardRef(function (
  props: InputControlProps,
  ref: ForwardedRef<HTMLInputElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    orientation = "column",
    color = "basics",
    leftComponent,
    rightComponent,
    label,
    type = "text",
    ...rest
  } = props;

  const parsedType = useMemo(() => {
    const types = [
      "date",
      "datetime-local",
      "email",
      "number",
      "password",
      "search",
      "tel",
      "time",
      "url",
    ];
    return types.includes(type) ? type : "text";
  }, [type]);

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  return (
    <div className={`input-control ${styles.root} ${orientation}`}>
      <label htmlFor={props.id}>{label}</label>
      {leftComponent || rightComponent ? (
        <div className={`sub s-input`}>
          {leftComponent && leftComponent !== null ? (
            <div className="">{leftComponent}</div>
          ) : null}
          <input
            {...rest}
            type={parsedType}
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={`${leftComponent ? "s-small-padding-left" : ""} ${
              rightComponent ? "s-small-padding-right" : ""
            } s-input ${rest.className ?? ""}`}
          />
          {rightComponent && rightComponent !== null ? (
            <div>{rightComponent}</div>
          ) : null}
        </div>
      ) : (
        <input
          {...rest}
          type={type}
          className={`s-input ${rest.className ?? ""}`}
          ref={ref as ForwardedRef<HTMLInputElement>}
        />
      )}
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default InputControl;
