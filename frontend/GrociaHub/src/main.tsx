import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import api from "../api/index.ts";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <ApiProvider api={api}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </ApiProvider>
);
