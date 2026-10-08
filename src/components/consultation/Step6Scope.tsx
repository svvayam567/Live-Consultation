import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input, Textarea } from '../ui/Input';
import { FrostedPanel } from '../ui/FrostedPanel';
import { indicativeAmount, calculateDesignFee, money } from '../../lib/utils';
import { Calculator } from 'lucide-react';

export const Step6Scope: React.FC = () => {
  const { state, updateField, selectedReferencesList, setSlide } = useConsultation();

  const numAmount = indicativeAmount(state.fields.estimate);
  const calculatedFee = calculateDesignFee(state.fields.estimate);

  return (
    <div className="space-y-8">
      {/* Approved Single Design Reference with Change Link */}
      {selectedReferencesList.length > 0 && (
        <div className="p-5 bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5C5C5C] font-sans block">
              Approved Design Reference
            </span>
            <button
              type="button"
              onClick={() => setSlide(4)}
              className="text-xs font-medium text-[#0A0A0A] hover:text-[#0E2A1C] underline underline-offset-2 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Change</span>
            </button>
          </div>

          <div className="bg-[#FAFAFA] border border-[#ECECEC] rounded-[16px] p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-[12px] overflow-hidden shrink-0 border border-[#ECECEC] flex items-center justify-center p-1 shadow-2xs">
              <img
                src={selectedReferencesList[0].data}
                alt={selectedReferencesList[0].caption}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
              <span className="text-[11px] font-semibold text-[#0E2A1C] uppercase tracking-wide font-sans block">
                {selectedReferencesList[0].kind || 'Visual Reference'}
              </span>
              <h4 className="text-sm sm:text-base font-serif font-medium text-[#0A0A0A]">
                {selectedReferencesList[0].caption}
              </h4>
              <p className="text-xs text-[#5C5C5C] font-sans">
                {selectedReferencesList[0].source === 'client_project'
                  ? 'Selected from authentic completed client projects'
                  : 'Selected from 4×4 sacred scale & detail matrix'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Title & Introduction */}
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          20–25 min · Recommendation
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          Define your scope and indicative budget
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Use the selected reference together with worship needs and available dimensions. We will recommend the appropriate form, detailing and materials; we’ll record an indicative budget and timing together before reviewing your design engagement.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-6 pt-2">
        <Textarea
          label="Recommended scope and design direction"
          value={state.fields.scope || ''}
          onChange={(e) => updateField('scope', e.target.value)}
          placeholder="e.g. Dedicated Sanctum with Shikhar, hand-carved pillars, concealed brass lighting, integrated bhog storage..."
          rows={3}
        />

        <Input
          label="Proposed materials and finishes"
          value={state.fields.materials || ''}
          onChange={(e) => updateField('materials', e.target.value)}
          placeholder="e.g. Burma Teakwood with gold leaf accents / Bansi Paharpur Pink Stone"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <Input
            label="Indicative project budget · ₹ (enter one amount)"
            value={state.fields.estimate || ''}
            onChange={(e) => updateField('estimate', e.target.value)}
            placeholder="e.g. 15 lakh, 3500000, 1.2 cr"
            helperText="Accepts formats like '15 lakh', '1.5 cr', or '₹2,500,000'"
          />

          {/* Frosted Green Glass Panel for Calculated Design Fee */}
          <FrostedPanel className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-200 uppercase tracking-wide">
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>Calculated Design Fee</span>
            </div>
            <div className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {calculatedFee !== null ? money(calculatedFee) : '₹0'}
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed font-sans pt-1">
              {numAmount !== null
                ? `Formula: Lower of ₹1,00,000 or 20% of ${money(numAmount)}. Fully adjustable against final manufacturing cost.`
                : 'Enter an indicative project budget to calculate your exact design engagement fee.'}
            </p>
          </FrostedPanel>
        </div>

        <Input
          label="Proposed timeline and dependencies"
          value={state.fields.timeline || ''}
          onChange={(e) => updateField('timeline', e.target.value)}
          placeholder="e.g. 3–4 months from technical sign-off and site readiness"
        />

        <Textarea
          label="Tax basis, exclusions and assumptions"
          value={state.fields.exclusions || ''}
          onChange={(e) => updateField('exclusions', e.target.value)}
          placeholder="e.g. GST 18% extra; transportation and on-site crating included; civil preparation by client"
          rows={2}
        />
      </div>
    </div>
  );
};
