import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ChoiceTileProps {
  label: string;
  description?: string;
  selected: boolean;
  onToggle: () => void;
  className?: string;
  disabled?: boolean;
}

export const ChoiceTile: React.FC<ChoiceTileProps> = ({
  label,
  description,
  selected,
  onToggle,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "p-3 rounded-[14px] border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 w-full select-none",
        selected
          ? "bg-white border-[#0A0A0A] shadow-[0_8px_16px_rgba(0,0,0,0.08)] ring-1 ring-[#0E2A1C]"
          : "bg-[#F1F1F1] border-[#ECECEC] hover:bg-[#EBEBEB] text-[#5C5C5C]",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {/* Checkbox Tile */}
      <div
        className={cn(
          "w-5 h-5 rounded-[8px] flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5",
          selected
            ? "bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] text-white shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
            : "bg-[#E5E5E5] text-[#A3A3A3]"
        )}
      >
        <Check className={cn("w-3.5 h-3.5 stroke-[2.5]", selected ? "text-white" : "text-transparent")} />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-xs font-medium font-sans leading-tight transition-colors",
            selected ? "text-[#0A0A0A]" : "text-[#5C5C5C]"
          )}
        >
          {label}
        </div>
        {description && (
          <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};
