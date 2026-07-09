import type { FormEvent, ReactNode } from "react";

import type { ButtonProps } from "../Button";

export type DialogInitialFocus = "none" | "first-input" | "submit";

export type DialogSubmitHandler = (
  event: FormEvent<HTMLFormElement>,
) => void | Promise<void>;

type DialogAccessibleNameProps =
  | {
      title: ReactNode;
      ariaLabel?: string;
    }
  | {
      title?: undefined;
      ariaLabel: string;
    };

type DialogBaseProps = {
  dialogId?: string;
  open?: boolean;
  children?: ReactNode;
  onClose: () => void;
  initialFocus?: DialogInitialFocus;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  onSubmit?: DialogSubmitHandler;
  mobileFullScreen?: boolean;
  containerClassName?: string;
  className?: string;
  closeLabel?: string;
  closeIcon?: ReactNode;
  showCloseButton?: boolean;
  portalContainer?: Element | DocumentFragment | null;
};

export type DialogProps = DialogBaseProps & DialogAccessibleNameProps;

export type DialogActionButtonProps = ButtonProps & {
  id: string;
};

export type DialogActionsProps = {
  primaryText: ReactNode;
  cancelText: ReactNode;
  onPrimaryClick?: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  loadingIndicator?: ReactNode;
  disabled?: boolean;
  primaryType?: "button" | "submit" | "reset";
  containerClassName?: string;
  primaryClassName?: string;
  cancelClassName?: string;
  alignEnd?: boolean;
  primaryName?: string;
  primaryAriaLabel?: string;
  cancelName?: string;
  cancelAriaLabel?: string;
  extraActions?: DialogActionButtonProps[];
};
