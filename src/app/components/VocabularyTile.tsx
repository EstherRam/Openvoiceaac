import { useState, useRef, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface VocabularyTileProps {
  text: string;
  color: string;
  onClick?: () => void;
  onLongPress?: () => void;
  isCustom?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const HOLD_DURATION = 3000; // 3 seconds

export default function VocabularyTile({
  text,
  color,
  onClick,
  onLongPress,
  isCustom = false,
  onEdit,
  onDelete
}: VocabularyTileProps) {
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
    }, 16);

    // Set timer for long press action (only for non-custom words)
    if (!isCustom && onLongPress) {
      holdTimerRef.current = window.setTimeout(() => {
        onLongPress();
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
    if (wasHolding && progress < 100 && onClick) {
      onClick();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
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
        className="w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-4 transition-all active:scale-95 relative overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: color }}
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
        
        {/* Simple icon placeholder */}
        <div className="relative z-10">
          <svg className="w-24 h-24" fill="none" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" fill="white" opacity="0.3" rx="8" />
          </svg>
        </div>

        {/* Word text */}
        <span className="text-white text-2xl font-medium relative z-10 capitalize">
          {text}
        </span>
      </button>
      
      {/* Edit button for custom words */}
      {isCustom && onEdit && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-[#2755e2] hover:bg-[#1e45c2] text-white rounded-full p-2 shadow-lg"
            title="Edit custom word"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
