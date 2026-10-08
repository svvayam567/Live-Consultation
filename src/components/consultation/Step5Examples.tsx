import React, { useState, useRef } from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { REFERENCE_ROW_NAMES, REFERENCE_COL_NAMES } from '../../lib/constants';
import { ClientExplorer } from '../explorer/ClientExplorer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { Check, X, Grid, FolderKanban, Settings2, Sparkles, Upload, Trash2 } from 'lucide-react';

export const Step5Examples: React.FC = () => {
  const {
    state,
    selectReference,
    selectClientProjectRef,
    removeSelectedReference,
    totalSelectedCount,
    selectedReferencesList,
    updateGridCell,
    removeGridCell,
    loadDemoGrid
  } = useConsultation();

  const [activeTab, setActiveTab] = useState<'grid' | 'projects'>('grid');
  const [setupMode, setSetupMode] = useState<boolean>(false);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCellClick = (slotIndex: number) => {
    if (setupMode) {
      setActiveSlot(slotIndex);
    } else {
      selectReference(slotIndex);
    }
  };

  const handleUploadToSlot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateGridCell(activeSlot, dataUrl);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          13–20 min · Visual direction
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          Choose the one reference you love
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Read left to right for increasing detail; move down for increasing scale. Choose one image that feels closest to what you want. This guides the design; it is not an exact replica.
        </p>
      </div>

      {/* Selected Reference Strip */}
      <div className="p-5 bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] font-sans">
              Selected Reference
            </span>
            <Badge
              variant="default"
              size="sm"
            >
              {totalSelectedCount} of 1 selected
            </Badge>
          </div>

          <span className="text-xs text-[#5C5C5C]">
            {totalSelectedCount === 1
              ? '✓ Exactly 1 reference chosen. Ready to proceed to Scope.'
              : 'Select one reference to continue.'}
          </span>
        </div>

        {selectedReferencesList.length > 0 ? (
          <div className="max-w-md">
            {selectedReferencesList.map((ref, idx) => (
              <div
                key={idx}
                className="relative bg-[#FAFAFA] border-2 border-[#0E2A1C] ring-2 ring-[#0E2A1C]/20 rounded-[14px] p-2.5 flex items-center space-x-3.5 group transition-all shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
              >
                <div className="w-16 h-16 bg-white rounded-[10px] overflow-hidden shrink-0 border border-[#ECECEC] flex items-center justify-center">
                  <img
                    src={ref.data}
                    alt={ref.caption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <span className="text-[10px] uppercase font-semibold text-[#0E2A1C] block truncate font-sans">
                    {ref.kind || 'Selected reference'}
                  </span>
                  <p className="text-xs text-[#0A0A0A] font-medium truncate mt-0.5">
                    {ref.caption}
                  </p>
                  <span className="text-[10px] text-[#5C5C5C] font-mono mt-0.5 block">
                    {ref.source === 'client_project' ? 'From Client Projects' : 'From 4×4 Matrix'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSelectedReference(ref.slotIndex !== undefined ? ref.slotIndex : ref.data)}
                  className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove selection"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 border border-dashed border-[#ECECEC] rounded-[14px] bg-[#FAFAFA] text-center text-xs text-[#737373]">
            No visual reference selected yet. Pick one image from the 4×4 Matrix or Existing Client Projects below.
          </div>
        )}
      </div>

      {/* Two Source Tabs via Reusable SegmentedTabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECEC] pb-3">
        <SegmentedTabs<'grid' | 'projects'>
          options={[
            { id: 'grid', label: '1. Reference Grid (4×4 Matrix)', icon: Grid },
            { id: 'projects', label: '2. Existing Client Projects (37 Sanctums)', icon: FolderKanban },
          ]}
          activeId={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'grid' && (
          <div className="flex items-center space-x-2">
            <Button
              variant={setupMode ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSetupMode(!setupMode)}
              className="text-xs"
            >
              <Settings2 className="w-3.5 h-3.5 mr-1" />
              <span>{setupMode ? 'Done setting up' : 'Set up grid images'}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={loadDemoGrid}
              className="text-xs text-[#5C5C5C] hover:text-[#0A0A0A]"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#0E2A1C]" />
              <span>Load demo examples</span>
            </Button>
          </div>
        )}
      </div>

      {/* Tab 1 Content: 4x4 Reference Matrix */}
      {activeTab === 'grid' && (
        <div className="space-y-6">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px] grid grid-cols-[130px_repeat(4,1fr)] gap-2.5">
              {/* Header Corner */}
              <div className="p-2.5 text-[11px] font-sans font-medium text-[#5C5C5C] uppercase tracking-wider text-center flex items-center justify-center bg-[#F1F1F1] rounded-[12px] border border-[#ECECEC]">
                Scale ↓ / Detail →
              </div>

              {/* Column Headers */}
              {REFERENCE_COL_NAMES.map((colName, cIdx) => (
                <div
                  key={cIdx}
                  className="p-2.5 text-xs font-sans font-medium text-[#0A0A0A] uppercase tracking-wider text-center bg-[#F1F1F1] rounded-[12px] border border-[#ECECEC]"
                >
                  {colName}
                </div>
              ))}

              {/* 16 Cells Organized in 4 Rows */}
              {Array.from({ length: 16 }).map((_, slotIdx) => {
                const rowIndex = Math.floor(slotIdx / 4);
                const colIndex = slotIdx % 4;
                const slotData = state.gallery[slotIdx];
                const isChosen =
                  state.selected_reference?.source === 'grid' &&
                  state.selected_reference?.slotIndex === slotIdx;
                const isEditing = setupMode && activeSlot === slotIdx;

                return (
                  <React.Fragment key={slotIdx}>
                    {/* Row Header */}
                    {colIndex === 0 && (
                      <div className="p-2.5 text-xs font-sans font-medium text-[#0A0A0A] bg-[#F1F1F1] rounded-[12px] border border-[#ECECEC] flex items-center justify-center text-center">
                        {REFERENCE_ROW_NAMES[rowIndex]}
                      </div>
                    )}

                    {/* Matrix Cell */}
                    <button
                      type="button"
                      onClick={() => handleCellClick(slotIdx)}
                      className={`relative rounded-[14px] border transition-all p-1.5 text-left flex flex-col justify-between overflow-hidden cursor-pointer h-44 ${
                        isChosen
                          ? 'border-2 border-[#0E2A1C] bg-white ring-2 ring-[#0E2A1C]/20 shadow-[0_8px_16px_rgba(0,0,0,0.12)]'
                          : isEditing
                          ? 'border-2 border-[#0A0A0A] bg-neutral-50'
                          : 'border-[#ECECEC] hover:border-neutral-300 bg-white shadow-2xs'
                      }`}
                    >
                      {/* Black glossy check marker with forest green outline */}
                      {isChosen && (
                        <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] border-2 border-[#0E2A1C] flex items-center justify-center text-white shadow-md">
                          <Check className="w-3 h-3 text-white stroke-[2.5]" />
                        </div>
                      )}

                      {slotData ? (
                        <div className="w-full flex-1 overflow-hidden bg-[#F8F8F8] rounded-[10px] flex items-center justify-center">
                          <img
                            src={slotData.data}
                            alt={slotData.caption || `Reference ${slotIdx + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full flex-1 bg-[#F8F8F8] rounded-[10px] flex flex-col items-center justify-center text-neutral-400 text-center p-2">
                          <span className="text-base font-bold opacity-30">{slotIdx + 1}</span>
                          <span className="text-[10px] mt-1">Image needed</span>
                        </div>
                      )}

                      <div className="pt-1.5 px-1 flex items-center justify-between text-[11px] font-sans">
                        <span className="text-[#0A0A0A] truncate">
                          {isChosen ? (
                            <span className="font-semibold text-[#0E2A1C] flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] border border-[#0E2A1C] flex items-center justify-center">
                                <Check className="w-2 h-2 text-white stroke-[2.5]" />
                              </span>
                              <span>Selected</span>
                            </span>
                          ) : (
                            slotData?.caption || REFERENCE_COL_NAMES[colIndex]
                          )}
                        </span>
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Setup Mode Drawer for the active cell */}
          {setupMode && (
            <div className="p-5 bg-white border border-[#0A0A0A] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-[#0A0A0A]">
                    Configure Cell {activeSlot + 1} · {REFERENCE_ROW_NAMES[Math.floor(activeSlot / 4)]} / {REFERENCE_COL_NAMES[activeSlot % 4]}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Upload an authentic project photo or paste a screenshot for this scale/detailing tier.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-medium text-[#0A0A0A] mb-1">
                    Cell Caption
                  </label>
                  <input
                    type="text"
                    value={state.gallery[activeSlot]?.caption || ''}
                    onChange={(e) =>
                      updateGridCell(
                        activeSlot,
                        state.gallery[activeSlot]?.data || '',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Dedicated Sanctum · Hand-carved teakwood"
                    className="w-full text-xs p-2 border border-neutral-200 bg-white text-[#0A0A0A]"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs"
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    <span>Upload image</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleUploadToSlot}
                  />

                  {state.gallery[activeSlot] && (
                    <button
                      type="button"
                      onClick={() => removeGridCell(activeSlot)}
                      className="text-xs text-neutral-500 hover:text-red-600 flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      <span>Remove image</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2 Content: Embedded Client Explorer */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Explore authentic completed Svvayam projects. Click any project to inspect its architectural stages, and click <strong>&quot;Pick as Reference&quot;</strong> to choose your reference.
          </p>
          <ClientExplorer
            selectionMode={true}
            selectedReferences={selectedReferencesList}
            onSelectReference={selectClientProjectRef}
            onRemoveReference={(captionOrUrl) => removeSelectedReference(captionOrUrl)}
          />
        </div>
      )}
    </div>
  );
};
