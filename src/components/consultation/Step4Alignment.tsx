import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input } from '../ui/Input';

export const Step4Alignment: React.FC = () => {
  const { state, updateField } = useConsultation();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          10–13 min · Decisions, budget and timing
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          Align expectations
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Let’s align who will review the design, your investment range and the dates we need to work towards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <Input
          label="Comfortable investment range"
          requiredDot={!state.fields.budget?.trim()}
          value={state.fields.budget || ''}
          onChange={(e) => updateField('budget', e.target.value)}
          placeholder="e.g. ₹15–20 Lakhs / ₹40–50 Lakhs"
        />

        <Input
          label="Desired installation date"
          requiredDot={!state.fields.installation?.trim()}
          value={state.fields.installation || ''}
          onChange={(e) => updateField('installation', e.target.value)}
          placeholder="e.g. Diwali 2026 / Gruhapravesham Nov 2026"
        />

        <Input
          label="Family / architect approvers (Optional)"
          value={state.fields.approvers || ''}
          onChange={(e) => updateField('approvers', e.target.value)}
          placeholder="e.g. Self & spouse / Parents / Architect Mr. Mehta"
        />

        <Input
          label="When would you like to decide? (Optional)"
          value={state.fields.decision || ''}
          onChange={(e) => updateField('decision', e.target.value)}
          placeholder="e.g. This week after reviewing with family"
        />
      </div>
    </div>
  );
};
