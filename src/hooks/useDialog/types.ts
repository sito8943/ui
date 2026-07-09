import type { Dispatch, SetStateAction } from "react";

export type UseDialogReturn = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
};
