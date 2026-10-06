import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input, Textarea } from '../ui/Input';

export const Step2Worship: React.FC = () => {
  const { state, updateField } = useConsultation();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          2–6 min · Personalise the space
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          How does your family worship?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Tell us what matters in your daily worship so the design feels personal to your family.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-2">
        <Input
          label="Deities, traditions and idols"
          value={state.fields.deity || ''}
          onChange={(e) => updateField('deity', e.target.value)}
          placeholder="e.g. Lord Venkateshwara, Radha Krishna, Shivling, family kula-daivam"
        />

        <Textarea
          label="How you worship · daily rituals and family usage"
          value={state.fields.rituals || ''}
          onChange={(e) => updateField('rituals', e.target.value)}
          placeholder="e.g. Daily deepam & aarti, weekly abhishekam, sitting on floor vs standing, festival gatherings"
          rows={3}
        />

        <Input
          label="Idol dimensions / clearance, if known"
          value={state.fields.idol || ''}
          onChange={(e) => updateField('idol', e.target.value)}
          placeholder="e.g. Main idol 18 inches brass; secondary vigrahas 6–9 inches"
        />
      </div>
    </div>
  );
};
