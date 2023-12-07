import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// types
import { ButtonProps } from "components/Button";

export interface ErrorProps {
  onRetry?: () => void | undefined;
  icon?: IconDefinition | undefined;
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


