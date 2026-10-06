import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  className
}) => {
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#0A0A0A] shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-[#0A0A0A] text-[#0A0A0A]',
    error: 'bg-white border-red-500 text-red-950',
    info: 'bg-white border-neutral-300 text-[#0A0A0A]'
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-2.5 px-4 py-2.5 border text-xs transition-all animate-slide-up shadow-sm',
        bgStyles[type],
        className
      )}
    >
      {icons[type]}
      <span className="flex-1 font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-[#0A0A0A] p-0.5 cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
