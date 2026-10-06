import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input, Textarea } from '../ui/Input';
import { FrostedPanel } from '../ui/FrostedPanel';
import { indicativeAmount, calculateDesignFee, money } from '../../lib/utils';
import { Calculator } from 'lucide-react';

export const Step6Scope: React.FC = () => {
  const { state, updateField, selectedReferencesList } = useConsultation();

  const numAmount = indicativeAmount(state.fields.estimate);
  const calculatedFee = calculateDesignFee(state.fields.estimate);

  return (
    <div className="space-y-8">
      {/* 3 Selected References Strip on Top */}
      {selectedReferencesList.length > 0 && (
        <div className="p-5 bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-3">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5C5C5C] font-sans block">
            Approved Design References (3 Selected)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedReferencesList.map((ref, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-[#ECECEC] rounded-[14px] p-2 flex items-center space-x-3"
              >
                <div className="w-14 h-14 bg-white rounded-[10px] overflow-hidden shrink-0 border border-[#ECECEC] flex items-center justify-center">
                  <img
                    src={ref.data}
                    alt={ref.caption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-[#0A0A0A] block uppercase font-sans">
                    Ref {idx + 1}
                  </span>
                  <p className="text-xs text-[#5C5C5C] truncate mt-0.5">
                    {ref.caption}
                  </p>
                </div>
              </div>
            ))}
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
          Use the three selections together with worship needs and available dimensions. We will recommend the appropriate form, detailing and materials; we’ll record an indicative budget and timing together before reviewing your design engagement.
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
