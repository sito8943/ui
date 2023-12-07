// actions
import { Button, ButtonProps } from "components/Button/";
import { IconButton, IconButtonProps } from "./IconButton/";
// form
import InputControl, { InputControlProps } from "./InputControl/Input";
import SelectControl, { SelectControlProps } from "./InputControl/Select";
import TextareaControl, { TextareaControlProps } from "./InputControl/Textarea";
import Switcher, { SwitcherProps } from "./Switch/Switch";

// display
import { Image, ImageProps } from "./Image/";
import PrintAfter, { PrintAfterProps } from "./PrintAfter/PrintAfter";

// complex components
import ToTop from "./ToTop/ToTop";
import Notification, { NotificationProps } from "./Notification/Notification";
import Loading, { LoadingProps } from "./Loading/Loading";
import Handler, { ErrorFallbackProps, HandlerProps } from "./Error/Handler";
import Error, { ErrorProps } from "./Error/Error";

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
};
