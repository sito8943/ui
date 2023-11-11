import {
  ForwardedRef,
  InputHTMLAttributes,
  MouseEventHandler,
  forwardRef,
} from "react";

// styles
import "./style.css";

interface SwitcherProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  value: boolean | undefined;
  activeColor?: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  inactiveColor: "primary" | "secondary" | "ternary" | "inherit" | undefined;
  label?: string | undefined;
}

const Switch = forwardRef(function (
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
  return (
    <div
      className={`flex gap-3 items-center justify-start ${className}`}
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
      <div className={`switcher ${value ? activeColor : inactiveColor}`}>
        <div className={`ball ${value ? "activated" : "deactivated"}`} />
      </div>
      <label className="">{label}</label>
    </div>
  );
});

export default Switch;
