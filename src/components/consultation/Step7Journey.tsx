import React, { useState } from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { JOURNEY_STAGES } from '../../lib/constants';
import { JourneyViewerModal } from './JourneyViewerModal';
import { Eye, Layers } from 'lucide-react';

export const Step7Journey: React.FC = () => {
  const { state, addJourneyFile, removeJourneyAsset } = useConsultation();
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          25–30 min · Your journey
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          From first conversation to your sacred space
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Here is our authentic 8-stage architectural journey. Click any card to inspect blueprints, 3D models, artisan craftsmanship, and installation proofs in full screen.
        </p>
      </div>

      {/* 8-Stage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {JOURNEY_STAGES.map((stage, idx) => {
          const assets = state.journey?.[idx] || [];
          const hasAssets = assets.length > 0;
          const previewImg = hasAssets ? assets[0].data : null;

          return (
            <div
              key={idx}
              onClick={() => setSelectedStageIndex(idx)}
              className="group bg-white rounded-[20px] border border-[#ECECEC] hover:border-neutral-300 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Visual Card Top */}
              <div className="relative w-full h-44 bg-[#F8F8F8] flex items-center justify-center overflow-hidden border-b border-[#ECECEC]">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt={stage.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-14 h-14 text-neutral-400 group-hover:scale-105 transition-transform"
                  >
                    <path d={stage.svgPath} />
                  </svg>
                )}

                {/* Stage Number Badge */}
                <div className="absolute top-0 left-0 w-8 h-8 rounded-br-[12px] bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white font-mono text-xs font-semibold flex items-center justify-center shadow-xs">
                  {`0${idx + 1}`}
                </div>

                {/* Files Count Badge if any */}
                {hasAssets && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/95 border border-[#ECECEC] text-[10px] font-mono text-[#0A0A0A] flex items-center gap-1 shadow-2xs">
                    <Layers className="w-2.5 h-2.5 text-[#0E2A1C]" />
                    <span>{assets.length} Files</span>
                  </div>
                )}

                {/* Hover inspect overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#0A0A0A] text-xs font-medium font-sans flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#0E2A1C]" />
                    <span>Open full screen</span>
                  </span>
                </div>
              </div>

              {/* Card Copy */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    {stage.time}
                  </span>
                  <h3 className="text-sm font-medium text-[#0A0A0A] mt-1 group-hover:underline">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-[11px] font-medium text-[#0A0A0A] flex items-center justify-between">
                  <span>Stage {idx + 1}</span>
                  <span className="text-neutral-500 group-hover:text-[#0A0A0A]">
                    View files →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Journey Viewer Modal */}
      {selectedStageIndex !== null && (
        <JourneyViewerModal
          isOpen={true}
          onClose={() => setSelectedStageIndex(null)}
          initialStage={selectedStageIndex}
          journeyData={state.journey || []}
          onAddFile={addJourneyFile}
          onRemoveAsset={removeJourneyAsset}
        />
      )}
    </div>
  );
};
