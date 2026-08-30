import type { ContextMenuPosition } from "../../components/ContextMenu";

export type UseContextMenuReturn<T> = {
  open: boolean;
  payload: T | null;
  position: ContextMenuPosition;
  openAt: (x: number, y: number, payload: T) => void;
  close: () => void;
};
