import React from 'react';
import { cn } from '../../lib/utils';

export interface FrostedPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const FrostedPanel: React.FC<FrostedPanelProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-[20px] p-6 sm:p-7 overflow-hidden text-white transition-all duration-300",
        "bg-gradient-to-br from-[#0E2A1C]/90 via-[#0A2216]/95 to-[#05140C]/98 backdrop-blur-md",
        "border border-emerald-500/20 shadow-[0_12px_36px_rgba(10,34,22,0.35)]",
        glow && "ring-1 ring-emerald-400/30",
        className
      )}
      {...props}
    >
      {/* Subtle ambient highlight sheen */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
