import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// components
import Error from "./Error";

// types
import { ErrorFallbackProps, HandlerProps } from "./types";

export const ErrorFallback = (props: ErrorFallbackProps) => {
  const { error, resetErrorBoundary } = props;
  return <Error onRetry={resetErrorBoundary} text={error.message} />;
};

export default function Handler(props: HandlerProps) {
  const { children, onRetry } = props;
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={onRetry}>
      {children}
    </ReactErrorBoundary>
  );
}
