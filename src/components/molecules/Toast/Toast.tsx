import {
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { classNames, getCssDurationMs, prefersReducedMotion } from "@/utils";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import {
  DEFAULT_TOAST_DURATION_MS,
  DEFAULT_TOAST_EXIT_DURATION_MS,
} from "./constants";
import { TOAST_COLORS, TOAST_VARIANTS, type ToastProps } from "./types";

/**
 * Renders a single notification. Usually rendered by `ToastProvider`.
 * @param props Toast content, state, and dismiss handlers.
 * @returns The toast element.
 */
export const Toast = (props: ToastProps) => {
  const {
    id,
    message,
    color = TOAST_COLORS.DEFAULT,
    variant = TOAST_VARIANTS.ACCENT,
    icon,
    duration,
    action,
    dismissible = true,
    state = "open",
    version = 0,
    closeLabel = "Dismiss notification",
    closeIcon = "x",
    className,
    onDismiss,
    onExitComplete,
  } = props;
  const toastRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const resolvedDuration =
    duration ??
    (color === TOAST_COLORS.ERROR ? Infinity : DEFAULT_TOAST_DURATION_MS);
  const remainingRef = useRef(resolvedDuration);
  const paused = hovered || focused;
  const autoDismisses =
    Number.isFinite(resolvedDuration) && resolvedDuration > 0;

  // Restarts the countdown whenever the toast is updated in place.
  useEffect(() => {
    remainingRef.current = resolvedDuration;
  }, [resolvedDuration, version]);

  useEffect(() => {
    if (state !== "open" || paused || !autoDismisses) return;

    const startedAt = Date.now();
    const timeout = window.setTimeout(
      () => onDismiss(id),
      Math.max(0, remainingRef.current),
    );

    return () => {
      window.clearTimeout(timeout);
      remainingRef.current -= Date.now() - startedAt;
    };
  }, [autoDismisses, id, onDismiss, paused, state, version]);

  useEffect(() => {
    if (state !== "closing") return;

    const exitDuration =
      prefersReducedMotion() || !toastRef.current
        ? 0
        : getCssDurationMs(
            toastRef.current,
            "--sito-ui-toast-exit-duration",
            DEFAULT_TOAST_EXIT_DURATION_MS,
          );

    if (exitDuration <= 0) {
      onExitComplete?.(id);
      return;
    }

    const timeout = window.setTimeout(() => onExitComplete?.(id), exitDuration);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [id, onExitComplete, state]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !dismissible) return;

    event.stopPropagation();
    onDismiss(id);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  const handleActionClick = () => {
    action?.onClick();
    if (action?.dismiss ?? true) onDismiss(id);
  };

  const closeIconContent: ReactNode =
    typeof closeIcon === "string" ? (
      <span aria-hidden="true">{closeIcon}</span>
    ) : (
      closeIcon
    );

  return (
    <div
      ref={toastRef}
      id={id}
      role={color === TOAST_COLORS.ERROR ? "alert" : "status"}
      aria-atomic="true"
      data-sito-ui="toast"
      data-state={state}
      data-color={color}
      className={classNames(
        "sito-ui-toast",
        `sito-ui-toast--${color}`,
        `sito-ui-toast--${variant}`,
        `sito-ui-toast--${state}`,
        className,
      )}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {icon ? (
        <span className="sito-ui-toast__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="sito-ui-toast__message">{message}</div>
      {action ? (
        <Button
          size="sm"
          variant="text"
          color={color === TOAST_COLORS.DEFAULT ? "primary" : color}
          className="sito-ui-toast__action"
          disabled={state !== "open"}
          onClick={handleActionClick}
        >
          {action.label}
        </Button>
      ) : null}
      {dismissible ? (
        <IconButton
          size="sm"
          variant="text"
          icon={closeIconContent}
          className="sito-ui-toast__close"
          disabled={state !== "open"}
          onClick={() => onDismiss(id)}
          aria-label={closeLabel}
        />
      ) : null}
    </div>
  );
};
