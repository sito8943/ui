import { classNames } from "../../utils";
import { Button } from "../Button";
import type { DialogActionsProps } from "./types";

/**
 * Renders primary, extra, and cancel actions for a dialog.
 * @param props Action labels, handlers, and button state.
 * @returns The dialog actions container.
 */
export const DialogActions = (props: DialogActionsProps) => {
  const {
    primaryText,
    cancelText,
    onPrimaryClick,
    onCancel,
    isLoading = false,
    loadingIndicator = null,
    disabled = false,
    primaryType = "submit",
    containerClassName,
    primaryClassName,
    cancelClassName,
    alignEnd = false,
    primaryName,
    primaryAriaLabel,
    cancelName,
    cancelAriaLabel,
    extraActions = [],
  } = props;

  return (
    <div
      data-sito-ui="dialog-actions"
      className={classNames(
        "sito-ui-dialog-actions",
        alignEnd && "sito-ui-dialog-actions--end",
        containerClassName,
      )}
    >
      <Button
        type={primaryType}
        color="primary"
        variant="submit"
        className={primaryClassName}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        onClick={onPrimaryClick}
        name={primaryName}
        aria-label={primaryAriaLabel}
      >
        {isLoading ? loadingIndicator : null}
        {primaryText}
      </Button>
      {extraActions.map(({ id, ...action }) => (
        <Button key={id} {...action} />
      ))}
      <Button
        type="button"
        variant="outlined"
        className={cancelClassName}
        disabled={disabled || isLoading}
        onClick={onCancel}
        name={cancelName}
        aria-label={cancelAriaLabel}
      >
        {cancelText}
      </Button>
    </div>
  );
};
