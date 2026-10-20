import { useContext } from "react";

import { ToastContext } from "../../components/Toast/ToastContext";
import type { ToastFunction } from "../../components/Toast/types";

/**
 * Returns the `toast` function of the nearest `ToastProvider`.
 * @returns `toast(options)` plus `toast.update(id, options)` and `toast.dismiss(id)`.
 */
export const useToast = (): ToastFunction => {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error("useToast must be used inside a ToastProvider.");
  }

  return toast;
};
