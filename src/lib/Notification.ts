export enum NotificationEnumType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export type NotificationType = {
  message: string;
  type: NotificationEnumType;
  id: number;
};
