import { focusableSelector } from "./constants";

let lockCount = 0;
let previousOverflow: string | null = null;

const hasBody = () => typeof document !== "undefined" && !!document.body;

/**
 *
 */
export const lockBodyScroll = () => {
  if (!hasBody()) return;

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;
};

/**
 *
 */
export const unlockBodyScroll = () => {
  if (!hasBody() || lockCount === 0) return;

  lockCount -= 1;

  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow ?? "";
    previousOverflow = null;
  }
};

/**
 *
 */
export const getFocusableElements = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (focusableElement) =>
      focusableElement.getAttribute("aria-disabled") !== "true",
  );

/**
 *
 */
export const getActiveElement = (): HTMLElement | null => {
  if (typeof document === "undefined") return null;

  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
};
