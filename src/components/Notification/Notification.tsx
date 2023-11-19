import { useRef, useState, useEffect, useMemo, useCallback } from "react";

// @fortawesome
import { faClose } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useNotification } from "../../providers/NotificationProvider";

// components
import IconButton, { IconButtonProps } from "../IconButton/IconButton";

export interface NotificationProps {
  closeProps?: IconButtonProps | undefined;
}

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

  return (
    <div
      ref={ref}
      className={`fixed left-1 bottom-1 z-40 ${open ? "appear" : "disappear"}`}
    >
      {openR ? (
        <div className={`relative notification rounded-xl ${color}`}>
          <IconButton
            {...closeProps}
            icon={faClose}
            ref={null}
            onClick={handleClose}
            name="close-notification"
            className={`absolute top-1 right-1 text-light-default ${closeProps?.className}`}
          />
          <p>{notification.message}</p>
        </div>
      ) : null}
    </div>
  );
}
