// types
import { IconButtonProps } from "components/IconButton/types";

export interface ToTopProps extends IconButtonProps {
  position:
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left"
    | undefined;
}
