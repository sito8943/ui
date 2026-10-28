import { classNames } from "../../../utils";
import { Button } from "../../atoms/Button";
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
    primaryProps,
    cancelProps,
    isLoading = false,
    loadingIndicator,
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
        {...primaryProps}
        type={primaryProps?.type ?? primaryType}
        color={primaryProps?.color ?? "primary"}
        variant={primaryProps?.variant ?? "submit"}
        className={classNames(primaryClassName, primaryProps?.className)}
        disabled={disabled}
        loading={isLoading}
        loadingIndicator={loadingIndicator}
        onClick={primaryProps?.onClick ?? onPrimaryClick}
        name={primaryProps?.name ?? primaryName}
        aria-label={primaryProps?.["aria-label"] ?? primaryAriaLabel}
      >
        {primaryProps?.children ?? primaryText}
      </Button>
      {extraActions.map(({ id, ...action }) => (
        <Button key={id} {...action} disabled={isLoading || action.disabled} />
      ))}
      {cancelText !== undefined || cancelProps?.children !== undefined ? (
        <Button
          {...cancelProps}
          type={cancelProps?.type ?? "button"}
          variant={cancelProps?.variant ?? "outlined"}
          className={classNames(cancelClassName, cancelProps?.className)}
          disabled={disabled || isLoading}
          onClick={cancelProps?.onClick ?? onCancel}
          name={cancelProps?.name ?? cancelName}
          aria-label={cancelProps?.["aria-label"] ?? cancelAriaLabel}
        >
          {cancelText ?? cancelProps?.children}
        </Button>
      ) : null}
    </div>
  );
};
