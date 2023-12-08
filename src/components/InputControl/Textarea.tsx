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
    orientation = "column",
    color = "basics",
    label,
    ...rest
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  return (
    <div className={`input-control ${orientation} ${styles.input}`}>
      <label htmlFor={props.id}>{label}</label>
      <textarea {...rest} ref={ref as ForwardedRef<HTMLTextAreaElement>} />
      {helperText && helperText.length ? <p>{helperText}</p> : null}
    </div>
  );
});

export default TextareaControl;
