import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2A1C] disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer";

  const sizeStyles = {
    sm: "h-9 px-4 text-xs gap-1.5 rounded-full",
    md: "h-[44px] px-6 text-xs uppercase tracking-wider gap-2 rounded-full",
    lg: "h-[48px] px-8 text-xs uppercase tracking-wider font-semibold gap-2.5 rounded-full",
  };

  const variantStyles = {
    primary: "bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] text-white shadow-[0_8px_16px_rgba(0,0,0,0.25)] hover:brightness-110 border border-white/10",
    secondary: "bg-white text-[#0A0A0A] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#ECECEC] hover:bg-neutral-50",
    outline: "bg-transparent hover:bg-white text-[#0A0A0A] border border-[#ECECEC] hover:shadow-xs",
    ghost: "bg-transparent hover:bg-neutral-200/60 text-[#5C5C5C] hover:text-[#0A0A0A]",
    danger: "bg-white hover:bg-red-50 text-red-600 border border-red-200 shadow-xs",
    gold: "bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] text-white shadow-[0_8px_16px_rgba(0,0,0,0.25)] hover:brightness-110 border border-white/10",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
};
