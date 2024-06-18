import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyProvider } from "./lib/Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyProvider>
      <div
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        <App />
      </div>
    </MyProvider>
  </React.StrictMode>
);
