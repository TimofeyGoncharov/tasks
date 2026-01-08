import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css";
import { makeServer } from "./mock/server";

if (import.meta.env.VITE_USE_MOCK_API === "true") {
  makeServer({ environment: "development" });
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
