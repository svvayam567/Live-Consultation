import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation, Navigate } from 'react-router-dom';
import { useAuth, getRegisteredCustomers } from '../../context/AuthContext';
import { useConsultation } from '../../context/ConsultationContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';
import { Modal } from '../../components/ui/Modal';
import { PortalChat } from '../../components/portal/PortalChat';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { money, indicativeAmount, cn } from '../../lib/utils';
import type { ConsultationState, SelectedReference, CustomerRecord } from '../../types/consultation';
import {
  Users,
  Search,
  RefreshCw,
  FileSpreadsheet,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  UserPlus,
  KeyRound,
  Check,
  Copy,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react';

export interface ConsultationRecord {
  id: string;
  client_name: string;
  project_name?: string;
  title?: string;
  surname?: string;
  product?: string;
  client_phone: string;
  location: string;
  consultant: string;
  consultant_phone?: string;
  consultant_id?: string;
  consultant_name?: string;
  estimate?: string;
  status: 'draft' | 'proposal_sent' | 'completed';
  date: string;
  portal_visible: boolean;
  internal_notes?: string;
  updated_at: string;
  selected_reference?: SelectedReference | null;
  current_step?: number;
  client_id?: string;
  project_id?: string;
  state?: any;
}

const SEED_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: 'seed-001',
    client_name: 'Mala Sharma',
    project_name: "Mrs. Sharma's Temple",
    title: 'Mrs.',
    surname: 'Sharma',
    product: 'Temple',
    client_phone: '+91 9845012345',
    location: 'Bengaluru, Indiranagar',
    consultant: 'Svvayam Admin',
    consultant_name: 'Svvayam Admin',
    consultant_phone: '+91 8074257384',
    estimate: '18 lakh',
    status: 'draft',
    date: '2026-10-08',
    portal_visible: true,
    internal_notes: 'North-East corner room. Makrana white marble base approved. Family prioritizes morning rituals.',
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    current_step: 4,
    selected_reference: {
      data: '/assets/matrix/r0_c0.png',
      caption: 'Classical Teakwood Sanctum with Makrana Marble Peetham',
      kind: 'Selected reference',
      source: 'grid',
      slotIndex: 0
    },
    state: {
      version: 1,
      slide: 4,
      project_name: "Mrs. Sharma's Temple",
      fields: {
        client: 'Mala Sharma',
        title: 'Mrs.',
        surname: 'Sharma',
        product: 'Temple',
        projectName: "Mrs. Sharma's Temple",
        project_name: "Mrs. Sharma's Temple",
        location: 'Bengaluru, Indiranagar',
        date: '2026-10-08',
        deity: 'Lord Venkateshwara, Devi Lakshmi & Lord Ganesha',
        idol: 'Central Venkateshwara 24" brass; flanking deities 12" each',
        rituals: 'Daily morning abhishekam, archana, and evening aarti',
        dimensions: '8 ft (W) x 6 ft (D) x 9 ft (H)',
        dimensionType: 'Dedicated sanctum room (ground floor, North-East corner)',
        features: 'Shikhara dome, stepped sanctum peetham, integrated oil-wick brass vents, brass jali double doors',
        scope: 'Comprehensive teakwood mandir with hand-carved pillars and brass repousse work',
        materials: 'Grade A Burma Teakwood, Makrana White Marble platform, 24k gold leaf accents',
        estimate: '18 lakh'
      },
      images: [],
      gallery: Array(16).fill(null),
      journey: Array(8).fill(null),
      selected_reference: {
        data: '/assets/matrix/r0_c0.png',
        caption: 'Classical Teakwood Sanctum with Makrana Marble Peetham',
        kind: 'Selected reference',
        source: 'grid',
        slotIndex: 0
      }
    }
  },
  {
    id: 'seed-002',
    client_name: 'Dr. Sanjay Reddy',
    project_name: "Dr. Reddy's Sanctum",
    title: 'Dr.',
    surname: 'Reddy',
    product: 'Sanctum',
    client_phone: '+91 9701020304',
    location: 'Hyderabad, Jubilee Hills',
    consultant: 'Svvayam Admin',
    consultant_name: 'Svvayam Admin',
    consultant_phone: '+91 8074257384',
    estimate: '25 lakh',
    status: 'proposal_sent',
    date: '2026-10-06',
    portal_visible: true,
    internal_notes: 'Double-height courtyard space. Requires custom acoustical dampening for vedic chanting.',
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    current_step: 7,
    selected_reference: {
      data: '/assets/matrix/r1_c2.png',
      caption: 'Ornate Dravidian Sanctum with Stepped Peetham & Brass Bell Grid',
      kind: 'Selected reference',
      source: 'grid',
      slotIndex: 6
    },
    state: {
      version: 1,
      slide: 7,
      project_name: "Dr. Reddy's Sanctum",
      fields: {
        client: 'Dr. Sanjay Reddy',
        title: 'Dr.',
        surname: 'Reddy',
        product: 'Sanctum',
        projectName: "Dr. Reddy's Sanctum",
        project_name: "Dr. Reddy's Sanctum",
        location: 'Hyderabad, Jubilee Hills',
        date: '2026-10-06',
        deity: 'Shiva Lingam & Parvati',
        idol: '36" Black granite Lingam on panchaloha peetham',
        rituals: 'Panchamrita abhishekam, Rudra homam on auspicious days',
        dimensions: '12 ft (W) x 10 ft (D) x 14 ft (H)',
        dimensionType: 'Dedicated courtyard sanctum with skylight integration',
        features: 'Perforated stone jali, motorized brass bell array, water drainage channel',
        scope: 'Monolithic granite and dark teak sanctum architecture',
        materials: 'Sadahalli grey granite, hand-rubbed teakwood, unlacquered brass',
        estimate: '25 lakh'
      },
      images: [],
      gallery: Array(16).fill(null),
      journey: Array(8).fill(null),
      selected_reference: {
        data: '/assets/matrix/r1_c2.png',
        caption: 'Ornate Dravidian Sanctum with Stepped Peetham & Brass Bell Grid',
        kind: 'Selected reference',
        source: 'grid',
        slotIndex: 6
      }
    }
  },
  {
    id: 'seed-003',
    client_name: 'Yuva Balakumaran',
    project_name: "Mr. Balakumaran's Temple",
    title: 'Mr.',
    surname: 'Balakumaran',
    product: 'Temple',
    client_phone: '+91 9884011223',
    location: 'Chennai, Adyar',
    consultant: 'Svvayam Admin',
    consultant_name: 'Svvayam Admin',
    consultant_phone: '+91 8074257384',
    estimate: '12 lakh',
    status: 'completed',
    date: '2026-09-28',
    portal_visible: false,
    internal_notes: 'Completed site installation. Auspicious Kumbhabhishekam ceremony conducted smoothly.',
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    current_step: 7,
    selected_reference: {
      data: '/assets/matrix/r2_c1.png',
      caption: 'Minimalist Monolithic Sanctum with Hidden Warm Illumination',
      kind: 'Selected reference',
      source: 'grid',
      slotIndex: 9
    }
  }
];

export const AdminClientsPage: React.FC = () => {
  const { isAdmin, isLoading: authLoading, profile, user } = useAuth();
  const { importSession, triggerSheetsSync } = useConsultation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'consultations' | 'customers' | 'inbox'>('consultations');
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'proposal_sent' | 'completed'>('all');
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Messages inbox state
  const [selectedThreadConsultationId, setSelectedThreadConsultationId] = useState<string | null>(null);

  // Customer Reset Password Modal state
  const [resetPasswordCustomer, setResetPasswordCustomer] = useState<{ id: string; name: string; phone: string } | null>(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string | null>(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const [copiedResetPassword, setCopiedResetPassword] = useState(false);

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordCustomer) return;
    if (newResetPassword.trim().length < 6) {
      setResetPasswordError('Password must be at least 6 characters.');
      return;
    }

    setResettingPassword(true);
    setResetPasswordError(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.functions.invoke('register-customer', {
          body: {
            action: 'reset_password',
            customer_id: resetPasswordCustomer.id,
            password: newResetPassword.trim()
          }
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || 'Failed to reset customer password.');
        }
      }
      setResetPasswordSuccess(newResetPassword.trim());
      setToastMsg(`Password successfully updated for ${resetPasswordCustomer.name}.`);
    } catch (err: any) {
      setResetPasswordError(err?.message || 'Failed to update customer password.');
    } finally {
      setResettingPassword(false);
    }
  };

  // Delete Consultation Confirmation Modal state
  const [deleteTarget, setDeleteTarget] = useState<ConsultationRecord | null>(null);
  const [deleteTimeRemaining, setDeleteTimeRemaining] = useState<number>(10000);
  const [countdownFinished, setCountdownFinished] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deleteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cancelDelete = () => {
    if (deleteTimerRef.current) {
      clearInterval(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
    setDeleteTarget(null);
    setDeleteTimeRemaining(10000);
    setCountdownFinished(false);
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget || isDeleting) return;
    setIsDeleting(true);

    const target = deleteTarget;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(target.id);

    try {
      let deleted = false;
      let failureReason = '';

      if (isUuid && isSupabaseConfigured && supabase) {
        console.log('[Delete Consultation] Initiating deletion for UUID:', target.id, 'status:', target.status);

        // Method 1: Try secure RPC function (from migration 012)
        try {
          const { data: rpcSuccess, error: rpcErr } = await supabase.rpc('admin_delete_consultation', {
            p_consultation_id: target.id
          });
          console.log('[Delete Consultation] RPC admin_delete_consultation result:', { rpcSuccess, rpcErr });
          if (!rpcErr && rpcSuccess === true) {
            deleted = true;
          } else if (rpcErr && rpcErr.message && !rpcErr.message.includes('function public.admin_delete_consultation') && !rpcErr.message.includes('not found')) {
            failureReason = rpcErr.message;
          }
        } catch (rpcEx) {
          console.warn('[Delete Consultation] RPC exception:', rpcEx);
        }

        // Method 2: Direct Supabase delete if RPC not used
        if (!deleted) {
          // 1. Delete associated child records safely so FKs never block
          try {
            await supabase.from('journey_stage_progress').delete().eq('consultation_id', target.id);
            await supabase.from('journey_updates').delete().eq('consultation_id', target.id);
            await supabase.from('portal_messages').delete().eq('consultation_id', target.id);
            await supabase.from('consultation_images').delete().eq('consultation_id', target.id);
            await supabase.from('sheet_sync_log').delete().eq('consultation_id', target.id);
          } catch (childErr) {
            console.warn('[Delete Consultation] Child records cleanup note:', childErr);
          }

          // 2. Direct delete on public.consultations with select('id') to get affected rows
          const { data, error } = await supabase
            .from('consultations')
            .delete()
            .eq('id', target.id)
            .select('id');

          const rowsAffected = data ? data.length : 0;
          console.log('[Delete Consultation] Direct delete result:', {
            table: 'consultations',
            id: target.id,
            rowsAffected,
            data,
            error
          });

          if (!error && rowsAffected > 0) {
            deleted = true;
          } else {
            failureReason = error?.message || (rowsAffected === 0 ? '0 rows affected by direct delete.' : 'Delete failed.');
            console.warn('[Delete Consultation] Direct delete failed or returned 0 rows. Attempting admin edge function fallback...', { error, data });

            // 3. Fallback: Edge Function using service role credentials
            const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('register-customer', {
              body: {
                action: 'delete_consultation',
                consultation_id: target.id
              }
            });

            console.log('[Delete Consultation] Edge function fallback result:', { edgeData, edgeErr });

            if (!edgeErr && edgeData?.success) {
              deleted = true;
            } else {
              failureReason = edgeData?.error || edgeErr?.message || failureReason;
            }
          }
        }
      } else {
        // Non-UUID (seed data) or offline mode: remove locally
        console.log('[Delete Consultation] Non-UUID or offline record, removing locally:', target.id);
        deleted = true;
      }

      if (!deleted) {
        throw new Error(failureReason || '0 rows deleted in database. Check admin permissions and ensure Migration 012 is executed.');
      }

      // Record in deleted IDs list so it never reappears on reload
      try {
        const deletedIds = JSON.parse(localStorage.getItem('svvayam_deleted_consultation_ids') || '[]');
        if (!deletedIds.includes(target.id)) {
          deletedIds.push(target.id);
          localStorage.setItem('svvayam_deleted_consultation_ids', JSON.stringify(deletedIds));
        }

        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const updated = parsed.filter((c: any) => c.id !== target.id);
            localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(updated));
          }
        }
      } catch {
        // Ignored
      }

      // Remove row from table without reloading page
      setConsultations(prev => prev.filter(c => c.id !== target.id));
      if (selectedRecord?.id === target.id) {
        setSelectedRecord(null);
      }

      setToastMsg('Deleted');
      cancelDelete();
    } catch (err: any) {
      console.error('[Delete Consultation] Execution failed:', err);
      // Keep row in table and show the real error
      setToastMsg(`Deletion failed: ${err?.message || 'Permission denied or network issue'}`);
      cancelDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  // 10-Second Countdown timer effect
  useEffect(() => {
    if (!deleteTarget) {
      if (deleteTimerRef.current) {
        clearInterval(deleteTimerRef.current);
        deleteTimerRef.current = null;
      }
      return;
    }

    setDeleteTimeRemaining(10000);
    setCountdownFinished(false);
    const startTime = Date.now();
    const duration = 10000;

    deleteTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      setDeleteTimeRemaining(remaining);

      if (remaining <= 0) {
        if (deleteTimerRef.current) {
          clearInterval(deleteTimerRef.current);
          deleteTimerRef.current = null;
        }
        // When countdown reaches 0, DO NOT delete automatically! Instead, reveal Confirm Deletion button!
        setCountdownFinished(true);
      }
    }, 100);

    return () => {
      if (deleteTimerRef.current) {
        clearInterval(deleteTimerRef.current);
        deleteTimerRef.current = null;
      }
    };
  }, [deleteTarget]);

  // Escape key cancels delete popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && deleteTarget && !isDeleting) {
        cancelDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteTarget, isDeleting]);

  const handleDeleteConsultationClick = (record: ConsultationRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (deleteTarget) return; // Prevent double clicks / multiple popups

    setDeleteTarget(record);
    setDeleteTimeRemaining(10000);
    setCountdownFinished(false);
    setIsDeleting(false);
  };

  // Add Admin Modal state
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [createAdminError, setCreateAdminError] = useState<string | null>(null);
  const [createdAdminResult, setCreatedAdminResult] = useState<{ name: string; phone: string; password: string } | null>(null);
  const [copiedAdminCredentials, setCopiedAdminCredentials] = useState(false);
  const [showManualAdminHelp, setShowManualAdminHelp] = useState(false);

  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhoneDigits = adminPhone.replace(/\D/g, '').slice(-10);

    if (!adminName.trim()) {
      setCreateAdminError('Please enter administrator full name.');
      return;
    }
    if (cleanPhoneDigits.length !== 10) {
      setCreateAdminError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (adminPassword.trim().length < 8) {
      setCreateAdminError('Password must be at least 8 characters.');
      return;
    }

    setIsCreatingAdmin(true);
    setCreateAdminError(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.functions.invoke('register-customer', {
          body: {
            action: 'register_admin',
            role: 'admin',
            name: adminName.trim(),
            phone: '+91' + cleanPhoneDigits,
            password: adminPassword.trim()
          }
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || 'Failed to create administrator account.');
        }
      }

      setCreatedAdminResult({
        name: adminName.trim(),
        phone: '+91' + cleanPhoneDigits,
        password: adminPassword.trim()
      });
      setToastMsg(`Administrator account created for ${adminName.trim()}.`);
    } catch (err: any) {
      setCreateAdminError(err?.message || 'Failed to create administrator account.');
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  // Client inspection modal tab and journey controls state
  const [modalTab, setModalTab] = useState<'details' | 'journey' | 'chat'>('details');
  const [journeyStages, setJourneyStages] = useState<Array<{ stage: number; status: 'not_started' | 'in_progress' | 'completed' }>>([
    { stage: 0, status: 'completed' },
    { stage: 1, status: 'completed' },
    { stage: 2, status: 'in_progress' },
    { stage: 3, status: 'not_started' },
    { stage: 4, status: 'not_started' },
    { stage: 5, status: 'not_started' },
    { stage: 6, status: 'not_started' },
    { stage: 7, status: 'not_started' },
  ]);

  // Check router state or query param for new client highlight or message
  useEffect(() => {
    if (location.state && (location.state as any).message) {
      setToastMsg((location.state as any).message);
    }
  }, [location.state]);

  const highlightId = searchParams.get('highlight');

  // Load consultations from Supabase or resilient local state
  const loadConsultations = async () => {
    setLoadingConsultations(true);
    const deletedIds: string[] = (() => {
      try {
        const raw = localStorage.getItem('svvayam_deleted_consultation_ids');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    })();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*, profiles:created_by(name, phone)')
          .order('updated_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: ConsultationRecord[] = data.map((row: any) => {
            const rawRef = row.selected_reference 
              || (Array.isArray(row.selected_refs) && row.selected_refs.length > 0 
                ? (typeof row.selected_refs[0] === 'object' ? row.selected_refs[0] : null) 
                : null);

            const clientName = row.fields?.client || row.client_phone || 'Untitled Client';
            const projName = row.project_name
              || row.fields?.projectName
              || row.fields?.project_name
              || (row.fields?.surname ? `${row.fields?.title || 'Mr.'} ${row.fields.surname}'s ${row.fields?.product || 'Temple'}` : `${clientName}'s Temple`);

            return {
              id: row.id,
              client_name: clientName,
              project_name: projName,
              title: row.title || row.fields?.title || 'Mr.',
              surname: row.surname || row.fields?.surname || '',
              product: row.product || row.fields?.product || 'Temple',
              client_phone: row.client_phone || row.fields?.client_phone || '—',
              location: row.fields?.location || 'Not specified',
              consultant: row.consultant_name || row.profiles?.name || 'Svvayam Admin',
              consultant_phone: row.profiles?.phone || '+91 8074257384',
              consultant_id: row.consultant_id,
              consultant_name: row.consultant_name || row.profiles?.name || 'Svvayam Admin',
              estimate: row.fields?.estimate || 'Pending',
              status: row.status || 'draft',
              date: row.fields?.date || row.created_at?.split('T')[0] || '—',
              portal_visible: Boolean(row.portal_visible),
              internal_notes: row.internal_notes || '',
              updated_at: row.updated_at || row.created_at,
              selected_reference: rawRef,
              current_step: row.current_step || 0,
              state: {
                version: 1,
                id: row.id,
                slide: row.current_step || 0,
                project_name: projName,
                fields: row.fields || {},
                images: [],
                gallery: Array(16).fill(null),
                journey: Array(8).fill(null),
                selected_reference: rawRef,
                status: row.status
              }
            };
          });

          const activeList = mapped.filter((item) => !deletedIds.includes(item.id));
          setConsultations(activeList);
          setLoadingConsultations(false);
          return;
        }
      } catch (err) {
        console.warn('Consultations query notice:', err);
      }
    }

    // Fallback: Local storage check or default seed
    try {
      const stored = localStorage.getItem('svvayam_admin_consultations_v1');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((c: any) => !deletedIds.includes(c.id));
          setConsultations(filtered);
          setLoadingConsultations(false);
          return;
        }
      }
    } catch {
      // Ignored
    }

    const remainingSeeds = SEED_CONSULTATIONS.filter((c) => !deletedIds.includes(c.id));
    setConsultations(remainingSeeds);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(remainingSeeds));
    setLoadingConsultations(false);
  };

  // Load customer accounts
  const loadCustomers = () => {
    const list = getRegisteredCustomers();
    setCustomers(list);
  };

  useEffect(() => {
    if (isAdmin) {
      loadConsultations();
      loadCustomers();
    }
  }, [isAdmin]);

  // Toggle "Visible in Customer Portal"
  const handleTogglePortalVisibility = async (consultation: ConsultationRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newStatus = !consultation.portal_visible;

    const updated = consultations.map(c =>
      c.id === consultation.id ? { ...c, portal_visible: newStatus } : c
    );
    setConsultations(updated);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(updated));

    if (selectedRecord && selectedRecord.id === consultation.id) {
      setSelectedRecord({ ...selectedRecord, portal_visible: newStatus });
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('consultations')
          .update({ portal_visible: newStatus })
          .eq('id', consultation.id);
      } catch (err) {
        console.warn('Visibility update error:', err);
      }
    }

    setToastMsg(
      `Consultation for ${consultation.client_name} is now ${newStatus ? 'visible' : 'hidden'} in Customer Portal.`
    );
  };

  // Update internal notes
  const handleSaveInternalNotes = async (consultationId: string, notes: string) => {
    const updated = consultations.map(c =>
      c.id === consultationId ? { ...c, internal_notes: notes } : c
    );
    setConsultations(updated);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(updated));

    if (selectedRecord && selectedRecord.id === consultationId) {
      setSelectedRecord({ ...selectedRecord, internal_notes: notes });
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('consultations')
          .update({ internal_notes: notes })
          .eq('id', consultationId);
      } catch (err) {
        console.warn('Internal notes error:', err);
      }
    }

    setToastMsg('Internal notes saved.');
  };

  // Update journey stage status
  const handleUpdateStageStatus = async (stageIdx: number, newStatus: 'not_started' | 'in_progress' | 'completed') => {
    setJourneyStages(prev =>
      prev.map((s, i) => i === stageIdx ? { ...s, status: newStatus } : s)
    );

    if (isSupabaseConfigured && supabase && selectedRecord) {
      try {
        await supabase
          .from('journey_stage_progress')
          .upsert({
            consultation_id: selectedRecord.id,
            stage: stageIdx,
            status: newStatus,
            updated_at: new Date().toISOString()
          }, { onConflict: 'consultation_id,stage' });
      } catch (err) {
        console.warn('Journey stage update error:', err);
      }
    }
  };

  // Filtered consultations list
  const filteredConsultations = useMemo(() => {
    return consultations.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.client_name.toLowerCase().includes(q) ||
        (item.project_name && item.project_name.toLowerCase().includes(q)) ||
        (item.surname && item.surname.toLowerCase().includes(q)) ||
        item.client_phone.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.consultant_name || item.consultant || 'Svvayam Admin').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [consultations, statusFilter, searchQuery]);

  // Start Live Consultation for a specific client (called from client card or inspection modal)
  const handleStartConsultation = (record: ConsultationRecord) => {
    if (record.state) {
      importSession(record.state as ConsultationState);
    }
    navigate(`/admin/consultation?id=${record.id}&client=${record.id}&step=${record.current_step || 1}`);
  };

  const handleViewProposal = (record: ConsultationRecord) => {
    navigate(`/proposal/${record.id}`);
  };

  const handleSyncSingleSheet = async (record: ConsultationRecord) => {
    setSyncingId(record.id);
    const result = await triggerSheetsSync();
    setSyncingId(null);
    if (result.success) {
      setToastMsg(`Synced ${record.project_name || record.client_name} consultation row to Master Google Sheet!`);
    } else {
      setToastMsg(`Sync simulation logged: ${result.message || 'Credentials pending.'}`);
    }
  };

  // Guard: Admin only
  if (!authLoading && !isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased text-[#0A0A0A] pb-24 sm:pb-12">
      <AdminNav activeSection="clients" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
        {/* Top Header & Section Title (NO Consultation controls in header) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#0A0A0A]" />
              <h1 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Client Explorer
              </h1>
            </div>
            <p className="text-xs text-neutral-500 font-sans">
              Search and inspect all client sacred sanctum projects, saved specifications, stage milestones, and direct inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Action Button: Opens dedicated Register Customer page */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/admin/register')}
              className="text-xs flex items-center gap-1.5 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span>Register Customer</span>
            </Button>

            {/* Add Admin Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddAdminModal(true);
                setAdminName('');
                setAdminPhone('');
                setAdminPassword('');
                setCreateAdminError(null);
                setCreatedAdminResult(null);
              }}
              className="text-xs flex items-center gap-1.5 rounded-full border-neutral-300 hover:border-[#0A0A0A] cursor-pointer text-[#0A0A0A]"
              title="Create another administrator account"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
              <span>Add Admin</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                loadConsultations();
                loadCustomers();
              }}
              className="text-xs"
              title="Refresh console"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

        {/* Tab Controls: Consultations Table | Customer Accounts | Messages Inbox */}
        <div className="flex items-center gap-2 border-b border-[#ECECEC] pb-1">
          <button
            onClick={() => setActiveTab('consultations')}
            className={cn(
              "px-4 py-2 text-xs font-sans font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-2",
              activeTab === 'consultations'
                ? "bg-[#0A0A0A] text-white"
                : "text-neutral-500 hover:text-[#0A0A0A] hover:bg-neutral-50"
            )}
          >
            <span>Consultations Table</span>
            <span className="font-mono text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
              {consultations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={cn(
              "px-4 py-2 text-xs font-sans font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-2",
              activeTab === 'customers'
                ? "bg-[#0A0A0A] text-white"
                : "text-neutral-500 hover:text-[#0A0A0A] hover:bg-neutral-50"
            )}
          >
            <span>Customer Accounts</span>
            <span className="font-mono text-[10px] bg-neutral-200 px-1.5 py-0.2 rounded-full text-[#0A0A0A]">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={cn(
              "px-4 py-2 text-xs font-sans font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-2",
              activeTab === 'inbox'
                ? "bg-[#0A0A0A] text-white"
                : "text-neutral-500 hover:text-[#0A0A0A] hover:bg-neutral-50"
            )}
          >
            <span>Direct Inquiries</span>
            <span className="font-mono text-[10px] bg-neutral-200 text-[#0A0A0A] px-1.5 py-0.2 rounded-full font-bold">
              Live
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: CONSULTATIONS TABLE                                */}
        {/* ========================================================= */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            {/* Search Bar & Filter Options */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project, surname, client, phone, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-[#0A0A0A] font-sans"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-neutral-400 text-[11px]">Filter:</span>
                {(['all', 'draft', 'proposal_sent', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-full border cursor-pointer transition-colors",
                      statusFilter === st
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                    )}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div className="border border-neutral-200 rounded-[14px] overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-50/75 border-b border-neutral-200 text-neutral-500 font-mono uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 font-medium">Project & Client</th>
                      <th className="py-3 px-4 font-medium">Mobile</th>
                      <th className="py-3 px-4 font-medium">Location</th>
                      <th className="py-3 px-4 font-medium">Consultant</th>
                      <th className="py-3 px-4 font-medium">Estimate</th>
                      <th className="py-3 px-4 font-medium">Chosen Reference</th>
                      <th className="py-3 px-4 font-medium text-center">Portal Visibility</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Updated</th>
                      <th className="py-3 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {loadingConsultations ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-neutral-400">
                          Loading consultations...
                        </td>
                      </tr>
                    ) : filteredConsultations.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-neutral-400">
                          No matching consultation records found.
                        </td>
                      </tr>
                    ) : (
                      filteredConsultations.map((item) => {
                        const est = indicativeAmount(item.estimate);
                        const isHighlighted = highlightId && (item.id === highlightId || highlightId === 'new');

                        return (
                          <tr
                            key={item.id}
                            className={cn(
                              "hover:bg-neutral-50/50 transition-colors",
                              isHighlighted && "bg-neutral-100 border-l-4 border-l-[#0A0A0A]"
                            )}
                          >
                            <td className="py-3 px-4">
                              <div className="font-semibold text-[#0A0A0A] font-sans">
                                {item.project_name || item.client_name}
                              </div>
                              <div className="text-[11px] text-neutral-500 font-sans">
                                {item.client_name}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-neutral-600">
                              {item.client_phone}
                            </td>
                            <td className="py-3 px-4 text-neutral-600">
                              {item.location}
                            </td>
                            <td className="py-3 px-4 text-neutral-600">
                              {item.consultant_name || item.consultant || 'Svvayam Admin'}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#0A0A0A]">
                              {est ? money(est) : item.estimate || '—'}
                            </td>
                            <td className="py-3 px-4">
                              {item.selected_reference ? (
                                <div className="flex items-center space-x-2 max-w-[180px]">
                                  {item.selected_reference.data && (
                                    <img
                                      src={item.selected_reference.data}
                                      alt={item.selected_reference.caption || 'Reference'}
                                      className="w-8 h-8 rounded-md object-cover border border-[#ECECEC] shrink-0"
                                    />
                                  )}
                                  <span className="truncate text-neutral-700 text-[11px]" title={item.selected_reference.caption}>
                                    {item.selected_reference.caption || 'Selected Reference'}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-neutral-400">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                type="button"
                                onClick={(e) => handleTogglePortalVisibility(item, e)}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer border",
                                  item.portal_visible
                                    ? "bg-emerald-950/10 border-emerald-800/30 text-[#0E2A1C] hover:bg-emerald-950/20"
                                    : "bg-neutral-100 border-neutral-300 text-neutral-500 hover:bg-neutral-200"
                                )}
                                title={item.portal_visible ? "Click to hide from customer" : "Click to publish to customer portal"}
                              >
                                {item.portal_visible ? (
                                  <>
                                    <ToggleRight className="w-3.5 h-3.5 text-[#0E2A1C]" />
                                    <span>Published</span>
                                  </>
                                ) : (
                                  <>
                                    <ToggleLeft className="w-3.5 h-3.5 text-neutral-400" />
                                    <span>Hidden</span>
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
                                  item.status === 'completed'
                                    ? 'bg-neutral-100 border-neutral-400 text-[#0A0A0A]'
                                    : item.status === 'proposal_sent'
                                    ? 'bg-emerald-950/10 border-emerald-800/30 text-[#0E2A1C]'
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                                }`}
                              >
                                {item.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-neutral-400 font-mono text-[11px]">
                              {new Date(item.updated_at).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                {/* Prominent Start Consultation button inside card/row */}
                                <button
                                  onClick={() => handleStartConsultation(item)}
                                  className="px-2.5 py-1 text-[11px] font-sans font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1 rounded-md"
                                  title="Start or edit live consultation for this client"
                                >
                                  <Sparkles className="w-3 h-3 text-white" />
                                  <span>Start Consultation</span>
                                </button>

                                <button
                                  onClick={() => setSelectedRecord(item)}
                                  className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer rounded-sm"
                                  title="Inspect client specifications & milestones"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleViewProposal(item)}
                                  className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer rounded-sm"
                                  title="View Proposal document"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleSyncSingleSheet(item)}
                                  disabled={syncingId === item.id}
                                  className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer rounded-sm disabled:opacity-40"
                                  title="Sync row to Master Google Sheet"
                                >
                                  <FileSpreadsheet className={`w-3.5 h-3.5 ${syncingId === item.id ? 'animate-spin' : ''}`} />
                                </button>

                                {/* Delete Consultation action: Visible on EVERY row for Admins */}
                                {isAdmin && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteConsultationClick(item, e)}
                                    className="p-1 border border-neutral-200 hover:border-rose-400 text-neutral-400 hover:text-rose-600 hover:bg-rose-50/50 cursor-pointer rounded-sm transition-colors"
                                    title="Delete this consultation"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: REGISTERED CUSTOMER ACCOUNTS                       */}
        {/* ========================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">
                  Registered Customer Accounts ({customers.length})
                </h3>
                <p className="text-xs text-neutral-500 font-sans">
                  Active customer portal credentials authorized by admin.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/admin/register')}
                className="text-xs bg-[#0A0A0A] text-white cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1 text-white" />
                <span>Register Customer</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((cust) => (
                <div
                  key={cust.id}
                  className="p-5 rounded-[16px] border border-neutral-200 bg-white hover:border-[#0A0A0A] transition-all space-y-3 relative group shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-[#0A0A0A] font-serif">
                        {cust.project_name || `${cust.title || 'Mr.'} ${cust.surname || cust.name}'s ${cust.product || 'Temple'}`}
                      </h4>
                      <p className="text-xs text-neutral-500 font-sans">
                        Client: {cust.name}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-950/10 text-[#0E2A1C] border border-emerald-800/30">
                      Active
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-neutral-600 font-sans pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 font-mono text-[10px] uppercase">Mobile</span>
                      <span className="font-mono text-[#0A0A0A]">{cust.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 font-mono text-[10px] uppercase">Location</span>
                      <span>{cust.location}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const matched = consultations.find(c => c.id === cust.consultation_id || c.client_phone === cust.phone);
                        if (matched) {
                          handleStartConsultation(matched);
                        } else {
                          navigate(`/admin/consultation?client=${cust.id}`);
                        }
                      }}
                      className="flex-1 py-1.5 px-3 rounded-md bg-[#0A0A0A] text-white hover:bg-neutral-800 text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>Start Consultation</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedThreadConsultationId(cust.consultation_id || cust.id);
                        setActiveTab('inbox');
                      }}
                      className="p-1.5 rounded-md border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] transition-colors cursor-pointer"
                      title="Open message thread"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setResetPasswordCustomer({
                          id: cust.id,
                          name: cust.name,
                          phone: cust.phone
                        });
                        setNewResetPassword('');
                        setResetPasswordSuccess(null);
                        setResetPasswordError(null);
                      }}
                      className="p-1.5 rounded-md border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] transition-colors cursor-pointer"
                      title="Reset customer login password"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DIRECT INQUIRIES & REPLIES                         */}
        {/* ========================================================= */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">
                  Client Direct Message Threads
                </h3>
                <p className="text-xs text-neutral-500 font-sans">
                  Live architectural inquiries and questions submitted by customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Thread list */}
              <div className="space-y-2 md:col-span-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block pb-1">
                  Active Client Sanctums
                </span>
                {consultations.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedThreadConsultationId(item.id)}
                    className={cn(
                      "w-full text-left p-3.5 rounded-[12px] border transition-all cursor-pointer block",
                      selectedThreadConsultationId === item.id
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs"
                        : "bg-white border-neutral-200 hover:bg-neutral-50 text-[#0A0A0A]"
                    )}
                  >
                    <div className="font-semibold text-xs truncate">
                      {item.project_name || item.client_name}
                    </div>
                    <div className={cn("text-[11px] truncate", selectedThreadConsultationId === item.id ? "text-neutral-300" : "text-neutral-500")}>
                      Client: {item.client_name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Chat View */}
              <div className="md:col-span-2">
                {selectedThreadConsultationId ? (
                  <PortalChat
                    consultationId={selectedThreadConsultationId}
                    customerId={
                      consultations.find(c => c.id === selectedThreadConsultationId)?.client_id ||
                      (consultations.find(c => c.id === selectedThreadConsultationId) as any)?.state?.client_id ||
                      selectedThreadConsultationId
                    }
                    projectName={consultations.find(c => c.id === selectedThreadConsultationId)?.project_name}
                    currentUserRole="admin"
                    currentUserName={profile?.name || "Svvayam Studio"}
                    currentUserId={user?.id || 'admin-user'}
                  />
                ) : (
                  <div className="py-24 text-center text-xs text-neutral-400 border border-dashed border-neutral-200 rounded-[16px]">
                    Select a client thread on the left to review and reply.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* CLIENT INSPECTION MODAL (DETAILS, JOURNEY, CHAT)           */}
      {/* ========================================================= */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={selectedRecord.project_name || selectedRecord.client_name}
          subtitle={`Client: ${selectedRecord.client_name} · ${selectedRecord.location}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs font-sans">
            {/* Real Back Action inside detail view */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <button
                onClick={() => setSelectedRecord(null)}
                className="flex items-center space-x-1.5 text-xs text-neutral-500 hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Client List</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setResetPasswordCustomer({
                      id: selectedRecord.id,
                      name: selectedRecord.client_name,
                      phone: selectedRecord.client_phone
                    });
                    setNewResetPassword('');
                    setResetPasswordSuccess(null);
                    setResetPasswordError(null);
                  }}
                  className="px-3 py-1.5 rounded-full border border-neutral-300 hover:border-[#0A0A0A] text-[#0A0A0A] hover:bg-neutral-50 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Reset customer login password"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Reset Password</span>
                </button>

                <button
                  onClick={() => handleStartConsultation(selectedRecord)}
                  className="px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Start Live Consultation</span>
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <button
                onClick={() => setModalTab('details')}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-colors cursor-pointer",
                  modalTab === 'details' ? "bg-[#0A0A0A] text-white font-medium" : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                Saved Specifications
              </button>
              <button
                onClick={() => setModalTab('journey')}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-colors cursor-pointer",
                  modalTab === 'journey' ? "bg-[#0A0A0A] text-white font-medium" : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                8-Stage Milestones
              </button>
              <button
                onClick={() => setModalTab('chat')}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-colors cursor-pointer",
                  modalTab === 'chat' ? "bg-[#0A0A0A] text-white font-medium" : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                Messages Thread
              </button>
            </div>

            {/* TAB 1: SAVED SPECIFICATIONS */}
            {modalTab === 'details' && (
              <div className="space-y-4">
                <div className="p-4 rounded-[12px] bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="font-semibold text-neutral-900 font-mono text-[11px] uppercase tracking-wider">
                    Client Parameters
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Deity:</span>
                      <span>{selectedRecord.state?.fields?.deity || 'Standard worship'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Dimensions:</span>
                      <span>{selectedRecord.state?.fields?.dimensions || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Materials:</span>
                      <span>{selectedRecord.state?.fields?.materials || 'Teakwood & marble'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Budget:</span>
                      <span>{selectedRecord.estimate || '15-20 lakh'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Consultant:</span>
                      <span className="text-[#0A0A0A] font-medium">{selectedRecord.consultant_name || selectedRecord.consultant || 'Svvayam Admin'}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Reference Preview */}
                {selectedRecord.selected_reference && (
                  <div className="p-4 rounded-[12px] bg-neutral-50 border border-neutral-200 flex items-center space-x-3">
                    {selectedRecord.selected_reference.data && (
                      <img
                        src={selectedRecord.selected_reference.data}
                        alt="Reference"
                        className="w-16 h-16 rounded-lg object-cover border border-[#ECECEC]"
                      />
                    )}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">Selected Reference</span>
                      <strong className="text-xs text-[#0A0A0A] block">{selectedRecord.selected_reference.caption}</strong>
                    </div>
                  </div>
                )}

                {/* Internal Notes */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase text-neutral-500 font-medium block">
                    Admin Internal Notes
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedRecord.internal_notes || ''}
                    onBlur={(e) => handleSaveInternalNotes(selectedRecord.id, e.target.value)}
                    placeholder="Enter private notes for the architecture guild..."
                    className="w-full p-2.5 text-xs rounded-md border border-neutral-200 font-sans focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: 8-STAGE JOURNEY MILESTONES */}
            {modalTab === 'journey' && (
              <div className="space-y-3">
                <span className="text-[11px] font-sans text-neutral-500 block">
                  Update creation progress stages for {selectedRecord.project_name || selectedRecord.client_name}.
                </span>
                <div className="space-y-2">
                  {[
                    'Design Inception & Concept',
                    'CAD Proportions & Sthapati Approval',
                    'Timber Seasoning & Block Selection',
                    'Master Guild Hand-Chiseling',
                    'Joinery, Mandapam & Brass Accents',
                    'Polishing, Gold Leafing & Finishes',
                    'Quality Proofing & Studio Assembly',
                    'Site Logistics, Installation & Prana Handover'
                  ].map((stageName, idx) => {
                    const stageObj = journeyStages[idx];
                    const currentStageState = stageObj?.status || 'not_started';

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-[12px] border border-neutral-200 bg-white flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 block">Stage {idx + 1}</span>
                          <span className="font-medium text-xs text-[#0A0A0A]">{stageName}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          {(['not_started', 'in_progress', 'completed'] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleUpdateStageStatus(idx, st)}
                              className={cn(
                                "px-2 py-1 rounded-md text-[10px] font-mono uppercase transition-colors cursor-pointer border",
                                currentStageState === st
                                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                                  : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                              )}
                            >
                              {st === 'not_started' ? 'Pending' : st === 'in_progress' ? 'Active' : 'Done'}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: CLIENT INQUIRIES & REPLIES */}
            {modalTab === 'chat' && (
              <div className="space-y-2">
                <PortalChat
                  consultationId={selectedRecord.id}
                  customerId={
                    selectedRecord.client_id ||
                    (selectedRecord as any).state?.client_id ||
                    selectedRecord.id
                  }
                  projectName={selectedRecord.project_name}
                  currentUserRole="admin"
                  currentUserName={profile?.name || "Svvayam Studio"}
                  currentUserId={user?.id || 'admin-user'}
                />
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Admin Reset Password Modal */}
      {resetPasswordCustomer && (
        <Modal
          isOpen={Boolean(resetPasswordCustomer)}
          onClose={() => {
            setResetPasswordCustomer(null);
            setNewResetPassword('');
            setResetPasswordSuccess(null);
            setResetPasswordError(null);
          }}
          title={`Reset Password · ${resetPasswordCustomer.name}`}
          maxWidth="md"
        >
          <div className="space-y-4 pt-1">
            {resetPasswordSuccess ? (
              <div className="space-y-4">
                <div className="p-4 rounded-[14px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Password successfully updated!</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed font-sans">
                    Share the new login credentials with <strong>{resetPasswordCustomer.name}</strong> ({resetPasswordCustomer.phone}):
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-emerald-300 font-mono text-xs text-[#0A0A0A] flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-sans uppercase">New Password</span>
                      <span className="font-bold text-sm tracking-wide">{resetPasswordSuccess}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const copyText = `Svvayam Sanctum Portal\nMobile: ${resetPasswordCustomer.phone}\nNew Password: ${resetPasswordSuccess}\nLogin Link: ${window.location.origin}/client`;
                        navigator.clipboard.writeText(copyText);
                        setCopiedResetPassword(true);
                        setTimeout(() => setCopiedResetPassword(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs text-neutral-700 hover:text-black flex items-center gap-1.5 cursor-pointer font-sans"
                    >
                      {copiedResetPassword ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedResetPassword ? 'Copied!' : 'Copy Info'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setResetPasswordCustomer(null);
                      setNewResetPassword('');
                      setResetPasswordSuccess(null);
                    }}
                    className="bg-[#0A0A0A] text-white"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  Enter a new login password for <strong>{resetPasswordCustomer.name}</strong> ({resetPasswordCustomer.phone}). The customer will use this to sign into their portal.
                </p>

                {resetPasswordError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                    {resetPasswordError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      value={newResetPassword}
                      onChange={(e) => setNewResetPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      required
                      autoFocus
                      className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                      title={showResetPassword ? 'Hide password' : 'Show password'}
                    >
                      {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400 font-mono">Minimum 6 characters</p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setResetPasswordCustomer(null)}
                    disabled={resettingPassword}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={resettingPassword || newResetPassword.trim().length < 6}
                    className="bg-[#0A0A0A] text-white hover:bg-neutral-800"
                  >
                    {resettingPassword ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* DELETE CONSULTATION 10-SECOND COUNTDOWN CONFIRMATION POPUP */}
      {/* ========================================================= */}
      {deleteTarget && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) cancelDelete();
          }}
        >
          <div 
            className="w-full max-w-sm sm:max-w-md bg-white rounded-[20px] border border-neutral-200 shadow-2xl p-6 sm:p-7 space-y-5 text-center relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-consultation-title"
          >
            {/* Close / Cancel corner button */}
            <button
              type="button"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="absolute right-4 top-4 p-1.5 text-neutral-400 hover:text-[#0A0A0A] rounded-full hover:bg-neutral-100 transition-colors cursor-pointer disabled:opacity-40"
              title="Cancel deletion"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon with pulsating ring */}
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>

            {/* Title & Customer + Status Info */}
            <div className="space-y-2">
              <h3 id="delete-consultation-title" className="text-lg font-medium text-[#0A0A0A]">
                Delete this consultation?
              </h3>

              <div className="text-xs text-neutral-600 font-sans space-y-1">
                <p>
                  Customer: <strong className="text-[#0A0A0A] font-semibold">{deleteTarget.client_name}</strong>
                  {deleteTarget.project_name && deleteTarget.project_name !== deleteTarget.client_name && (
                    <span className="text-neutral-500"> ({deleteTarget.project_name})</span>
                  )}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono uppercase tracking-wider text-neutral-700">
                  <span>Status:</span>
                  <span className="font-semibold text-[#0A0A0A]">{deleteTarget.status.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Status warning: stronger red alert if not a draft */}
              {deleteTarget.status !== 'draft' ? (
                <div className="p-3 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans leading-relaxed text-left space-y-1">
                  <p className="font-semibold text-rose-900">
                    This consultation is {deleteTarget.status.replace('_', ' ')}.
                  </p>
                  <p className="text-[11px] text-rose-700">
                    Deleting it also removes its proposal and data. This cannot be undone.
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-rose-600 font-medium">
                  This draft consultation will be permanently deleted. This cannot be undone.
                </p>
              )}
            </div>

            {/* Countdown or Ready State */}
            {!countdownFinished ? (
              <div className="space-y-2.5 py-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Please wait {Math.max(1, Math.ceil(deleteTimeRemaining / 1000))}…</span>
                </div>

                {/* Decreasing progress bar */}
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                  <div
                    className="h-full bg-rose-600 transition-[width] ease-linear duration-100"
                    style={{ width: `${Math.max(0, (deleteTimeRemaining / 10000) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-[12px] bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-sans">
                Countdown completed. Please confirm to permanently remove this consultation from the database.
              </div>
            )}

            {/* Actions */}
            <div className="pt-2">
              {!countdownFinished ? (
                /* During countdown, ONLY Cancel button is active */
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={cancelDelete}
                  className="w-full py-2.5 rounded-full border-neutral-300 hover:border-[#0A0A0A] text-xs font-medium cursor-pointer"
                >
                  Cancel
                </Button>
              ) : (
                /* When countdown reaches 0: "Confirm deletion" (red) and "Cancel" buttons */
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={cancelDelete}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 rounded-full border-neutral-300 hover:border-[#0A0A0A] text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </Button>

                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                        <span>Confirm deletion</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD ADMINISTRATOR MODAL                                    */}
      {/* ========================================================= */}
      {showAddAdminModal && (
        <Modal
          isOpen={true}
          onClose={() => {
            setShowAddAdminModal(false);
            setCreatedAdminResult(null);
            setCreateAdminError(null);
          }}
          title={createdAdminResult ? "Administrator Account Created" : "Create Administrator"}
          subtitle={createdAdminResult ? "Securely share these credentials with the new admin" : "Add another Svvayam admin team member"}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs font-sans">
            {createdAdminResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-[14px] bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Administrator account created successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    This admin account can now sign in immediately at the login screen using their mobile number and password.
                  </p>
                </div>

                <div className="p-4 rounded-[14px] bg-neutral-50 border border-neutral-200 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Full Name</span>
                    <strong className="text-[#0A0A0A] font-sans">{createdAdminResult.name}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Mobile</span>
                    <strong className="text-[#0A0A0A] font-mono">{createdAdminResult.phone}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 font-mono uppercase text-[10px]">Password</span>
                    <strong className="text-[#0A0A0A] font-mono">{createdAdminResult.password}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const copyText = `Svvayam Administrator Access\nName: ${createdAdminResult.name}\nMobile: ${createdAdminResult.phone}\nPassword: ${createdAdminResult.password}\nPortal Link: ${window.location.origin}/`;
                      navigator.clipboard.writeText(copyText);
                      setCopiedAdminCredentials(true);
                      setTimeout(() => setCopiedAdminCredentials(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs text-neutral-700 hover:text-black flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    {copiedAdminCredentials ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAdminCredentials ? 'Copied to Clipboard!' : 'Copy Credentials'}</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setShowAddAdminModal(false);
                      setCreatedAdminResult(null);
                      setAdminName('');
                      setAdminPhone('');
                      setAdminPassword('');
                    }}
                    className="bg-[#0A0A0A] text-white"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateAdminSubmit} className="space-y-4">
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  Enter the details of the new admin. Their consultations will display their name as the consultant.
                </p>

                {createAdminError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                    {createAdminError}
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                    Administrator Full Name
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. Ar. Jagirdhar / Pooja Sharma"
                    required
                    autoFocus
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                  />
                  <p className="text-[11px] text-neutral-400 font-sans">
                    This name will be saved and displayed as the Consultant for consultations created by this admin.
                  </p>
                </div>

                {/* 10-Digit Mobile */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center rounded-[12px] border border-[#E5E5E5] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#0A0A0A] focus-within:border-[#0A0A0A]">
                    <div className="px-3 py-2.5 bg-neutral-50 border-r border-[#E5E5E5] text-xs font-mono text-neutral-500 font-semibold select-none">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={adminPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setAdminPhone(val);
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                      className="flex-1 px-3 py-2.5 text-xs font-mono text-[#0A0A0A] focus:outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">Used to sign in as Administrator</p>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                      title={showAdminPassword ? 'Hide password' : 'Show password'}
                    >
                      {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">Minimum 8 characters</p>
                </div>

                {/* Expandable Manual Supabase instructions */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowManualAdminHelp(!showManualAdminHelp)}
                    className="text-[11px] text-neutral-500 hover:text-[#0A0A0A] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showManualAdminHelp ? 'Hide' : 'Need manual instructions for Supabase Dashboard?'}</span>
                  </button>

                  {showManualAdminHelp && (
                    <div className="mt-2.5 p-3 rounded-[12px] bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 font-sans space-y-1.5 text-left">
                      <p className="font-semibold text-neutral-900">Alternative: Create admin directly in Supabase Dashboard:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Go to <strong>Authentication &gt; Users &gt; Add user &gt; Create user</strong>.</li>
                        <li>Email: <code className="bg-neutral-200 px-1 py-0.5 rounded text-[10px]">&lt;10digits&gt;@svvayam.internal</code>, set password, check <em>Auto Confirm User</em>.</li>
                        <li>Copy the generated User UUID.</li>
                        <li>In <strong>SQL Editor</strong>, run:
                          <pre className="mt-1 p-2 bg-neutral-900 text-neutral-100 rounded text-[10px] overflow-x-auto font-mono whitespace-pre">
{`insert into public.profiles (id, phone, role, is_active, name)
values ('<USER-UUID>', '+91<10-DIGITS>', 'admin', true, '<FULL-NAME>')
on conflict (id) do update set role = 'admin', name = excluded.name;`}
                          </pre>
                        </li>
                      </ol>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddAdminModal(false)}
                    disabled={isCreatingAdmin}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isCreatingAdmin || adminPassword.trim().length < 8 || adminPhone.length < 10 || !adminName.trim()}
                    className="bg-[#0A0A0A] text-white hover:bg-neutral-800"
                  >
                    {isCreatingAdmin ? 'Creating...' : 'Create Administrator'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminClientsPage;
