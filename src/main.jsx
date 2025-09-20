import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Register the SW
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    // optional: show toast/button "New version available - click to refresh"
    console.log("New content available, refresh to update.");
  },
  onOfflineReady() {
    // optional: show "App ready to work offline" message
    console.log("App ready to work offline.");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
