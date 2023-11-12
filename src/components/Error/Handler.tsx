import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// components
import Error from "./Error";

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void | undefined;
}

export interface HandlerProps {
  children: ReactNode;
  onRetry?: () => void | undefined;
}

const ErrorFallback = (props: ErrorFallbackProps) => {
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
