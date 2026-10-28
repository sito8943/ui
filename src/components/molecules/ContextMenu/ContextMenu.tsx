import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  classNames,
  getCssDurationMs,
  prefersReducedMotion,
} from "../../../utils";
import {
  CONTEXT_MENU_EXIT_DURATION_MS,
  CONTEXT_MENU_ITEM_SELECTOR,
  CONTEXT_MENU_VIEWPORT_PADDING,
} from "./constants";
import type { ContextMenuProps } from "./types";

const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  function ContextMenu(
    {
      open,
      position,
      onClose,
      ariaLabel,
      children,
      className,
      portalContainer,
      viewportPadding = CONTEXT_MENU_VIEWPORT_PADDING,
      closeOnEscape = true,
      closeOnTab = true,
      closeOnPointerDownOutside = true,
      clampToViewport = true,
    },
    ref,
  ) {
    const menuRef = useRef<HTMLDivElement>(null);
    const previousFocusedElementRef = useRef<HTMLElement | null>(null);
    const exitTimeoutRef = useRef<number | null>(null);
    const [shouldRender, setShouldRender] = useState(open);
    const [isClosing, setIsClosing] = useState(false);
    const isInteractive = open && !isClosing;

    const clearExitTimeout = useCallback(() => {
      if (exitTimeoutRef.current === null) return;

      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }, []);

    useClientLayoutEffect(() => {
      if (open) {
        clearExitTimeout();
        setShouldRender(true);
        setIsClosing(false);
        return;
      }

      if (!shouldRender) return;

      const exitDuration = menuRef.current
        ? getCssDurationMs(
            menuRef.current,
            "--sito-ui-motion-duration-normal",
            CONTEXT_MENU_EXIT_DURATION_MS,
          )
        : CONTEXT_MENU_EXIT_DURATION_MS;

      if (prefersReducedMotion() || exitDuration <= 0) {
        clearExitTimeout();
        setShouldRender(false);
        setIsClosing(false);
        return;
      }

      setIsClosing(true);
      clearExitTimeout();
      exitTimeoutRef.current = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
        exitTimeoutRef.current = null;
      }, exitDuration);
    }, [clearExitTimeout, open, shouldRender]);

    useEffect(
      () => () => {
        clearExitTimeout();
      },
      [clearExitTimeout],
    );
    const setMenuRef = useCallback(
      (node: HTMLDivElement | null) => {
        menuRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const restoreFocus = useCallback(() => {
      if (previousFocusedElementRef.current?.isConnected) {
        previousFocusedElementRef.current.focus();
      }
      previousFocusedElementRef.current = null;
    }, []);

    useClientLayoutEffect(() => {
      if (!open) {
        // Restored in the effect body, not a cleanup: React runs cleanups
        // before it puts focus back on the still-mounted closing menu.
        restoreFocus();
        return;
      }

      previousFocusedElementRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      const firstItem = menuRef.current?.querySelector<HTMLElement>(
        CONTEXT_MENU_ITEM_SELECTOR,
      );
      (firstItem ?? menuRef.current)?.focus();
    }, [open, restoreFocus]);

    useClientLayoutEffect(() => restoreFocus, [restoreFocus]);

    useClientLayoutEffect(() => {
      const menu = menuRef.current;
      if (!open || !menu || !clampToViewport) return;

      const maxX = window.innerWidth - menu.offsetWidth - viewportPadding;
      const maxY = window.innerHeight - menu.offsetHeight - viewportPadding;
      const clampedX = Math.max(viewportPadding, Math.min(position.x, maxX));
      const clampedY = Math.max(viewportPadding, Math.min(position.y, maxY));

      menu.style.left = `${clampedX}px`;
      menu.style.top = `${clampedY}px`;
    }, [clampToViewport, open, position.x, position.y, viewportPadding]);

    useEffect(() => {
      if (!isInteractive || !closeOnPointerDownOutside) return;

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target;
        if (!(target instanceof Node) || !menuRef.current?.contains(target)) {
          onClose();
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [closeOnPointerDownOutside, isInteractive, onClose]);

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      const shouldCloseOnEscape = event.key === "Escape" && closeOnEscape;
      const shouldCloseOnTab = event.key === "Tab" && closeOnTab;
      if (shouldCloseOnEscape || shouldCloseOnTab) {
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

      const activeElement = document.activeElement;
      const currentIndex =
        activeElement instanceof HTMLElement
          ? items.indexOf(activeElement)
          : -1;
      let nextIndex: number | null = null;

      if (event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1 + items.length) % items.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = items.length - 1;
      }

      if (nextIndex === null) return;
      event.preventDefault();
      items[nextIndex]?.focus();
    };

    if ((!open && !shouldRender) || typeof document === "undefined")
      return null;

    return createPortal(
      <div
        ref={setMenuRef}
        role="menu"
        tabIndex={-1}
        aria-label={ariaLabel}
        aria-orientation="vertical"
        data-sito-ui="context-menu"
        data-state={isClosing ? "closed" : "open"}
        className={classNames("sito-ui-context-menu", className)}
        style={{ left: position.x, top: position.y }}
        aria-hidden={isInteractive ? undefined : true}
        inert={!isInteractive}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
      >
        {children}
      </div>,
      portalContainer ?? document.body,
    );
  },
);
