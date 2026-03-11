import { Outlet, useLocation } from 'react-router-dom';
import Header from "./Header";
import SpeechBar from "./SpeechBar";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

function LayoutContent() {
  const { theme } = useTheme();
  const location = useLocation();

  const showSpeechBar = location.pathname === "/";

  return (
    <div className={theme === "dark" ? "dark bg-[#2a3040] min-h-screen" : "bg-[#e8ecf1] min-h-screen"}>
      <Header />
      {showSpeechBar && <SpeechBar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
