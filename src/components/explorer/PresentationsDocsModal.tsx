import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { assetUrl } from '../../lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, X, Layers } from 'lucide-react';

interface PresentationsDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeckInfo {
  id: string;
  title: string;
  totalSlides: number;
  dir: string;
}

const DECKS: DeckInfo[] = [
  {
    id: 'doc1',
    title: 'Deck 1 — Render & Executed Showcase Deck',
    totalSlides: 19,
    dir: assetUrl('assets/docs/pages/doc1')
  },
  {
    id: 'doc2',
    title: 'Deck 2 — Architectural Details & Material Joinery',
    totalSlides: 30,
    dir: assetUrl('assets/docs/pages/doc2')
  },
  {
    id: 'doc3',
    title: 'Deck 3 — Guild Artisans & Installation Guidelines',
    totalSlides: 10,
    dir: assetUrl('assets/docs/pages/doc3')
  }
];

export const PresentationsDocsModal: React.FC<PresentationsDocsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeDeck = DECKS[activeDeckIndex];

  // Reset slide index when deck changes
  useEffect(() => {
    setCurrentSlideIndex(1);
    setZoomLevel(1);
  }, [activeDeckIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev < activeDeck.totalSlides ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev > 1 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeDeck.totalSlides]);

  if (!isOpen) return null;

  const currentSlideUrl = `${activeDeck.dir}/page_${String(currentSlideIndex).padStart(2, '0')}.jpg`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="6xl"
      className="p-0 bg-[#0A0A0A] border-neutral-800 text-white flex flex-col h-[90vh]"
      showCloseButton={false}
    >
      {/* Top Header */}
      <div className="bg-[#141414] border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-white text-[#0A0A0A] flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Presentation Decks & Architectural Docs
            </span>
            <h3 className="text-sm font-medium text-white truncate">
              {activeDeck.title}
            </h3>
          </div>
        </div>

        {/* Deck Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          {DECKS.map((deck, idx) => (
            <button
              key={deck.id}
              onClick={() => setActiveDeckIndex(idx)}
              className={`h-7 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                idx === activeDeckIndex
                  ? 'bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white border border-white/10 shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Deck {idx + 1} ({deck.totalSlides})
            </button>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg border border-neutral-800 hover:border-white flex items-center justify-center text-white transition cursor-pointer"
          title="Close presentations"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-toolbar: Slide Counter & Zoom */}
      <div className="bg-[#141414] border-b border-neutral-800 px-6 py-2 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentSlideIndex((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={currentSlideIndex <= 1}
            className="w-6 h-6 border border-neutral-800 hover:border-neutral-600 disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center text-white transition cursor-pointer"
            title="Previous slide (←)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs text-neutral-300 px-2">
            {`Slide ${currentSlideIndex} of ${activeDeck.totalSlides}`}
          </span>

          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev < activeDeck.totalSlides ? prev + 1 : prev))
            }
            disabled={currentSlideIndex >= activeDeck.totalSlides}
            className="w-6 h-6 border border-neutral-800 hover:border-neutral-600 disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center text-white transition cursor-pointer"
            title="Next slide (→)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 border border-neutral-800 p-0.5">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5 text-neutral-300">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 text-neutral-400 hover:text-white ml-1 cursor-pointer"
            title="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage Viewport */}
      <div className="flex-1 bg-[#0A0A0A] relative overflow-auto flex items-center justify-center p-4 select-none">
        {/* Previous Button Overlay */}
        <button
          onClick={() => setCurrentSlideIndex((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={currentSlideIndex <= 1}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-white text-white hover:text-[#0A0A0A] rounded-full border border-neutral-700 shadow-xl flex items-center justify-center transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          title="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Display */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={currentSlideUrl}
            alt={`Slide ${currentSlideIndex}`}
            className="max-w-full max-h-[62vh] object-contain shadow-2xl border border-neutral-800"
          />
        </div>

        {/* Next Button Overlay */}
        <button
          onClick={() =>
            setCurrentSlideIndex((prev) => (prev < activeDeck.totalSlides ? prev + 1 : prev))
          }
          disabled={currentSlideIndex >= activeDeck.totalSlides}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-white text-white hover:text-[#0A0A0A] rounded-full border border-neutral-700 shadow-xl flex items-center justify-center transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          title="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-20 bg-[#141414] border-t border-neutral-800 px-4 flex items-center space-x-2 overflow-x-auto shrink-0 no-scrollbar">
        {Array.from({ length: activeDeck.totalSlides }).map((_, idx) => {
          const sNum = idx + 1;
          const thumbUrl = `${activeDeck.dir}/page_${String(sNum).padStart(2, '0')}.jpg`;
          const isCurrent = sNum === currentSlideIndex;

          return (
            <button
              key={sNum}
              onClick={() => setCurrentSlideIndex(sNum)}
              className={`h-14 aspect-video overflow-hidden border transition shrink-0 cursor-pointer rounded-xs ${
                isCurrent ? 'border-2 border-emerald-400' : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img
                src={thumbUrl}
                alt={`Thumb ${sNum}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
