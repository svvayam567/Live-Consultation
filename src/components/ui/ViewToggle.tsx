import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ViewMode = 'grid' | 'list';

export interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange, className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-white border border-[#ECECEC] rounded-[14px] p-1 shadow-xs",
        className
      )}
      role="group"
      aria-label="View layout toggle"
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        aria-pressed={mode === 'grid'}
        title="Grid view"
        className={cn(
          "p-1.5 rounded-[10px] transition-all duration-200 cursor-pointer flex items-center justify-center",
          mode === 'grid'
            ? "bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
            : "text-[#5C5C5C] hover:text-[#0A0A0A] hover:bg-neutral-100"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onChange('list')}
        aria-pressed={mode === 'list'}
        title="List view"
        className={cn(
          "p-1.5 rounded-[10px] transition-all duration-200 cursor-pointer flex items-center justify-center",
          mode === 'list'
            ? "bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
            : "text-[#5C5C5C] hover:text-[#0A0A0A] hover:bg-neutral-100"
        )}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};
