export type UserRole = 'admin' | 'client' | 'customer';

export type CustomerTitle = 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.';
export type CustomerProduct = 'Temple' | 'Puja Mandir' | 'Sanctum';

export interface Profile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  title?: CustomerTitle;
  surname?: string;
  product?: CustomerProduct;
  project_name?: string;
  is_active?: boolean;
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
  title?: CustomerTitle;
  surname?: string;
  product?: CustomerProduct;
  projectName?: string;
  project_name?: string;
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
  project_name?: string;
  fields: ConsultationFields;
  images: ConsultationImage[];
  slide: number;
  gallery: (GridSlot | null)[];
  journey: (JourneyAsset[] | null)[];
  selected_reference: SelectedReference | null; // Single selected reference (grid slot or client project)
  selected?: number[]; // Deprecated: Kept for backwards compatibility with older files
  selected_projects?: SelectedReference[]; // Deprecated: Kept for backwards compatibility with older files
  status?: 'draft' | 'proposal_sent' | 'completed';
  client_id?: string;
  portal_visible?: boolean;
  internal_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JourneyStageProgress {
  stage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  start_date?: string;
  completion_date?: string;
  notes?: string;
}

export interface JourneyUpdate {
  id: string;
  consultation_id: string;
  stage?: number;
  title: string;
  note: string;
  media_urls?: string[];
  created_at: string;
  is_read?: boolean;
}

export interface PortalMessage {
  id: string;
  consultation_id: string;
  sender_id: string;
  sender_role: 'customer' | 'admin' | 'team';
  sender_name: string;
  content: string;
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
  section_context?: string;
  is_read: boolean;
  created_at: string;
  delivery_status?: 'sent' | 'delivered' | 'read';
}

export interface CustomerRecord {
  id: string;
  name: string;
  title?: CustomerTitle;
  surname?: string;
  product?: CustomerProduct;
  project_name?: string;
  phone: string;
  location?: string;
  consultation_id?: string;
  is_active: boolean;
  portal_visible?: boolean;
  created_at: string;
}

export interface ConsultationRecord {
  id: string;
  client_name: string;
  project_name?: string;
  title?: CustomerTitle;
  surname?: string;
  product?: CustomerProduct;
  client_phone: string;
  location: string;
  consultant: string;
  consultant_phone?: string;
  status: 'draft' | 'proposal_sent' | 'completed';
  date?: string;
  updated_at: string;
  estimate?: string;
  selected_reference?: SelectedReference | null;
  portal_visible?: boolean;
  internal_notes?: string;
  client_id?: string;
  current_step?: number;
  state?: any;
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
