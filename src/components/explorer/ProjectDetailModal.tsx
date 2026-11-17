import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PORTFOLIO_API_BASE, type ClientProject } from '../../lib/clientsData';
import type { SelectedReference } from '../../types/consultation';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { assetUrl, cn } from '../../lib/utils';
import {
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  VolumeX,
  Image as ImageIcon
} from 'lucide-react';

export interface GalleryMediaItem {
  id?: string;
  name?: string;
  type: 'image' | 'video';
  mimeType?: string;
  url: string;
  isSubfolder?: boolean;
  subfolder?: string | null;
}

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const expandButtonRef = useRef<HTMLButtonElement | null>(null);
  const exitFsButtonRef = useRef<HTMLButtonElement | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  const [liveGalleryItems, setLiveGalleryItems] = useState<GalleryMediaItem[] | null>(null);

  // Reset selected index & pause videos when project changes or modal opens
  useEffect(() => {
    setSelectedImageIndex(0);
    setIsFullscreen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  }, [project?.id, isOpen]);

  // Pause active video when switching gallery items, entering/exiting fullscreen, or closing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  }, [selectedImageIndex, isOpen, isFullscreen]);

  // Fetch full gallery on-demand from Google Drive when modal is opened
  useEffect(() => {
    let active = true;
    if (isOpen && project?.driveFolderId) {
      fetch(`${PORTFOLIO_API_BASE}/api/portfolio/gallery?folderId=${project.driveFolderId}&_t=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
          if (active) {
            const rawItems = Array.isArray(data.items) ? data.items : (Array.isArray(data.images) ? data.images : []);
            if (rawItems.length > 0) {
              const formatted: GalleryMediaItem[] = rawItems.map((item: any) => {
                if (typeof item === 'string') {
                  const isVid = /\.(mp4|mov|webm|m4v|mkv|avi)(\?.*)?$/i.test(item);
                  return {
                    url: item,
                    type: isVid ? 'video' : 'image',
                    mimeType: isVid ? 'video/mp4' : 'image/jpeg'
                  };
                }
                const isVid = item.type === 'video' || item.mimeType?.startsWith('video/') || /\.(mp4|mov|webm|m4v|mkv|avi)$/i.test(item.name || '');
                return {
                  id: item.id,
                  name: item.name,
                  type: isVid ? 'video' : 'image',
                  mimeType: item.mimeType || (isVid ? 'video/mp4' : 'image/jpeg'),
                  url: item.url,
                  isSubfolder: item.isSubfolder || false,
                  subfolder: item.subfolder || null
                };
              });
              setLiveGalleryItems(formatted);
            }
          }
        })
        .catch(err => console.warn('[ProjectDetailModal] Gallery fetch error:', err));
    } else {
      setLiveGalleryItems(null);
    }
    return () => { active = false; };
  }, [isOpen, project?.driveFolderId]);

  // Single metadata line: Location · Structure Type · Dimensions (omits missing fields and separators)
  const metaLine = React.useMemo(() => {
    if (!project) return '';
    const parts = [
      project.location?.trim(),
      project.structureType?.trim(),
      (project.dimensions || project.size)?.trim()
    ].filter(Boolean);
    return parts.join(' · ');
  }, [project]);

  // Derive continuous ordered gallery media: overview first, photos in order, videos after
  const galleryItems: GalleryMediaItem[] = React.useMemo(() => {
    if (!project) return [];
    if (liveGalleryItems && liveGalleryItems.length > 0) {
      return liveGalleryItems;
    }
    if (Array.isArray(project.media) && project.media.length > 0) {
      return project.media.map((m: any) => ({
        id: m.id,
        name: m.name,
        type: m.type || (/\.(mp4|mov|webm|m4v|mkv|avi)$/i.test(m.name || '') ? 'video' : 'image'),
        mimeType: m.mimeType || (m.type === 'video' ? 'video/mp4' : 'image/jpeg'),
        url: m.url,
        isSubfolder: m.isSubfolder || false,
        subfolder: m.subfolder || null
      }));
    }
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images.map((imgUrl) => {
        const isVid = /\.(mp4|mov|webm|m4v|mkv|avi)(\?.*)?$/i.test(imgUrl);
        return {
          url: imgUrl,
          type: isVid ? 'video' : 'image',
          mimeType: isVid ? 'video/mp4' : 'image/jpeg'
        };
      });
    }
    if (Array.isArray(project.stages) && project.stages.length > 0) {
      const flattened = project.stages.flatMap((s) => s.images || []);
      if (flattened.length > 0) {
        return flattened.map(imgUrl => ({
          url: imgUrl,
          type: 'image',
          mimeType: 'image/jpeg'
        }));
      }
    }
    return project.heroImg ? [{ url: project.heroImg, type: 'image', mimeType: 'image/jpeg' }] : [];
  }, [project, liveGalleryItems]);

  const totalItems = galleryItems.length;
  const hasItems = totalItems > 0;
  const safeIndex = Math.min(Math.max(0, selectedImageIndex), Math.max(0, totalItems - 1));
  const currentItem = hasItems ? galleryItems[safeIndex] : null;

  const canGoPrev = hasItems && safeIndex > 0;
  const canGoNext = hasItems && safeIndex < totalItems - 1;

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedImageIndex((prev) => Math.min(totalItems - 1, prev + 1));
  }, [totalItems]);

  // Fullscreen open / close handlers
  const handleOpenFullscreen = useCallback(() => {
    setIsFullscreen(true);
    try {
      if (document.documentElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {
      // Fallback to top-level portal overlay
    }
  }, []);

  const handleCloseFullscreen = useCallback(() => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {
      // Ignore
    }
    setIsFullscreen(false);
    setTimeout(() => {
      expandButtonRef.current?.focus();
    }, 50);
  }, []);

  // Listen to browser-initiated fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
        expandButtonRef.current?.focus();
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, [isFullscreen]);

  // Manage body scroll lock during fullscreen & focus restoration
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        exitFsButtonRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullscreen]);

  // Keyboard navigation for both regular and fullscreen modes
  useEffect(() => {
    if (!isOpen || !hasItems) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
          return;
        }
      }

      if (e.key === 'ArrowRight') {
        if (canGoNext) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (canGoPrev) {
          e.preventDefault();
          handlePrev();
        }
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          e.preventDefault();
          e.stopPropagation();
          handleCloseFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, hasItems, canGoPrev, canGoNext, isFullscreen, handlePrev, handleNext, handleCloseFullscreen]);

  // Enforce silent playback for all videos (keeping audio disabled on play / seek / volumechange)
  const handleVideoPlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.muted = true;
    e.currentTarget.volume = 0;
  }, []);

  const handleVolumeChange = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!e.currentTarget.muted || e.currentTarget.volume > 0) {
      e.currentTarget.muted = true;
      e.currentTarget.volume = 0;
    }
  }, []);

  if (!project) return null;

  const isSelected = (imgUrl: string) => {
    return selectedReferences.some((r) => r.data === imgUrl || r.data.endsWith(imgUrl));
  };

  const handleToggleReference = (imgUrl: string) => {
    const fullUrl = assetUrl(imgUrl);
    if (isSelected(fullUrl) || isSelected(imgUrl)) {
      onRemoveReference?.(fullUrl);
      onRemoveReference?.(imgUrl);
    } else {
      const caption = `${project.name || 'Sanctum'} · ${currentItem?.type === 'video' ? 'Video' : 'Image'} ${safeIndex + 1}`;
      onSelectReference?.({
        data: fullUrl,
        kind: 'Completed Svvayam project',
        caption,
        source: 'client_project',
        projectId: project.id
      });
    }
  };

  const displayName = project.name || 'Sanctum';

  return (
    <>
      {/* Underlying Project Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="6xl"
        className="p-0 overflow-hidden flex flex-col"
        showCloseButton={false}
        preventCloseOnEsc={isFullscreen}
      >
        {/* Simplified Header with Project Name and Clean Metadata Line */}
        <div className="bg-white border-b border-neutral-200 p-4 sm:p-5 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#0A0A0A] truncate">
              {displayName}
            </h2>
            {metaLine && (
              <p className="text-xs text-neutral-600 mt-1 font-sans truncate">
                {metaLine}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {selectionMode && currentItem && currentItem.type === 'image' && (
              <Button
                variant={isSelected(assetUrl(currentItem.url)) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleToggleReference(currentItem.url)}
                className="text-xs"
              >
                {isSelected(assetUrl(currentItem.url)) ? (
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

        {/* Gallery Control Bar: Counter, Media Badge & Fullscreen Trigger */}
        {hasItems && (
          <div className="bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center space-x-2 font-mono text-[11px] tracking-wider text-neutral-400">
              <div>
                <span className="text-white font-medium">{safeIndex + 1}</span> / {totalItems}
              </div>
              {currentItem?.type === 'video' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-medium">
                  <VolumeX className="w-3 h-3" />
                  Video (Silent)
                </span>
              )}
              {currentItem?.subfolder && (
                <span className="text-neutral-500 text-[10px]">
                  ({currentItem.subfolder})
                </span>
              )}
            </div>

            <button
              ref={expandButtonRef}
              type="button"
              onClick={handleOpenFullscreen}
              aria-label="View gallery fullscreen"
              title="View fullscreen"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Fullscreen</span>
            </button>
          </div>
        )}

        {/* Main Stage: Continuous Photo Gallery & Inline Video Player */}
        <div className="flex-1 bg-black relative flex flex-col items-center justify-center p-4 min-h-[50vh] select-none">
          {hasItems && currentItem ? (
            <div className="relative max-w-full max-h-[60vh] flex items-center justify-center">
              {currentItem.type === 'video' ? (
                <div className="relative flex flex-col items-center justify-center max-w-full">
                  <video
                    ref={videoRef}
                    key={currentItem.url}
                    src={assetUrl(currentItem.url)}
                    controls
                    muted
                    playsInline
                    preload="none"
                    onPlay={handleVideoPlay}
                    onVolumeChange={handleVolumeChange}
                    className="max-w-full max-h-[55vh] rounded-md shadow-2xl bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Silent playback · Original video audio preserved</span>
                  </div>
                </div>
              ) : (
                <img
                  src={assetUrl(currentItem.url)}
                  alt={`${displayName} - Image ${safeIndex + 1} of ${totalItems}`}
                  className="max-w-full max-h-[60vh] object-contain shadow-2xl rounded-sm"
                />
              )}

              {/* Previous Media Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label="Previous item"
                title="Previous item (Left arrow)"
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg z-10",
                  canGoPrev
                    ? "bg-black/70 hover:bg-white text-white hover:text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    : "bg-black/30 text-white/30 cursor-not-allowed opacity-50"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Media Arrow */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next item"
                title="Next item (Right arrow)"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg z-10",
                  canGoNext
                    ? "bg-black/70 hover:bg-white text-white hover:text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    : "bg-black/30 text-white/30 cursor-not-allowed opacity-50"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* Clean Empty State */
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-3 max-w-md">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-serif font-medium text-neutral-200">
                Sanctum Gallery in Curation
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Architectural drawings, 3D visualizations, and photographic records for this sanctum are currently being curated by the Svvayam studio.
              </p>
            </div>
          )}
        </div>

        {/* Continuous Ordered Bottom Thumbnail Strip: Photos first, then Videos */}
        {totalItems > 1 && (
          <div className="bg-[#121212] border-t border-neutral-800 p-2.5 flex items-center justify-center space-x-2 overflow-x-auto">
            {galleryItems.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                aria-label={`Go to ${item.type === 'video' ? 'video' : 'photo'} ${i + 1}`}
                className={cn(
                  "w-12 h-12 rounded-[8px] overflow-hidden border transition-all shrink-0 cursor-pointer focus:outline-none relative group",
                  i === safeIndex
                    ? "border-2 border-emerald-400 ring-2 ring-emerald-400/30 scale-105"
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center text-amber-400 group-hover:text-amber-300">
                    <Play className="w-4 h-4 fill-current" />
                    <span className="text-[7.5px] font-mono tracking-wider font-semibold text-neutral-300 mt-0.5">VIDEO</span>
                  </div>
                ) : (
                  <img
                    src={assetUrl(item.url)}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* TOP-LEVEL PORTAL FULLSCREEN VIEWER */}
      {isFullscreen && hasItems && currentItem && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={fullscreenContainerRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Fullscreen viewer: ${displayName}`}
              className="fixed inset-0 z-[99999] flex flex-col justify-between text-white select-none overflow-hidden outline-none"
              style={{
                backgroundColor: '#0A0A0A',
                overscrollBehavior: 'contain'
              }}
            >
              {/* Row 1: Reserved Top Information Bar */}
              <header className="h-16 shrink-0 z-30 bg-[#0A0A0A] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="min-w-0 pr-4">
                  <h3 className="text-sm sm:text-base font-serif font-medium text-white truncate leading-snug">
                    {displayName}
                  </h3>
                  {metaLine && (
                    <p className="text-[11px] text-neutral-300 mt-0.5 truncate font-sans">
                      {metaLine}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  {selectionMode && currentItem.type === 'image' && (
                    <Button
                      variant={isSelected(assetUrl(currentItem.url)) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleReference(currentItem.url)}
                      className="text-xs hidden sm:inline-flex"
                    >
                      {isSelected(assetUrl(currentItem.url)) ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          <span>Picked</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          <span>Pick</span>
                        </>
                      )}
                    </Button>
                  )}

                  <span className="font-mono text-xs text-neutral-300 px-2.5 py-1 rounded-full bg-white/10 font-semibold flex items-center gap-1.5">
                    <span className="text-amber-400">{safeIndex + 1}</span> / {totalItems}
                    {currentItem.type === 'video' && (
                      <span className="text-[10px] text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded font-mono">Silent Video</span>
                    )}
                  </span>

                  <button
                    ref={exitFsButtonRef}
                    type="button"
                    onClick={handleCloseFullscreen}
                    aria-label="Exit fullscreen viewer"
                    title="Exit fullscreen (Escape)"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </header>

              {/* Row 2: Center Media Display */}
              <main className="flex-1 min-h-0 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
                {currentItem.type === 'video' ? (
                  <div className="relative flex flex-col items-center justify-center max-w-full max-h-full">
                    <video
                      ref={fullscreenVideoRef}
                      key={`fs-${currentItem.url}`}
                      src={assetUrl(currentItem.url)}
                      controls
                      muted
                      playsInline
                      preload="none"
                      onPlay={handleVideoPlay}
                      onVolumeChange={handleVolumeChange}
                      className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-md bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <p className="mt-2 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                      Silent playback active · Audio track intact
                    </p>
                  </div>
                ) : (
                  <img
                    src={assetUrl(currentItem.url)}
                    alt={`${displayName} - Fullscreen view ${safeIndex + 1} of ${totalItems}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-sm transition-transform duration-200 select-none"
                  />
                )}

                {/* Left/Right Floating Navigation Arrows */}
                {totalItems > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={!canGoPrev}
                      aria-label="Previous item"
                      title="Previous item (Left arrow)"
                      className={cn(
                        "absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shadow-2xl border",
                        canGoPrev
                          ? "bg-black/75 hover:bg-white text-white hover:text-black border-white/20 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          : "bg-black/30 text-white/20 border-white/5 cursor-not-allowed opacity-20 pointer-events-none"
                      )}
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canGoNext}
                      aria-label="Next item"
                      title="Next item (Right arrow)"
                      className={cn(
                        "absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shadow-2xl border",
                        canGoNext
                          ? "bg-black/75 hover:bg-white text-white hover:text-black border-white/20 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          : "bg-black/30 text-white/20 border-white/5 cursor-not-allowed opacity-20 pointer-events-none"
                      )}
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>
                  </>
                )}
              </main>

              {/* Row 3: Reserved Bottom Thumbnail Strip */}
              {totalItems > 1 && (
                <footer className="h-20 shrink-0 z-30 bg-[#0D0D0D] border-t border-white/10 px-4 py-2 flex items-center justify-center space-x-2 overflow-x-auto">
                  {galleryItems.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      aria-label={`Go to ${item.type === 'video' ? 'video' : 'photo'} ${i + 1}`}
                      className={cn(
                        "w-12 h-12 rounded-[6px] overflow-hidden border transition-all shrink-0 cursor-pointer focus:outline-none relative group",
                        i === safeIndex
                          ? "border-2 border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md"
                          : "border-transparent opacity-40 hover:opacity-100"
                      )}
                    >
                      {item.type === 'video' ? (
                        <div className="w-full h-full bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center text-amber-400 group-hover:text-amber-300">
                          <Play className="w-4 h-4 fill-current" />
                          <span className="text-[7.5px] font-mono tracking-wider font-semibold text-neutral-300 mt-0.5">VIDEO</span>
                        </div>
                      ) : (
                        <img
                          src={assetUrl(item.url)}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </footer>
              )}
            </div>,
            document.body
          )
        : null}
    </>
  );
};
