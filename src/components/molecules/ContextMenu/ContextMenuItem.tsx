import { forwardRef, type PointerEvent as ReactPointerEvent } from "react";

import { classNames } from "@/utils";
import { CONTEXT_MENU_ITEM_COLORS } from "./constants";
import { CheckIcon } from "./icons";
import type { ContextMenuItemProps } from "./types";
import { focusHoveredItem } from "./utils";

export const ContextMenuItem = forwardRef<
  HTMLButtonElement,
  ContextMenuItemProps
>(function ContextMenuItem(
  {
    leading,
    shortcut,
    checked,
    color = CONTEXT_MENU_ITEM_COLORS.DEFAULT,
    children,
    className,
    disabled,
    onPointerEnter,
    onPointerMove,
    ...rest
  },
  ref,
) {
  const isCheckable = checked !== undefined;

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerEnter?.(event);
    focusHoveredItem(event);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event);
    focusHoveredItem(event);
  };

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      role={isCheckable ? "menuitemcheckbox" : "menuitem"}
      aria-checked={isCheckable ? checked : undefined}
      tabIndex={-1}
      disabled={disabled}
      data-sito-ui="context-menu-item"
      data-color={color}
      className={classNames(
        "sito-ui-context-menu__item",
        `sito-ui-context-menu__item--${color}`,
        className,
      )}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
    >
      <span className="sito-ui-context-menu__leading" aria-hidden="true">
        {leading}
      </span>
      <span className="sito-ui-context-menu__label">{children}</span>
      {shortcut ? (
        <span className="sito-ui-context-menu__shortcut" aria-hidden="true">
          {shortcut}
        </span>
      ) : null}
      {checked ? (
        <span className="sito-ui-context-menu__check" aria-hidden="true">
          <CheckIcon />
        </span>
      ) : null}
    </button>
  );
});
