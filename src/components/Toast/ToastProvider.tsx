import { useCallback, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { classNames } from "../../utils";
import { DEFAULT_TOAST_DURATION_MS, DEFAULT_TOAST_MAX } from "./constants";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";
import {
  TOAST_COLORS,
  TOAST_PLACEMENTS,
  type ToastFunction,
  type ToastOptions,
  type ToastProviderProps,
  type ToastState,
  type ToastUpdate,
} from "./types";

type ToastRecord = ToastOptions & {
  id: string;
  state: ToastState;
  version: number;
};

/**
 * Provides `useToast` and renders the toast viewport in a portal.
 * @param props Viewport placement, defaults, and app content.
 * @returns The children plus the toast viewport.
 */
export const ToastProvider = (props: ToastProviderProps) => {
  const {
    children,
    placement = TOAST_PLACEMENTS.BOTTOM_RIGHT,
    duration = DEFAULT_TOAST_DURATION_MS,
    max = DEFAULT_TOAST_MAX,
    label = "Notifications",
    closeLabel,
    closeIcon,
    viewportClassName,
    toastClassName,
    portalContainer,
  } = props;
  const idPrefix = useId();
  const counterRef = useRef(0);
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const maxVisible = Math.max(1, max);

  const dismiss = useCallback((id: string) => {
    setToasts((list) =>
      list.map((toast) =>
        toast.id === id && toast.state === "open"
          ? { ...toast, state: "closing" }
          : toast,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const update = useCallback((id: string, options: ToastUpdate) => {
    setToasts((list) =>
      list.map((toast) =>
        toast.id === id
          ? { ...toast, ...options, version: toast.version + 1 }
          : toast,
      ),
    );
  }, []);

  const toast = useMemo<ToastFunction>(() => {
    const show = (options: ToastOptions) => {
      counterRef.current += 1;
      const id = options.id ?? `sito-ui-toast${idPrefix}${counterRef.current}`;

      setToasts((list) => {
        if (list.some((item) => item.id === id)) {
          return list.map((item) =>
            item.id === id
              ? { ...item, ...options, id, version: item.version + 1 }
              : item,
          );
        }

        const next: ToastRecord[] = [
          ...list,
          { ...options, id, state: "open", version: 0 },
        ];
        const open = next.filter((item) => item.state === "open");
        const overflow = open.length - maxVisible;
        if (overflow <= 0) return next;

        const leaving = new Set(open.slice(0, overflow).map((item) => item.id));
        return next.map((item) =>
          leaving.has(item.id) ? { ...item, state: "closing" } : item,
        );
      });

      return id;
    };

    return Object.assign(show, { update, dismiss });
  }, [dismiss, idPrefix, maxVisible, update]);

  const viewport =
    typeof document === "undefined"
      ? null
      : createPortal(
          <section
            aria-label={label}
            aria-live="polite"
            data-sito-ui="toast-viewport"
            data-placement={placement}
            className={classNames(
              "sito-ui-toast-viewport",
              `sito-ui-toast-viewport--${placement}`,
              viewportClassName,
            )}
          >
            {toasts.map(({ version, duration: toastDuration, ...item }) => (
              <Toast
                key={item.id}
                {...item}
                version={version}
                duration={
                  toastDuration ??
                  (item.color === TOAST_COLORS.ERROR ? Infinity : duration)
                }
                closeLabel={closeLabel}
                closeIcon={closeIcon}
                className={toastClassName}
                onDismiss={dismiss}
                onExitComplete={remove}
              />
            ))}
          </section>,
          portalContainer ?? document.body,
        );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {viewport}
    </ToastContext.Provider>
  );
};
