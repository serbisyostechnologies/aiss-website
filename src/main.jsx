import { createRoot } from "react-dom/client";
import ReduxProvider from "./providers/ReduxProvider";
import "./styles/globals.css";
import App from "./App.jsx";
import './api/interceptors.js'

createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
);