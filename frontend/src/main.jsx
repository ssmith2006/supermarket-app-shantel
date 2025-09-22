import React from "react";
import ReactDOM from "react-dom/client";
import App from "/workspaces/supermarket-app-shantel/frontend/src/App";
import { BrowserRouter } from "react-router-dom";
import "/workspaces/supermarket-app-shantel/frontend/src/index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
