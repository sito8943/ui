import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { classNames, getCssDurationMs, prefersReducedMotion } from "@/utils";
import {
  CONTEXT_MENU_EXIT_DURATION_MS,
  CONTEXT_MENU_ITEM_SELECTOR,
  CONTEXT_MENU_VIEWPORT_PADDING,
} from "./constants";
import { ContextMenuContext } from "./ContextMenuContext";
import type { ContextMenuContextValue, ContextMenuProps } from "./types";
import { getMenuItems, getNavigationTarget } from "./utils";

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
    // Submenu flyouts are portaled outside the menu element; presses inside
    // them still count as inside the menu.
    const flyoutsRef = useRef(new Set<HTMLElement>());
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
        const isInside =
          target instanceof Node &&
          (menuRef.current?.contains(target) ||
            Array.from(flyoutsRef.current).some((flyout) =>
              flyout.contains(target),
            ));
        if (!isInside) onClose();
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

      const nextItem = getNavigationTarget(
        event.key,
        getMenuItems(menuRef.current),
        document.activeElement,
      );
      if (!nextItem) return;
      event.preventDefault();
      nextItem.focus();
    };

    const registerFlyout = useCallback((element: HTMLElement) => {
      flyoutsRef.current.add(element);
      return () => {
        flyoutsRef.current.delete(element);
      };
    }, []);

    const contextValue = useMemo<ContextMenuContextValue>(
      () => ({
        isInteractive,
        portalContainer,
        viewportPadding,
        registerFlyout,
      }),
      [isInteractive, portalContainer, registerFlyout, viewportPadding],
    );

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
        <ContextMenuContext.Provider value={contextValue}>
          {children}
        </ContextMenuContext.Provider>
      </div>,
      portalContainer ?? document.body,
    );
  },
);
