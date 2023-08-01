import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import AppContext from "./Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContext>
    <ToastContainer position="top-center" autoClose={2000} />
    <App />
  </AppContext>
);
