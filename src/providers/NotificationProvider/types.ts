import { ReactNode } from "react";

// lib
import { NotificationType } from "lib";

export interface NotificationProviderProps {
  children: ReactNode;
  container: Element | DocumentFragment;
}

export type NotificationActionType = {
  type: "set" | "remove";
  items?: NotificationType[];
  index?: number;
};

export type NotificationContextType = {
  notification: NotificationType[];
  container: Element | DocumentFragment;
  removeNotification: (index?: number) => void;
  showErrorNotification: (options: NotificationType) => void;
  showNotification: (options: NotificationType) => void;
  showSuccessNotification: (options: NotificationType) => void;
  showStackNotifications: (notifications: NotificationType[]) => void;
};
