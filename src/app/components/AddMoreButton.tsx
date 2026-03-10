import { ReactNode } from "react";
import { Plus } from "lucide-react";

interface AddMoreButtonProps {
  onClick: () => void;
  color?: "blue" | "purple" | "teal" | "gray" | "pink";
  label?: string;
  icon?: ReactNode;
}

const colorClasses = {
  blue: "bg-[#2755e2] hover:bg-[#1e45c2]",
  purple: "bg-[#7c3aed] hover:bg-[#6d2edb]",
  teal: "bg-[#188074] hover:bg-[#136b61]",
  gray: "bg-[#6b7280] hover:bg-[#4b5563]",
  pink: "bg-[#c92a76] hover:bg-[#b01f66]",
};

export default function AddMoreButton({ 
  onClick, 
  color = "gray",
  label = "Add More",
  icon
}: AddMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} text-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors min-h-[164px] w-full`}
    >
      <div className="flex items-center justify-center">
        {icon || <Plus className="w-16 h-16" />}
      </div>
      <span className="text-xl font-normal">{label}</span>
    </button>
  );
}
