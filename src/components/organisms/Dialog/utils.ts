import { focusableSelector } from "./constants";

let lockCount = 0;
let previousOverflow: string | null = null;
const dialogStack: symbol[] = [];

const hasBody = () => typeof document !== "undefined" && !!document.body;

/**
 * Prevents document body scrolling while a dialog is open.
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
 * Restores document body scrolling after dialogs close.
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
 * Finds enabled focusable descendants inside an element.
 * @param element Root element to search inside.
 * @returns Focusable descendants that are not aria-disabled.
 */
export const getFocusableElements = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (focusableElement) =>
      focusableElement.getAttribute("aria-disabled") !== "true",
  );

/**
 * Gets the active element when it is an HTMLElement.
 * @returns Active HTMLElement, or null when unavailable.
 */
export const getActiveElement = (): HTMLElement | null => {
  if (typeof document === "undefined") return null;

  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
};

/**
 * Registers an interactive dialog as the topmost dialog.
 * @param dialogStackId Stable internal identifier for the dialog instance.
 */
export const registerDialog = (dialogStackId: symbol) => {
  const existingIndex = dialogStack.indexOf(dialogStackId);
  if (existingIndex >= 0) dialogStack.splice(existingIndex, 1);

  dialogStack.push(dialogStackId);
};

/**
 * Removes a dialog from the interactive dialog stack.
 * @param dialogStackId Stable internal identifier for the dialog instance.
 */
export const unregisterDialog = (dialogStackId: symbol) => {
  const dialogIndex = dialogStack.indexOf(dialogStackId);
  if (dialogIndex >= 0) dialogStack.splice(dialogIndex, 1);
};

/**
 * Checks whether a dialog is currently the topmost interactive dialog.
 * @param dialogStackId Stable internal identifier for the dialog instance.
 * @returns Whether the dialog is at the top of the stack.
 */
export const isTopmostDialog = (dialogStackId: symbol) =>
  dialogStack[dialogStack.length - 1] === dialogStackId;
