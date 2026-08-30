import { classNames } from "../../utils";
import type { ContextMenuSeparatorProps } from "./types";

export const ContextMenuSeparator = ({
  className,
  ...rest
}: ContextMenuSeparatorProps) => (
  <div
    {...rest}
    role="separator"
    data-sito-ui="context-menu-separator"
    className={classNames("sito-ui-context-menu__separator", className)}
  />
);
