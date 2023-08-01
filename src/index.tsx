import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ENV } from "types";

/**
 * Note: If you want to allow mock-service-worker only for DEVELOPMENT environment,
 *  then remove `ENV.PRODUCTION` from the list.
 */
if ([ENV.DEVELOPMENT, ENV.PRODUCTION].includes(process.env.NODE_ENV as ENV)) {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
