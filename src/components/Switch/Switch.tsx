import { ForwardedRef, MouseEventHandler, forwardRef } from "react";

// providers
import { useStyle } from "providers/StyleProvider";

// types
import { SwitcherProps } from "./types";

// styles
import { makeStyles } from "./styles";

const Switcher = forwardRef(function (
  props: SwitcherProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    label,
    value = false,
    onChange,
    activeColor = "primary",
    inactiveColor = "secondary",
    id,
    className,
  } = props;

  const { colors } = useStyle();
  const styles = makeStyles(colors, activeColor, inactiveColor);

  return (
    <div
      className={`switcher-root ${styles.root} ${className}`}
      onClick={onChange as unknown as MouseEventHandler<HTMLDivElement>}
    >
      <input
        id={id}
        ref={ref}
        checked={value}
        onChange={onChange}
        className="check-input"
        type="checkbox"
      />
      <div className={`switcher ${value ? "s-active" : "s-inactive"}`}>
        <div className={`ball ${value ? "activated" : "deactivated"}`} />
      </div>
      <label className="">{label}</label>
    </div>
  );
});

export default Switcher;
