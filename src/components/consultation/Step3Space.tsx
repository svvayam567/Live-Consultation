import React, { useRef, useState } from 'react';
import { useConsultation } from '../../context/ConsultationContext';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import type { ReferenceKind } from '../../types/consultation';
import { Upload, ArrowUp, ArrowDown, Trash2, Image as ImageIcon } from 'lucide-react';

export const Step3Space: React.FC = () => {
  const { state, updateField, addImage, removeImage, moveImage, updateImageProp } = useConsultation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter images belonging to slide 2 (Step 3: Space)
  const currentImages = state.images
    .map((img, originalIndex) => ({ img, originalIndex }))
    .filter(({ img }) => img.slide === 2);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        addImage({
          data: dataUrl,
          slide: 2,
          kind: 'Client reference',
          caption: file.name.replace(/\.[^/.]+$/, '')
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(processFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file);
      }
    }
  };

  return (
    <div className="space-y-8" onPaste={handlePaste}>
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          6–10 min · Essential dimensions
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#0A0A0A] tracking-tight">
          Confirm the available space
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Record the available width, depth and height with units. We will verify measurements before final design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <Input
          label="Width × depth × height, with units"
          requiredDot={!state.fields.dimensions?.trim()}
          value={state.fields.dimensions || ''}
          onChange={(e) => updateField('dimensions', e.target.value)}
          placeholder="e.g. 6 ft W × 4 ft D × 9 ft H (or 1800 × 1200 × 2700 mm)"
        />

        <Input
          label="Internal or external · measured or approximate (Optional)"
          value={state.fields.dimensionType || ''}
          onChange={(e) => updateField('dimensionType', e.target.value)}
          placeholder="e.g. Internal niche size, architect CAD measured"
        />

        <div className="sm:col-span-2">
          <Input
            label="Essential storage, doors or enclosure (Optional)"
            value={state.fields.features || ''}
            onChange={(e) => updateField('features', e.target.value)}
            placeholder="e.g. Pull-out bhog tray, brass jali double doors, drawer for oil & agarbatti"
          />
        </div>

        <div className="sm:col-span-2">
          <Textarea
            label="Site status / constraints (Optional)"
            value={state.fields.site || ''}
            onChange={(e) => updateField('site', e.target.value)}
            placeholder="e.g. Bare shell under construction / false ceiling in place / existing marble flooring"
            rows={2}
          />
        </div>
      </div>

      {/* Paste & Upload Reference Images Section */}
      <div className="pt-6 border-t border-neutral-200 space-y-4">
        <label className="block text-xs uppercase tracking-wider font-medium text-[#0A0A0A]">
          Client Reference Images & Inspiration Photos (Optional)
        </label>

        <div
          tabIndex={0}
          role="region"
          aria-label="Paste reference images"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) {
              Array.from(e.dataTransfer.files).forEach(processFile);
            }
          }}
          className={`p-8 rounded-[20px] border border-dashed transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#0E2A1C] ${
            isDragging
              ? 'border-[#0A0A0A] bg-neutral-100'
              : 'border-[#ECECEC] bg-[#FAFAFA] hover:border-neutral-300'
          }`}
        >
          <div className="max-w-md mx-auto space-y-2">
            <ImageIcon className="w-7 h-7 text-[#5C5C5C] mx-auto" />
            <h4 className="font-sans font-medium text-xs sm:text-sm text-[#0A0A0A]">
              Click here and paste an image · Ctrl+V / Cmd+V
            </h4>
            <p className="text-[11px] text-[#5C5C5C] font-sans">
              Copy any screenshot or photograph, then paste directly into this window.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs inline-flex items-center space-x-1.5"
              >
                <Upload className="w-3 h-3 mr-1" />
                <span>Or select files to upload</span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>

        {/* Display Uploaded Images */}
        {currentImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {currentImages.map(({ img, originalIndex }, displayIdx) => (
              <div
                key={displayIdx}
                className="p-3 bg-white rounded-[14px] border border-[#ECECEC] shadow-2xs space-y-3"
              >
                <div className="w-full h-44 bg-[#F8F8F8] rounded-[10px] overflow-hidden border border-[#ECECEC] flex items-center justify-center">
                  <img
                    src={img.data}
                    alt={img.caption || `Reference ${displayIdx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#5C5C5C] uppercase tracking-wider font-sans">
                    Image Label
                  </label>
                  <select
                    value={img.kind}
                    onChange={(e) =>
                      updateImageProp(originalIndex, 'kind', e.target.value as ReferenceKind)
                    }
                    className="w-full text-xs p-2 rounded-[10px] border border-[#ECECEC] bg-white text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0E2A1C]"
                  >
                    <option value="Client reference">Client reference</option>
                    <option value="Inspiration">Inspiration</option>
                    <option value="Completed Svvayam project">Completed Svvayam project</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#5C5C5C] uppercase tracking-wider font-sans">
                    Caption / Notes
                  </label>
                  <textarea
                    value={img.caption}
                    onChange={(e) => updateImageProp(originalIndex, 'caption', e.target.value)}
                    placeholder="What we liked about this..."
                    rows={2}
                    className="w-full text-xs p-2 rounded-[10px] border border-[#ECECEC] bg-white text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0E2A1C] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => moveImage(originalIndex, -1)}
                      disabled={displayIdx === 0}
                      className="p-1 text-neutral-400 hover:text-[#0A0A0A] disabled:opacity-30 cursor-pointer"
                      title="Move earlier"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(originalIndex, 1)}
                      disabled={displayIdx === currentImages.length - 1}
                      className="p-1 text-neutral-400 hover:text-[#0A0A0A] disabled:opacity-30 cursor-pointer"
                      title="Move later"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(originalIndex)}
                    className="text-neutral-500 hover:text-red-600 text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
