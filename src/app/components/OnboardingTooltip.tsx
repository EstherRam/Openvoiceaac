interface OnboardingTooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  targetRef?: React.RefObject<HTMLElement>;
}

export default function OnboardingTooltip({ text, position = 'bottom' }: OnboardingTooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[#d9d9d9]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[#d9d9d9]',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[#d9d9d9]',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[#d9d9d9]',
  };

  return (
    <div className={`absolute z-50 ${positionClasses[position]}`}>
      <div className="bg-[#d9d9d9] text-black px-4 py-3 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.48)] whitespace-nowrap">
        <p className="text-2xl font-normal">{text}</p>
      </div>
      <div className={`absolute w-0 h-0 border-[10px] border-solid ${arrowClasses[position]}`} />
    </div>
  );
}
