import { HTMLProps, ReactNode } from "react";

// styles
import { ColorVariants } from "providers/StyleProvider";

export interface InputControlProps extends HTMLProps<HTMLInputElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: ColorVariants | undefined;
  orientation?: "column" | "row" | undefined;
  label: string | undefined;
  helperText?: string | undefined;
  type?:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "text"
    | undefined;
}

export interface SelectControlProps extends HTMLProps<HTMLSelectElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: ColorVariants | undefined;
  orientation?: "column" | "row" | undefined;
  label: string | undefined;
  helperText?: string | undefined;
}

export interface TextareaControlProps extends HTMLProps<HTMLTextAreaElement> {
  leftComponent?: ReactNode | undefined;
  rightComponent?: ReactNode | undefined;
  color?: ColorVariants | undefined;
  orientation?: "column" | "row" | undefined;
  label: string | undefined;
  helperText?: string | undefined;
}
