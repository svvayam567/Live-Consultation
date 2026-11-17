import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import type { ConsultationState, ConsultationRecord } from '../../types/consultation';
import { formatProjectName } from '../utils';

export const ADMIN_CONSULTATIONS_STORAGE_KEY = 'svvayam_admin_consultations_v1';

/**
 * Saves or updates a consultation record in Cloud Firestore.
 * Preserves existing document IDs and business records.
 */
export async function saveConsultationToFirestore(
  state: ConsultationState,
  authorInfo?: { id?: string; name?: string; phone?: string }
): Promise<{ success: boolean; id: string; error?: string }> {
  const consultId = state.id || ('draft-' + Date.now().toString().slice(-4));

  const projName = formatProjectName(
    state.project_name || state.fields.projectName || state.fields.project_name || {
      title: state.fields.title,
      surname: state.fields.surname,
      product: state.fields.product || state.fields.productType || 'Temple',
      client_name: state.fields.client
    }
  );

  const computedStatus = state.status || (state.slide === 7 ? 'completed' : 'draft');

  const payload: DocumentData = {
    id: consultId,
    client_id: state.client_id || null,
    project_id: state.project_id || null,
    project_name: projName,
    client_name: state.fields.client || null,
    client_phone: state.fields.client_phone || state.fields.phone || null,
    title: state.fields.title || 'Mr.',
    surname: state.fields.surname || '',
    product: state.fields.product || 'Temple',
    fields: state.fields,
    selected_reference: state.selected_reference || null,
    selected_refs: state.selected_reference ? [state.selected_reference] : [],
    current_step: (state.slide ?? 0) + 1,
    status: computedStatus,
    portal_visible: true,
    consultant_id: authorInfo?.id || state.consultant_id || null,
    consultant_name: authorInfo?.name || state.consultant_name || 'Svvayam Admin',
    consultant_phone: authorInfo?.phone || (state as any).consultant_phone || '+91 8074257384',
    updated_at: serverTimestamp()
  };

  // 1. Update resilient local storage cache first
  try {
    const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
    const list: any[] = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex(c => c.id === consultId || (state.client_id && c.client_id === state.client_id));
    const adminRecord = {
      id: consultId,
      client_name: state.fields.client || 'Client',
      project_name: projName,
      title: state.fields.title,
      surname: state.fields.surname,
      product: state.fields.product || 'Temple',
      client_phone: state.fields.client_phone || state.fields.phone || '',
      location: state.fields.location || '',
      consultant: authorInfo?.name || state.consultant_name || 'Svvayam Admin',
      status: computedStatus,
      current_step: (state.slide ?? 0) + 1,
      updated_at: new Date().toISOString(),
      state: { ...state, id: consultId, project_name: projName }
    };
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...adminRecord };
    } else {
      list.unshift(adminRecord);
    }
    localStorage.setItem(ADMIN_CONSULTATIONS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('[Storage] Admin consultations update warning:', err);
  }

  // 2. Persist to Cloud Firestore if connected
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'consultations', consultId);
      const existing = await getDoc(docRef);
      if (!existing.exists()) {
        payload.created_at = serverTimestamp();
      }
      await setDoc(docRef, payload, { merge: true });

      // If client_id is present, also upsert project document in 'projects' collection
      if (state.client_id) {
        const projectId = state.project_id || ('proj-' + consultId);
        const projectRef = doc(db, 'projects', projectId);
        await setDoc(projectRef, {
          id: projectId,
          client_id: state.client_id,
          project_name: projName,
          product_type: state.fields.product || 'Temple',
          location: state.fields.location || 'India',
          status: computedStatus === 'completed' ? 'completed' : 'in_progress',
          updated_at: serverTimestamp()
        }, { merge: true });
      }

      return { success: true, id: consultId };
    } catch (dbErr: any) {
      console.warn('[Firestore] Consultation save notice:', dbErr);
      return { success: true, id: consultId, error: dbErr?.message };
    }
  }

  return { success: true, id: consultId };
}

/**
 * Loads all consultations from Cloud Firestore (with local fallback).
 */
export async function fetchAllConsultations(): Promise<ConsultationRecord[]> {
  const localList: ConsultationRecord[] = [];
  try {
    const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) localList.push(...parsed);
    }
  } catch {}

  if (!isFirebaseConfigured || !db) {
    return localList;
  }

  try {
    const colRef = collection(db, 'consultations');
    const q = query(colRef, orderBy('updated_at', 'desc'), limit(150));
    const snap = await getDocs(q);

    const remoteList: ConsultationRecord[] = [];
    snap.forEach(d => {
      const data = d.data();
      remoteList.push({
        id: d.id,
        client_name: data.client_name || data.fields?.client || 'Untitled Client',
        project_name: data.project_name || data.fields?.projectName || 'Sanctum Mandir',
        title: data.title || data.fields?.title || 'Mr.',
        surname: data.surname || data.fields?.surname || '',
        product: data.product || data.fields?.product || 'Temple',
        client_phone: data.client_phone || data.fields?.client_phone || data.fields?.phone || '',
        location: data.fields?.location || '',
        consultant: data.consultant_name || 'Svvayam Admin',
        consultant_phone: data.consultant_phone || '+91 8074257384',
        status: data.status || 'draft',
        date: data.fields?.date || (data.created_at?.toDate?.() ? data.created_at.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        portal_visible: data.portal_visible ?? true,
        current_step: data.current_step || 1,
        internal_notes: data.internal_notes || '',
        updated_at: data.updated_at?.toDate?.() ? data.updated_at.toDate().toISOString() : new Date().toISOString(),
        state: {
          version: 1,
          id: d.id,
          slide: Math.max(0, (data.current_step || 1) - 1),
          project_name: data.project_name,
          client_id: data.client_id,
          project_id: data.project_id,
          consultant_id: data.consultant_id,
          consultant_name: data.consultant_name,
          fields: data.fields || {},
          images: [],
          gallery: Array(16).fill(null),
          journey: Array(8).fill(null),
          selected_reference: data.selected_reference || null
        }
      });
    });

    if (remoteList.length > 0) {
      // Merge with any local drafts not yet in remote (excluding legacy seeds)
      const map = new Map<string, ConsultationRecord>();
      remoteList.forEach(r => map.set(r.id, r));
      localList.filter(l => !String(l.id).startsWith('seed-')).forEach(l => {
        if (!map.has(l.id)) map.set(l.id, l);
      });
      return Array.from(map.values());
    }

    // Firestore connected and is empty: return empty array
    return [];
  } catch (err) {
    console.warn('[Firestore] fetchAllConsultations error, using local state:', err);
  }

  return localList.filter(l => !String(l.id).startsWith('seed-'));
}

/**
 * Loads a single customer's visible consultation for Customer Portal.
 */
export async function fetchCustomerConsultation(
  customerUid: string,
  customerPhone?: string
): Promise<{ consultation: any; stages: any[]; updates: any[] } | null> {
  if (!isFirebaseConfigured || !db) {
    // Local fallback
    try {
      const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        const cleanPhone = (customerPhone || '').replace(/\D/g, '').slice(-10);
        const found = list.find((c: any) =>
          c.client_id === customerUid ||
          (cleanPhone && c.client_phone?.replace(/\D/g, '').endsWith(cleanPhone))
        );
        if (found) {
          return { consultation: found, stages: [], updates: [] };
        }
      }
    } catch {}
    return null;
  }

  try {
    const colRef = collection(db, 'consultations');
    // Query by client_id
    let q = query(colRef, where('client_id', '==', customerUid), limit(1));
    let snap = await getDocs(q);

    // If not found by client_id, fallback to phone
    if (snap.empty && customerPhone) {
      const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
      const phoneQueries = [
        query(colRef, where('client_phone', '==', '+91' + cleanPhone), limit(1)),
        query(colRef, where('client_phone', '==', customerPhone), limit(1))
      ];
      for (const pq of phoneQueries) {
        const pSnap = await getDocs(pq);
        if (!pSnap.empty) {
          snap = pSnap;
          break;
        }
      }
    }

    if (snap.empty) {
      return null;
    }

    const consultDoc = snap.docs[0];
    const consultData = { id: consultDoc.id, ...consultDoc.data() };

    // Fetch journey stage progress
    const stagesRef = collection(db, 'consultations', consultDoc.id, 'stages');
    const stagesSnap = await getDocs(stagesRef);
    const stages: any[] = [];
    stagesSnap.forEach(s => stages.push({ id: s.id, ...s.data() }));

    // Fetch journey updates
    const updatesRef = collection(db, 'consultations', consultDoc.id, 'updates');
    const updatesSnap = await getDocs(query(updatesRef, orderBy('created_at', 'desc')));
    const updates: any[] = [];
    updatesSnap.forEach(u => updates.push({ id: u.id, ...u.data() }));

    return { consultation: consultData, stages, updates };
  } catch (err) {
    console.error('[Firestore] fetchCustomerConsultation error:', err);
    return null;
  }
}

/**
 * Toggles portal visibility for a consultation.
 */
export async function setConsultationPortalVisible(
  consultationId: string,
  visible: boolean
): Promise<boolean> {
  // Update local storage
  try {
    const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      const updated = list.map((c: any) => c.id === consultationId ? { ...c, portal_visible: visible } : c);
      localStorage.setItem(ADMIN_CONSULTATIONS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {}

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'consultations', consultationId);
      await updateDoc(docRef, {
        portal_visible: visible,
        updated_at: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error('[Firestore] setConsultationPortalVisible error:', err);
      return false;
    }
  }
  return true;
}

/**
 * Updates internal team notes for a consultation.
 */
export async function updateConsultationInternalNotes(
  consultationId: string,
  notes: string
): Promise<boolean> {
  try {
    const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      const updated = list.map((c: any) => c.id === consultationId ? { ...c, internal_notes: notes } : c);
      localStorage.setItem(ADMIN_CONSULTATIONS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {}

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'consultations', consultationId);
      await updateDoc(docRef, {
        internal_notes: notes,
        updated_at: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error('[Firestore] updateConsultationInternalNotes error:', err);
      return false;
    }
  }
  return true;
}

/**
 * Updates stage progress in a consultation.
 */
export async function updateConsultationStage(
  consultationId: string,
  stageIndex: number,
  status: 'not_started' | 'in_progress' | 'completed',
  notes?: string
): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const stageRef = doc(db, 'consultations', consultationId, 'stages', String(stageIndex));
      await setDoc(stageRef, {
        stage: stageIndex,
        status,
        notes: notes || '',
        updated_at: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (err) {
      console.error('[Firestore] updateConsultationStage error:', err);
      return false;
    }
  }
  return true;
}

/**
 * Deletes a consultation document and child records safely.
 */
export async function deleteConsultationFromFirestore(
  consultationId: string
): Promise<boolean> {
  // 1. Delete from local storage
  try {
    const raw = localStorage.getItem(ADMIN_CONSULTATIONS_STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      const filtered = list.filter((c: any) => c.id !== consultationId);
      localStorage.setItem(ADMIN_CONSULTATIONS_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch {}

  // 2. Delete from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'consultations', consultationId);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error('[Firestore] deleteConsultation error:', err);
      return false;
    }
  }
  return true;
}
