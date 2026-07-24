import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { classNames } from "../../utils";
import {
  CONTEXT_MENU_ITEM_SELECTOR,
  CONTEXT_MENU_VIEWPORT_PADDING,
} from "./constants";
import type { ContextMenuProps } from "./types";

const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const ContextMenu = ({
  open,
  position,
  onClose,
  ariaLabel,
  children,
  className,
  portalContainer,
  viewportPadding = CONTEXT_MENU_VIEWPORT_PADDING,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useClientLayoutEffect(() => {
    if (!open) return;

    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const firstItem =
      menuRef.current?.querySelector<HTMLElement>(
        CONTEXT_MENU_ITEM_SELECTOR,
      );
    (firstItem ?? menuRef.current)?.focus();

    return () => {
      if (previousFocusedElementRef.current?.isConnected) {
        previousFocusedElementRef.current.focus();
      }
      previousFocusedElementRef.current = null;
    };
  }, [open]);

  useClientLayoutEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) return;

    const maxX = window.innerWidth - menu.offsetWidth - viewportPadding;
    const maxY =
      window.innerHeight - menu.offsetHeight - viewportPadding;
    const clampedX = Math.max(
      viewportPadding,
      Math.min(position.x, maxX),
    );
    const clampedY = Math.max(
      viewportPadding,
      Math.min(position.y, maxY),
    );

    menu.style.left = `${clampedX}px`;
    menu.style.top = `${clampedY}px`;
  });

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [onClose, open]);

  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        CONTEXT_MENU_ITEM_SELECTOR,
      ) ?? [],
    );
    if (items.length === 0) return;

    const currentIndex = items.indexOf(
      document.activeElement as HTMLElement,
    );
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1 + items.length) % items.length;
    } else if (event.key === "ArrowUp") {
      nextIndex =
        (currentIndex - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    items[nextIndex]?.focus();
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-orientation="vertical"
      data-sito-ui="context-menu"
      data-state="open"
      className={classNames("sito-ui-context-menu", className)}
      style={{ left: position.x, top: position.y }}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>,
    portalContainer ?? document.body,
  );
};
