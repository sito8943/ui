import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ModeProvider } from "./providers/ModeProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <ModeProvider>
      <App />
    </ModeProvider>
  </React.StrictMode>
);
