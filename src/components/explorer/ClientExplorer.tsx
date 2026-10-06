import React, { useState, useMemo } from 'react';
import { useClientsData } from '../../lib/clientsData';
import type { ClientProject } from '../../lib/clientsData';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { SelectedReference } from '../../types/consultation';
import { assetUrl } from '../../lib/utils';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { ViewToggle, type ViewMode } from '../ui/ViewToggle';
import { Search, MapPin, Check, Plus, Layers, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ClientExplorerProps {
  selectionMode?: boolean;
  selectedReferences?: SelectedReference[];
  onSelectReference?: (ref: SelectedReference) => boolean;
  onRemoveReference?: (caption: string) => void;
}

export const ClientExplorer: React.FC<ClientExplorerProps> = ({
  selectionMode = false,
  selectedReferences = [],
  onSelectReference,
  onRemoveReference
}) => {
  const { clients, loading } = useClientsData();
  const [scaleFilter, setScaleFilter] = useState<'All' | 'Compact' | 'Medium' | 'Grand'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeProject, setActiveProject] = useState<ClientProject | null>(null);

  const filteredClients = useMemo(() => {
    return clients.filter((project) => {
      const matchesScale =
        scaleFilter === 'All' ||
        project.sizeLabel.toLowerCase() === scaleFilter.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesScale && matchesSearch;
    });
  }, [clients, scaleFilter, searchQuery]);

  const counts = useMemo(() => {
    const total = clients.length;
    const compact = clients.filter((c) => c.sizeLabel.toLowerCase() === 'compact').length;
    const medium = clients.filter((c) => c.sizeLabel.toLowerCase() === 'medium').length;
    const grand = clients.filter((c) => c.sizeLabel.toLowerCase() === 'grand').length;
    return { total, compact, medium, grand };
  }, [clients]);

  const isSelected = (imgUrl: string) => {
    return selectedReferences.some((r) => r.data === imgUrl || r.data.endsWith(imgUrl));
  };

  const handleQuickPickHero = (e: React.MouseEvent, project: ClientProject) => {
    e.stopPropagation();
    const imgUrl = assetUrl(project.heroImg);
    if (isSelected(imgUrl)) {
      onRemoveReference?.(imgUrl);
    } else {
      const caption = `${project.name} · Completed Sanctum`;
      onSelectReference?.({
        data: imgUrl,
        kind: 'Completed Svvayam project',
        caption,
        source: 'client_project',
        projectId: project.id
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar: Segmented Tabs, View Toggle & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedTabs<'All' | 'Compact' | 'Medium' | 'Grand'>
            options={[
              { id: 'All', label: 'All', badge: counts.total || 37 },
              { id: 'Compact', label: 'Compact', badge: counts.compact || 14 },
              { id: 'Medium', label: 'Medium', badge: counts.medium || 16 },
              { id: 'Grand', label: 'Grand', badge: counts.grand || 7 },
            ]}
            activeId={scaleFilter}
            onChange={(val) => setScaleFilter(val)}
            size="sm"
          />

          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#5C5C5C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search 37 client sanctums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs font-sans rounded-[14px] border border-[#ECECEC] bg-white text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:bg-[#FAFAFA] focus:border-transparent focus:ring-2 focus:ring-[#0E2A1C] w-full sm:w-72 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* Projects List or Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-80 bg-white rounded-[20px] animate-pulse border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            />
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((project) => {
            const heroUrl = assetUrl(project.heroImg);
            const picked = isSelected(heroUrl);

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={cn(
                  "group bg-white rounded-[20px] border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5",
                  picked
                    ? "border-2 border-[#0E2A1C] ring-2 ring-[#0E2A1C]/20 shadow-[0_12px_28px_rgba(14,42,28,0.2)]"
                    : "border-[#ECECEC] hover:border-neutral-300"
                )}
              >
                {/* Project Hero Image */}
                <div className="relative w-full h-52 bg-neutral-100 overflow-hidden">
                  <img
                    src={heroUrl}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-[#0A0A0A] border border-[#ECECEC] shadow-xs">
                      {project.sizeLabel} · {project.size}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0A]/90 text-white border border-white/10 shadow-xs">
                      {project.material}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center space-x-1.5 text-[11px] text-white/90 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Selection Mode Quick-Pick Overlay Button */}
                  {selectionMode && (
                    <button
                      type="button"
                      onClick={(e) => handleQuickPickHero(e, project)}
                      className={cn(
                        "absolute top-3 right-3 p-1.5 rounded-full transition-all cursor-pointer shadow-md",
                        picked
                          ? "bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white ring-1 ring-white/20"
                          : "bg-white/95 hover:bg-white text-[#0A0A0A] border border-[#ECECEC]"
                      )}
                      title={picked ? 'Remove reference' : 'Pick as reference'}
                    >
                      {picked ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-serif font-semibold text-[#0A0A0A] group-hover:underline">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#5C5C5C] line-clamp-2 mt-1 leading-relaxed font-sans">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC] text-xs font-sans">
                    <span className="text-[#737373] flex items-center gap-1.5 text-[11px]">
                      <Layers className="w-3.5 h-3.5 text-[#0E2A1C]" />
                      <span>{project.stages.length} Stages</span>
                    </span>

                    <span className="text-[11px] font-medium text-[#0A0A0A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View sanctum <ArrowUpRight className="w-3 h-3 text-[#0E2A1C]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredClients.map((project) => {
            const heroUrl = assetUrl(project.heroImg);
            const picked = isSelected(heroUrl);

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={cn(
                  "group bg-white rounded-[16px] border p-3 sm:p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-md",
                  picked
                    ? "border-2 border-[#0E2A1C] ring-2 ring-[#0E2A1C]/20"
                    : "border-[#ECECEC] hover:border-neutral-300"
                )}
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-14 h-14 rounded-[12px] bg-neutral-100 overflow-hidden shrink-0 border border-[#ECECEC]">
                    <img
                      src={heroUrl}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-serif font-semibold text-[#0A0A0A] truncate group-hover:underline">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#5C5C5C] font-sans">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0E2A1C]" />
                        {project.location}
                      </span>
                      <span>·</span>
                      <span>{project.sizeLabel}</span>
                      <span>·</span>
                      <span>{project.material}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ECECEC]">
                  <span className="text-[11px] text-[#737373] font-sans flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#0E2A1C]" />
                    {project.stages.length} Stages
                  </span>

                  {selectionMode && (
                    <button
                      type="button"
                      onClick={(e) => handleQuickPickHero(e, project)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer flex items-center gap-1",
                        picked
                          ? "bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-xs"
                          : "bg-white text-[#0A0A0A] border border-[#ECECEC] hover:bg-neutral-50 shadow-2xs"
                      )}
                    >
                      {picked ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Select</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        selectionMode={selectionMode}
        selectedReferences={selectedReferences}
        onSelectReference={onSelectReference}
        onRemoveReference={onRemoveReference}
      />
    </div>
  );
};
