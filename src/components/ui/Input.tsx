import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  helper,
  helperText,
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || props.name;
  const helperMsg = helperText || helper;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-[#0A0A0A] tracking-normal">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-2.5 rounded-[14px] border border-[#ECECEC] bg-white text-[#0A0A0A] text-sm",
          "placeholder:text-neutral-400 transition-all duration-150 shadow-xs",
          "focus:outline-none focus:bg-[#FAFAFA] focus:border-transparent focus:ring-2 focus:ring-[#0E2A1C]",
          "disabled:opacity-40 disabled:bg-[#F1F1F1]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      {helperMsg && !error && <p className="text-[11px] text-neutral-500">{helperMsg}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  helper,
  id,
  rows = 3,
  ...props
}, ref) => {
  const inputId = id || props.name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-[#0A0A0A] tracking-normal">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 rounded-[14px] border border-[#ECECEC] bg-white text-[#0A0A0A] text-sm",
          "placeholder:text-neutral-400 transition-all duration-150 resize-y shadow-xs",
          "focus:outline-none focus:bg-[#FAFAFA] focus:border-transparent focus:ring-2 focus:ring-[#0E2A1C]",
          "disabled:opacity-40 disabled:bg-[#F1F1F1]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      {helper && !error && <p className="text-[11px] text-neutral-500">{helper}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
