import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalContextProvider } from "./context/ModalContext.tsx";
import { TodoContextProvider } from "./context/TodoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </TodoContextProvider>
  </StrictMode>
);
