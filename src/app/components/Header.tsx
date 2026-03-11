import { Link, useLocation } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';
import {
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  Heart,
  Lightbulb,
  Moon,
  Sun
} from 'lucide-react';
import svgPaths from '../../imports/svg-28f0pdh38j';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40">
      {/* Top Header Bar */}
      <div className="bg-[#2a3040] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Get Help Button */}
          <Link
            to="/get-help"
            className="bg-[#bb2020] hover:bg-[#a01818] text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors"
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-lg font-semibold">Get help</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14">
              <svg className="w-full h-full" viewBox="0 0 70.1015 66.6042" fill="none">
                <path d={svgPaths.p18687300} fill="white" />
              </svg>
            </div>
            <span className="text-white text-5xl font-normal">OpenVoice</span>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">

            {/* Dark Mode */}
            <button
              onClick={() => (isDark ? null : toggleTheme())}
              className={`${
                isDark ? 'bg-[#8694af] border-2 border-white' : 'bg-[#414957] opacity-50'
              } p-3 rounded-lg transition-colors`}
              aria-label="Dark mode"
            >
              <Moon className="w-5 h-5 text-white" />
            </button>

            {/* Light Mode */}
            <button
              onClick={() => (!isDark ? null : toggleTheme())}
              className={`${
                !isDark ? 'bg-[#8694af] border-2 border-white' : 'bg-[#414957] opacity-50'
              } p-3 rounded-lg transition-colors`}
              aria-label="Light mode"
            >
              <Sun className="w-6 h-6 text-white" />
            </button>

          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#8694af] px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">

          <Link
            to="/"
            className={`${
              isActive('/') ? 'bg-[#4a6fa5]' : 'bg-[#364c65]'
            } text-white px-8 py-3.5 rounded-full flex items-center gap-3 transition-colors hover:bg-[#4a6fa5]`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-lg font-semibold">Sentence building</span>
          </Link>

          <Link
            to="/i-am-feeling"
            className={`${
              isActive('/i-am-feeling') ? 'bg-[#4a6fa5]' : 'bg-[#364c65]'
            } text-white px-8 py-3.5 rounded-full flex items-center gap-3 transition-colors hover:bg-[#4a6fa5]`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-lg font-semibold">I am feeling</span>
          </Link>

          <Link
            to="/i-want"
            className={`${
              isActive('/i-want') ? 'bg-[#4a6fa5]' : 'bg-[#364c65]'
            } text-white px-8 py-3.5 rounded-full flex items-center gap-3 transition-colors hover:bg-[#4a6fa5]`}
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-lg font-semibold">I want</span>
          </Link>

          {/* Help Icon */}
          <button className="bg-[#364c65] hover:bg-[#4a6fa5] text-white p-3 rounded-full transition-colors ml-auto">
            <HelpCircle className="w-7 h-7" />
          </button>

        </div>
      </div>
    </header>
  );
}
