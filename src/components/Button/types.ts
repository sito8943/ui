import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from "react";

export const BUTTON_COLOR_VARIANTS = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
  INFO: "info",
} as const;

export const BUTTON_VARIANTS = {
  TEXT: "text",
  SUBMIT: "submit",
  OUTLINED: "outlined",
} as const;

export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type ButtonColor =
  (typeof BUTTON_COLOR_VARIANTS)[keyof typeof BUTTON_COLOR_VARIANTS];

export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonBaseProps = {
  color?: ButtonColor | undefined;
  size?: ButtonSize | undefined;
  variant?: ButtonVariant | undefined;
  loading?: boolean | undefined;
  loadingIndicator?: ReactNode;
  loadingLabel?: string | undefined;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

/**
 * Props owned by `Button` for a given rendered element `E`. `as` picks the
 * element: a native `<button>` (default), `"a"`, or a component such as a
 * router `Link`.
 */
export type ButtonOwnProps<E extends ElementType = "button"> =
  ButtonBaseProps & {
    as?: E;
    disabled?: boolean | undefined;
  };

/**
 * `Button` props for the rendered element `E`: `Button`'s own props plus the
 * element's props (`<button>` attributes by default, anchor attributes with
 * `as="a"`, the component's props with `as={Link}`).
 */
export type ButtonProps<E extends ElementType = "button"> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

export type ButtonRef<E extends ElementType = "button"> =
  ComponentPropsWithRef<E>["ref"];
