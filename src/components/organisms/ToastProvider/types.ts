import type { ReactNode } from "react";

import type {
  ToastOptions,
  ToastPlacement,
  ToastUpdate,
  ToastVariant,
} from "../../molecules/Toast";

export type ToastFunction = {
  (options: ToastOptions): string;
  update: (id: string, options: ToastUpdate) => void;
  dismiss: (id: string) => void;
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
