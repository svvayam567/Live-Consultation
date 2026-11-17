import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Layers, X, ExternalLink, Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2, Download, AlertCircle, RefreshCw } from 'lucide-react';

interface PresentationsDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeckInfo {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  driveId: string;
  driveUrl: string;
  pageCount: number;
  pdfUrl: string;
}

export const DECKS: DeckInfo[] = [
  {
    id: 'doc1',
    tabLabel: 'Deck 1 (19)',
    title: 'Deck 1 — Render & Executed Showcase Deck',
    subtitle: '3D Renders, Sanctum Blueprints & Completed Client Commissions',
    driveId: '1koaMZJizLUmIjonj-Cx3ySB8dHoUci27',
    driveUrl: 'https://drive.google.com/file/d/1koaMZJizLUmIjonj-Cx3ySB8dHoUci27/view?usp=sharing',
    pageCount: 19,
    pdfUrl: '/assets/docs/doc1.pdf'
  },
  {
    id: 'doc2',
    tabLabel: 'Deck 2 (30)',
    title: 'Deck 2 — From Imagination to Installation',
    subtitle: 'Architectural Details, Material Joinery & Site Execution Workflow',
    driveId: '106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw',
    driveUrl: 'https://drive.google.com/file/d/106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw/view?usp=drive_link',
    pageCount: 30,
    pdfUrl: '/assets/docs/doc2.pdf'
  },
  {
    id: 'doc3',
    tabLabel: 'Deck 3 (10)',
    title: 'Deck 3 — Stone Temple Collection',
    subtitle: 'Guild Artisans, Master Sculptures & Sacred Temple Specifications',
    driveId: '1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo',
    driveUrl: 'https://drive.google.com/file/d/1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo/view?usp=drive_link',
    pageCount: 10,
    pdfUrl: '/assets/docs/doc3.pdf'
  },
  {
    id: 'doc4',
    tabLabel: 'Deck 4 (15)',
    title: 'Deck 4 — Design Inspiration',
    subtitle: 'Sanctum Design Inspirations, Architectural Concepts & Sacred Motifs',
    driveId: '16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2',
    driveUrl: 'https://drive.google.com/file/d/16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2/view?usp=drive_link',
    pageCount: 15,
    pdfUrl: '/assets/docs/doc4.pdf'
  }
];

export const PresentationsDocsModal: React.FC<PresentationsDocsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const activeDeck = DECKS[activeDeckIndex];

  // Helper to format page filename
  const getPageUrl = (deckId: string, pageNum: number) => {
    const numStr = String(pageNum).padStart(2, '0');
    return `${import.meta.env.BASE_URL}assets/docs/pages/${deckId}/page_${numStr}.jpg`;
  };

  const currentSlideUrl = getPageUrl(activeDeck.id, currentPage);

  // Reset page & states when deck changes
  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    setHasError(false);
  }, [activeDeckIndex]);

  // Preload adjacent pages for instantaneous transition
  useEffect(() => {
    if (currentPage < activeDeck.pageCount) {
      const nextImg = new Image();
      nextImg.src = getPageUrl(activeDeck.id, currentPage + 1);
    }
    if (currentPage > 1) {
      const prevImg = new Image();
      prevImg.src = getPageUrl(activeDeck.id, currentPage - 1);
    }
  }, [activeDeck.id, currentPage, activeDeck.pageCount]);

  // Page navigation helpers
  const handlePrev = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setHasError(false);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < activeDeck.pageCount) {
      setIsLoading(true);
      setHasError(false);
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Keyboard navigation: 1, 2, 3, 4 for tabs; Arrows for pages
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '1') {
        setActiveDeckIndex(0);
      } else if (e.key === '2') {
        setActiveDeckIndex(1);
      } else if (e.key === '3') {
        setActiveDeckIndex(2);
      } else if (e.key === '4') {
        setActiveDeckIndex(3);
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentPage(activeDeck.pageCount);
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeDeck.pageCount, currentPage, isFullscreen, onClose]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="full"
      className={`p-0 bg-[#0A0A0A] border-neutral-800 text-white flex flex-col shadow-2xl overflow-hidden transition-all duration-200 ${
        isFullscreen ? 'fixed inset-0 h-screen w-screen max-w-none rounded-none z-50' : 'h-[92vh] max-w-7xl'
      }`}
      bodyClassName="p-0 flex flex-col h-full overflow-hidden"
      showCloseButton={false}
    >
      {/* Top Header */}
      <header className="bg-[#141414] border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Presentation Decks & Architectural Docs
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-neutral-300">
                {DECKS.length} Decks · {DECKS.reduce((acc, d) => acc + (d.pageCount || 0), 0)} Pages
              </span>
            </div>
            <h3 id="presentations-modal-title" className="text-sm sm:text-base font-serif font-medium text-white truncate">
              {activeDeck.title}
            </h3>
          </div>
        </div>

        {/* Deck Switcher Tabs (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          {DECKS.map((deck, idx) => {
            const isActive = idx === activeDeckIndex;
            return (
              <button
                key={deck.id}
                id={`deck-tab-${idx}`}
                onClick={() => setActiveDeckIndex(idx)}
                className={`h-8 px-3.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white border border-white/20 shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
                title={`Switch to ${deck.title} (Key ${idx + 1})`}
              >
                <span>{deck.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Actions: Open in Drive + Download PDF + Fullscreen + Close */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            id="presentations-drive-link"
            href={activeDeck.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
            title="Open presentation deck in Google Drive"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open in Drive</span>
          </a>

          <a
            href={activeDeck.pdfUrl}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
            title="Download full PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="hidden sm:flex w-8 h-8 rounded-lg border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 items-center justify-center text-neutral-300 hover:text-white transition cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-neutral-800 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition cursor-pointer"
            title="Close presentations"
            aria-label="Close presentations"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Sub-Header: Deck Switcher Tabs */}
      <div className="flex md:hidden items-center justify-between gap-1 bg-[#111111] border-b border-neutral-800 px-3 py-2 overflow-x-auto shrink-0 no-scrollbar">
        {DECKS.map((deck, idx) => {
          const isActive = idx === activeDeckIndex;
          return (
            <button
              key={deck.id}
              id={`mobile-deck-tab-${idx}`}
              onClick={() => setActiveDeckIndex(idx)}
              className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition cursor-pointer text-center whitespace-nowrap ${
                isActive
                  ? 'bg-[#0E2A1C] text-white border border-emerald-500/30'
                  : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {deck.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Presentation Stage */}
      <div
        ref={stageRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full h-full relative bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 select-none"
      >
        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-xs text-neutral-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-white/70" />
            <p className="text-xs font-mono tracking-wider uppercase">Loading slide {currentPage}...</p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError ? (
          <div className="flex flex-col items-center justify-center max-w-md p-6 text-center space-y-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl z-20">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-medium text-white">Couldn't load page {currentPage}</h4>
              <p className="text-xs text-neutral-400">
                There was a problem loading this slide from the presentation bundle. You can view the complete original file directly on Google Drive.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                }}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <a
                href={activeDeck.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0E2A1C] hover:bg-[#153D2A] border border-emerald-500/30 text-xs font-medium text-emerald-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Drive</span>
              </a>
            </div>
          </div>
        ) : (
          /* Slide Image Container */
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              key={`${activeDeck.id}-${currentPage}`}
              id="presentations-slide-img"
              src={currentSlideUrl}
              alt={`${activeDeck.title} - Slide ${currentPage} of ${activeDeck.pageCount}`}
              className="max-h-full max-w-full object-contain shadow-2xl rounded-sm transition-opacity duration-200"
              style={{ opacity: isLoading ? 0.2 : 1 }}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              draggable={false}
            />

            {/* Left Prev Arrow Button */}
            {currentPage > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A1A18]/80 hover:bg-white text-white hover:text-[#0A0A0A] border border-neutral-700 hover:border-white shadow-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-20"
                title="Previous Slide (ArrowLeft)"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Next Arrow Button */}
            {currentPage < activeDeck.pageCount && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A1A18]/80 hover:bg-white text-white hover:text-[#0A0A0A] border border-neutral-700 hover:border-white shadow-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-20"
                title="Next Slide (ArrowRight / Space)"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Controls Bar */}
      <footer className="bg-[#141414] border-t border-neutral-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0 text-xs">
        {/* Left: Previous Button & Subtitle */}
        <div className="flex items-center gap-3">
          <button
            id="presentations-prev-btn"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition cursor-pointer ${
              currentPage <= 1
                ? 'border-neutral-800 text-neutral-600 cursor-not-allowed opacity-50'
                : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-200 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-[11px] text-neutral-400 hidden lg:inline truncate max-w-md">
            {activeDeck.subtitle}
          </span>
        </div>

        {/* Center: Slide Counter Pill */}
        <div className="flex items-center gap-2">
          <div id="presentations-counter-pill" className="px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-200 font-medium tracking-wide">
            <span className="text-white font-semibold">{currentPage}</span>
            <span className="text-neutral-500 mx-1.5">/</span>
            <span>{activeDeck.pageCount}</span>
          </div>
        </div>

        {/* Right: Next Button */}
        <div className="flex items-center gap-2">
          <button
            id="presentations-next-btn"
            onClick={handleNext}
            disabled={currentPage >= activeDeck.pageCount}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition cursor-pointer ${
              currentPage >= activeDeck.pageCount
                ? 'border-neutral-800 text-neutral-600 cursor-not-allowed opacity-50'
                : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-200 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </Modal>
  );
};
