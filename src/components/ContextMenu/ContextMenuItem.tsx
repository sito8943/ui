import { forwardRef } from "react";

import { classNames } from "../../utils";
import type { ContextMenuItemProps } from "./types";

export const ContextMenuItem = forwardRef<
  HTMLButtonElement,
  ContextMenuItemProps
>(function ContextMenuItem(
  { leading, shortcut, children, className, disabled, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      data-sito-ui="context-menu-item"
      className={classNames("sito-ui-context-menu__item", className)}
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
    </button>
  );
});
