import { useRef, useState, useEffect, useMemo, useCallback } from "react";

// providers
import { useStyle, useNotification } from "providers/";

// components
import { IconButton } from "components/IconButton";

// types
import { NotificationProps } from "./types";

// styles
import { makeStyles } from "./styles";

export default function Notification(props: NotificationProps) {
  const { closeProps } = props;
  const { notification, setNotification } = useNotification();

  const [open, setOpen] = useState(false);
  const [openR, setOpenR] = useState(false);

  useEffect(() => {
    if (notification.visible) {
      setOpen(true);
      setOpenR(true);
      setTimeout(() => {
        setNotification({ type: "hide" });
      }, 6000);
    }
  }, [notification, setNotification]);

  const handleClose = useCallback(() => {
    if (open) setOpen(false);
    if (openR) setTimeout(() => setOpenR(false), 400);
    setNotification({ type: "hide" });
  }, [open, openR, setNotification]);

  const color = useMemo(() => {
    switch (notification.type) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "success":
        return "success";
      default:
        return "error";
    }
  }, [notification]);

  const ref = useRef(null);

  useEffect(() => {
    if (openR) window.addEventListener("click", handleClose);
    else window.removeEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [openR, ref, handleClose]);

  const { colors } = useStyle();
  const styles = makeStyles(colors, color);

  return (
    <div
      ref={ref}
      className={`notification-root ${styles.root} ${
        open ? "appear" : "disappear"
      }`}
    >
      {openR ? (
        <div className={`notification`}>
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
            onClick={handleClose}
            className={`notification-close-button ${closeProps?.className}`}
          />
          <p>{notification.message}</p>
        </div>
      ) : null}
    </div>
  );
}
