import { ReactNode, useState, useRef, useEffect } from "react";
import { Edit2 } from "lucide-react";

interface VocabButtonProps {
  word?: string;
  label?: string;
  icon: ReactNode;
  color: "blue" | "purple" | "teal" | "gray" | "pink";
  onClick: () => void;
  onEdit?: () => void;
  onHold?: () => void;
  onDelete?: () => void;
  isCustom?: boolean;
}

const colorClasses = {
  blue: "bg-[#2755e2] hover:bg-[#1e45c2]",
  purple: "bg-[#7c3aed] hover:bg-[#6d2edb]",
  teal: "bg-[#188074] hover:bg-[#136b61]",
  gray: "bg-[#414957] hover:bg-[#515967]",
  pink: "bg-[#c92a76] hover:bg-[#b01f66]",
};

const HOLD_DURATION = 3000; // 3 seconds to hold before delete

export default function VocabButton({ word, label, icon, color, onClick, onEdit, onHold, onDelete, isCustom = false }: VocabButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const startHold = () => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    // Update progress animation
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
    }, 16); // ~60fps

    // Set timer for delete action (only for non-custom words)
    if (!isCustom && onHold) {
      holdTimerRef.current = window.setTimeout(() => {
        onHold();
        endHold();
      }, HOLD_DURATION);
    }
  };

  const endHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    const wasHolding = isHolding;
    const progress = holdProgress;
    
    setIsHolding(false);
    setHoldProgress(0);
    
    // If released before hold duration, trigger normal click
    if (wasHolding && progress < 100) {
      onClick();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent default click when using mouse interactions
    // Touch and mouse down/up will handle the logic
    e.preventDefault();
  };

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
        className={`${colorClasses[color]} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all active:scale-95 w-full aspect-square relative overflow-hidden`}
      >
        {/* Hold progress indicator */}
        {isHolding && !isCustom && (
          <div 
            className="absolute inset-0 bg-red-600/40 transition-all"
            style={{ 
              clipPath: `inset(${100 - holdProgress}% 0 0 0)`,
            }}
          />
        )}
        
        <div className="text-white flex items-center justify-center flex-1 relative z-10">
          {icon}
        </div>
        <span className="text-white text-2xl font-normal relative z-10">{word || label}</span>
      </button>
      
      {/* Only show edit button for custom words */}
      {isCustom && onEdit && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg"
            title="Edit custom word"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}