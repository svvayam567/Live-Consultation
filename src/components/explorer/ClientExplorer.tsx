import React, { useState, useMemo } from 'react';
import { useClientsData, getProjectPriority } from '../../lib/clientsData';
import type { ClientProject } from '../../lib/clientsData';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { SelectedReference } from '../../types/consultation';
import { assetUrl, cn } from '../../lib/utils';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { ViewToggle, type ViewMode } from '../ui/ViewToggle';
import {
  Search,
  MapPin,
  Check,
  Plus,
  Layers,
  ArrowUpRight,
  Image as ImageIcon,
  Building2,
  RotateCcw,
  AlertCircle,
  Play
} from 'lucide-react';

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
  const { clients, loading, error, refresh } = useClientsData();
  const [designFilter, setDesignFilter] = useState<'All' | 'Minimal' | 'Moderate' | 'Heavy'>('All');
  const [structureFilter, setStructureFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeProject, setActiveProject] = useState<ClientProject | null>(null);

  // Distinct structure types derived from dataset
  const structureTypes = useMemo(() => {
    const types = new Set<string>();
    clients.forEach((c) => {
      if (c.structureType && c.structureType.trim()) {
        types.add(c.structureType.trim());
      }
    });
    return Array.from(types).sort((a, b) => a.localeCompare(b));
  }, [clients]);

  // Design detail category counts across complete dataset
  const counts = useMemo(() => {
    const total = clients.length;
    const minimal = clients.filter((c) => (c.designDetail || '').toLowerCase() === 'minimal').length;
    const moderate = clients.filter((c) => (c.designDetail || '').toLowerCase() === 'moderate').length;
    const heavy = clients.filter((c) => (c.designDetail || '').toLowerCase() === 'heavy').length;
    return { total, minimal, moderate, heavy };
  }, [clients]);

  // Combined Filtering: Design detail + Structure type + Search query
  const filteredClients = useMemo(() => {
    return clients
      .filter((project) => {
        // Design detail tab filter (projects with missing/unmatched detail remain under 'All')
        const matchesDesign =
          designFilter === 'All' ||
          (project.designDetail && project.designDetail.toLowerCase() === designFilter.toLowerCase());

        // Structure type dropdown filter
        const matchesStructure =
          structureFilter === 'All' ||
          (project.structureType && project.structureType.toLowerCase() === structureFilter.toLowerCase());

        // Search query across name, folder, location, material, design, structure, dimensions
        const displayName = (project.name || '').toLowerCase();
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          query === '' ||
          displayName.includes(query) ||
          project.folder.toLowerCase().includes(query) ||
          (project.location && project.location.toLowerCase().includes(query)) ||
          (project.material && project.material.toLowerCase().includes(query)) ||
          (project.designDetail && project.designDetail.toLowerCase().includes(query)) ||
          (project.structureType && project.structureType.toLowerCase().includes(query)) ||
          (project.dimensions && project.dimensions.toLowerCase().includes(query)) ||
          (project.size && project.size.toLowerCase().includes(query)) ||
          (project.desc && project.desc.toLowerCase().includes(query));

        return matchesDesign && matchesStructure && matchesSearch;
      })
      .sort((a, b) => {
        // 3-tier priority ordering:
        // Priority 1: Projects with a valid overview image come first
        // Priority 2: Projects with photos but no overview image come next
        // Priority 3: Projects with no photos come last (with placeholder)
        // Within each priority group, preserve curated order_index
        const pA = getProjectPriority(a);
        const pB = getProjectPriority(b);
        if (pA !== pB) {
          return pA - pB;
        }
        const aOrder = a.order_index ?? 9999;
        const bOrder = b.order_index ?? 9999;
        return aOrder - bOrder;
      });
  }, [clients, designFilter, structureFilter, searchQuery]);

  const hasActiveFilters = designFilter !== 'All' || structureFilter !== 'All' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setDesignFilter('All');
    setStructureFilter('All');
    setSearchQuery('');
  };

  const isSelected = (imgUrl: string) => {
    return selectedReferences.some((r) => r.data === imgUrl || r.data.endsWith(imgUrl));
  };

  const handleQuickPickHero = (e: React.MouseEvent, project: ClientProject) => {
    e.stopPropagation();
    if (!project.heroImg) return;
    const imgUrl = assetUrl(project.heroImg);
    if (isSelected(imgUrl)) {
      onRemoveReference?.(imgUrl);
    } else {
      const caption = `${project.name || 'Sanctum'} · Completed Sanctum`;
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
      {/* Controls Bar: Design Detail Tabs, Structure Type Dropdown, Reset, View Mode & Search */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Design Detail Segmented Tabs */}
          <SegmentedTabs<'All' | 'Minimal' | 'Moderate' | 'Heavy'>
            options={[
              { id: 'All', label: 'All', badge: (loading || (error && clients.length === 0)) ? undefined : counts.total },
              { id: 'Minimal', label: 'Minimal', badge: (loading || (error && clients.length === 0)) ? undefined : counts.minimal },
              { id: 'Moderate', label: 'Moderate', badge: (loading || (error && clients.length === 0)) ? undefined : counts.moderate },
              { id: 'Heavy', label: 'Heavy', badge: (loading || (error && clients.length === 0)) ? undefined : counts.heavy },
            ]}
            activeId={designFilter}
            onChange={(val) => setDesignFilter(val)}
            size="sm"
          />

          {/* Structure Type Dropdown Filter */}
          <div className="relative">
            <label htmlFor="structure-type-filter" className="sr-only">Structure type</label>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[14px] border border-[#ECECEC] bg-white text-xs font-sans text-[#0A0A0A] shadow-xs hover:border-neutral-300 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-[#0E2A1C] shrink-0" />
              <select
                id="structure-type-filter"
                value={structureFilter}
                onChange={(e) => setStructureFilter(e.target.value)}
                className="bg-transparent text-xs font-sans font-medium text-[#0A0A0A] focus:outline-none cursor-pointer pr-1"
                aria-label="Filter by Structure Type"
              >
                <option value="All">All structure types</option>
                {structureTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters Control */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] border border-neutral-200 bg-neutral-100 hover:bg-neutral-200/80 text-xs font-sans text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3 text-[#0E2A1C]" />
              <span>Reset filters</span>
            </button>
          )}

          {/* View Mode Toggle */}
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>

        {/* Search Input & Result Count Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline whitespace-nowrap">
            Showing {filteredClients.length} of {clients.length}
          </span>

          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-[#5C5C5C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={clients.length > 0 ? `Search ${clients.length} client sanctums...` : 'Search projects...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs font-sans rounded-[14px] border border-[#ECECEC] bg-white text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:bg-[#FAFAFA] focus:border-transparent focus:ring-2 focus:ring-[#0E2A1C] w-full sm:w-64 shadow-xs transition-all"
            />
          </div>
        </div>
      </div>

      {/* Projects List, Error State, Loading Skeletons, or Grid */}
      {error && clients.length === 0 ? (
        /* Error State with Retry Button */
        <div className="py-20 px-4 text-center rounded-[20px] border border-neutral-200 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-2xs">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-serif font-semibold text-[#0A0A0A]">
              Couldn’t load projects
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed font-sans">
              We encountered an issue connecting to the portfolio catalog. Please check your connection or try again.
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium bg-[#0E2A1C] hover:bg-[#0A0A0A] text-white shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-80 bg-white rounded-[20px] animate-pulse border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            />
          ))}
        </div>
      ) : filteredClients.length === 0 ? (
        /* Empty State */
        <div className="py-20 px-4 text-center rounded-[20px] border border-dashed border-neutral-300 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shadow-2xs">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-base font-serif font-semibold text-[#0A0A0A]">
            No client projects found
          </h4>
          <p className="text-xs text-neutral-500 max-w-md leading-relaxed font-sans">
            No projects matched your criteria{' '}
            {designFilter !== 'All' ? `with Design Detail "${designFilter}"` : ''}
            {structureFilter !== 'All' ? ` and Structure Type "${structureFilter}"` : ''}
            {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#0E2A1C] hover:bg-[#0A0A0A] text-white shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((project) => {
            const heroUrl = project.heroImg ? assetUrl(project.heroImg) : '';
            const picked = heroUrl ? isSelected(heroUrl) : false;
            const displayName = project.name || 'Sanctum';
            const imageCount = project.totalMediaCount || (project.images ? project.images.length : (project.stages?.length || 0));
            const dimensionDisplay = project.dimensions || project.size;
            const tierBadge = project.designDetail || project.sizeLabel;

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
                {/* Project Hero Image / Thumbnail */}
                <div className="relative w-full h-52 bg-neutral-100 overflow-hidden flex items-center justify-center shrink-0">
                  {heroUrl ? (
                    <img
                      src={heroUrl}
                      alt={displayName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const ph = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (ph) ph.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Clean Placeholder for empty, video-only, or access-issued projects */}
                  <div
                    className={cn(
                      "w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 space-y-2 bg-[#F8F8F8]",
                      heroUrl ? "hidden" : "flex"
                    )}
                  >
                    {project.accessError ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-sans text-amber-700 font-medium">Access Issue</span>
                      </>
                    ) : project.videoCount && project.videoCount > 0 ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-[11px] font-mono text-neutral-700 font-medium">{project.videoCount} {project.videoCount === 1 ? 'Video' : 'Videos'}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-neutral-200/60 flex items-center justify-center text-neutral-500">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-serif text-neutral-500 font-medium">Gallery in curation</span>
                      </>
                    )}
                  </div>

                  {heroUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 pointer-events-none" />
                  )}

                  {/* Top Badges: Design Detail & Structure Type */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-[#0A0A0A] border border-[#ECECEC] shadow-xs font-medium">
                      {tierBadge}
                    </span>

                    {project.structureType && (
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0A]/90 text-white border border-white/10 shadow-xs truncate max-w-[140px]">
                        {project.structureType}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay Details (Location & Dimensions) */}
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none flex items-center justify-between gap-2 text-[11px] font-sans">
                    {project.location ? (
                      <div className="flex items-center space-x-1 text-white/90 truncate">
                        <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    ) : <div />}

                    {dimensionDisplay && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white/90 shrink-0 border border-white/10">
                        {dimensionDisplay}
                      </span>
                    )}
                  </div>

                  {/* Selection Mode Quick-Pick Overlay Button */}
                  {selectionMode && heroUrl && (
                    <button
                      type="button"
                      onClick={(e) => handleQuickPickHero(e, project)}
                      className={cn(
                        "absolute top-3 right-3 p-1.5 rounded-full transition-all cursor-pointer shadow-md pointer-events-auto",
                        picked
                          ? "bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] text-white border-2 border-[#0E2A1C] ring-2 ring-[#0E2A1C]/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                          : "bg-white/95 hover:bg-white text-[#0A0A0A] border border-[#ECECEC]"
                      )}
                      title={picked ? 'Remove reference' : 'Pick as reference'}
                    >
                      {picked ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 min-w-0">
                  <div className="min-w-0">
                    {/* Primary text: Project Name */}
                    <h3 className="text-base font-serif font-semibold text-[#0A0A0A] group-hover:underline leading-snug break-words">
                      {displayName}
                    </h3>

                    {/* Secondary metadata: Structure Type & Dimensions */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[11px] text-[#5C5C5C] font-sans">
                      {project.structureType && (
                        <span className="font-medium text-[#0A0A0A]">{project.structureType}</span>
                      )}
                      {project.structureType && dimensionDisplay && <span>·</span>}
                      {dimensionDisplay && (
                        <span className="font-mono text-[10.5px] text-neutral-600">{dimensionDisplay}</span>
                      )}
                    </div>

                    <p className="text-xs text-[#5C5C5C] line-clamp-2 mt-2 leading-relaxed font-sans">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC] text-xs font-sans">
                    <span className="text-[#737373] flex items-center gap-1.5 text-[11px]">
                      <Layers className="w-3.5 h-3.5 text-[#0E2A1C]" />
                      <span>
                        {imageCount > 0 ? (
                          project.videoCount && project.videoCount > 0 ? (
                            `${(project.images?.length || imageCount - project.videoCount)} Photos · ${project.videoCount} ${project.videoCount === 1 ? 'Video' : 'Videos'}`
                          ) : (
                            `${imageCount} ${imageCount === 1 ? 'Image' : 'Images'}`
                          )
                        ) : 'In curation'}
                      </span>
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
            const heroUrl = project.heroImg ? assetUrl(project.heroImg) : '';
            const picked = heroUrl ? isSelected(heroUrl) : false;
            const displayName = project.name || 'Sanctum';
            const imageCount = project.totalMediaCount || (project.images ? project.images.length : (project.stages?.length || 0));
            const dimensionDisplay = project.dimensions || project.size;
            const tierBadge = project.designDetail || project.sizeLabel;

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
                  <div className="w-14 h-14 rounded-[12px] bg-neutral-100 overflow-hidden shrink-0 border border-[#ECECEC] flex items-center justify-center">
                    {heroUrl ? (
                      <img
                        src={heroUrl}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                          const ph = e.currentTarget.nextElementSibling as HTMLElement | null;
                          if (ph) ph.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={cn("w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-50", heroUrl ? "hidden" : "flex")}>
                      {project.accessError ? (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      ) : project.videoCount && project.videoCount > 0 ? (
                        <Play className="w-4 h-4 text-amber-500 fill-current" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-serif font-semibold text-[#0A0A0A] truncate group-hover:underline">
                        {displayName}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                        {tierBadge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-[#5C5C5C] font-sans">
                      {project.structureType && (
                        <>
                          <span className="font-medium text-[#0A0A0A]">{project.structureType}</span>
                          <span>·</span>
                        </>
                      )}
                      {dimensionDisplay && (
                        <>
                          <span className="font-mono text-neutral-700">{dimensionDisplay}</span>
                          {project.location && <span>·</span>}
                        </>
                      )}
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0E2A1C] shrink-0" />
                          {project.location}
                        </span>
                      )}
                      {project.material && (
                        <>
                          <span>·</span>
                          <span>{project.material}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ECECEC]">
                  <span className="text-[11px] text-[#737373] font-sans flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#0E2A1C]" />
                    {imageCount > 0 ? (
                      project.videoCount && project.videoCount > 0 ? (
                        `${(project.images?.length || imageCount - project.videoCount)} Photos · ${project.videoCount} ${project.videoCount === 1 ? 'Video' : 'Videos'}`
                      ) : (
                        `${imageCount} ${imageCount === 1 ? 'Image' : 'Images'}`
                      )
                    ) : 'In curation'}
                  </span>

                  {selectionMode && heroUrl && (
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

export const ProjectExplorer = ClientExplorer;
