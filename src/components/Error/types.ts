import { ReactNode } from "react";

// types
import { ButtonProps } from "components/Button";

export interface ErrorProps {
  onRetry?: () => void | undefined;
  title?: string | undefined;
  text: string;
  button?: string | undefined;
  buttonProps?: ButtonProps;
  className?: string | undefined;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void | undefined;
}

export interface HandlerProps {
  children: ReactNode;
  onRetry?: () => void | undefined;
}
