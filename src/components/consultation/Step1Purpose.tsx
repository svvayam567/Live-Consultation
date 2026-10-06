import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input } from '../ui/Input';

export const Step1Purpose: React.FC = () => {
  const { state, updateField } = useConsultation();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          0–2 min · Purpose
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          Let’s plan your pooja space
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          We’ll understand your worship, confirm the space, choose three visual references and recommend a scope and indicative budget.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <Input
          label="Client name"
          value={state.fields.client || ''}
          onChange={(e) => updateField('client', e.target.value)}
          placeholder="e.g. Mr. & Mrs. Sharma"
          autoFocus
        />

        <Input
          label="Project location"
          value={state.fields.location || ''}
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="e.g. Bengaluru / Dallas, TX / Mumbai"
        />

        <div className="sm:col-span-2">
          <Input
            label="Consultation date"
            type="date"
            value={state.fields.date || ''}
            onChange={(e) => updateField('date', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
