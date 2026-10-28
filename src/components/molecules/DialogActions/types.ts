import type { ElementType, ReactNode } from "react";

import type { ButtonProps } from "../../atoms/Button";

export type DialogActionButtonProps = ButtonProps<ElementType> & {
  id: string;
};

type DialogActionButtonOverrides = Partial<ButtonProps<ElementType>> &
  Record<string, unknown>;

export type DialogActionsProps = {
  primaryText: ReactNode;
  cancelText?: ReactNode;
  onPrimaryClick?: () => void;
  onCancel?: () => void;
  primaryProps?: DialogActionButtonOverrides;
  cancelProps?: DialogActionButtonOverrides;
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
