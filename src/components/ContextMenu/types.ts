import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export type ContextMenuProps = {
  open: boolean;
  position: ContextMenuPosition;
  onClose: () => void;
  ariaLabel: string;
  children?: ReactNode;
  className?: string;
  portalContainer?: Element | DocumentFragment | null;
  viewportPadding?: number;
};

export interface ContextMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  leading?: ReactNode;
  shortcut?: ReactNode;
}

export type ContextMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;
