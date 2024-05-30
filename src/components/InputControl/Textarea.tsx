import { forwardRef, ForwardedRef } from "react";

// providers
import { useStyle } from "providers/StyleProvider";

// types
import { TextareaControlProps } from "./types";

// styles
import { makeStyles } from "./styles";

const TextareaControl = forwardRef(function (
  props: TextareaControlProps,
  ref: ForwardedRef<HTMLTextAreaElement> | ForwardedRef<HTMLSelectElement>
) {
  const {
    helperText = "",
    helperTextClassName = "basics",
    orientation = "column",
    color = "basics",
    labelClassName = "basics",
    label,
    ...rest
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  return (
    <div className={`input-control ${orientation}`}>
      <label className={labelClassName} htmlFor={props.id}>
        {label}
      </label>
      <textarea
        {...rest}
        className={`${styles.input} ${rest.className ?? ""}`}
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
      />
      {helperText && helperText.length ? (
        <p className={helperTextClassName}>{helperText}</p>
      ) : null}
    </div>
  );
});

export default TextareaControl;
