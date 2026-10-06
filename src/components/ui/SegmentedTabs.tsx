import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export interface TabOption<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
}

export interface SegmentedTabsProps<T extends string = string> {
  options: TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function SegmentedTabs<T extends string = string>({
  options,
  activeId,
  onChange,
  className,
  size = 'md',
}: SegmentedTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector<HTMLButtonElement>(`[data-tab-id="${activeId}"]`);
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
      setMounted(true);
    }
  }, [activeId, options]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center bg-white border border-[#ECECEC] rounded-[16px] p-1 shadow-[0_4px_12px_rgba(0,0,0,0.04)]",
        className
      )}
      role="tablist"
    >
      {/* Sliding Black Glossy Pill Indicator */}
      {mounted && indicatorStyle.width > 0 && (
        <div
          className="absolute top-1 bottom-1 bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.25)] pointer-events-none transition-all duration-250 ease-out"
          style={{
            transform: `translateX(${indicatorStyle.left - 4}px)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {options.map((opt) => {
        const isActive = opt.id === activeId;
        const Icon = opt.icon;

        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-tab-id={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative z-10 inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap",
              size === 'sm' ? "h-8 px-3.5 text-xs gap-1.5" : "h-9 px-4 text-xs gap-2",
              isActive
                ? "text-white"
                : "text-[#5C5C5C] hover:text-[#0A0A0A]"
            )}
          >
            {Icon && <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-white" : "text-[#737373]")} />}
            <span>{opt.label}</span>
            {opt.badge && (
              <span
                className={cn(
                  "ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                  isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-[#5C5C5C]"
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
