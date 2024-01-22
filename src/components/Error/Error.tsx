import { Ref, useRef } from "react";

// @fortawesome
import faCircleExclamation from "../../assets/images/circle-exclamation-solid.svg";

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
      <p>
        <img
          src={faCircleExclamation}
          alt="font awesome circle exclamation"
          className="s-error-icon"
        />
        {title}
      </p>
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
