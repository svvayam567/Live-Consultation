import React from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input } from '../ui/Input';
import { formatProjectName, extractSurname } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct } from '../../types/consultation';
import { Sparkles } from 'lucide-react';

export const Step1Purpose: React.FC = () => {
  const { state, updateField } = useConsultation();

  const title: CustomerTitle = (state.fields.title as CustomerTitle) || 'Mr.';
  const surname: string = state.fields.surname || (state.fields.client ? extractSurname(state.fields.client) : '');
  const product: CustomerProduct = (state.fields.product as CustomerProduct) || 'Temple';

  const currentProjectName = state.fields.projectName || state.fields.project_name || formatProjectName(title, surname, product);

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateField('client', val);

    // Auto-sync surname if surname is empty or was derived from client name
    const prevExtracted = extractSurname(state.fields.client || '');
    if (!state.fields.surname || state.fields.surname === prevExtracted) {
      const newSurname = extractSurname(val);
      updateField('surname', newSurname);
      const computedName = formatProjectName(title, newSurname, product);
      updateField('projectName', computedName);
      updateField('project_name', computedName);
    }
  };

  const handleTitleChange = (newTitle: CustomerTitle) => {
    updateField('title', newTitle);
    const computedName = formatProjectName(newTitle, surname, product);
    updateField('projectName', computedName);
    updateField('project_name', computedName);
  };

  const handleSurnameChange = (newSurname: string) => {
    updateField('surname', newSurname);
    const computedName = formatProjectName(title, newSurname, product);
    updateField('projectName', computedName);
    updateField('project_name', computedName);
  };

  const handleProductChange = (newProduct: CustomerProduct) => {
    updateField('product', newProduct);
    const computedName = formatProjectName(title, surname, newProduct);
    updateField('projectName', computedName);
    updateField('project_name', computedName);
  };

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
          We’ll understand your worship, confirm the space, choose one visual reference and recommend a scope and indicative budget.
        </p>
      </div>

      {/* Project Identity Live Preview */}
      <div className="p-4 rounded-[16px] bg-gradient-to-r from-[#0E2A1C]/5 via-[#0E2A1C]/10 to-[#FAFAFA] border border-[#0E2A1C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#0E2A1C] text-[#E8C86A] flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#0E2A1C] uppercase tracking-wider block">
              Official Project Name
            </span>
            <h3 className="text-base sm:text-lg font-display font-medium text-[#0A0A0A]">
              {currentProjectName}
            </h3>
          </div>
        </div>
        <div className="text-[11px] font-mono text-neutral-500 self-start sm:self-center">
          Format: <span className="text-[#0A0A0A]">&lt;Title&gt; &lt;Surname&gt;'s &lt;Product&gt;</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
        {/* Title dropdown */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
            Title
          </label>
          <select
            value={title}
            onChange={(e) => handleTitleChange(e.target.value as CustomerTitle)}
            className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
          >
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>

        {/* Full Client Name */}
        <div className="sm:col-span-2">
          <Input
            label="Full client name"
            value={state.fields.client || ''}
            onChange={handleClientNameChange}
            placeholder="e.g. Mala Sharma"
            autoFocus
          />
        </div>

        {/* Editable Surname */}
        <div>
          <Input
            label="Surname (family name)"
            value={surname}
            onChange={(e) => handleSurnameChange(e.target.value)}
            placeholder="e.g. Sharma"
            helperText="Exact spelling preserved"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
            Product type
          </label>
          <select
            value={product}
            onChange={(e) => handleProductChange(e.target.value as CustomerProduct)}
            className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
          >
            <option value="Temple">Temple</option>
            <option value="Puja Mandir">Puja Mandir</option>
            <option value="Sanctum">Sanctum</option>
          </select>
        </div>

        {/* Project Location */}
        <div>
          <Input
            label="Project location"
            value={state.fields.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g. Bengaluru / Dallas, TX"
          />
        </div>

        {/* Consultation Date */}
        <div className="sm:col-span-3">
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
