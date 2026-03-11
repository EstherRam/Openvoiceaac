import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";

import { ThemeProvider } from "./app/contexts/ThemeContext";
import { SpeechProvider } from "./app/contexts/SpeechContext";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SpeechProvider>
      <RouterProvider router={router} />
    </SpeechProvider>
  </ThemeProvider>
);
