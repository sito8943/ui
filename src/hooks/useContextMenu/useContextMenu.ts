import { useCallback, useState } from "react";

import type { ContextMenuPosition } from "../../components/ContextMenu";
import type { UseContextMenuReturn } from "./types";

const INITIAL_POSITION: ContextMenuPosition = { x: 0, y: 0 };

export const useContextMenu = <T>(): UseContextMenuReturn<T> => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);
  const [position, setPosition] =
    useState<ContextMenuPosition>(INITIAL_POSITION);

  const openAt = useCallback(
    (x: number, y: number, nextPayload: T) => {
      setPayload(nextPayload);
      setPosition({ x, y });
      setOpen(true);
    },
    [],
  );

  const close = useCallback(() => setOpen(false), []);

  return { open, payload, position, openAt, close };
};
