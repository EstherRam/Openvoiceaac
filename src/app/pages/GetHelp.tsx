import { Link } from "react-router";

export default function GetHelp() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
      <div className="grid grid-cols-2 gap-8 max-w-3xl w-full">
        <Link 
          to="/call/911"
          className="bg-[#bb2020] hover:bg-[#a01818] transition-all active:scale-95 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
        >
          <svg className="w-48 h-48" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="#c92a2a" />
            <rect x="60" y="60" width="80" height="80" fill="white" opacity="0.3" />
          </svg>
          <span className="text-white text-5xl font-normal">
            Call <span className="font-bold">911</span>
          </span>
        </Link>

        <Link 
          to="/call/mom"
          className="bg-[#bb2020] hover:bg-[#a01818] transition-all active:scale-95 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
        >
          <svg className="w-48 h-48" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="#c92a2a" />
            <rect x="60" y="60" width="80" height="80" fill="white" opacity="0.3" />
          </svg>
          <span className="text-white text-5xl font-normal">
            Call <span className="font-bold">Mom</span>
          </span>
        </Link>
      </div>
    </div>
  );
}