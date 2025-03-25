import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// context
import { GlobalContextProvider } from "./context/globalContext.jsx";

// react toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
    <ToastContainer position="bottom-right" />
  </GlobalContextProvider>,
);
