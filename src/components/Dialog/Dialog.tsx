import {
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { classNames } from "../../utils";
import { IconButton } from "../IconButton";
import type { DialogProps } from "./types";
import { lockBodyScroll, unlockBodyScroll } from "./utils";

/**
 * Renders an accessible modal dialog in a portal.
 * @param props Dialog configuration and content.
 * @returns The dialog portal when open, otherwise null.
 */
export const Dialog = (props: DialogProps) => {
  const generatedTitleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
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
  } = props;

  const titleId = title ? `${dialogId ?? generatedTitleId}-title` : undefined;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && open && closeOnEscape) {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !open) return;

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
    [closeOnEscape, onClose, open],
  );

  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, open]);

  useEffect(() => {
    if (!open) return;

    previousFocusedElementRef.current = getActiveElement();

    return () => {
      if (previousFocusedElementRef.current?.isConnected) {
        previousFocusedElementRef.current.focus();
      }
      previousFocusedElementRef.current = null;
    };
  }, [open]);

  useEffect(() => {
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
    if (!open || !shouldLockBodyScroll) return;

    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [open, shouldLockBodyScroll]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose],
  );

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit],
  );

  if (!open || typeof document === "undefined") return null;

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
      onClick={handleBackdropClick}
      className={classNames("sito-ui-dialog-backdrop", containerClassName)}
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
        className={classNames(
          "sito-ui-dialog",
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
              disabled={!open}
              aria-disabled={!open}
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
