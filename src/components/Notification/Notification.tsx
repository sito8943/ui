import { useRef, useState, useEffect, useMemo, useCallback } from "react";

// @fortawesome
import { faClose } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useNotification } from "../../providers/NotificationProvider";

// components
import IconButton, { IconButtonProps } from "../IconButton/IconButton";

// styles
import "./styles.css";

export interface NotificationProps {
  closeProps?: IconButtonProps | undefined;
}

export default function Notification(props: NotificationProps) {
  const { closeProps } = props;
  const { notificationState, setNotificationState } = useNotification();

  const [open, setOpen] = useState(false);
  const [openR, setOpenR] = useState(false);

  useEffect(() => {
    if (notificationState.visible) {
      setOpen(true);
      setOpenR(true);
      setTimeout(() => {
        setNotificationState({ type: "hide" });
      }, 6000);
    }
  }, [notificationState, setNotificationState]);

  const handleClose = useCallback(() => {
    if (open) setOpen(false);
    if (openR) setTimeout(() => setOpenR(false), 400);
    setNotificationState({ type: "hide" });
  }, [open, openR, setNotificationState]);

  const color = useMemo(() => {
    switch (notificationState.type) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "success":
        return "success";
      default:
        return "error";
    }
  }, [notificationState]);

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
        <div className={`relative notification rounded-xl p-5 pr-10 ${color}`}>
          <IconButton
            {...closeProps}
            icon={faClose}
            ref={null}
            onClick={handleClose}
            name="close-notification"
            className={`absolute top-1 right-1 text-white ${closeProps?.className}`}
          />
          <p className="text-body1 text-white">{notificationState.message}</p>
        </div>
      ) : null}
    </div>
  );
}
