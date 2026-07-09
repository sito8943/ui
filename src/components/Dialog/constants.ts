export const focusableInputSelector =
  'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])';

export const submitSelector =
  'button[type="submit"]:not([disabled]), input[type="submit"]:not([disabled])';

export const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");
