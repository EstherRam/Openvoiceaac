import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";

import { ThemeProvider } from "./app/contexts/ThemeContext";
import { SpeechProvider } from "./app/contexts/SpeechContext";
import { CustomWordsProvider } from "./app/contexts/CustomWordsContext";
import { HiddenWordsProvider } from "./app/contexts/HiddenWordsContext";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SpeechProvider>
      <CustomWordsProvider>
        <HiddenWordsProvider>
          <RouterProvider router={router} />
        </HiddenWordsProvider>
      </CustomWordsProvider>
    </SpeechProvider>
  </ThemeProvider>
);
