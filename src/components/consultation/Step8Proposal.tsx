import React, { useState } from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { PROPOSAL_SECTIONS, ENGAGEMENT_INCLUSIONS, DESIGN_JOURNEY_STEPS } from '../../lib/constants';
import { money, indicativeAmount } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { Printer, Share2, RefreshCw } from 'lucide-react';

export const Step8Proposal: React.FC = () => {
  const { state, selectedReferencesList, triggerSheetsSync } = useConsultation();
  const [syncing, setSyncing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const amount = indicativeAmount(state.fields.estimate);
  const fee = amount === null ? null : Math.min(100000, amount * 0.2);

  const handlePrint = () => {
    window.print();
  };

  const handleShareLink = () => {
    const url = window.location.origin + `/proposal/${state.id || 'draft'}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastMsg('Proposal link copied to clipboard!');
      setTimeout(() => setToastMsg(null), 3000);
    });
  };

  const handleSheetsSync = async () => {
    setSyncing(true);
    const res = await triggerSheetsSync();
    setSyncing(false);
    if (res.success) {
      setToastMsg('Consultation successfully synced to Google Sheets!');
    } else {
      setToastMsg(`Sheets sync: ${res.message || 'Saved locally; configure Edge Function for live sheet'}`);
    }
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-8 proposal-document">
      {/* Action Toolbar (Hidden during Print) */}
      <div className="no-print p-4 bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="font-sans font-semibold text-xs sm:text-sm text-[#0A0A0A]">
            Preliminary Architectural Proposal
          </span>
          <span className="text-[10px] font-mono uppercase bg-[#F1F1F1] text-[#0A0A0A] px-2 py-0.5 rounded-full border border-[#ECECEC]">
            Ready for Client Review
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Print / Save PDF</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleShareLink}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5 mr-1" />
            <span>Copy Client Link</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSheetsSync}
            disabled={syncing}
            className="text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync to Google Sheet'}</span>
          </Button>
        </div>
      </div>

      {toastMsg && (
        <div className="no-print">
          <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
        </div>
      )}

      {/* Main Printable Proposal Document */}
      <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 sm:p-10 print:border-0 print:p-0 print:shadow-none space-y-8">
        {/* Document Header */}
        <div className="border-b border-[#ECECEC] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Logo className="h-8 object-contain" />
            </div>
            <p className="text-[11px] text-[#5C5C5C] uppercase tracking-widest mt-2 font-mono">
              Bespoke Sacred Architecture · Preliminary Client Proposal
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 font-sans">
            <div className="font-semibold text-[#0A0A0A] text-sm font-sans">
              {state.fields.client || 'Client Consultation'}
            </div>
            <div className="text-[#5C5C5C]">
              Location: {state.fields.location || 'Not specified'}
            </div>
            <div className="text-[#737373] font-mono">
              Date: {state.fields.date || new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>

        {/* 5 Core Consultation Review Sections */}
        <div className="space-y-6">
          {PROPOSAL_SECTIONS.map((section, sIdx) => {
            const hasAnyData = section.fields.some(([fKey]) => Boolean(state.fields[fKey]));
            if (!hasAnyData) return null;

            return (
              <section key={sIdx} className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] border-b border-[#ECECEC] pb-1 font-sans">
                  {section.title}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-4 gap-y-2 text-xs font-sans">
                  {section.fields.map(([fKey, fLabel]) => {
                    const val = state.fields[fKey];
                    if (!val) return null;

                    return (
                      <React.Fragment key={fKey}>
                        <dt className="font-medium text-[#5C5C5C]">{fLabel}</dt>
                        <dd className="text-[#0A0A0A] whitespace-pre-wrap">{val}</dd>
                      </React.Fragment>
                    );
                  })}
                </dl>
              </section>
            );
          })}
        </div>

        {/* Selected Visual Reference (1 Image) */}
        {selectedReferencesList.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-[#ECECEC]">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] font-sans">
              Approved Visual Reference Direction
            </h3>
            <p className="text-xs text-[#5C5C5C]">
              The selected reference guiding scale, architectural proportion, and master craftsmanship:
            </p>
            <div className="max-w-md pt-2">
              <figure className="border border-[#ECECEC] bg-[#FAFAFA] rounded-[16px] p-3 space-y-3">
                <div className="w-full h-56 bg-white rounded-[12px] overflow-hidden flex items-center justify-center border border-[#ECECEC] p-2">
                  <img
                    src={selectedReferencesList[0].data}
                    alt={selectedReferencesList[0].caption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="text-xs text-[#0A0A0A] text-center font-sans font-medium">
                  <span className="text-[10px] uppercase font-mono text-[#5C5C5C] block mb-0.5">
                    {selectedReferencesList[0].kind || 'Design Reference'}
                  </span>
                  {selectedReferencesList[0].caption}
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {/* Client Space & Uploaded Inspiration Photos (if any) */}
        {state.images.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-[#ECECEC]">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] font-sans">
              Site Context & Client Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {state.images.map((img, idx) => (
                <figure
                  key={idx}
                  className="border border-[#ECECEC] bg-[#FAFAFA] rounded-[14px] p-2 space-y-2"
                >
                  <div className="w-full h-40 bg-white rounded-[10px] overflow-hidden flex items-center justify-center border border-[#ECECEC]">
                    <img
                      src={img.data}
                      alt={img.caption || `Client reference ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <figcaption className="text-xs text-[#0A0A0A] font-sans">
                    <span className="font-mono text-[10px] uppercase text-[#737373] block">
                      {img.kind}
                    </span>
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Section: Your Design Engagement (Strict Wireframe Text & Formula) */}
        <section className="space-y-4 pt-6 border-t border-[#ECECEC]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] inline-block shadow-2xs" />
            <h3 className="text-base font-semibold text-[#0A0A0A] uppercase tracking-wide font-sans">
              Your Design Engagement
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA] rounded-[20px] p-6 border border-[#ECECEC]">
            <div className="space-y-3">
              <div className="font-sans font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight">
                {fee === null ? 'Fee to be confirmed' : money(fee)}
              </div>
              <p className="text-xs font-semibold text-[#0A0A0A] font-sans">
                ₹1,00,000 or 20% of the indicative project budget, whichever is lower.
              </p>
              {amount === null ? (
                <p className="text-xs text-[#5C5C5C]">
                  Confirm one indicative budget amount on the Scope page to calculate your fee.
                </p>
              ) : (
                <p className="text-xs text-[#5C5C5C]">
                  Based on an indicative project budget of {money(amount)}. This design fee is adjustable against the manufacturing cost.
                </p>
              )}
              <p className="text-xs text-[#5C5C5C] pt-2 border-t border-[#ECECEC]">
                <strong>Tax treatment:</strong>{' '}
                {state.fields.exclusions || 'To be confirmed in the written quotation.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] font-sans">
                Included in your engagement
              </h4>
              <ul className="text-xs text-[#5C5C5C] space-y-1.5 list-disc pl-4 font-sans">
                {ENGAGEMENT_INCLUSIONS.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Your Design Journey (4 Steps) */}
        <section className="space-y-4 pt-4 border-t border-[#ECECEC]">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] font-sans">
            Your Design Journey
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESIGN_JOURNEY_STEPS.map((journeyStep, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[14px] border border-[#ECECEC] bg-white space-y-2 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-[8px] bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white font-mono text-[10px] font-semibold flex items-center justify-center shadow-xs">
                  {`0${idx + 1}`}
                </div>
                <h4 className="text-xs font-semibold text-[#0A0A0A] font-sans">
                  {journeyStep.step}
                </h4>
                <p className="text-[11px] text-[#5C5C5C] leading-relaxed font-sans">
                  {journeyStep.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: How We Begin */}
        <section className="space-y-2 pt-4 border-t border-[#ECECEC] bg-[#FAFAFA] rounded-[20px] p-6 border">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-[#0A0A0A] font-sans">
            How we begin
          </h3>
          <p className="text-xs text-[#0A0A0A] leading-relaxed">
            Confirm this design direction
            {state.fields.approvers ? ` with ${state.fields.approvers}` : ''}
            {state.fields.decision ? ` by ${state.fields.decision}` : ''}, share the site layout, photographs and dimensions, and pay{' '}
            <strong>{fee === null ? 'the confirmed design engagement fee' : money(fee)}</strong> to reserve your design slot.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            After design approval, we confirm final costing and manufacturing terms in writing before production.{' '}
            {state.fields.timeline || 'Project timing will be confirmed after scope and site readiness are reviewed.'}
          </p>
        </section>

        {/* Footer Signature Block */}
        <div className="pt-8 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-400">
          <div>
            <span>Svvayam Sacred Architecture · Handcrafted in Bengaluru, India</span>
          </div>
          <div>
            <span>www.svvayam.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
