import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
