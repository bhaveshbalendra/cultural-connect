import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="bottom-center" richColors />
    </Provider>
  </React.StrictMode>
);
