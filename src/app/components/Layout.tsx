import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import SpeechBar from './SpeechBar';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Only show speech bar on sentence building page
  const showSpeechBar = location.pathname === '/';

  return (
    <div className={theme === 'dark' ? 'dark bg-[#2a3040] min-h-screen' : 'bg-[#e8ecf1] min-h-screen'}>
      <Header />
      {showSpeechBar && <SpeechBar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}