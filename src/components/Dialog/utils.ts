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
