import { Ref, useRef } from "react";

// components
import { Button } from "components/Button";

// providers
import { useStyle } from "providers";

// types
import { ErrorProps } from "./types";

// styles
import { makeStyles } from "./styles";

export const Error = (props: ErrorProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { colors } = useStyle();
  const styles = makeStyles(colors);

  const {
    onRetry = () => window.location.reload(),
    className = "",
    title = "Something went wrong",
    text,
    button = "Try again",
    buttonProps,
  } = props;

  return (
    <div role="alert" className={`error-root ${styles.root} ${className}`}>
      <svg
        className="s-error-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      </svg>
      <p className="s-error-title">{title}</p>
      <pre className="s-error-body">{text}</pre>
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
