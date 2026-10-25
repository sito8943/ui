import type { ReactNode } from "react";

export const TOAST_COLORS = {
  DEFAULT: "default",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type ToastColor = (typeof TOAST_COLORS)[keyof typeof TOAST_COLORS];

export const TOAST_VARIANTS = {
  ACCENT: "accent",
  FILLED: "filled",
} as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS];

export const TOAST_PLACEMENTS = {
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
} as const;

export type ToastPlacement =
  (typeof TOAST_PLACEMENTS)[keyof typeof TOAST_PLACEMENTS];

export type ToastState = "open" | "closing";

export type ToastAction = {
  label: ReactNode;
  onClick: () => void;
  /** Dismisses the toast after `onClick`. Defaults to `true`. */
  dismiss?: boolean;
};

export type ToastOptions = {
  /** Reusing an existing id updates that toast in place. */
  id?: string;
  message: ReactNode;
  color?: ToastColor;
  variant?: ToastVariant;
  icon?: ReactNode;
  /**
   * Time in ms before the toast leaves. `0` or `Infinity` keeps it until it is
   * dismissed. Defaults to the provider's `duration`, or `Infinity` for errors.
   */
  duration?: number;
  action?: ToastAction;
  /** Shows the close button. Defaults to `true`. */
  dismissible?: boolean;
};

export type ToastUpdate = Partial<Omit<ToastOptions, "id">>;

export type ToastFunction = {
  (options: ToastOptions): string;
  update: (id: string, options: ToastUpdate) => void;
  dismiss: (id: string) => void;
};

export type ToastProps = Omit<ToastOptions, "id"> & {
  id: string;
  state?: ToastState;
  /** Bumps on every update to restart the timer. */
  version?: number;
  closeLabel?: string;
  closeIcon?: ReactNode;
  className?: string;
  onDismiss: (id: string) => void;
  onExitComplete?: (id: string) => void;
};

export type ToastProviderProps = {
  children?: ReactNode;
  /** Default visual variant for toasts. Defaults to `accent`. */
  variant?: ToastVariant;
  placement?: ToastPlacement;
  /** Default duration in ms for non-error toasts. */
  duration?: number;
  /** Maximum visible toasts; the oldest leaves first. */
  max?: number;
  /** Accessible name of the toast region. */
  label?: string;
  closeLabel?: string;
  closeIcon?: ReactNode;
  viewportClassName?: string;
  toastClassName?: string;
  portalContainer?: Element | DocumentFragment | null;
};
