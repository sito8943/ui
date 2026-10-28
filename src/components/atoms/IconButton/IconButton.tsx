import {
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { classNames } from "@/utils";
import {
  type ButtonBaseProps,
  type ButtonRef,
} from "@/components/atoms/Button";
import { ButtonBase } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon";
// types
import {
  ICON_BUTTON_SIZES,
  type IconButtonOwnProps,
  type IconButtonProps,
} from "./types";

type IconButtonStyle = CSSProperties & {
  "--sito-ui-icon-button-icon-size"?: string;
};

type IconButtonImplProps = Pick<
  ButtonBaseProps,
  "color" | "variant" | "loading"
> &
  IconButtonOwnProps & {
    as?: ElementType;
    className?: string | undefined;
    style?: CSSProperties | undefined;
    children?: ReactNode;
    ref?: Ref<Element> | undefined;
    [key: string]: unknown;
  };

const getIconSizeValue = (iconSize: IconButtonOwnProps["iconSize"]) => {
  if (iconSize === undefined) return undefined;

  return typeof iconSize === "number" ? `${iconSize}px` : iconSize;
};

function IconButtonBase(props: IconButtonImplProps) {
  const {
    children,
    icon,
    iconKey,
    iconClassName,
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
    <ButtonBase
      {...rest}
      variant={variant}
      color={color}
      size={size}
      loading={loading}
      data-sito-ui="icon-button"
      className={iconButtonClassName}
      style={iconButtonStyle}
    >
      {loading ? null : (
        <Icon
          icon={icon}
          iconKey={iconKey}
          className={classNames("sito-ui-icon-button__icon", iconClassName)}
        />
      )}
      {children}
    </ButtonBase>
  );
}

function IconButton<E extends ElementType = "button">(
  props: IconButtonProps<E> & { ref?: ButtonRef<E> },
): ReactElement | null;
function IconButton(props: IconButtonImplProps) {
  return <IconButtonBase {...props} />;
}

export default IconButton;
