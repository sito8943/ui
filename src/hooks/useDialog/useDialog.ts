import { useState } from "react";

import type { UseDialogReturn } from "./types";

/**
 *
 * @param initialOpen
 */
export const useDialog = (initialOpen = false): UseDialogReturn => {
  const [open, setOpen] = useState(initialOpen);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return { open, setOpen, handleClose, handleOpen };
};
