/**
 * Reads a CSS duration custom property from an element in milliseconds.
 * @param element Element whose computed style holds the property.
 * @param property Custom property name, such as `--sito-ui-dialog-exit-duration`.
 * @param fallback Value used when the property is missing or invalid.
 * @returns The duration in milliseconds.
 */
export const getCssDurationMs = (
  element: HTMLElement,
  property: string,
  fallback: number,
) => {
  const duration = window
    .getComputedStyle(element)
    .getPropertyValue(property)
    .trim();
  const value = Number.parseFloat(duration);

  if (!Number.isFinite(value)) return fallback;
  return duration.endsWith("ms") ? value : value * 1000;
};

/**
 * Checks whether the user prefers reduced motion.
 * @returns Whether `prefers-reduced-motion: reduce` matches.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
