import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ModeProvider } from "./providers/ModeProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

import "./assets/animations/appear.css";
import "./assets/animations/grow.css";
import "./assets/animations/shake.css";

root.render(
  <React.StrictMode>
    <ModeProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ModeProvider>
  </React.StrictMode>
);
