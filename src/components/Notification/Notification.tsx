import { useCallback, useEffect } from "react";

// providers
import { useStyle, useNotification } from "providers/";

// components
import { IconButton } from "components/IconButton";

// types
import { NotificationEnumType } from "lib";
import { NotificationProps } from "./types";

// styles
import { makeStyles } from "./styles";

export default function Notification(props: NotificationProps) {
  const { closeProps } = props;
  const { notification, container, removeNotification } = useNotification();

  const onClose = useCallback(
    (index?: number) => removeNotification(index),
    [removeNotification]
  );

  const color = useCallback((type: NotificationEnumType) => {
    switch (type) {
      case NotificationEnumType.info:
        return "info";
      case NotificationEnumType.warning:
        return "warning";
      case NotificationEnumType.success:
        return "success";
      default:
        return "error";
    }
  }, []);

  useEffect(() => {
    if (notification?.length) window.addEventListener("click", () => onClose());
    return () => {
      if (notification?.length)
        window.removeEventListener("click", () => onClose());
    };
  }, [notification, onClose]);

  const { colors } = useStyle();

  return (
    <div
      className={`notification-portal ${
        notification?.length ? "w-screen h-screen" : ""
      }`}
    >
      {notification?.length
        ? notification?.map(({ id, type, message }, i) => {
            const styles = makeStyles(colors, color(type));
            return (
              <div key={id} className={`notification-root ${styles.root}`}>
                <IconButton
                  name="close-notification"
                  {...closeProps}
                  icon={
                    <svg
                      className="close-notification-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  }
                  ref={null}
                  color="basics"
                  onClick={() => onClose(i)}
                  className={`notification-close-button ${closeProps?.className}`}
                />
                <p>{message}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}
