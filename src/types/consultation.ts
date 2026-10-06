export type UserRole = 'admin' | 'client';

export interface Profile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export type ReferenceKind = 'Client reference' | 'Inspiration' | 'Completed Svvayam project';

export interface ConsultationImage {
  id?: string;
  data: string; // URL from Storage or base64 fallback
  storage_path?: string;
  slide: number;
  kind: ReferenceKind;
  caption: string;
}

export interface SelectedReference {
  data: string;
  storage_path?: string;
  kind: string;
  caption: string;
  source?: 'grid' | 'client_project';
  slotIndex?: number;
  projectId?: string;
}

export interface GridSlot {
  slot: number;
  storage_path?: string;
  data: string;
  caption: string;
}

export interface JourneyAsset {
  id?: string;
  stage: number;
  storage_path?: string;
  data: string;
  mime_type?: string;
  caption: string;
  sort_order?: number;
}

export interface ConsultationFields {
  // Step 1: Purpose
  client?: string;
  location?: string;
  date?: string;

  // Step 2: Worship
  deity?: string;
  rituals?: string;
  idol?: string;

  // Step 3: Space
  dimensions?: string;
  dimensionType?: string;
  features?: string;
  site?: string;

  // Step 4: Alignment
  approvers?: string;
  budget?: string;
  installation?: string;
  decision?: string;

  // Step 6: Scope
  scope?: string;
  materials?: string;
  estimate?: string;
  timeline?: string;
  exclusions?: string;

  [key: string]: string | undefined;
}

export interface ConsultationState {
  id?: string;
  version: number;
  fields: ConsultationFields;
  images: ConsultationImage[];
  slide: number;
  gallery: (GridSlot | null)[];
  journey: (JourneyAsset[] | null)[];
  selected: number[]; // Grid slot indices (0..15) or encoded project refs
  selected_projects?: SelectedReference[]; // Extra picked items if from existing client projects
  status?: 'draft' | 'proposal_sent' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface ClientProjectItem {
  id: string;
  client_name: string;
  category: 'Compact' | 'Medium' | 'Grand';
  dimension?: string;
  material?: string;
  location?: string;
  type?: string;
  desc?: string;
  status?: string;
  hasGreenDot?: boolean;
  hero_image: string;
  stages: {
    title: string;
    stage_key: string;
    images: string[];
  }[];
}

export interface SheetSyncLog {
  id: string;
  consultation_id: string;
  status: 'success' | 'failure' | 'pending';
  error?: string;
  created_at: string;
}
