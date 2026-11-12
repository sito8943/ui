import {
  type FocusEvent as ReactFocusEvent,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { classNames, getCssDurationMs } from "@/utils";
import {
  CONTEXT_MENU_ITEM_SELECTOR,
  CONTEXT_MENU_SUBMENU_ALIGN_OFFSET,
  CONTEXT_MENU_SUBMENU_CLOSE_DELAY_MS,
  CONTEXT_MENU_SUBMENU_GAP,
} from "./constants";
import { ContextMenuContext } from "./ContextMenuContext";
import { ChevronRightIcon } from "./icons";
import type { ContextMenuContextValue, ContextMenuSubmenuProps } from "./types";
import { focusHoveredItem, getMenuItems, getNavigationTarget } from "./utils";

const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const ContextMenuSubmenu = forwardRef<
  HTMLButtonElement,
  ContextMenuSubmenuProps
>(function ContextMenuSubmenu(
  {
    label,
    leading,
    children,
    className,
    menuClassName,
    disabled,
    id,
    onClick,
    onKeyDown,
    onBlur,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    ...rest
  },
  ref,
) {
  const parent = useContext(ContextMenuContext);
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const flyoutRef = useRef<HTMLDivElement | null>(null);
  const unregisterFlyoutRef = useRef<(() => void) | null>(null);
  // Flyouts of nested submenus, so presses inside them count as inside this one.
  const descendantFlyoutsRef = useRef(new Set<HTMLElement>());
  const closeTimeoutRef = useRef<number | null>(null);
  const focusFirstOnOpenRef = useRef(false);
  const isOpen = open && parent.isInteractive && !disabled;

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const { registerFlyout: registerWithParent } = parent;

  const setFlyoutRef = useCallback(
    (node: HTMLDivElement | null) => {
      unregisterFlyoutRef.current?.();
      unregisterFlyoutRef.current = node ? registerWithParent(node) : null;
      flyoutRef.current = node;
    },
    [registerWithParent],
  );

  const containsTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    return (
      Boolean(triggerRef.current?.contains(target)) ||
      Boolean(flyoutRef.current?.contains(target)) ||
      Array.from(descendantFlyoutsRef.current).some((flyout) =>
        flyout.contains(target),
      )
    );
  }, []);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current === null) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const openSubmenu = useCallback(() => {
    clearCloseTimeout();
    setOpen(true);
  }, [clearCloseTimeout]);

  const closeSubmenu = useCallback(
    ({ restoreFocus }: { restoreFocus: boolean }) => {
      clearCloseTimeout();
      const activeElement = triggerRef.current?.ownerDocument.activeElement;
      const hasFocusInside =
        activeElement !== triggerRef.current &&
        containsTarget(activeElement ?? null);
      // Keep keyboard navigation alive: focus inside an unmounting flyout
      // would otherwise fall back to the document body.
      if (restoreFocus || hasFocusInside) {
        triggerRef.current?.focus({ preventScroll: true });
      }
      setOpen(false);
    },
    [clearCloseTimeout, containsTarget],
  );

  // Grace delay so the pointer can travel from the row onto the flyout.
  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    const delay = triggerRef.current
      ? getCssDurationMs(
          triggerRef.current,
          "--sito-ui-context-menu-submenu-close-delay",
          CONTEXT_MENU_SUBMENU_CLOSE_DELAY_MS,
        )
      : CONTEXT_MENU_SUBMENU_CLOSE_DELAY_MS;
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      closeSubmenu({ restoreFocus: false });
    }, delay);
  }, [clearCloseTimeout, closeSubmenu]);

  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  // A closing (or closed) parent menu also resets this submenu, so reopening
  // the menu never shows a stale flyout.
  useEffect(() => {
    if (parent.isInteractive) return;
    clearCloseTimeout();
    setOpen(false);
  }, [clearCloseTimeout, parent.isInteractive]);

  useEffect(
    () => () => {
      unregisterFlyoutRef.current?.();
      unregisterFlyoutRef.current = null;
    },
    [],
  );

  // Place the flyout beside its row: right side first, flipped left when it
  // would overflow, then clamped to the viewport.
  useClientLayoutEffect(() => {
    const trigger = triggerRef.current;
    const flyout = flyoutRef.current;
    if (!isOpen || !trigger || !flyout) return;

    const padding = parent.viewportPadding;
    const anchor = trigger.getBoundingClientRect();
    let left = anchor.right + CONTEXT_MENU_SUBMENU_GAP;
    if (left + flyout.offsetWidth > window.innerWidth - padding) {
      left = anchor.left - flyout.offsetWidth - CONTEXT_MENU_SUBMENU_GAP;
    }
    left = Math.max(padding, left);

    const maxTop = window.innerHeight - flyout.offsetHeight - padding;
    const top = Math.max(
      padding,
      Math.min(anchor.top - CONTEXT_MENU_SUBMENU_ALIGN_OFFSET, maxTop),
    );

    flyout.style.left = `${left}px`;
    flyout.style.top = `${top}px`;

    if (focusFirstOnOpenRef.current) {
      focusFirstOnOpenRef.current = false;
      getMenuItems(flyout)[0]?.focus();
    }
  }, [isOpen, parent.viewportPadding]);

  // The flyout is portaled, so close it on any press outside it and its row
  // (for example on a sibling row while the menu stays open).
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containsTarget(event.target)) closeSubmenu({ restoreFocus: false });
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closeSubmenu, containsTarget, isOpen]);

  const openAndFocusFirst = () => {
    clearCloseTimeout();
    const firstItem = getMenuItems(flyoutRef.current)[0];
    if (isOpen && firstItem) {
      firstItem.focus();
      return;
    }
    focusFirstOnOpenRef.current = true;
    setOpen(true);
  };

  const handleTriggerPointerEnter = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    onPointerEnter?.(event);
    focusHoveredItem(event);
    if (!disabled) openSubmenu();
  };

  const handleTriggerPointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    onPointerMove?.(event);
    focusHoveredItem(event);
  };

  const handleTriggerPointerLeave = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    onPointerLeave?.(event);
    if (isOpen) scheduleClose();
  };

  const handleTriggerClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // `detail === 0`: activated from the keyboard (Enter / Space).
    if (event.detail === 0) {
      openAndFocusFirst();
    } else {
      openSubmenu();
    }
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== "ArrowRight") return;
    event.preventDefault();
    event.stopPropagation();
    openAndFocusFirst();
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    // Focus left the row and its flyouts (e.g. ArrowDown to a sibling row).
    if (
      isOpen &&
      event.relatedTarget !== null &&
      !containsTarget(event.relatedTarget)
    ) {
      scheduleClose();
    }
  };

  const handleTriggerBlur = (event: ReactFocusEvent<HTMLButtonElement>) => {
    onBlur?.(event);
    handleBlur(event);
  };

  const handleFlyoutKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeSubmenu({ restoreFocus: true });
      return;
    }

    const nextItem = getNavigationTarget(
      event.key,
      getMenuItems(flyoutRef.current),
      document.activeElement,
    );
    if (!nextItem) return;
    event.preventDefault();
    event.stopPropagation();
    nextItem.focus();
  };

  // A picked sub-item closes the flyout; the consumer's `onClick` closes the
  // menu, as with top-level items. Rows that open a nested submenu don't.
  const handleFlyoutClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest(CONTEXT_MENU_ITEM_SELECTOR);
    if (!item || item.hasAttribute("aria-haspopup")) return;
    closeSubmenu({ restoreFocus: true });
  };

  const registerFlyout = useCallback(
    (element: HTMLElement) => {
      descendantFlyoutsRef.current.add(element);
      const unregisterFromParent = registerWithParent(element);
      return () => {
        descendantFlyoutsRef.current.delete(element);
        unregisterFromParent();
      };
    },
    [registerWithParent],
  );

  const contextValue = useMemo<ContextMenuContextValue>(
    () => ({
      isInteractive: isOpen,
      portalContainer: parent.portalContainer,
      viewportPadding: parent.viewportPadding,
      registerFlyout,
    }),
    [isOpen, parent.portalContainer, parent.viewportPadding, registerFlyout],
  );

  return (
    <>
      <button
        {...rest}
        ref={setTriggerRef}
        id={triggerId}
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-sito-ui="context-menu-submenu-trigger"
        data-state={isOpen ? "open" : "closed"}
        className={classNames(
          "sito-ui-context-menu__item",
          "sito-ui-context-menu__item--submenu",
          className,
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        onBlur={handleTriggerBlur}
        onPointerEnter={handleTriggerPointerEnter}
        onPointerMove={handleTriggerPointerMove}
        onPointerLeave={handleTriggerPointerLeave}
      >
        <span className="sito-ui-context-menu__leading" aria-hidden="true">
          {leading}
        </span>
        <span className="sito-ui-context-menu__label">{label}</span>
        <span
          className="sito-ui-context-menu__submenu-indicator"
          aria-hidden="true"
        >
          <ChevronRightIcon />
        </span>
      </button>
      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={setFlyoutRef}
              role="menu"
              tabIndex={-1}
              aria-labelledby={triggerId}
              aria-orientation="vertical"
              data-sito-ui="context-menu-submenu"
              data-state="open"
              className={classNames(
                "sito-ui-context-menu",
                "sito-ui-context-menu--submenu",
                menuClassName,
              )}
              onKeyDown={handleFlyoutKeyDown}
              onClick={handleFlyoutClick}
              onBlur={handleBlur}
              onPointerEnter={openSubmenu}
              onPointerLeave={scheduleClose}
              onContextMenu={(event) => event.preventDefault()}
            >
              <ContextMenuContext.Provider value={contextValue}>
                {children}
              </ContextMenuContext.Provider>
            </div>,
            parent.portalContainer ?? document.body,
          )
        : null}
    </>
  );
});
