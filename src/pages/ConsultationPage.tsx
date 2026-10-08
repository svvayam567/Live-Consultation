import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useConsultation } from '../context/ConsultationContext';
import { Header } from '../components/layout/Header';
import { StepIndicator } from '../components/consultation/StepIndicator';
import { Step1Purpose } from '../components/consultation/Step1Purpose';
import { Step2Worship } from '../components/consultation/Step2Worship';
import { Step3Space } from '../components/consultation/Step3Space';
import { Step4Alignment } from '../components/consultation/Step4Alignment';
import { Step5Examples } from '../components/consultation/Step5Examples';
import { Step6Scope } from '../components/consultation/Step6Scope';
import { Step7Journey } from '../components/consultation/Step7Journey';
import { Step8Proposal } from '../components/consultation/Step8Proposal';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const {
    state,
    currentSlide,
    nextSlide,
    prevSlide,
    totalSelectedCount,
    setSlide,
    importSession
  } = useConsultation();
  const [searchParams] = useSearchParams();

  // Support ?id=... to resume existing consultation
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && state.id !== idParam) {
      // Check local storage or seed
      try {
        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const list = JSON.parse(stored);
          const found = list.find((c: any) => c.id === idParam);
          if (found?.state) {
            importSession(found.state);
            if (found.current_step) {
              setSlide(Math.max(0, Math.min(7, found.current_step - 1)));
            }
          }
        }
      } catch {
        // Ignored
      }
    }
  }, [searchParams, state.id, importSession, setSlide]);

  // Support ?step=1..8 query parameter
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const s = parseInt(stepParam, 10);
      if (!isNaN(s) && s >= 1 && s <= 8) {
        setSlide(s - 1);
      }
    }
  }, [searchParams, setSlide]);

  // Scroll to top when changing slide
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  // Validation: Step 1 requires client & location; Step 5 requires 1 reference
  const isStep1Incomplete = currentSlide === 0 && (!state.fields.client || !state.fields.location);
  const isStep5Incomplete = currentSlide === 4 && totalSelectedCount !== 1;
  const isNextDisabled = currentSlide === 7 || isStep1Incomplete || isStep5Incomplete;

  const renderCurrentStep = () => {
    switch (currentSlide) {
      case 0:
        return <Step1Purpose />;
      case 1:
        return <Step2Worship />;
      case 2:
        return <Step3Space />;
      case 3:
        return <Step4Alignment />;
      case 4:
        return <Step5Examples />;
      case 5:
        return <Step6Scope />;
      case 6:
        return <Step7Journey />;
      case 7:
        return <Step8Proposal />;
      default:
        return <Step1Purpose />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      {/* Top Application Header */}
      <Header />

      {/* 8-Step Progress Indicator & Top Action Bar */}
      <StepIndicator />

      {/* Main Slide Container with Generous Whitespace & Soft Layered Card */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-6 sm:p-10 transition-all duration-300">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Minimal Sticky Bottom Navigation Footer (Hidden during Print) */}
      <footer className="no-print sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-[#ECECEC] shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back</span>
          </Button>

          <div className="text-xs text-[#5C5C5C] font-mono">
            {`Step 0${currentSlide + 1} of 08`}
          </div>

          <div className="flex items-center gap-3">
            {isStep1Incomplete && (
              <span className="text-[11px] text-[#737373] hidden sm:inline font-sans">
                Select client & configure project to continue
              </span>
            )}
            {isStep5Incomplete && (
              <span className="text-[11px] text-[#737373] hidden sm:inline font-sans">
                Select one reference to continue
              </span>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={nextSlide}
              disabled={isNextDisabled}
              title={currentSlide === 4 && totalSelectedCount !== 1 ? 'Select one reference to continue' : undefined}
              className="text-xs"
            >
              <span>
                {currentSlide === 6
                  ? 'Review proposal'
                  : currentSlide === 7
                  ? 'Proposal finalized'
                  : 'Next'}
              </span>
              {currentSlide < 6 && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};
