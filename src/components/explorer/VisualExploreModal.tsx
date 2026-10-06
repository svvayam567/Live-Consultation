import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Play, Volume2, VolumeX, X } from 'lucide-react';

interface VisualExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: 'factory' | 'assembling' | 'artisans' | 'sketch';
  categoryLabel: string;
  aspect: '16:9' | '9:16';
  description: string;
  bullets: string[];
}

const VIDEOS: VideoItem[] = [
  {
    id: 'factory',
    youtubeId: 'x7J4QCq1EVw',
    title: 'Factory Video: Workshop & Precision Stone Cutting',
    category: 'factory',
    categoryLabel: '1. Factory Video',
    aspect: '16:9',
    description: 'Step inside Svvayam’s specialized temple manufacturing facility. Watch how raw quarried granites and pink sandstones are carefully inspected, dimensioned with CNC wire-cutting precision, and prepared for master carvers.',
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
    categoryLabel: '2. Assembling Process',
    aspect: '16:9',
    description: 'Every sacred sanctum is completely dry-fitted and pre-assembled inside our workshop before dispatch, ensuring zero tolerance errors on site.',
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
    categoryLabel: '3. Artisans at Svvayam',
    aspect: '9:16',
    description: 'Traditional guild sculptors chiseling sacred motifs, floral creepers, and devata icons with generational knowledge.',
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
    categoryLabel: '3. Artisans at Svvayam',
    aspect: '9:16',
    description: 'Precision teakwood lathe shaping for sanctum pillars and bell-shaped kalash tops.',
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
    categoryLabel: '3. Artisans at Svvayam',
    aspect: '9:16',
    description: 'Bespoke hand-cast brass embellishments and 24K pure gold foil application on sanctum pinnacles.',
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
    categoryLabel: '4. Sketch to Installation',
    aspect: '16:9',
    description: 'Watch the entire metamorphosis of an architectural idea: starting from a hand sketch on paper, 3D CAD computer modeling, workshop crafting, and the final sanctum inauguration at the client residence.',
    bullets: [
      'Initial Conceptual Sketching',
      'Photorealistic 3D Modeling & Client Walkthrough',
      'Flawless On-Site Handover & Lighting'
    ]
  }
];

export const VisualExploreModal: React.FC<VisualExploreModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [unmutedMap, setUnmutedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleMute = (id: string) => {
    setUnmutedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVideos =
    selectedCategory === 'all'
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="6xl"
      className="p-0 overflow-hidden flex flex-col h-[90vh]"
      showCloseButton={false}
    >
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3.5">
          <div className="w-8 h-8 bg-[#0A0A0A] flex items-center justify-center text-white">
            <Play className="w-3.5 h-3.5 fill-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Cinematic Guild Archive
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-[#0A0A0A] leading-tight">
              Visual Explore
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg border border-neutral-200 hover:border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] transition cursor-pointer"
          title="Close video explore"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="px-6 py-2.5 border-b border-neutral-200 bg-white flex items-center gap-1.5 overflow-x-auto shrink-0 text-xs no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`h-8.5 px-3.5 rounded-lg border transition-all duration-150 flex items-center space-x-1.5 shrink-0 cursor-pointer font-medium text-xs ${
            selectedCategory === 'all'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
              : 'bg-white text-neutral-600 hover:text-[#0A0A0A] border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <span>All Categories</span>
          <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-neutral-100 text-neutral-500">6</span>
        </button>

        <button
          onClick={() => setSelectedCategory('factory')}
          className={`h-8.5 px-3.5 rounded-lg border transition-all duration-150 shrink-0 cursor-pointer font-medium text-xs ${
            selectedCategory === 'factory'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
              : 'bg-white text-neutral-600 hover:text-[#0A0A0A] border-neutral-200 hover:border-neutral-300'
          }`}
        >
          1. Factory Video
        </button>

        <button
          onClick={() => setSelectedCategory('assembling')}
          className={`h-8.5 px-3.5 rounded-lg border transition-all duration-150 shrink-0 cursor-pointer font-medium text-xs ${
            selectedCategory === 'assembling'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
              : 'bg-white text-neutral-600 hover:text-[#0A0A0A] border-neutral-200 hover:border-neutral-300'
          }`}
        >
          2. Assembling Process
        </button>

        <button
          onClick={() => setSelectedCategory('artisans')}
          className={`h-8.5 px-3.5 rounded-lg border transition-all duration-150 shrink-0 cursor-pointer font-medium text-xs ${
            selectedCategory === 'artisans'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
              : 'bg-white text-neutral-600 hover:text-[#0A0A0A] border-neutral-200 hover:border-neutral-300'
          }`}
        >
          3. Artisans (3 Shorts)
        </button>

        <button
          onClick={() => setSelectedCategory('sketch')}
          className={`h-8.5 px-3.5 rounded-lg border transition-all duration-150 shrink-0 cursor-pointer font-medium text-xs ${
            selectedCategory === 'sketch'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
              : 'bg-white text-neutral-600 hover:text-[#0A0A0A] border-neutral-200 hover:border-neutral-300'
          }`}
        >
          4. Sketch to Installation
        </button>
      </div>

      {/* Videos List / Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-neutral-50/50">
        {filteredVideos.map((video) => {
          const isUnmuted = unmutedMap[video.id] || false;
          const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&mute=${
            isUnmuted ? '0' : '1'
          }&rel=0&playsinline=1`;

          return (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-2xs"
            >
              {/* Video Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {video.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      • {video.aspect === '16:9' ? '16:9 Widescreen' : '9:16 Vertical'}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-serif font-semibold text-[#0A0A0A] mt-0.5">
                    {video.title}
                  </h4>
                </div>

                {/* Mute/Unmute Toggle */}
                <button
                  onClick={() => toggleMute(video.id)}
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:border-[#0A0A0A] bg-white text-[#0A0A0A] text-xs flex items-center space-x-2 self-start sm:self-auto cursor-pointer font-medium"
                >
                  {isUnmuted ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#0A0A0A]" />
                      <span>Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Unmute Video</span>
                    </>
                  )}
                </button>
              </div>

              {/* Video Embed + Description Grid */}
              <div
                className={`grid gap-6 items-start ${
                  video.aspect === '9:16'
                    ? 'grid-cols-1 sm:grid-cols-[280px_1fr]'
                    : 'grid-cols-1 lg:grid-cols-[1.5fr_1fr]'
                }`}
              >
                {/* Embed */}
                <div
                  className={`relative bg-black overflow-hidden border border-neutral-200 ${
                    video.aspect === '9:16' ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-video w-full'
                  }`}
                >
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                {/* Narrative Details */}
                <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                  <p>{video.description}</p>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5">
                    {video.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-center text-[11px] text-[#0A0A0A] font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E2A1C] mr-2 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
