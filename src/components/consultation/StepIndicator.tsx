import React, { useRef, useEffect } from 'react';
import { CONSULTATION_STEPS } from '../../lib/constants';
import { useConsultation } from '../../context/ConsultationContext';
import { Download, Upload, RotateCcw, ArrowLeft, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StepIndicator: React.FC = () => {
  const {
    currentSlide,
    setSlide,
    prevSlide,
    saveStatus,
    resetConsultation,
    importSession,
    state
  } = useConsultation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeStepRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to center active step on mobile
  useEffect(() => {
    if (activeStepRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = activeStepRef.current;
      const containerWidth = container.offsetWidth;
      const elOffset = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      container.scrollTo({
        left: elOffset - containerWidth / 2 + elWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  const handleDownload = () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const clientName = state.fields.client ? state.fields.client.replace(/[^a-zA-Z0-9]/g, '_') : 'client';
    a.href = url;
    a.download = `svvayam_consultation_${clientName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (importSession(parsed)) {
          alert('Session imported successfully.');
        } else {
          alert('Invalid session file structure.');
        }
      } catch {
        alert('Could not parse session JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Start a new client consultation? Unsaved changes will be cleared.')) {
      resetConsultation();
    }
  };

  const currentStep = CONSULTATION_STEPS[currentSlide];
  const currentStepTitle = currentStep?.title.split('·')[0].trim() || 'Purpose';
  const currentStepSubtitle = currentStep?.title.split('·')[1]?.trim() || '';

  const projectName =
    state.fields.projectName ||
    state.fields.project_name ||
    state.project_name ||
    (state.fields.client ? `${state.fields.client}'s Sanctum` : '');

  return (
    <div className="w-full sticky top-16 z-30 pt-3 pb-2 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-2.5">
        {/* Floating Top Black Pill Action Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#5C5C5C]">
            <span className="font-mono text-[11px] font-semibold text-[#0A0A0A]">
              Step 0{currentSlide + 1} of 08
            </span>
            <span>·</span>
            <span className="text-[11px] text-neutral-400">
              {saveStatus}
            </span>
            {projectName && (
              <>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1 font-display font-semibold text-xs text-[#0A0A0A] bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                  <span>{projectName}</span>
                </span>
              </>
            )}
          </div>

          {/* Floating Dark Pill Toolbar */}
          <div className="bg-[#0A0A0A] text-white rounded-full px-2 py-1 shadow-[0_8px_20px_rgba(0,0,0,0.22)] border border-white/10 flex items-center gap-1">
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1 rounded-full text-xs font-sans text-neutral-200 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Download JSON session file"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1 rounded-full text-xs font-sans text-neutral-200 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Import JSON session file"
            >
              <Upload className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImportFile}
            />

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1 rounded-full text-xs font-sans text-neutral-300 hover:text-red-300 hover:bg-red-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Start new consultation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New client</span>
            </button>
          </div>
        </div>

        {/* Soft White Rounded Step Bar Container */}
        <div className="bg-white rounded-[20px] p-2.5 sm:px-5 sm:py-3 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Step Numbers & Back Arrow */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5" ref={scrollContainerRef}>
            {/* Back Arrow Button */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous step"
              className={cn(
                "w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer",
                currentSlide === 0
                  ? "bg-[#F1F1F1] text-neutral-300 cursor-not-allowed"
                  : "bg-[#F1F1F1] text-[#5C5C5C] hover:bg-[#E5E5E5] hover:text-[#0A0A0A]"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Steps 1 - 8 as small rounded squares */}
            <div className="flex items-center gap-1.5">
              {CONSULTATION_STEPS.map((step, idx) => {
                const isActive = currentSlide === idx;
                const isCompleted = currentSlide > idx;

                return (
                  <button
                    key={idx}
                    ref={isActive ? activeStepRef : undefined}
                    type="button"
                    onClick={() => setSlide(idx)}
                    title={`Step ${idx + 1}: ${step.title}`}
                    className={cn(
                      "w-8 h-8 rounded-[10px] font-mono text-xs font-medium flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer select-none",
                      isActive && "bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] text-white shadow-[0_8px_16px_rgba(0,0,0,0.25)] ring-1 ring-white/10 font-bold scale-105",
                      isCompleted && "bg-[#2A2A2A] text-white hover:bg-[#383838]",
                      !isActive && !isCompleted && "bg-[#F1F1F1] text-[#5C5C5C] hover:bg-[#E5E5E5] hover:text-[#0A0A0A]"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      idx + 1
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Name in Cormorant Garamond */}
          <div className="flex items-baseline gap-2 shrink-0 md:text-right px-1 sm:px-0">
            <h2 className="font-display font-semibold text-lg sm:text-xl text-[#0A0A0A] leading-none">
              {currentStepTitle}
            </h2>
            {currentStepSubtitle && (
              <span className="text-xs font-sans text-neutral-400">
                · {currentStepSubtitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
