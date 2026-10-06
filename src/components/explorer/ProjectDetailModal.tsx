import React, { useState } from 'react';
import type { ClientProject } from '../../lib/clientsData';
import type { SelectedReference } from '../../types/consultation';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { assetUrl } from '../../lib/utils';
import { Check, Plus, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ClientProject | null;
  isOpen: boolean;
  onClose: () => void;
  selectionMode?: boolean;
  selectedReferences?: SelectedReference[];
  onSelectReference?: (ref: SelectedReference) => boolean;
  onRemoveReference?: (caption: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  selectionMode = false,
  selectedReferences = [],
  onSelectReference,
  onRemoveReference
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!project) return null;

  // Filter only stages that have images
  const availableStages = project.stages.filter((s) => s.images && s.images.length > 0);
  const currentStage = availableStages[activeStageIndex] || availableStages[0];
  const images = currentStage ? currentStage.images : [];
  const currentImage = images[selectedImageIndex] || images[0];

  const isSelected = (imgUrl: string) => {
    return selectedReferences.some((r) => r.data === imgUrl || r.data.endsWith(imgUrl));
  };

  const handleToggleReference = (imgUrl: string) => {
    if (isSelected(imgUrl)) {
      onRemoveReference?.(imgUrl);
    } else {
      const caption = `${project.name} · ${currentStage?.title || 'Sanctum'}`;
      onSelectReference?.({
        data: assetUrl(imgUrl),
        kind: 'Completed Svvayam project',
        caption,
        source: 'client_project',
        projectId: project.id
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="6xl"
      className="p-0 overflow-hidden flex flex-col"
      showCloseButton={false}
    >
      {/* Custom Unified Header */}
      <div className="bg-white border-b border-neutral-200 p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-neutral-100 text-[#0A0A0A] border border-neutral-200">
                {project.sizeLabel} · {project.size}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-[#0A0A0A] text-white">
                {project.material}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-[#0A0A0A] mt-1">
              {project.name}
            </h2>
            <div className="flex items-center space-x-3 text-xs text-neutral-500 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#0A0A0A]" />
                <span>{project.location}</span>
              </span>
              <span>•</span>
              <span>{project.type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectionMode && currentImage && (
            <Button
              variant={isSelected(currentImage) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleToggleReference(currentImage)}
              className="text-xs"
            >
              {isSelected(currentImage) ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Picked as Reference</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Pick as Reference</span>
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Exit
          </Button>
        </div>
      </div>

      {/* Dynamic Stage Navigation Pills - Uniform Rounded Rectangles */}
      <div className="bg-neutral-50/80 border-b border-neutral-200 px-4 sm:px-6 py-2.5 overflow-x-auto flex items-center gap-2 no-scrollbar">
        {availableStages.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={stage.stage_key}
              onClick={() => {
                setActiveStageIndex(idx);
                setSelectedImageIndex(0);
              }}
              className={`h-9 px-3.5 text-xs font-medium font-sans whitespace-nowrap shrink-0 rounded-[12px] border transition-all duration-150 cursor-pointer flex items-center space-x-2 select-none ${
                isActive
                  ? 'bg-gradient-to-b from-[#2A2A2A] via-[#141414] to-[#0E2A1C] text-white border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                  : 'bg-white hover:bg-neutral-50 text-[#5C5C5C] hover:text-[#0A0A0A] border-[#ECECEC]'
              }`}
            >
              <span>{stage.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono leading-none border ${
                  isActive ? 'bg-white/20 text-white border-white/20' : 'bg-neutral-100 text-[#737373] border-[#ECECEC]'
                }`}
              >
                {stage.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Stage Image Viewer */}
      <div className="flex-1 bg-black relative flex flex-col items-center justify-center p-4 min-h-[50vh]">
        {currentImage ? (
          <div className="relative max-w-full max-h-[60vh] flex items-center justify-center">
            <img
              src={assetUrl(currentImage)}
              alt={`${project.name} - ${currentStage?.title}`}
              className="max-w-full max-h-[60vh] object-contain shadow-2xl rounded-sm"
            />

            {/* Previous/Next image arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition cursor-pointer"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition cursor-pointer"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="text-neutral-400 text-xs font-serif">No image available for this stage</div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="bg-[#121212] border-t border-neutral-800 p-2.5 flex items-center justify-center space-x-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className={`w-12 h-12 rounded-[10px] overflow-hidden border transition shrink-0 cursor-pointer ${
                i === selectedImageIndex ? 'border-2 border-emerald-400 ring-2 ring-emerald-400/20' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={assetUrl(img)}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
};
