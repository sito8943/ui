// actions
import { Button, ButtonProps } from "components/Button/";
import { IconButton, IconButtonProps } from "./IconButton";
// form
import {
  InputControl,
  SelectControl,
  TextareaControl,
  InputControlProps,
  SelectControlProps,
  TextareaControlProps,
} from "./InputControl";
import Switcher, { SwitcherProps } from "./Switch/Switch";

// display
import { Image, ImageProps } from "./Image";
import { PrintAfter, PrintAfterProps } from "./PrintAfter";

// complex components
import { ToTop, ToTopProps } from "./ToTop";
import { Notification, NotificationProps } from "./Notification";
import { Loading, LoadingProps } from "./Loading";
import {
  Handler,
  ErrorFallbackProps,
  Error,
  ErrorProps,
  HandlerProps,
} from "./Error";

export {
  Button,
  IconButton,
  InputControl,
  SelectControl,
  TextareaControl,
  Switcher,
  Image,
  PrintAfter,
  ToTop,
  Notification,
  Loading,
  Handler,
  Error,
};
export type {
  ErrorFallbackProps,
  HandlerProps,
  ErrorProps,
  ButtonProps,
  IconButtonProps,
  InputControlProps,
  SelectControlProps,
  TextareaControlProps,
  SwitcherProps,
  ImageProps,
  PrintAfterProps,
  NotificationProps,
  LoadingProps,
  ToTopProps,
};
