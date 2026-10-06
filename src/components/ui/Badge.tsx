import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'outline' | 'surface' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-xs',
    gold: 'bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-xs',
    forest: 'bg-[#0E2A1C] text-white',
    outline: 'border border-[#ECECEC] text-[#0A0A0A] bg-white',
    surface: 'bg-[#F1F1F1] text-[#5C5C5C] border border-[#ECECEC]',
    success: 'bg-[#0E2A1C]/10 text-[#0E2A1C] border border-[#0E2A1C]/20',
    warning: 'bg-neutral-100 text-[#0A0A0A] border border-neutral-300'
  };

  const sizes = {
    sm: 'text-[10px] uppercase tracking-wider px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-md transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
