import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Info,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface VisualExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type VideoCategory = 'all' | 'factory' | 'assembling' | 'artisans' | 'sketch';

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: 'factory' | 'assembling' | 'artisans' | 'sketch';
  categoryLabel: string;
  aspect: '16:9' | '9:16';
  description: string;
  bullets: string[];
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'factory',
    youtubeId: 'x7J4QCq1EVw',
    title: 'Factory Video: Workshop & Precision Stone Cutting',
    category: 'factory',
    categoryLabel: 'Factory Video',
    aspect: '16:9',
    description:
      'Step inside Svvayam’s specialized temple manufacturing facility. Watch how raw quarried granites and pink sandstones are carefully inspected, dimensioned with CNC wire-cutting precision, and prepared for master carvers.',
    bullets: [
      'Raw Block Multi-Wire Slicing',
      'Vastu Sizing & Tolerance Calibrations',
      'Artisanal Chisel Station Layout'
    ]
  },
  {
    id: 'assembling',
    youtubeId: 'Q2f_GqCMziU',
    title: 'Step-to-Step Assembling Process: Dry-Fit & Joinery',
    category: 'assembling',
    categoryLabel: 'Assembling Process',
    aspect: '16:9',
    description:
      'Every sacred sanctum is completely dry-fitted and pre-assembled inside our workshop before dispatch, ensuring zero tolerance errors on site.',
    bullets: [
      'Interlocking Stone & Timber Mortise-Tenon Joints',
      'Pillar Alignment & Plumb-Line Verifications',
      'Structural Shikhara Stability Tests'
    ]
  },
  {
    id: 'artisan-1',
    youtubeId: 'cZW_qW2Jk8Q',
    title: 'Artisan Master Carving — Fine Relief Detailing',
    category: 'artisans',
    categoryLabel: 'Artisans',
    aspect: '9:16',
    description:
      'Traditional guild sculptors chiseling sacred motifs, floral creepers, and devata icons with generational knowledge.',
    bullets: [
      'Hand Chisel Craftsmanship',
      'Sacred Iconography Proportions',
      'Relief Ornamentation Depth'
    ]
  },
  {
    id: 'artisan-2',
    youtubeId: 'aJsIJLgC9Q8',
    title: 'Precision Timber Lathe Turning & Kalash Profiles',
    category: 'artisans',
    categoryLabel: 'Artisans',
    aspect: '9:16',
    description:
      'Precision teakwood lathe shaping for sanctum pillars and bell-shaped kalash tops.',
    bullets: [
      'Solid Teakwood Lathe Turning',
      'Hand Caliper Measurements',
      'Beeswax Natural Polishing'
    ]
  },
  {
    id: 'artisan-3',
    youtubeId: 'HpDK4CfMN2A',
    title: 'Artisan Brass Jali & Gold Leaf Gilding',
    category: 'artisans',
    categoryLabel: 'Artisans',
    aspect: '9:16',
    description:
      'Bespoke hand-cast brass embellishments and 24K pure gold foil application on sanctum pinnacles.',
    bullets: [
      'Lost-Wax Brass Casting',
      'Pure Gold Leaf Work',
      'Protective Antique Lacquering'
    ]
  },
  {
    id: 'sketch',
    youtubeId: 'HiDbFn5LYNI',
    title: 'Sketch to Installation: The Complete Temple Journey',
    category: 'sketch',
    categoryLabel: 'Sketch to Installation',
    aspect: '16:9',
    description:
      'Watch the entire metamorphosis of an architectural idea: starting from a hand sketch on paper, 3D CAD computer modeling, workshop crafting, and the final sanctum inauguration at the client residence.',
    bullets: [
      'Initial Conceptual Sketching',
      'Photorealistic 3D Modeling & Client Walkthrough',
      'Flawless On-Site Handover & Lighting'
    ]
  }
];

export const CATEGORIES: { id: VideoCategory; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'factory', label: 'Factory Video' },
  { id: 'assembling', label: 'Assembling Process' },
  { id: 'artisans', label: 'Artisans' },
  { id: 'sketch', label: 'Sketch to Installation' }
];

export const VisualExploreModal: React.FC<VisualExploreModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const galleryScrollTop = useRef<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filtered videos based on active category
  const filteredVideos =
    selectedCategory === 'all'
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === selectedCategory);

  const currentVideo =
    activeVideoIndex !== null && activeVideoIndex >= 0 && activeVideoIndex < filteredVideos.length
      ? filteredVideos[activeVideoIndex]
      : null;

  // Stop video in iframe before switching or closing
  const stopCurrentVideo = useCallback(() => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }),
          '*'
        );
      }
    } catch {
      // Ignored for cross-origin boundary
    }
  }, []);

  // Handle exiting browser fullscreen
  const exitBrowserFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  // Handle toggling browser fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        await exitBrowserFullscreen();
      }
    } catch (err) {
      console.warn('[VisualExplore] Fullscreen toggle error:', err);
    }
  }, [exitBrowserFullscreen]);

  // Open slideshow player at specified index
  const openPlayer = (index: number) => {
    if (galleryScrollRef.current) {
      galleryScrollTop.current = galleryScrollRef.current.scrollTop;
    }
    setActiveVideoIndex(index);
    setIsAboutOpen(false);
  };

  // Close slideshow player and restore scroll position in collage
  const closePlayer = useCallback(() => {
    stopCurrentVideo();
    setActiveVideoIndex(null);
    setIsAboutOpen(false);
  }, [stopCurrentVideo]);

  // Navigate to previous video
  const handlePrev = useCallback(() => {
    if (activeVideoIndex === null || activeVideoIndex <= 0) return;
    stopCurrentVideo();
    setActiveVideoIndex((prev) => (prev !== null ? prev - 1 : null));
    setIsAboutOpen(false);
  }, [activeVideoIndex, stopCurrentVideo]);

  // Navigate to next video
  const handleNext = useCallback(() => {
    if (activeVideoIndex === null || activeVideoIndex >= filteredVideos.length - 1) return;
    stopCurrentVideo();
    setActiveVideoIndex((prev) => (prev !== null ? prev + 1 : null));
    setIsAboutOpen(false);
  }, [activeVideoIndex, filteredVideos.length, stopCurrentVideo]);

  // Restore gallery scroll position when returning from player
  useEffect(() => {
    if (activeVideoIndex === null && galleryScrollRef.current) {
      galleryScrollRef.current.scrollTop = galleryScrollTop.current;
    }
  }, [activeVideoIndex]);

  // Track Fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Modal open/close lifecycle: body scroll lock & focus restoration
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus container for keyboard listener
      containerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      if (document.fullscreenElement) {
        exitBrowserFullscreen();
      }
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, exitBrowserFullscreen]);

  // Global Keyboard Navigation (Arrows & Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (document.fullscreenElement) {
          exitBrowserFullscreen();
          return;
        }
        if (activeVideoIndex !== null) {
          closePlayer();
        } else {
          onClose();
        }
        return;
      }

      if (activeVideoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeVideoIndex, handlePrev, handleNext, closePlayer, onClose, exitBrowserFullscreen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Svvayam Visual Explore Video Gallery"
      className="fixed inset-0 z-50 bg-[#0A0A0A] text-white flex flex-col select-none overflow-hidden outline-none"
      style={{ overscrollBehavior: 'contain' }}
    >
      {/* =========================================================================
          VIEW 1: SLIDESHOW PLAYER (When activeVideoIndex !== null)
      ========================================================================= */}
      {currentVideo !== null && activeVideoIndex !== null ? (
        <div className="relative flex-1 flex flex-col bg-black overflow-hidden">
          {/* Top Information Bar */}
          <header className="shrink-0 z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 transition-all">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Left: Back Control + Category + Position Badge */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closePlayer}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white text-xs font-sans font-medium transition cursor-pointer border border-white/10 focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Back to video collage gallery"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Gallery</span>
                </button>

                <div className="h-4 w-px bg-white/15 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[11px] uppercase tracking-wider font-medium">
                    {currentVideo.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 font-semibold">
                    {activeVideoIndex + 1} / {filteredVideos.length}
                  </span>
                </div>
              </div>

              {/* Center: Title & Short Explanation */}
              <div className="flex-1 min-w-0 md:px-4">
                <h2 className="text-sm sm:text-base font-serif font-medium text-white truncate leading-snug">
                  {currentVideo.title}
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-sans truncate leading-relaxed">
                  {currentVideo.description}
                </p>
              </div>

              {/* Right Controls: About Toggle, Fullscreen Toggle, Close */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAboutOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-sans transition cursor-pointer ${
                    isAboutOpen
                      ? 'bg-amber-400 text-black border-amber-400 font-medium'
                      : 'bg-white/10 text-neutral-300 hover:text-white border-white/10 hover:bg-white/20'
                  }`}
                  aria-label="Toggle details about this video"
                  aria-expanded={isAboutOpen}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">About</span>
                  {isAboutOpen ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/10 transition cursor-pointer"
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/10 transition cursor-pointer"
                  title="Close Visual Explore"
                  aria-label="Close Visual Explore"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expandable "About this video" Drawer */}
            {isAboutOpen && (
              <div className="max-w-4xl mx-auto mt-3 pt-3 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="md:col-span-2 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                    Architectural Narrative
                  </span>
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    {currentVideo.description}
                  </p>
                </div>
                <div className="space-y-1.5 bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Guild Highlights
                  </span>
                  <ul className="space-y-1">
                    {currentVideo.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-neutral-300">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </header>

          {/* Player Arena: Viewport-Filling Stage with Navigation Arrows */}
          <main className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden bg-black">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeVideoIndex === 0}
              aria-label="Play previous video"
              className={`absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full backdrop-blur-md border transition-all duration-200 ${
                activeVideoIndex === 0
                  ? 'opacity-20 cursor-not-allowed bg-black/40 border-white/5 text-neutral-600'
                  : 'bg-black/60 hover:bg-white text-white hover:text-black border-white/20 hover:border-white shadow-xl cursor-pointer hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>

            {/* Video Canvas: Preserves Full Aspect Ratio without Distortion */}
            <div
              className={`relative z-10 flex items-center justify-center w-full h-full ${
                currentVideo.aspect === '9:16'
                  ? 'max-h-[calc(100vh-140px)] aspect-[9/16] max-w-[420px]'
                  : 'max-w-5xl aspect-video max-h-[calc(100vh-140px)]'
              }`}
            >
              <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <iframe
                  ref={iframeRef}
                  key={currentVideo.id}
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0&playsinline=1&controls=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={activeVideoIndex === filteredVideos.length - 1}
              aria-label="Play next video"
              className={`absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full backdrop-blur-md border transition-all duration-200 ${
                activeVideoIndex === filteredVideos.length - 1
                  ? 'opacity-20 cursor-not-allowed bg-black/40 border-white/5 text-neutral-600'
                  : 'bg-black/60 hover:bg-white text-white hover:text-black border-white/20 hover:border-white shadow-xl cursor-pointer hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          </main>

          {/* Bottom Safety / Source Fallback Bar */}
          <footer className="shrink-0 z-20 bg-[#0A0A0A] border-t border-white/5 px-4 py-2 flex items-center justify-between text-[11px] text-neutral-500 font-sans">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Use keyboard</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-neutral-300 font-mono text-[10px]">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-neutral-300 font-mono text-[10px]">
                →
              </kbd>
              <span className="hidden sm:inline">to navigate</span>
              <span className="mx-1">•</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-neutral-300 font-mono text-[10px]">
                Esc
              </kbd>
              <span className="hidden sm:inline">returns to collage</span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-amber-300 transition"
              title="Watch video on original YouTube host"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </footer>
        </div>
      ) : (
        /* =========================================================================
            VIEW 2: FULLSCREEN VIDEO COLLAGE GALLERY
        ========================================================================= */
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-[#0F0F0F] via-[#0A0A0A] to-black">
          {/* Gallery Header */}
          <header className="px-4 sm:px-8 py-4 border-b border-white/10 bg-[#0F0F0F]/90 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 font-semibold">
                      Cinematic Guild Archive
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">•</span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {VIDEOS.length} Film Records
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-serif font-medium text-white tracking-wide leading-tight">
                    Visual Explore
                  </h1>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="w-8 h-8 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition cursor-pointer"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition cursor-pointer"
                  title="Close Visual Explore"
                  aria-label="Close Visual Explore"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Counts derived from actual data) */}
            <nav
              aria-label="Video Categories"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
            >
              {CATEGORIES.map((cat) => {
                const count =
                  cat.id === 'all'
                    ? VIDEOS.length
                    : VIDEOS.filter((v) => v.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-8 px-3.5 rounded-full border transition-all duration-200 flex items-center space-x-1.5 shrink-0 cursor-pointer font-sans text-xs font-medium ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                        : 'bg-white/5 text-neutral-300 hover:text-white border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-black/20 text-black font-semibold'
                          : 'bg-white/10 text-neutral-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Actions: Fullscreen + Close */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="h-8.5 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition cursor-pointer font-sans"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Window</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8.5 h-8.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition cursor-pointer"
                title="Close Visual Explore"
                aria-label="Close Visual Explore"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Collage Gallery Grid Body (Scrollable container with scroll restoration) */}
          <div
            ref={galleryScrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 overscroll-contain"
          >
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Tagline inside Gallery */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-300/80 font-mono uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Guild Masterworks in Motion</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans max-w-xl">
                    Select any masterwork below to launch the cinema player. Use left/right controls or arrow keys to browse sacred workshop processes.
                  </p>
                </div>
                <div className="text-right text-xs text-neutral-400 font-mono">
                  Showing {filteredVideos.length} of {VIDEOS.length} videos
                </div>
              </div>

              {/* Responsive Collage Layout */}
              {selectedCategory === 'all' ? (
                /* Dynamic Balanced Collage: Combines Landscape & Portrait Tiles */
                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                  {/* Row 1: Factory Video (Landscape) & Assembling Process (Landscape) */}
                  <div className="md:col-span-3">
                    <CollageTile
                      video={filteredVideos[0]}
                      index={0}
                      onSelect={() => openPlayer(0)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <CollageTile
                      video={filteredVideos[1]}
                      index={1}
                      onSelect={() => openPlayer(1)}
                    />
                  </div>

                  {/* Row 2: Artisans Shorts (3 Portrait Tiles side-by-side) */}
                  <div className="md:col-span-2">
                    <CollageTile
                      video={filteredVideos[2]}
                      index={2}
                      onSelect={() => openPlayer(2)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CollageTile
                      video={filteredVideos[3]}
                      index={3}
                      onSelect={() => openPlayer(3)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CollageTile
                      video={filteredVideos[4]}
                      index={4}
                      onSelect={() => openPlayer(4)}
                    />
                  </div>

                  {/* Row 3: Sketch to Installation (Panoramic Landscape Showcase) */}
                  <div className="md:col-span-6">
                    <CollageTile
                      video={filteredVideos[5]}
                      index={5}
                      onSelect={() => openPlayer(5)}
                      isWideHero
                    />
                  </div>
                </div>
              ) : (
                /* Category Filtered Grid */
                <div
                  className={`grid gap-5 ${
                    selectedCategory === 'artisans'
                      ? 'grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto'
                      : 'grid-cols-1 max-w-4xl mx-auto'
                  }`}
                >
                  {filteredVideos.map((video, idx) => (
                    <CollageTile
                      key={video.id}
                      video={video}
                      index={idx}
                      onSelect={() => openPlayer(idx)}
                      isWideHero={video.aspect === '16:9'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   COLLAGE TILE COMPONENT: Lightweight Thumbnail Tile
========================================================================= */
interface CollageTileProps {
  video: VideoItem;
  index: number;
  onSelect: () => void;
  isWideHero?: boolean;
}

const CollageTile: React.FC<CollageTileProps> = ({
  video,
  index,
  onSelect,
  isWideHero = false
}) => {
  const isPortrait = video.aspect === '9:16';

  // High resolution thumbnail with standard definition fallback
  const thumbUrl = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const fallbackThumbUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Play ${video.title}`}
      className={`group relative overflow-hidden rounded-xl border border-white/10 hover:border-amber-400/50 bg-neutral-900 shadow-md hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 cursor-pointer flex flex-col justify-end ${
        isPortrait
          ? 'aspect-[9/15] sm:aspect-[9/14] md:aspect-[9/15] w-full'
          : isWideHero
          ? 'aspect-video md:aspect-[21/9] w-full max-h-[440px]'
          : 'aspect-video w-full'
      }`}
    >
      {/* Thumbnail Image with Safe Aspect Handling & Hover Zoom */}
      <img
        src={thumbUrl}
        alt={video.title}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== fallbackThumbUrl) {
            e.currentTarget.src = fallbackThumbUrl;
          }
        }}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Atmospheric Gradient for Crisp Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:via-black/25 transition-colors duration-300" />

      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider font-medium">
          {video.categoryLabel}
        </span>
        <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300 font-mono text-[10px]">
          {isPortrait ? '9:16 Vertical' : '16:9 Widescreen'}
        </span>
      </div>

      {/* Center Play Icon with Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-300 transition-all duration-300">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="relative z-10 p-4 sm:p-5 space-y-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 font-medium">
            Record #{index + 1}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-serif font-semibold text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
          {video.title}
        </h3>

        <p className="text-[11px] sm:text-xs text-neutral-300 font-sans line-clamp-1 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
};
