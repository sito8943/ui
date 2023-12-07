import { Ref, useRef } from "react";
// @fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

// components
import { Button, ButtonProps } from "components/Button";

export interface ErrorProps {
  onRetry?: () => void | undefined;
  icon?: IconDefinition | undefined;
  title?: string | undefined;
  text: string;
  button?: string | undefined;
  buttonProps?: ButtonProps;
  className?: string | undefined;
}

export const Error = (props: ErrorProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    onRetry = () => window.location.reload(),
    className = "",
    title = "Something went wrong",
    text,
    icon = faCircleExclamation,
    button = "Try again",
    buttonProps,
  } = props;

  return (
    <div
      role="alert"
      className={`w-full flex flex-col items-center justify-center gap-3 min-h-screen ${className}`}
    >
      <p>
        <FontAwesomeIcon icon={icon} className="mr-1" />
        {title}
      </p>
      <pre className="text-error">{text}</pre>
      {onRetry ? (
        <Button
          name="reload"
          onClick={onRetry}
          shape="filled"
          color="primary"
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
