import React from 'react';
import { Link } from 'react-router-dom';
import { useConsultation } from '../../context/ConsultationContext';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { formatProjectName, extractSurname } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct } from '../../types/consultation';
import { Sparkles, CheckCircle2, UserPlus, Users, Compass, Home } from 'lucide-react';

const SPACE_TYPOLOGIES = [
  { id: 'dedicated_room', label: 'Dedicated Pooja Room', desc: 'Separate room built according to Vastu Shastra principles' },
  { id: 'living_alcove', label: 'Living Room Alcove', desc: 'Integrated architectural mandir accent within living area' },
  { id: 'courtyard_sanctum', label: 'Courtyard / Double Height', desc: 'Dramatic open-to-sky or skylit sanctum pavilion' },
  { id: 'wall_niche', label: 'Wall-Mounted Niche', desc: 'Floating compact sanctum for modern urban apartments' }
];

const ORIENTATIONS = [
  { id: 'north_east', label: 'North-East (Ishanya)', desc: 'Most auspicious corner for divine energy' },
  { id: 'east', label: 'East-Facing', desc: 'Deities face West, devotee faces East at sunrise' },
  { id: 'north', label: 'North-Facing', desc: 'Devotee faces North towards Kubera quadrant' },
  { id: 'custom', label: 'Custom Architectural', desc: 'Site-specific orientation dictated by floor plan' }
];

export const Step1Purpose: React.FC = () => {
  const { state, updateField } = useConsultation();

  const title: CustomerTitle = (state.fields.title as CustomerTitle) || 'Mr.';
  const clientName: string = state.fields.client || '';
  const surname: string = state.fields.surname || (clientName ? extractSurname(clientName) : '');
  const product: CustomerProduct = (state.fields.product as CustomerProduct) || 'Temple';
  const phone: string = state.fields.client_phone || state.fields.phone || '';
  const location: string = state.fields.location || '';

  const projectName =
    state.fields.projectName ||
    state.fields.project_name ||
    state.project_name ||
    (surname ? formatProjectName(title, surname, product) : clientName ? `${clientName}'s ${product}` : 'Sanctum Project');

  const selectedTypology = state.fields.dimensionType || 'dedicated_room';
  const selectedOrientation = state.fields.features || 'north_east';
  const consultDate = state.fields.date || new Date().toISOString().split('T')[0];

  const hasClient = Boolean(clientName && clientName.trim().length > 0);

  return (
    <div className="space-y-8">
      {/* Step Header */}
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

      {hasClient ? (
        <>
          {/* Verified Project Identity Profile Card (Prefilled - No Re-entry) */}
          <div className="p-5 sm:p-6 rounded-[20px] bg-gradient-to-r from-[#0E2A1C]/5 via-[#0E2A1C]/10 to-[#FAFAFA] border border-[#0E2A1C]/20 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#0E2A1C] text-[#FFE500] flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-mono text-[#0E2A1C] uppercase tracking-wider font-semibold">
                  Official Project Profile
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>Registered &amp; Verified</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#0A0A0A] tracking-tight">
                {projectName}
              </h3>
              <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                Formula: &lt;Title&gt; &lt;Surname&gt;'s &lt;Product&gt; · Exact spelling preserved
              </p>
            </div>

            {/* Read-only client summary chips */}
            <div className="pt-2 border-t border-[#0E2A1C]/10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans">
              <div className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] font-medium shadow-2xs">
                Client: <strong>{title} {clientName}</strong>
              </div>

              {phone && (
                <div className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] font-mono text-[11px] shadow-2xs">
                  Mobile: <strong>{phone}</strong>
                </div>
              )}

              <div className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-2xs">
                Product: <strong>{product}</strong>
              </div>

              {location && (
                <div className="px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-[#0A0A0A] shadow-2xs">
                  Location: <strong>{location}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Consultation Planning Details */}
          <div className="space-y-6 pt-2">
            {/* Consultation Date */}
            <div className="max-w-xs">
              <Input
                label="Consultation Date"
                type="date"
                value={consultDate}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            {/* Sacred Space Typology Choices */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#0E2A1C]" />
                  <span>Space Typology</span>
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {SPACE_TYPOLOGIES.map((t) => {
                  const isSelected = selectedTypology === t.id || selectedTypology === t.label;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateField('dimensionType', t.label)}
                      className={`p-3.5 rounded-[14px] border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A] shadow-xs'
                          : 'border-[#ECECEC] bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <strong className="block text-[#0A0A0A] font-medium">{t.label}</strong>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auspicious Orientation Choices */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#0E2A1C]" />
                  <span>Auspicious Direction / Orientation</span>
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {ORIENTATIONS.map((o) => {
                  const isSelected = selectedOrientation === o.id || selectedOrientation === o.label;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => updateField('features', o.label)}
                      className={`p-3.5 rounded-[14px] border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A] shadow-xs'
                          : 'border-[#ECECEC] bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <strong className="block text-[#0A0A0A] font-medium">{o.label}</strong>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">{o.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Space Intentions & Notes */}
            <div>
              <Textarea
                label="Space Intentions & Initial Architectural Notes"
                value={state.fields.scope || ''}
                onChange={(e) => updateField('scope', e.target.value)}
                placeholder="e.g. Dedicated ground floor space, marble flooring prepared, ceiling height 10 ft, requires brass ventilation..."
                rows={3}
              />
            </div>
          </div>
        </>
      ) : (
        /* Unconfigured State: Invitation to Register or Pick Client */
        <div className="p-8 sm:p-12 rounded-[20px] bg-white border border-[#ECECEC] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-[#0A0A0A]">
            <Sparkles className="w-6 h-6 text-[#0E2A1C]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-display font-medium text-[#0A0A0A]">
              No Client Project Configured
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              To conduct a personalized 8-step sacred consultation, register a new client or select an existing client from Client Explorer.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/admin/register">
              <Button variant="primary" size="md" className="text-xs rounded-full px-5 bg-[#0A0A0A] text-white">
                <UserPlus className="w-3.5 h-3.5 mr-1.5 text-[#FFE500]" />
                <span>Register New Customer</span>
              </Button>
            </Link>

            <Link to="/admin/clients">
              <Button variant="outline" size="md" className="text-xs rounded-full px-5">
                <Users className="w-3.5 h-3.5 mr-1.5 text-neutral-600" />
                <span>Choose from Client Explorer</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1Purpose;
