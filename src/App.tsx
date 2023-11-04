import { useEffect } from "react";
import Notification from "./components/Notification/Notification";

import { useNotification } from "./providers/NotificationProvider";

function App() {
  const { setNotificationState } = useNotification();

  useEffect(() => {
    setNotificationState({ type: "error", message: "This is an error" });
  }, []);

  return (
    <div>
      <Notification />
    </div>
  );
}

export default App;
