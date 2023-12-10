import { ReactNode } from "react";

export interface NotificationProviderData {
  notification: NotificationType;
  setNotification: React.Dispatch<NotificationActionType>;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

export interface NotificationType {
  visible: boolean;
  type: "success" | "error" | "info" | "warning" | "hide";
  message: string;
}

export interface NotificationActionType {
  type: "hide" | "success" | "error" | "info" | "warning";
  message?: string;
}
