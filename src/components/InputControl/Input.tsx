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
    switch (type) {
      case "date":
      case "datetime-local":
      case "email":
      case "number":
      case "password":
      case "search":
      case "tel":
      case "time":
      case "url":
        return type;

      default:
        return "text";
    }
  }, [type]);

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  return (
    <div className={`input-control ${orientation}`}>
      <label htmlFor={props.id}>{label}</label>
      {leftComponent || rightComponent ? (
        <div className={`sub ${styles.input}`}>
          {leftComponent && leftComponent !== null ? (
            <div className="">{leftComponent}</div>
          ) : null}
          <input
            {...rest}
            type={parsedType}
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={`${leftComponent ? "!pl-2" : ""} ${
              rightComponent ? "!pr-2" : ""
            } ${rest.className ?? ""}`}
          />
          {rightComponent && rightComponent !== null ? (
            <div>{rightComponent}</div>
          ) : null}
        </div>
      ) : (
        <input
          {...rest}
          type={type}
          className={`${styles.input} ${rest.className ?? ""}`}
          ref={ref as ForwardedRef<HTMLInputElement>}
        />
      )}
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default InputControl;
