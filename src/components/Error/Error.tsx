// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

// components
import Button, { ButtonProps } from "../Button/Button";
import { ForwardedRef, HTMLProps, Ref, useRef } from "react";

export interface ErrorProps {
  onRetry: () => void;
  icon?: IconDefinition | undefined;
  title: string;
  text: string;
  button?: string;
  buttonProps?: ButtonProps;
}

export const Error = (props: ErrorProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    onRetry,
    title,
    text,
    icon = faCircleExclamation,
    button = "Reload",
    buttonProps,
  } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-screen">
      <h3 className="font-bold text-error text-2xl">
        <FontAwesomeIcon icon={icon} className="mr-1" />
        {title}
      </h3>
      <p className="text-error">{text}</p>
      {onRetry ? (
        <Button
          name="reload"
          onClick={onRetry}
          className="primary submit"
          aria-label="click to reload"
          {...buttonProps}
          ref={buttonRef as Ref<HTMLButtonElement>}
        >
          {button}
        </Button>
      ) : null}
    </div>
  );
};

export default Error;
