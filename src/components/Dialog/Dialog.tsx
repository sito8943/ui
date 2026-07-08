import {
  type FormEvent,
  type MouseEvent,
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

const focusableInputSelector =
  'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])';

const submitSelector =
  'button[type="submit"]:not([disabled]), input[type="submit"]:not([disabled])';

/**
 *
 * @param props
 */
export const Dialog = (props: DialogProps) => {
  const generatedTitleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
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
    showCloseButton = true,
    portalContainer,
  } = props;

  const titleId = title ? `${dialogId ?? generatedTitleId}-title` : undefined;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && open && closeOnEscape) onClose();
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
    if (!open || initialFocus === "none") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (initialFocus === "first-input") {
      dialog.querySelector<HTMLElement>(focusableInputSelector)?.focus();
      return;
    }

    dialog.querySelector<HTMLElement>(submitSelector)?.focus();
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
              icon={<span aria-hidden="true">x</span>}
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
