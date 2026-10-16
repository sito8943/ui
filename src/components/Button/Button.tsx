import {
  type ElementType,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { classNames } from "../../utils";
import { Spinner } from "../Spinner";
// types
import {
  BUTTON_COLOR_VARIANTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  type ButtonBaseProps,
  type ButtonProps,
  type ButtonRef,
} from "./types";

type ButtonImplProps = Pick<
  ButtonBaseProps,
  "color" | "size" | "variant" | "loading" | "loadingIndicator" | "loadingLabel"
> & {
  as?: ElementType;
  disabled?: boolean | undefined;
  type?: string | undefined;
  className?: string | undefined;
  children?: ReactNode;
  ref?: Ref<Element> | undefined;
  tabIndex?: number | undefined;
  onClick?: MouseEventHandler | undefined;
  onAuxClick?: MouseEventHandler | undefined;
  "aria-busy"?: boolean | "true" | "false" | undefined;
  [key: string]: unknown;
};

const blockInteraction = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

/** Element-agnostic implementation, shared with `IconButton`. */
export function ButtonBase(props: ButtonImplProps) {
  const {
    as: Component = "button",
    color = BUTTON_COLOR_VARIANTS.DEFAULT,
    size = BUTTON_SIZES.MD,
    type,
    variant = BUTTON_VARIANTS.TEXT,
    loading = false,
    loadingIndicator,
    loadingLabel = "Loading",
    disabled,
    className,
    children,
    ref,
    tabIndex,
    onClick,
    onAuxClick,
    ...rest
  } = props;

  const isNativeButton = Component === "button";
  const isInactive = disabled || loading;

  const buttonClassName = classNames(
    "sito-ui-button",
    `sito-ui-button--${variant}`,
    `sito-ui-button--${color}`,
    `sito-ui-button--${size}`,
    loading && "sito-ui-button--loading",
    className,
  );

  const renderedLoadingIndicator =
    loadingIndicator === undefined ? (
      <Spinner
        className="sito-ui-button__spinner"
        data-sito-ui="button-spinner"
      />
    ) : (
      loadingIndicator
    );

  // Links cannot be natively disabled: expose aria-disabled, drop them from
  // the tab order and block activation (click, middle click) instead.
  const elementProps = isNativeButton
    ? {
        type: type ?? "button",
        disabled: isInactive,
        tabIndex,
        onClick,
        onAuxClick,
      }
    : {
        type,
        "aria-disabled": isInactive || rest["aria-disabled"],
        tabIndex: isInactive ? -1 : tabIndex,
        onClick: isInactive ? blockInteraction : onClick,
        onAuxClick: isInactive ? blockInteraction : onAuxClick,
      };

  return (
    <Component
      data-sito-ui="button"
      {...rest}
      {...elementProps}
      ref={ref}
      aria-busy={loading || rest["aria-busy"]}
      className={buttonClassName}
    >
      {loading ? (
        <>
          {renderedLoadingIndicator}
          <span className="sito-ui-button__loading-label">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </Component>
  );
}

function Button<E extends ElementType = "button">(
  props: ButtonProps<E> & { ref?: ButtonRef<E> },
): ReactElement | null;
function Button(props: ButtonImplProps) {
  return <ButtonBase {...props} />;
}

export default Button;
