import { useContext, createContext, useReducer } from "react";

// lib
import { NotificationEnumType, NotificationType } from "lib";
import {
  NotificationProviderProps,
  NotificationContextType,
  NotificationActionType,
} from "./types";

const NotificationContext = createContext({} as NotificationContextType);

export function NotificationProvider(props: NotificationProviderProps) {
  const { children, container = document.body } = props;

  const [notification, dispatch] = useReducer(
    (state: NotificationType[], action: NotificationActionType) => {
      const { type, items, index } = action;

      switch (type) {
        case "set":
          return (
            items?.map((item: NotificationType, i: number) => ({
              ...item,
              id: i,
            })) ?? []
          );
        case "remove":
          if (index) return state.filter((_, i) => i !== index);
          return [];
      }
      return state;
    },
    [] as NotificationType[],
    () => [] as NotificationType[]
  );

  const showErrorNotification = (options: NotificationType) =>
    dispatch({
      type: "set",
      items: [{ ...options, type: NotificationEnumType.error }],
    });

  const showNotification = (options: NotificationType) =>
    dispatch({
      type: "set",
      items: [{ ...options }],
    });

  const showStackNotifications = (notifications: NotificationType[]) =>
    dispatch({ type: "set", items: notifications });

  const showSuccessNotification = (options: NotificationType) =>
    dispatch({
      type: "set",
      items: [{ ...options, type: NotificationEnumType.success }],
    });

  const removeNotification = (index?: number) =>
    dispatch({ type: "remove", index });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        container,
        removeNotification,
        showErrorNotification,
        showNotification,
        showSuccessNotification,
        showStackNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

/**
 *
 * @returns notification context
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined)
    throw new Error("NotificationContext must be used within a Provider");
  return context;
};
