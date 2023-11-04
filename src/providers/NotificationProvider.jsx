import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const NotificationContext = React.createContext();

const notificationReducer = (notificationState, action) => {
  const { type, message } = action;
  switch (action.type) {
    case "hide": {
      return { ...notificationState, visible: false };
    }
    case "error":
    case "info":
    case "warning":
    case "success":
      return { visible: true, message, type };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NotificationProvider = ({ children }) => {
  const [notificationState, setNotificationState] = React.useReducer(
    notificationReducer,
    {
      visible: false,
      type: "success",
      message: "message",
    }
  );

  const value = { notificationState, setNotificationState };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined)
    throw new Error("notificationContext must be used within a Provider");
  return context;
};

export { NotificationProvider, useNotification };
