import { type CSSProperties, type ForwardedRef, forwardRef } from "react";

import { classNames } from "../../utils";
import { Button } from "../Button";
// types
import { ICON_BUTTON_SIZES, type IconButtonProps } from "./types";

type IconButtonStyle = CSSProperties & {
  "--sito-ui-icon-button-icon-size"?: string;
};

const getIconSizeValue = (iconSize: IconButtonProps["iconSize"]) => {
  if (iconSize === undefined) return undefined;

  return typeof iconSize === "number" ? `${iconSize}px` : iconSize;
};

const IconButton = forwardRef(function (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    children,
    icon,
    iconClassName,
    type = "button",
    variant = "text",
    color = "default",
    loading = false,
    size = ICON_BUTTON_SIZES.MD,
    iconSize,
    className,
    style,
    ...rest
  } = props;
  const hasContent =
    children !== undefined &&
    children !== null &&
    typeof children !== "boolean";
  const iconSizeValue = getIconSizeValue(iconSize);
  const iconButtonStyle: IconButtonStyle | undefined =
    iconSizeValue === undefined
      ? style
      : {
          ...style,
          "--sito-ui-icon-button-icon-size": iconSizeValue,
        };
  const iconButtonClassName = classNames(
    "sito-ui-icon-button",
    `sito-ui-icon-button--${size}`,
    hasContent && "sito-ui-icon-button--with-content",
    className,
  );

  return (
    <Button
      {...rest}
      ref={ref}
      type={type}
      variant={variant}
      color={color}
      size={size}
      loading={loading}
      data-sito-ui="icon-button"
      className={iconButtonClassName}
      style={iconButtonStyle}
    >
      {loading ? null : (
        <span
          className={classNames("sito-ui-icon-button__icon", iconClassName)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
});

export default IconButton;
