import React from 'react';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  sublabel,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        <div className="font-sans font-semibold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight leading-none">
          {value}
        </div>
        <div className="font-sans font-medium text-xs text-[#5C5C5C] uppercase tracking-wider mt-2.5">
          {label}
        </div>
      </div>
      {sublabel && (
        <div className="font-sans text-[11px] text-neutral-400 mt-2">
          {sublabel}
        </div>
      )}
    </div>
  );
};
