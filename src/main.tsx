import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CitiesProvider from "./context/CitiesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CitiesProvider>
      <App />
    </CitiesProvider>
  </StrictMode>
);
