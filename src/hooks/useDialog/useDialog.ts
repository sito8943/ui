import { useState } from "react";

import type { UseDialogReturn } from "./types";

/**
 * Manages dialog open state and common open/close handlers.
 * @param initialOpen Initial open state for the dialog.
 * @returns Current state and helpers to update it.
 */
export const useDialog = (initialOpen = false): UseDialogReturn => {
  const [open, setOpen] = useState(initialOpen);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return { open, setOpen, handleClose, handleOpen };
};
