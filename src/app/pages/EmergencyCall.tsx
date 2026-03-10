import { useParams, useNavigate } from "react-router";
import { Volume2, Video, Grid3x3, PhoneOff } from "lucide-react";
import { useEffect, useState } from "react";
import svgPaths from "../../imports/svg-5m0qxfbqh9";
import { useTheme } from "../contexts/ThemeContext";

export default function EmergencyCall() {
  const { contact } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate("/help");
  };

  const getContactIcon = () => {
    if (contact === "911") {
      return (
        <svg className="w-48 h-48" fill="none" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#c92a2a" />
          <rect x="60" y="60" width="80" height="80" fill="white" opacity="0.3" />
        </svg>
      );
    } else {
      return (
        <svg className="w-48 h-48" fill="none" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#c92a2a" />
          <rect x="60" y="60" width="80" height="80" fill="white" opacity="0.3" />
        </svg>
      );
    }
  };

  const getContactName = () => {
    if (contact === "911") {
      return "Emergency Call";
    }
    return "Mom";
  };

  return (
    <div className={isDark ? "bg-[#1a202c] min-h-screen flex flex-col items-center justify-between py-12 px-6" : "bg-[#f4f6fa] min-h-screen flex flex-col items-center justify-between py-12 px-6"}>
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <h1 className={isDark ? "text-white text-6xl font-bold" : "text-gray-800 text-6xl font-bold"}>{getContactName()}</h1>
        <p className={isDark ? "text-white text-4xl font-normal" : "text-gray-700 text-4xl font-normal"}>{formatTime(seconds)}</p>
        
        <div className="mt-12">
          {getContactIcon()}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mb-8">
        <button className="bg-[#414957] hover:bg-[#515967] transition-all active:scale-95 rounded-full p-6">
          <Volume2 className="w-12 h-12 text-white" />
        </button>
        <button className="bg-[#414957] hover:bg-[#515967] transition-all active:scale-95 rounded-full p-6">
          <Video className="w-12 h-12 text-white" />
        </button>
        <button className="bg-[#414957] hover:bg-[#515967] transition-all active:scale-95 rounded-full p-6">
          <Grid3x3 className="w-12 h-12 text-white" />
        </button>
        <button 
          onClick={handleEndCall}
          className="bg-[#c92a2a] hover:bg-[#a01818] transition-all active:scale-95 rounded-full p-6"
        >
          <PhoneOff className="w-12 h-12 text-white" />
        </button>
      </div>
    </div>
  );
}