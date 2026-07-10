import {
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { classNames } from "../../utils";
import { IconButton } from "../IconButton";
import { focusableInputSelector, submitSelector } from "./constants";
import type { DialogProps } from "./types";
import {
  getActiveElement,
  getFocusableElements,
  lockBodyScroll,
  unlockBodyScroll,
} from "./utils";

const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Renders an accessible modal dialog in a portal.
 * @param props Dialog configuration and content.
 * @returns The dialog portal when open, otherwise null.
 */
export const Dialog = (props: DialogProps) => {
  const generatedTitleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const onExitCompleteRef = useRef<DialogProps["onExitComplete"]>(undefined);
  const {
    dialogId,
    title,
    ariaLabel,
    children,
    onClose,
    initialFocus = "none",
    closeOnBackdropClick = false,
    closeOnEscape = true,
    lockBodyScroll: shouldLockBodyScroll = true,
    onSubmit,
    open = false,
    mobileFullScreen = false,
    containerClassName,
    className,
    closeLabel = "Close dialog",
    closeIcon = "x",
    showCloseButton = true,
    portalContainer,
    exitDurationMs = 0,
    onExitComplete,
  } = props;
  const [shouldRender, setShouldRender] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const titleId = title ? `${dialogId ?? generatedTitleId}-title` : undefined;
  const dialogState = isClosing ? "closing" : "open";
  const isInteractive = open && !isClosing;

  useEffect(() => {
    onExitCompleteRef.current = onExitComplete;
  }, [onExitComplete]);

  const clearExitTimeout = useCallback(() => {
    if (exitTimeoutRef.current === null) return;

    window.clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = null;
  }, []);

  const finishExit = useCallback(() => {
    setShouldRender(false);
    setIsClosing(false);
    onExitCompleteRef.current?.();
    exitTimeoutRef.current = null;
  }, []);

  useClientLayoutEffect(() => {
    if (open) {
      clearExitTimeout();
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (!shouldRender) return;

    const normalizedExitDuration = Math.max(0, exitDurationMs);

    if (normalizedExitDuration === 0) {
      clearExitTimeout();
      finishExit();
      return;
    }

    setIsClosing(true);
    clearExitTimeout();
    exitTimeoutRef.current = window.setTimeout(
      finishExit,
      normalizedExitDuration,
    );
  }, [clearExitTimeout, exitDurationMs, finishExit, open, shouldRender]);

  useEffect(() => {
    return () => {
      clearExitTimeout();
    };
  }, [clearExitTimeout]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isInteractive && closeOnEscape) {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !isInteractive) return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = getFocusableElements(dialog);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];
      const activeElement = getActiveElement();
      const focusIsOutsideDialog =
        !activeElement || !dialog.contains(activeElement);

      if (
        event.shiftKey &&
        (focusIsOutsideDialog || activeElement === firstFocusableElement)
      ) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        (focusIsOutsideDialog || activeElement === lastFocusableElement)
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    },
    [closeOnEscape, isInteractive, onClose],
  );

  useEffect(() => {
    if (!isInteractive || typeof window === "undefined") return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isInteractive]);

  useClientLayoutEffect(() => {
    if (!open) return;

    previousFocusedElementRef.current = getActiveElement();

    return () => {
      if (previousFocusedElementRef.current?.isConnected) {
        previousFocusedElementRef.current.focus();
      }
      previousFocusedElementRef.current = null;
    };
  }, [open]);

  useClientLayoutEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (initialFocus === "first-input") {
      const firstInput = dialog.querySelector<HTMLElement>(
        focusableInputSelector,
      );
      if (firstInput) {
        firstInput.focus();
        return;
      }
    }

    if (initialFocus === "submit") {
      const submitButton = dialog.querySelector<HTMLElement>(submitSelector);
      if (submitButton) {
        submitButton.focus();
        return;
      }
    }

    dialog.focus();
  }, [initialFocus, open]);

  useEffect(() => {
    if (!shouldRender || !shouldLockBodyScroll) return;

    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [shouldLockBodyScroll, shouldRender]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        isInteractive &&
        closeOnBackdropClick &&
        event.target === event.currentTarget
      ) {
        onClose();
      }
    },
    [closeOnBackdropClick, isInteractive, onClose],
  );

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit],
  );

  if (!shouldRender || typeof document === "undefined") return null;

  const content = onSubmit ? (
    <form onSubmit={handleFormSubmit}>{children}</form>
  ) : (
    children
  );

  const closeIconContent: ReactNode =
    typeof closeIcon === "string" ? (
      <span aria-hidden="true">{closeIcon}</span>
    ) : (
      closeIcon
    );

  return createPortal(
    <div
      id={dialogId ? `backdrop-${dialogId}` : undefined}
      data-sito-ui="dialog-backdrop"
      data-state={dialogState}
      onClick={handleBackdropClick}
      className={classNames(
        "sito-ui-dialog-backdrop",
        `sito-ui-dialog-backdrop--${dialogState}`,
        containerClassName,
      )}
    >
      <div
        id={dialogId}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : ariaLabel}
        aria-labelledby={titleId}
        tabIndex={-1}
        data-sito-ui="dialog"
        data-state={dialogState}
        className={classNames(
          "sito-ui-dialog",
          `sito-ui-dialog--${dialogState}`,
          mobileFullScreen && "sito-ui-dialog--mobile-full-screen",
          className,
        )}
      >
        <div className="sito-ui-dialog__header">
          {title ? (
            <h3 id={titleId} className="sito-ui-dialog__title">
              {title}
            </h3>
          ) : null}
          {showCloseButton ? (
            <IconButton
              icon={closeIconContent}
              disabled={!isInteractive}
              aria-disabled={!isInteractive}
              onClick={onClose}
              variant="text"
              color="error"
              className="sito-ui-dialog__close"
              aria-label={closeLabel}
            />
          ) : null}
        </div>
        {content}
      </div>
    </div>,
    portalContainer ?? document.body,
  );
};
