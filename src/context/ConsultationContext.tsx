import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type {
  ConsultationState,
  ConsultationFields,
  ConsultationImage,
  SelectedReference,
  GridSlot,
  JourneyAsset
} from '../types/consultation';
import {
  INITIAL_CONSULTATION_STATE,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_GRID_KEY,
  LOCAL_STORAGE_JOURNEY_KEY,
  REFERENCE_ROW_NAMES,
  REFERENCE_COL_NAMES
} from '../lib/constants';
import { assetUrl } from '../lib/utils';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface ConsultationContextType {
  state: ConsultationState;
  currentSlide: number;
  saveStatus: string;
  updateField: (field: keyof ConsultationFields, value: string) => void;
  setSlide: (slide: number) => void;
  nextSlide: () => boolean;
  prevSlide: () => void;
  // Step 3 images
  addImage: (image: ConsultationImage) => void;
  removeImage: (index: number) => void;
  moveImage: (index: number, dir: number) => void;
  updateImageProp: (index: number, prop: 'caption' | 'kind', val: string) => void;
  // Step 5 References
  selectReference: (slotIndex: number) => boolean;
  selectClientProjectRef: (ref: SelectedReference) => boolean;
  removeSelectedReference: (refCaptionOrSlot: string | number) => void;
  totalSelectedCount: number;
  selectedReferencesList: SelectedReference[];
  updateGridCell: (slot: number, data: string, caption?: string) => void;
  removeGridCell: (slot: number) => void;
  loadDemoGrid: () => void;
  // Step 7 Journey
  addJourneyFile: (stage: number, data: string, caption: string, mimeType?: string) => void;
  removeJourneyAsset: (stage: number, assetIndex: number) => void;
  // Persistence & session
  resetConsultation: () => void;
  importSession: (importedState: ConsultationState) => boolean;
  triggerSheetsSync: () => Promise<{ success: boolean; message?: string }>;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

// Helper to normalize consultation state and migrate legacy multi-selection
function normalizeConsultationState(parsed: any): ConsultationState {
  const base: ConsultationState = {
    ...INITIAL_CONSULTATION_STATE,
    ...parsed,
    fields: { ...INITIAL_CONSULTATION_STATE.fields, ...(parsed?.fields || {}) }
  };

  // Convert legacy selected_refs / selected / selected_projects into single selected_reference if not set
  if (!base.selected_reference) {
    if (parsed?.selected_reference && typeof parsed.selected_reference === 'object') {
      base.selected_reference = parsed.selected_reference;
    } else if (Array.isArray(parsed?.selected_projects) && parsed.selected_projects.length > 0) {
      base.selected_reference = {
        ...parsed.selected_projects[0],
        source: 'client_project'
      };
    } else if (Array.isArray(parsed?.selected_refs) && parsed.selected_refs.length > 0) {
      const first = parsed.selected_refs[0];
      if (typeof first === 'object' && first !== null) {
        base.selected_reference = first;
      } else if (typeof first === 'number' && base.gallery && base.gallery[first]) {
        const g = base.gallery[first];
        const r = Math.floor(first / 4);
        const c = first % 4;
        base.selected_reference = {
          data: g?.data || '',
          kind: 'Selected reference',
          caption: g?.caption || `${REFERENCE_ROW_NAMES[r]} · ${REFERENCE_COL_NAMES[c]}`,
          source: 'grid',
          slotIndex: first
        };
      }
    } else if (Array.isArray(parsed?.selected) && parsed.selected.length > 0 && base.gallery) {
      const first = parsed.selected[0];
      const g = base.gallery[first];
      if (g) {
        const r = Math.floor(first / 4);
        const c = first % 4;
        base.selected_reference = {
          data: g.data,
          kind: 'Selected reference',
          caption: g.caption || `${REFERENCE_ROW_NAMES[r]} · ${REFERENCE_COL_NAMES[c]}`,
          source: 'grid',
          slotIndex: first
        };
      }
    }
  }

  // Synchronize legacy helpers for backward compatibility
  if (base.selected_reference) {
    if (base.selected_reference.source === 'grid' && base.selected_reference.slotIndex !== undefined) {
      base.selected = [base.selected_reference.slotIndex];
      base.selected_projects = [];
    } else {
      base.selected = [];
      base.selected_projects = [base.selected_reference];
    }
  } else {
    base.selected = [];
    base.selected_projects = [];
  }

  return base;
}

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [state, setState] = useState<ConsultationState>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === '1') {
          return normalizeConsultationState({
            ...INITIAL_CONSULTATION_STATE,
            fields: {
              client: 'Mala Sharma',
              location: 'Bengaluru, Indiranagar',
              date: '2026-10-08',
              deity: 'Lord Venkateshwara, Radha Krishna',
              rituals: 'Daily morning aarti and weekly abhishekam',
              dimensions: '6 ft W × 4 ft D × 9 ft H',
              features: 'Teak jali doors, brass bells, pooja samagri storage',
              scope: 'Dedicated Sanctum with Shikhara and teakwood jali doors',
              materials: 'Burma Teakwood with Makrana marble base',
              estimate: '15 lakh',
              timeline: '3–4 months'
            },
            selected_reference: {
              data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
              caption: 'Dedicated pooja room · Rich detail',
              kind: 'Selected reference',
              source: 'grid',
              slotIndex: 6
            }
          });
        }
      }
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.fields === 'object') {
          return normalizeConsultationState(parsed);
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_CONSULTATION_STATE;
  });

  const [saveStatus, setSaveStatus] = useState<string>('Saved');
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync to database and localStorage with debounce
  const persistState = useCallback((nextState: ConsultationState) => {
    setState(nextState);
    setSaveStatus('Saving...');

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        // Always save to localStorage as resilient offline draft
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));

        // Save gallery to dedicated key if modified
        if (nextState.gallery?.some(Boolean)) {
          localStorage.setItem(LOCAL_STORAGE_GRID_KEY, JSON.stringify(nextState.gallery));
        }

        // Save journey to dedicated key
        if (nextState.journey?.some(Boolean)) {
          localStorage.setItem(LOCAL_STORAGE_JOURNEY_KEY, JSON.stringify(nextState.journey));
        }

        // If user is authenticated and Supabase is configured, save to Postgres
        if (isSupabaseConfigured && supabase && user) {
          const payload = {
            created_by: user.id,
            client_phone: nextState.fields.client ? nextState.fields.client : null,
            fields: nextState.fields,
            selected_reference: nextState.selected_reference,
            selected_refs: nextState.selected_reference ? [nextState.selected_reference] : [],
            current_step: nextState.slide,
            status: nextState.status || 'draft',
            updated_at: new Date().toISOString()
          };

          if (nextState.id) {
            await supabase.from('consultations').update(payload).eq('id', nextState.id);
          } else {
            const { data } = await supabase.from('consultations').insert(payload).select('id').single();
            if (data?.id) {
              setState(s => ({ ...s, id: data.id }));
            }
          }
        }

        setSaveStatus('Saved');
      } catch (err) {
        console.warn('Autosave notice:', err);
        setSaveStatus('Offline Saved');
      }
    }, 350);
  }, [user]);

  // Load grid and journey presets on startup if available
  useEffect(() => {
    try {
      const savedGrid = localStorage.getItem(LOCAL_STORAGE_GRID_KEY);
      if (savedGrid && (!state.gallery || !state.gallery.some(Boolean))) {
        const parsed = JSON.parse(savedGrid);
        if (Array.isArray(parsed)) {
          setState(prev => ({ ...prev, gallery: parsed }));
        }
      }

      const savedJourney = localStorage.getItem(LOCAL_STORAGE_JOURNEY_KEY);
      if (savedJourney && (!state.journey || !state.journey.some(Boolean))) {
        const parsed = JSON.parse(savedJourney);
        if (Array.isArray(parsed)) {
          setState(prev => ({ ...prev, journey: parsed }));
        }
      }
    } catch {
      // Ignored
    }
  }, []);

  const updateField = useCallback((field: keyof ConsultationFields, value: string) => {
    persistState({
      ...state,
      fields: {
        ...state.fields,
        [field]: value
      }
    });
  }, [state, persistState]);

  const setSlide = useCallback((slide: number) => {
    if (slide >= 0 && slide <= 7) {
      persistState({ ...state, slide });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state, persistState]);

  const nextSlide = useCallback((): boolean => {
    // Step 5 validation: must have exactly 1 reference selected
    const totalRefs = state.selected_reference ? 1 : 0;
    if (state.slide === 4 && totalRefs !== 1) {
      return false;
    }
    if (state.slide < 7) {
      setSlide(state.slide + 1);
      return true;
    }
    return false;
  }, [state.slide, state.selected_reference, setSlide]);

  const prevSlide = useCallback(() => {
    if (state.slide > 0) {
      setSlide(state.slide - 1);
    }
  }, [state.slide, setSlide]);

  // Step 3 Image handlers
  const addImage = useCallback((image: ConsultationImage) => {
    const updated = [...state.images, image];
    persistState({ ...state, images: updated });
  }, [state, persistState]);

  const removeImage = useCallback((index: number) => {
    const updated = state.images.filter((_, i) => i !== index);
    persistState({ ...state, images: updated });
  }, [state, persistState]);

  const moveImage = useCallback((index: number, dir: number) => {
    const target = index + dir;
    if (target < 0 || target >= state.images.length) return;
    const copy = [...state.images];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    persistState({ ...state, images: copy });
  }, [state, persistState]);

  const updateImageProp = useCallback((index: number, prop: 'caption' | 'kind', val: string) => {
    const copy = [...state.images];
    if (copy[index]) {
      copy[index] = { ...copy[index], [prop]: val };
      persistState({ ...state, images: copy });
    }
  }, [state, persistState]);

  // Step 5 References handlers (Single reference choice across grid & client projects)
  const totalSelectedCount = state.selected_reference ? 1 : 0;

  const selectReference = useCallback((slotIndex: number): boolean => {
    if (!state.gallery[slotIndex]) return false;
    const isCurrent =
      state.selected_reference?.source === 'grid' &&
      state.selected_reference?.slotIndex === slotIndex;

    if (isCurrent) {
      // Toggle off / clear
      persistState({
        ...state,
        selected_reference: null,
        selected: [],
        selected_projects: []
      });
      return true;
    } else {
      // Single choice: selecting replaces previous choice and clears across tabs
      const g = state.gallery[slotIndex];
      const r = Math.floor(slotIndex / 4);
      const c = slotIndex % 4;
      const newRef: SelectedReference = {
        data: g?.data || '',
        kind: 'Selected reference',
        caption: g?.caption || `${REFERENCE_ROW_NAMES[r]} · ${REFERENCE_COL_NAMES[c]}`,
        source: 'grid',
        slotIndex
      };

      persistState({
        ...state,
        selected_reference: newRef,
        selected: [slotIndex],
        selected_projects: []
      });
      return true;
    }
  }, [state, persistState]);

  const selectClientProjectRef = useCallback((ref: SelectedReference): boolean => {
    const isCurrent =
      state.selected_reference?.source === 'client_project' &&
      (state.selected_reference.caption === ref.caption || (state.selected_reference.data && state.selected_reference.data === ref.data));

    if (isCurrent) {
      // Toggle off / clear
      persistState({
        ...state,
        selected_reference: null,
        selected: [],
        selected_projects: []
      });
      return true;
    } else {
      // Single choice: selecting replaces previous choice and clears across tabs
      const newRef: SelectedReference = {
        ...ref,
        source: 'client_project'
      };

      persistState({
        ...state,
        selected_reference: newRef,
        selected: [],
        selected_projects: [newRef]
      });
      return true;
    }
  }, [state, persistState]);

  const removeSelectedReference = useCallback((_refCaptionOrSlot?: string | number) => {
    persistState({
      ...state,
      selected_reference: null,
      selected: [],
      selected_projects: []
    });
  }, [state, persistState]);

  // Single selected reference exposed as array for existing components
  const selectedReferencesList: SelectedReference[] = state.selected_reference
    ? [state.selected_reference]
    : [];

  const updateGridCell = useCallback((slot: number, data: string, caption?: string) => {
    const galleryCopy = [...(state.gallery || Array(16).fill(null))];
    galleryCopy[slot] = {
      slot,
      data,
      caption: caption || galleryCopy[slot]?.caption || ''
    };

    let updatedRef = state.selected_reference;
    if (state.selected_reference?.source === 'grid' && state.selected_reference?.slotIndex === slot) {
      updatedRef = {
        ...state.selected_reference,
        data,
        caption: caption || galleryCopy[slot]?.caption || state.selected_reference.caption
      };
    }

    persistState({ ...state, gallery: galleryCopy, selected_reference: updatedRef });
  }, [state, persistState]);

  const removeGridCell = useCallback((slot: number) => {
    const galleryCopy = [...(state.gallery || Array(16).fill(null))];
    galleryCopy[slot] = null;
    const isSelectedSlot = state.selected_reference?.source === 'grid' && state.selected_reference?.slotIndex === slot;
    persistState({
      ...state,
      gallery: galleryCopy,
      selected_reference: isSelectedSlot ? null : state.selected_reference,
      selected: isSelectedSlot ? [] : state.selected,
    });
  }, [state, persistState]);

  const loadDemoGrid = useCallback(() => {
    // Generate 16 SVG architectural placeholders with distinctive tier icons
    const demoItems: GridSlot[] = Array.from({ length: 16 }, (_, i) => {
      const r = Math.floor(i / 4);
      const c = i % 4;
      const rowName = REFERENCE_ROW_NAMES[r];
      const colName = REFERENCE_COL_NAMES[c];
      return {
        slot: i,
        data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'), // Reuse rich authentic assets
        caption: `Demo — ${rowName} / ${colName}`
      };
    });
    persistState({ ...state, gallery: demoItems, selected: [] });
  }, [state, persistState]);

  // Step 7 Journey handlers
  const addJourneyFile = useCallback((stage: number, data: string, caption: string, mimeType?: string) => {
    const journeyCopy = [...(state.journey || Array(8).fill(null))];
    const currentStageFiles: JourneyAsset[] = Array.isArray(journeyCopy[stage]) ? [...(journeyCopy[stage] as JourneyAsset[])] : [];
    
    currentStageFiles.push({
      stage,
      data,
      caption,
      mime_type: mimeType || (data.startsWith('data:application/pdf') || data.endsWith('.pdf') ? 'application/pdf' : 'image/png'),
      sort_order: currentStageFiles.length
    });

    journeyCopy[stage] = currentStageFiles;
    persistState({ ...state, journey: journeyCopy });
  }, [state, persistState]);

  const removeJourneyAsset = useCallback((stage: number, assetIndex: number) => {
    const journeyCopy = [...(state.journey || Array(8).fill(null))];
    const currentStageFiles: JourneyAsset[] = Array.isArray(journeyCopy[stage]) ? [...(journeyCopy[stage] as JourneyAsset[])] : [];
    currentStageFiles.splice(assetIndex, 1);
    journeyCopy[stage] = currentStageFiles.length > 0 ? currentStageFiles : null;
    persistState({ ...state, journey: journeyCopy });
  }, [state, persistState]);

  // Session reset
  const resetConsultation = useCallback(() => {
    const fresh: ConsultationState = {
      ...INITIAL_CONSULTATION_STATE,
      fields: {
        ...INITIAL_CONSULTATION_STATE.fields,
        date: new Date().toLocaleDateString('en-CA')
      },
      gallery: state.gallery, // Preserve configured reference grid
      journey: state.journey  // Preserve configured journey files
    };
    persistState(fresh);
  }, [state.gallery, state.journey, persistState]);

  const importSession = useCallback((imported: ConsultationState): boolean => {
    if (imported && imported.fields) {
      const normalized = normalizeConsultationState(imported);
      persistState({
        ...normalized,
        gallery: imported.gallery || state.gallery,
        journey: imported.journey || state.journey
      });
      return true;
    }
    return false;
  }, [state.gallery, state.journey, persistState]);

  // Google Sheets sync caller
  const triggerSheetsSync = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.functions.invoke('sync-sheets', {
          body: {
            consultation_id: state.id || 'draft-session',
            state,
            consultant_name: profile?.name || 'Svvayam Team',
            consultant_mobile: profile?.phone || ''
          }
        });
        if (error) throw error;
        return { success: true, message: data?.message || 'Synchronized with Google Sheets successfully.' };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Google Sheets sync failed';
        return { success: false, message };
      }
    } else {
      // Mock sync in dev mode
      console.log('[Dev Mock Sheets Sync] Consultation payload synced to simulated Google Sheets:', state);
      return { success: true, message: 'Simulated Google Sheet row updated (Mock Dev Mode).' };
    }
  }, [state, profile]);

  return (
    <ConsultationContext.Provider value={{
      state,
      currentSlide: state.slide,
      saveStatus,
      updateField,
      setSlide,
      nextSlide,
      prevSlide,
      addImage,
      removeImage,
      moveImage,
      updateImageProp,
      selectReference,
      selectClientProjectRef,
      removeSelectedReference,
      totalSelectedCount,
      selectedReferencesList,
      updateGridCell,
      removeGridCell,
      loadDemoGrid,
      addJourneyFile,
      removeJourneyAsset,
      resetConsultation,
      importSession,
      triggerSheetsSync
    }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};
