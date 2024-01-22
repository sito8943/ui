import { useRef, useState, useEffect, useMemo, useCallback } from "react";

// @fortawesome
import faClose from "../../assets/images/xmark-solid.svg";

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
              <img
                className="close-notification-icon"
                src={faClose}
                alt="font awesome close icon"
              />
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
