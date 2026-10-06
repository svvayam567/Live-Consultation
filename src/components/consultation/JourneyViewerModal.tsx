import React, { useState, useRef } from 'react';
import { JOURNEY_STAGES } from '../../lib/constants';
import type { JourneyAsset } from '../../types/consultation';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, X, Upload, Trash2, FileText } from 'lucide-react';

interface JourneyViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStage: number;
  journeyData: (JourneyAsset[] | null)[];
  onAddFile: (stage: number, data: string, caption: string, mimeType?: string) => void;
  onRemoveAsset: (stage: number, assetIndex: number) => void;
}

export const JourneyViewerModal: React.FC<JourneyViewerModalProps> = ({
  isOpen,
  onClose,
  initialStage,
  journeyData,
  onAddFile,
  onRemoveAsset
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(initialStage);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const [manageOpen, setManageOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentStageMeta = JOURNEY_STAGES[currentStageIndex];
  const assets: JourneyAsset[] = journeyData[currentStageIndex] || [];
  const currentAsset = assets[currentAssetIndex];

  const handleNextStage = () => {
    if (currentStageIndex < JOURNEY_STAGES.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
      setCurrentAssetIndex(0);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
      setCurrentAssetIndex(0);
    }
  };

  const handleNextAsset = () => {
    if (assets.length > 0) {
      setCurrentAssetIndex((prev) => (prev < assets.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePrevAsset = () => {
    if (assets.length > 0) {
      setCurrentAssetIndex((prev) => (prev > 0 ? prev - 1 : assets.length - 1));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onAddFile(currentStageIndex, result, file.name, file.type);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isPdf = currentAsset?.mime_type === 'application/pdf' || currentAsset?.data.startsWith('data:application/pdf');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0A0A0A] text-white flex flex-col animate-fade-in"
    >
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-neutral-800 bg-[#121212] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white font-mono font-bold flex items-center justify-center text-xs border border-white/20 shadow-xs">
            {`0${currentStageIndex + 1}`}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                {currentStageMeta.time}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs text-neutral-400">Stage {currentStageIndex + 1} of 8</span>
            </div>
            <h2 className="text-base sm:text-lg font-medium text-white mt-0.5">
              {currentStageMeta.title}
            </h2>
            <p className="text-xs text-neutral-400 hidden sm:block mt-0.5">
              {currentStageMeta.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Stage switchers */}
          <div className="flex items-center space-x-1 border border-neutral-800 p-0.5">
            <button
              onClick={handlePrevStage}
              disabled={currentStageIndex === 0}
              className="px-2.5 py-1 text-xs hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
              title="Previous stage"
            >
              ← Prev Stage
            </button>
            <button
              onClick={handleNextStage}
              disabled={currentStageIndex === JOURNEY_STAGES.length - 1}
              className="px-2.5 py-1 text-xs hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
              title="Next stage"
            >
              Next Stage →
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 border border-neutral-800 hover:border-white flex items-center justify-center text-white transition ml-2 cursor-pointer"
            title="Close viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Media Canvas */}
      <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
        {assets.length > 0 && currentAsset ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {isPdf ? (
              <iframe
                src={currentAsset.data}
                title={currentAsset.caption || 'Stage PDF'}
                className="w-full h-full bg-white border border-neutral-800"
              />
            ) : (
              <img
                src={currentAsset.data}
                alt={currentAsset.caption || currentStageMeta.title}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl"
              />
            )}

            {/* Previous/Next asset controls if multiple assets */}
            {assets.length > 1 && (
              <>
                <button
                  onClick={handlePrevAsset}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/80 hover:bg-white text-white hover:text-[#0A0A0A] flex items-center justify-center border border-neutral-700 transition cursor-pointer rounded-full"
                  title="Previous asset"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextAsset}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/80 hover:bg-white text-white hover:text-[#0A0A0A] flex items-center justify-center border border-neutral-700 transition cursor-pointer rounded-full"
                  title="Next asset"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Asset Caption */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 border border-neutral-700 text-xs text-white max-w-lg truncate">
              {currentAsset.caption} ({currentAssetIndex + 1} of {assets.length})
            </div>
          </div>
        ) : (
          <div className="max-w-md text-center p-8 space-y-4">
            {/* SVG Fallback Icon from Wireframe */}
            <div className="w-24 h-24 mx-auto border border-neutral-800 flex items-center justify-center text-neutral-400">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
                <path d={currentStageMeta.svgPath} />
              </svg>
            </div>
            <h3 className="text-base font-medium text-white">
              {currentStageMeta.title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {currentStageMeta.description}
            </p>
            <p className="text-[11px] text-neutral-500">
              No live photos or design drawings uploaded for this stage yet. Click &quot;Manage stage files&quot; below to add blueprints, 3D renders, or factory photos.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar & Management Panel */}
      <div className="px-6 py-3 border-t border-neutral-800 bg-[#121212] shrink-0 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3 text-neutral-400">
            <span>
              Files in this stage: <strong className="text-white font-mono">{assets.length}</strong>
            </span>
          </div>

          <button
            onClick={() => setManageOpen(!manageOpen)}
            className="text-neutral-300 hover:text-white underline cursor-pointer"
          >
            {manageOpen ? 'Hide file manager' : 'Add or manage files for this stage'}
          </button>
        </div>

        {/* Manage Drawer */}
        {manageOpen && (
          <div className="p-4 bg-[#181818] border border-neutral-800 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-medium text-white">
                Upload Architectural Proofs / Photos
              </h5>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white border-neutral-700 hover:border-white text-xs"
                >
                  <Upload className="w-3.5 h-3.5 mr-1" />
                  <span>Upload Image or PDF</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {assets.length > 0 && (
              <div className="flex items-center space-x-2 overflow-x-auto py-2">
                {assets.map((asset, aIdx) => (
                  <div
                    key={aIdx}
                    className={`relative w-20 h-20 overflow-hidden border shrink-0 p-1 bg-black rounded-[8px] ${
                      aIdx === currentAssetIndex ? 'border-2 border-emerald-400' : 'border-neutral-800'
                    }`}
                  >
                    <button
                      onClick={() => setCurrentAssetIndex(aIdx)}
                      className="w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
                    >
                      {asset.mime_type === 'application/pdf' ? (
                        <FileText className="w-8 h-8 text-neutral-400" />
                      ) : (
                        <img
                          src={asset.data}
                          alt={asset.caption}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => onRemoveAsset(currentStageIndex, aIdx)}
                      className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-red-600 text-white transition cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
