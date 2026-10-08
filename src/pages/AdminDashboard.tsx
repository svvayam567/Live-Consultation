import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth, getRegisteredCustomers, saveRegisteredCustomers } from '../context/AuthContext';
import { useConsultation } from '../context/ConsultationContext';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { PortalChat } from '../components/portal/PortalChat';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { money, indicativeAmount, normalizeToE164, extractSurname, formatProjectName, assetUrl, cn } from '../lib/utils';
import {
  ShieldCheck,
  Search,
  RefreshCw,
  FileSpreadsheet,
  Grid,
  Layers,
  ArrowLeft,
  ExternalLink,
  Eye,
  UserPlus,
  Users,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  Lock,
  Unlock,
  Shield
} from 'lucide-react';
import { JOURNEY_STAGES } from '../lib/constants';
import type { ConsultationState, SelectedReference, CustomerRecord, CustomerTitle, CustomerProduct } from '../types/consultation';

interface ConsultationRecord {
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
  updated_at: string;
  estimate?: string;
  selected_reference?: SelectedReference | null;
  portal_visible?: boolean;
  internal_notes?: string;
  client_id?: string;
  state?: Partial<ConsultationState>;
}

// Initial seed consultation records for admin view
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
    consultant_phone: '+91 9182424228',
    status: 'proposal_sent',
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    estimate: '15 lakh',
    portal_visible: true,
    internal_notes: 'Client prefers 18-inch Lord Venkateshwara brass clearance and Burma teakwood fluting.',
    selected_reference: {
      data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
      caption: 'Dedicated pooja room · Rich detail',
      kind: 'Selected reference',
      source: 'grid'
    },
    state: {
      project_name: "Mrs. Sharma's Temple",
      fields: {
        client: 'Mala Sharma',
        title: 'Mrs.',
        surname: 'Sharma',
        product: 'Temple',
        projectName: "Mrs. Sharma's Temple",
        location: 'Bengaluru, Indiranagar',
        date: '2026-10-06',
        deity: 'Lord Venkateshwara, Radha Krishna',
        rituals: 'Daily morning aarti and weekly abhishekam',
        dimensions: '6 ft W × 4 ft D × 9 ft H',
        scope: 'Dedicated Sanctum with Shikhara and teakwood jali doors',
        estimate: '15 lakh',
        timeline: '3–4 months'
      },
      selected_reference: {
        data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
        caption: 'Dedicated pooja room · Rich detail',
        kind: 'Selected reference',
        source: 'grid'
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
    consultant: 'Team Svvayam',
    consultant_phone: '+91 9182424228',
    status: 'completed',
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    estimate: '45 lakh',
    portal_visible: false,
    internal_notes: 'Pink sandstone carving underway in Rajasthan guild workshop.',
    selected_reference: {
      data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
      caption: 'Grand temple / pavilion · Maximal',
      kind: 'Selected reference',
      source: 'grid'
    },
    state: {
      project_name: "Dr. Reddy's Sanctum",
      fields: {
        client: 'Dr. Sanjay Reddy',
        title: 'Dr.',
        surname: 'Reddy',
        product: 'Sanctum',
        projectName: "Dr. Reddy's Sanctum",
        location: 'Hyderabad, Jubilee Hills',
        date: '2026-10-04',
        deity: 'Shivling and Parvati Devi',
        rituals: 'Extensive temple abhishek rituals with brass jaladhari',
        dimensions: '10 ft W × 8 ft D × 12 ft H',
        scope: 'Grand Stone Mandapam in Bansi Paharpur Pink Sandstone',
        estimate: '45 lakh',
        timeline: '5–6 months'
      },
      selected_reference: {
        data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
        caption: 'Grand temple / pavilion · Maximal',
        kind: 'Selected reference',
        source: 'grid'
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
    client_phone: '+91 9444055667',
    location: 'Chennai, Adyar',
    consultant: 'Svvayam Consultant',
    consultant_phone: '+91 8074257384',
    status: 'draft',
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    estimate: '18 lakh',
    portal_visible: false,
    internal_notes: 'Site survey pending ceiling height verification.',
    selected_reference: {
      data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
      caption: 'Medium room niche · Restrained detail',
      kind: 'Selected reference',
      source: 'grid'
    },
    state: {
      project_name: "Mr. Balakumaran's Temple",
      fields: {
        client: 'Yuva Balakumaran',
        title: 'Mr.',
        surname: 'Balakumaran',
        product: 'Temple',
        projectName: "Mr. Balakumaran's Temple",
        location: 'Chennai, Adyar',
        date: '2026-10-02',
        deity: 'Lord Murugan and Valli Deivanai',
        rituals: 'Sashti special puja and daily deepam',
        dimensions: '5 ft W × 3 ft D × 8 ft H',
        scope: 'Medium Teak Sanctum with carved peacocks and brass pillars',
        estimate: '18 lakh',
        timeline: '2–3 months'
      },
      selected_reference: {
        data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
        caption: 'Medium room niche · Restrained detail',
        kind: 'Selected reference',
        source: 'grid'
      }
    }
  }
];


export const AdminDashboard: React.FC = () => {
  const { user, profile, isAdmin, isLoading: authLoading } = useAuth();
  const { triggerSheetsSync, importSession } = useConsultation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'consultations' | 'customers' | 'messages'>(() => {
    if (typeof window !== 'undefined') {
      const t = new URLSearchParams(window.location.search).get('tab');
      if (t && ['consultations', 'customers', 'messages'].includes(t)) {
        return t as any;
      }
    }
    return 'consultations';
  });
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'proposal_sent' | 'completed'>('all');
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Customer registration state
  const [registerModalOpen, setRegisterModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('modal') === 'register';
    }
    return false;
  });
  const [regTitle, setRegTitle] = useState<CustomerTitle>('Mr.');
  const [regName, setRegName] = useState('');
  const [regSurname, setRegSurname] = useState('');
  const [regProduct, setRegProduct] = useState<CustomerProduct>('Temple');
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [regPhone, setRegPhone] = useState('+91');
  const [regLocation, setRegLocation] = useState('');
  const [regConsultationOption, setRegConsultationOption] = useState<'create_new' | 'link_existing'>('create_new');
  const [regLinkedConsultationId, setRegLinkedConsultationId] = useState('');
  const [regSubmitting, setRegSubmitting] = useState(false);

  const regProjectName = useMemo(() => {
    return formatProjectName(regTitle, regSurname || extractSurname(regName), regProduct);
  }, [regTitle, regSurname, regName, regProduct]);

  const handleRegNameChange = (val: string) => {
    setRegName(val);
    if (!surnameTouched) {
      setRegSurname(extractSurname(val));
    }
  };

  const handleRegSurnameChange = (val: string) => {
    setSurnameTouched(true);
    setRegSurname(val);
  };


  // Messages inbox state
  const [selectedThreadConsultationId, setSelectedThreadConsultationId] = useState<string | null>(null);

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

  // Load consultations from Supabase or resilient local state
  const loadConsultations = async () => {
    setLoadingConsultations(true);
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
              || formatProjectName(row.fields?.title || row.title, row.fields?.surname || row.surname || extractSurname(clientName), row.fields?.product || row.product || 'Temple');

            return {
              id: row.id,
              client_name: clientName,
              project_name: projName,
              title: row.title || row.fields?.title,
              surname: row.surname || row.fields?.surname,
              product: row.product || row.fields?.product,
              client_phone: row.client_phone || row.fields?.phone || 'Not recorded',
              location: row.fields?.location || 'Pending',
              consultant: row.profiles?.name || 'Svvayam Team',
              consultant_phone: row.profiles?.phone,
              status: row.status || 'draft',
              updated_at: row.updated_at,
              estimate: row.fields?.estimate,
              selected_reference: rawRef,
              portal_visible: Boolean(row.portal_visible),
              internal_notes: row.internal_notes || '',
              client_id: row.client_id,
              state: {
                id: row.id,
                project_name: projName,
                fields: {
                  ...row.fields,
                  projectName: projName
                },
                selected_reference: rawRef,
                selected: row.selected_refs || [],
                status: row.status,
                slide: row.current_step || 0
              }
            };
          });
          setConsultations(mapped);
          setLoadingConsultations(false);
          return;
        }
      } catch (err) {
        console.warn('Consultations query notice:', err);
      }
    }

    // Dev/Offline Mode fallback with seed data merged with any local drafts
    try {
      const stored = localStorage.getItem('svvayam_admin_consultations_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConsultations(parsed);
          setLoadingConsultations(false);
          return;
        }
      }
    } catch {
      // Ignored
    }

    setConsultations(SEED_CONSULTATIONS);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(SEED_CONSULTATIONS));
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

    // Update local state immediately
    const updated = consultations.map(c =>
      c.id === consultation.id ? { ...c, portal_visible: newStatus } : c
    );
    setConsultations(updated);
    localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(updated));

    if (selectedRecord && selectedRecord.id === consultation.id) {
      setSelectedRecord({ ...selectedRecord, portal_visible: newStatus });
    }

    // Update in Supabase if configured
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
      `Consultation for ${consultation.client_name} is now ${newStatus ? 'visible' : 'hidden'} in the Customer Portal.`
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
  };

  // Update 8-stage journey status for selected client
  const handleUpdateStageStatus = async (stageIdx: number, newStatus: 'not_started' | 'in_progress' | 'completed') => {
    setJourneyStages(prev => prev.map(s => s.stage === stageIdx ? { ...s, status: newStatus } : s));
    setToastMsg(`Stage ${stageIdx + 1} updated to ${newStatus.replace('_', ' ')}`);

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

  // Handle Register Customer submission
  const handleRegisterCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      setToastMsg('Please enter customer name and mobile number.');
      return;
    }

    setRegSubmitting(true);

    const formattedPhone = normalizeToE164(regPhone);

    const surnameFinal = regSurname.trim() || extractSurname(regName.trim());
    const finalProjectName = formatProjectName(regTitle, surnameFinal, regProduct);

    // Call Supabase Edge Function if live
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.functions.invoke('register-customer', {
          body: {
            action: 'register',
            name: regName.trim(),
            title: regTitle,
            surname: surnameFinal,
            product: regProduct,
            project_name: finalProjectName,
            phone: formattedPhone,
            location: regLocation.trim(),
            create_new_consultation: regConsultationOption === 'create_new',
            consultation_id: regConsultationOption === 'link_existing' ? regLinkedConsultationId : undefined
          }
        });

        if (error) throw error;
        setToastMsg(`Customer ${regName} registered with project "${finalProjectName}"!`);
        setRegisterModalOpen(false);
        loadConsultations();
        loadCustomers();
        setRegSubmitting(false);
        return;
      } catch (err: any) {
        console.warn('Edge function notice, applying resilient local registration:', err);
      }
    }

    // Resilient local registration in dev mode
    const newCustId = 'cust-' + Date.now().toString().slice(-4);
    let linkedId = regLinkedConsultationId;

    if (regConsultationOption === 'create_new' || !linkedId) {
      linkedId = 'draft-' + Date.now().toString().slice(-4);
      const newConsult: ConsultationRecord = {
        id: linkedId,
        client_name: regName.trim(),
        project_name: finalProjectName,
        title: regTitle,
        surname: surnameFinal,
        product: regProduct,
        client_phone: formattedPhone,
        location: regLocation.trim() || 'Pending location',
        consultant: profile?.name || 'Svvayam Admin',
        status: 'draft',
        updated_at: new Date().toISOString(),
        portal_visible: false,
        internal_notes: 'Created via admin customer registration.',
        state: {
          project_name: finalProjectName,
          fields: {
            client: regName.trim(),
            title: regTitle,
            surname: surnameFinal,
            product: regProduct,
            projectName: finalProjectName,
            location: regLocation.trim(),
            date: new Date().toLocaleDateString('en-CA')
          }
        }
      };
      const updatedConsultations = [newConsult, ...consultations];
      setConsultations(updatedConsultations);
      localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify(updatedConsultations));
    }

    const newCustomer: CustomerRecord = {
      id: newCustId,
      name: regName.trim(),
      title: regTitle,
      surname: surnameFinal,
      product: regProduct,
      project_name: finalProjectName,
      phone: formattedPhone,
      location: regLocation.trim(),
      consultation_id: linkedId,
      is_active: true,
      created_at: new Date().toISOString()
    };

    const currentCustomers = getRegisteredCustomers();
    const updatedCustList = [newCustomer, ...currentCustomers.filter(c => c.phone !== formattedPhone)];
    saveRegisteredCustomers(updatedCustList);
    setCustomers(updatedCustList);

    setToastMsg(`Customer ${regName.trim()} registered with project "${finalProjectName}".`);
    setRegSubmitting(false);
    setRegisterModalOpen(false);
    setRegName('');
    setRegSurname('');
    setSurnameTouched(false);
    setRegPhone('+91');
    setRegLocation('');
  };

  // Toggle Customer Active / Deactivated status
  const handleToggleCustomerActive = async (cust: CustomerRecord) => {
    const newStatus = !cust.is_active;

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.functions.invoke('register-customer', {
          body: {
            action: 'deactivate',
            customer_id: cust.id,
            is_active: newStatus
          }
        });
      } catch (err) {
        console.warn('Deactivate edge function error:', err);
      }
    }

    const currentCustomers = getRegisteredCustomers();
    const updated = currentCustomers.map(c =>
      c.id === cust.id ? { ...c, is_active: newStatus } : c
    );
    saveRegisteredCustomers(updated);
    setCustomers(updated);
    setToastMsg(`Customer ${cust.name} access ${newStatus ? 'reactivated' : 'deactivated'}.`);
  };

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
        item.consultant.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [consultations, statusFilter, searchQuery]);


  const handleOpenConsultation = (record: ConsultationRecord) => {
    if (record.state) {
      importSession(record.state as ConsultationState);
      navigate('/consult');
    }
  };

  const handleViewProposal = (record: ConsultationRecord) => {
    navigate(`/proposal/${record.id}`);
  };

  const handleSyncSingleSheet = async (record: ConsultationRecord) => {
    setSyncingId(record.id);
    const result = await triggerSheetsSync();
    setSyncingId(null);
    if (result.success) {
      setToastMsg(`Synced ${record.client_name} consultation row to Master Google Sheet!`);
    } else {
      setToastMsg(`Sync simulation logged: ${result.message || 'Credentials pending.'}`);
    }
  };

  // Non-admins who open its URL are immediately redirected to client view
  if (!authLoading && !isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#0A0A0A]" />
              <h1 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Clients and Consultations
              </h1>
            </div>
            <p className="text-xs text-neutral-500 font-sans">
              Admin console: Manage consultations, customer portal access, real-time client inquiries, and Google Sheets sync.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setRegisterModalOpen(true)}
              className="text-xs flex items-center gap-1.5 rounded-full"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Customer</span>
            </Button>

            <Link to="/consult">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Live Consultation</span>
              </Button>
            </Link>

            <Link to="/client-explorer">
              <Button variant="outline" size="sm" className="text-xs">
                <Grid className="w-3.5 h-3.5 mr-1" />
                <span>Client Explorer</span>
              </Button>
            </Link>

            <Link to="/showcase">
              <Button variant="outline" size="sm" className="text-xs">
                <Layers className="w-3.5 h-3.5 mr-1" />
                <span>Showcase & Docs</span>
              </Button>
            </Link>

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
            </Button>
          </div>
        </div>

        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

        {/* Tab Controls: Consultations | Customer Accounts | Messages Inbox */}
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
            <Users className="w-3.5 h-3.5" />
            <span>Customer Accounts</span>
            <span className="font-mono text-[10px] bg-neutral-200 text-[#0A0A0A] px-1.5 py-0.2 rounded-full">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={cn(
              "px-4 py-2 text-xs font-sans font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-2",
              activeTab === 'messages'
                ? "bg-[#0A0A0A] text-white"
                : "text-neutral-500 hover:text-[#0A0A0A] hover:bg-neutral-50"
            )}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Messages Inbox</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CONSULTATIONS TABLE                               */}
        {/* ======================================================== */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            {/* Search & Status Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name, mobile, location, or consultant..."
                  className="w-full pl-9 pr-4 py-2 rounded-[14px] border border-[#ECECEC] text-xs font-sans text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:bg-[#FAFAFA] focus:ring-2 focus:ring-[#0E2A1C]"
                />
              </div>

              <div className="flex items-center space-x-1 text-xs">
                {(['all', 'draft', 'proposal_sent', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs transition-colors cursor-pointer capitalize ${
                      statusFilter === st
                        ? 'bg-[#0A0A0A] text-white font-medium'
                        : 'text-neutral-500 hover:text-[#0A0A0A] border border-neutral-200'
                    }`}
                  >
                    {st === 'all' ? 'All Records' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="border border-neutral-200 overflow-x-auto rounded-[14px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 font-medium text-neutral-500 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Project & Client</th>
                    <th className="py-3 px-4">Mobile Number</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Consultant</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Selected Reference</th>
                    <th className="py-3 px-4 text-center">Portal Visible</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Updated</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {loadingConsultations ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-neutral-400">
                        Loading consultation records...
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
                      return (
                        <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
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
                            {item.consultant}
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
                              <button
                                onClick={() => setSelectedRecord(item)}
                                className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer"
                                title="Inspect details & internal notes"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleViewProposal(item)}
                                className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer"
                                title="View Proposal"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleOpenConsultation(item)}
                                className="px-2 py-1 bg-[#0A0A0A] text-white hover:bg-neutral-800 text-[11px] cursor-pointer"
                                title="Load and edit in Live Consultation"
                              >
                                Open
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 border border-neutral-200 space-y-3 rounded-[16px]">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#0A0A0A]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">
                    Google Sheets Automation
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  29 columns synced to master Google Sheet upon client confirmation via Supabase Edge Function.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={syncingId !== null}
                  onClick={() => handleSyncSingleSheet(consultations[0])}
                  className="text-xs"
                >
                  <span>{syncingId ? 'Syncing...' : 'Sync All to Sheet'}</span>
                </Button>
              </div>

              <div className="p-5 border border-neutral-200 space-y-3 rounded-[16px]">
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4 text-[#0A0A0A]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">
                    4×4 Reference Grid
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  Configure the 16 reference images once in Supabase Storage. Shared across all team calls.
                </p>
                <Link to="/consult">
                  <Button variant="outline" size="sm" className="text-xs">
                    <span>Setup Matrix (Step 5)</span>
                  </Button>
                </Link>
              </div>

              <div className="p-5 border border-neutral-200 space-y-3 rounded-[16px]">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#0A0A0A]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">
                    8-Stage Journey Proofs
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  Upload factory blueprints, carving proofs and dispatch videos for customer walkthroughs.
                </p>
                <Link to="/consult">
                  <Button variant="outline" size="sm" className="text-xs">
                    <span>Manage Files (Step 7)</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CUSTOMER ACCOUNTS (REGISTRATION & MANAGEMENT)    */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#0A0A0A]">
                  Registered Customer Accounts
                </h2>
                <p className="text-xs text-neutral-500 font-sans">
                  Only customers registered by an admin can sign in to the Customer Portal. No open sign-ups.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setRegisterModalOpen(true)}
                className="text-xs flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Customer</span>
              </Button>
            </div>

            <div className="border border-neutral-200 overflow-x-auto rounded-[14px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 font-medium text-neutral-500 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Project & Customer</th>
                    <th className="py-3 px-4">Registered Phone</th>
                    <th className="py-3 px-4">Project Location</th>
                    <th className="py-3 px-4">Linked Consultation ID</th>
                    <th className="py-3 px-4">Access Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {customers.map((cust) => {
                    const linkedConsult = consultations.find(c => c.id === cust.consultation_id || c.client_phone.includes(cust.phone.slice(-10)));
                    return (
                      <tr key={cust.id} className="hover:bg-neutral-50/50">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#0A0A0A]">
                            {cust.project_name || linkedConsult?.project_name || cust.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 font-sans">
                            {cust.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-600">
                          {cust.phone}
                        </td>
                        <td className="py-3 px-4 text-neutral-600">
                          {cust.location || linkedConsult?.location || 'Bengaluru, India'}
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-600">
                          {cust.consultation_id || linkedConsult?.id || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                            cust.is_active
                              ? "bg-emerald-950/10 border-emerald-800/30 text-[#0E2A1C]"
                              : "bg-red-50 border-red-200 text-red-600"
                          )}>
                            {cust.is_active ? 'Active' : 'Deactivated'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleToggleCustomerActive(cust)}
                            className={cn(
                              "px-2.5 py-1 text-[11px] border rounded transition-colors cursor-pointer",
                              cust.is_active
                                ? "border-red-200 text-red-600 hover:bg-red-50"
                                : "border-emerald-200 text-[#0E2A1C] hover:bg-emerald-50"
                            )}
                          >
                            {cust.is_active ? 'Deactivate Access' : 'Reactivate Access'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MESSAGES INBOX                                    */}
        {/* ======================================================== */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversation Threads List */}
            <div className="border border-[#ECECEC] rounded-[20px] p-4 space-y-3 bg-white">
              <h3 className="text-sm font-semibold text-[#0A0A0A] border-b border-[#ECECEC] pb-3">
                Active Client Inquiries
              </h3>

              <div className="space-y-2">
                {consultations.map((c) => {
                  const isSelected = selectedThreadConsultationId === c.id || (!selectedThreadConsultationId && c.id === consultations[0]?.id);

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedThreadConsultationId(c.id)}
                      className={cn(
                        "p-3 rounded-[14px] border transition-all cursor-pointer text-xs font-sans",
                        isSelected
                          ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs"
                          : "bg-[#FAFAFA] text-[#0A0A0A] border-[#ECECEC] hover:border-neutral-400"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold truncate">{c.project_name || c.client_name}</span>
                        <span className={cn(
                          "text-[10px] font-mono",
                          isSelected ? "text-neutral-400" : "text-neutral-500"
                        )}>
                          {c.location.split(',')[0]}
                        </span>
                      </div>
                      <p className={cn(
                        "text-[11px] truncate mt-1",
                        isSelected ? "text-neutral-300" : "text-neutral-500"
                      )}>
                        {c.client_name} · {c.client_phone}
                      </p>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat Thread Viewer & Admin Reply Console */}
            <div className="md:col-span-2">
              <PortalChat
                consultationId={selectedThreadConsultationId || consultations[0]?.id || 'seed-001'}
                currentUserRole="admin"
                currentUserName={profile?.name || "Svvayam Studio"}
                currentUserId={user?.id || 'admin-user'}
              />
            </div>
          </div>
        )}
      </main>

      {/* Register Customer Modal */}
      <Modal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="Register New Customer Account"
        subtitle="Creates a verified phone login for the Customer Portal. Open sign-ups are disabled."
        maxWidth="md"
      >
        <form onSubmit={handleRegisterCustomer} className="space-y-4 pt-2">
          {/* Title, Surname, Product & Project Name Preview */}
          <div className="p-3 bg-neutral-50 rounded-[14px] border border-[#ECECEC] space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0A0A0A]">Project Naming Format</span>
              <span className="text-[10px] font-mono text-[#0E2A1C] bg-[#0E2A1C]/10 px-2 py-0.5 rounded-full font-medium">
                &lt;Title&gt; &lt;Surname&gt;'s &lt;Product&gt;
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">Title</label>
                <select
                  value={regTitle}
                  onChange={(e) => setRegTitle(e.target.value as CustomerTitle)}
                  className="w-full p-2.5 rounded-[10px] border border-[#ECECEC] text-xs bg-white font-sans focus:outline-none focus:ring-1 focus:ring-[#0E2A1C]"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Surname <span className="text-neutral-400 font-normal">(exact spelling)</span>
                </label>
                <input
                  type="text"
                  value={regSurname}
                  onChange={(e) => handleRegSurnameChange(e.target.value)}
                  placeholder="e.g. Pal"
                  className="w-full p-2.5 rounded-[10px] border border-[#ECECEC] text-xs bg-white font-sans focus:outline-none focus:ring-1 focus:ring-[#0E2A1C]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">Product</label>
                <select
                  value={regProduct}
                  onChange={(e) => setRegProduct(e.target.value as CustomerProduct)}
                  className="w-full p-2.5 rounded-[10px] border border-[#ECECEC] text-xs bg-white font-sans focus:outline-none focus:ring-1 focus:ring-[#0E2A1C]"
                >
                  <option value="Temple">Temple (Default)</option>
                  <option value="Puja Mandir">Puja Mandir</option>
                  <option value="Sanctum">Sanctum</option>
                </select>
              </div>
            </div>

            {/* Live Project Name Preview */}
            <div className="p-2.5 bg-white rounded-[10px] border border-[#ECECEC] flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-sans">Project Name:</span>
              <strong className="text-xs font-serif font-semibold text-[#0A0A0A] tracking-wide">
                "{regProjectName}"
              </strong>
            </div>
          </div>

          <Input
            label="Customer Full Name"
            type="text"
            value={regName}
            onChange={(e) => handleRegNameChange(e.target.value)}
            placeholder="e.g. Mala Sharma"
            required
            autoFocus
          />


          <Input
            label="Mobile Number (with country code)"
            type="tel"
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
            placeholder="+91 9845012345"
            required
            helperText="Customer will use this phone number to sign in via SMS OTP."
          />

          <Input
            label="Project Location"
            type="text"
            value={regLocation}
            onChange={(e) => setRegLocation(e.target.value)}
            placeholder="e.g. Bengaluru, Indiranagar"
          />

          <div className="space-y-2 text-xs font-sans">
            <span className="font-medium text-[#0A0A0A] block">Consultation Association</span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="consultOpt"
                  checked={regConsultationOption === 'create_new'}
                  onChange={() => setRegConsultationOption('create_new')}
                  className="accent-[#0A0A0A]"
                />
                <span>Create new draft consultation for this customer</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="consultOpt"
                  checked={regConsultationOption === 'link_existing'}
                  onChange={() => setRegConsultationOption('link_existing')}
                  className="accent-[#0A0A0A]"
                />
                <span>Link to existing consultation record</span>
              </label>
            </div>

            {regConsultationOption === 'link_existing' && (
              <select
                value={regLinkedConsultationId}
                onChange={(e) => setRegLinkedConsultationId(e.target.value)}
                className="w-full mt-2 p-2.5 rounded-[12px] border border-[#ECECEC] text-xs font-sans bg-white focus:outline-none focus:ring-2 focus:ring-[#0E2A1C]"
              >
                <option value="">Select consultation...</option>
                {consultations.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.client_name} ({c.location}) — ID: {c.id.slice(0, 8)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRegisterModalOpen(false)}
            >
              <span>Cancel</span>
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={regSubmitting}
            >
              <span>{regSubmitting ? 'Registering...' : 'Register Customer'}</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* Consultation Inspection Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={`Consultation Details: ${selectedRecord.project_name || selectedRecord.client_name}`}
          subtitle={`Client: ${selectedRecord.client_name} • Location: ${selectedRecord.location} • Status: ${selectedRecord.status}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs font-sans">
            {/* Top Info & Portal Visibility Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-b border-neutral-200 pb-3">
              <div>
                <span className="font-medium text-neutral-500 block">Project Name</span>
                <span className="font-semibold text-[#0A0A0A] font-serif text-sm">
                  {selectedRecord.project_name || selectedRecord.client_name}
                </span>
              </div>
              <div>
                <span className="font-medium text-neutral-500 block">Client Contact</span>
                <span className="font-mono text-[#0A0A0A]">{selectedRecord.client_phone}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-500 block">Consultant</span>
                <span className="text-[#0A0A0A]">{selectedRecord.consultant}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-500 block">Customer Portal Visibility</span>
                <button
                  type="button"
                  onClick={() => handleTogglePortalVisibility(selectedRecord)}
                  className={cn(
                    "mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all",
                    selectedRecord.portal_visible
                      ? "bg-emerald-950/10 border-emerald-800/30 text-[#0E2A1C]"
                      : "bg-neutral-100 border-neutral-300 text-neutral-500"
                  )}
                >
                  {selectedRecord.portal_visible ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{selectedRecord.portal_visible ? 'Published to Customer' : 'Hidden from Customer'}</span>
                </button>
              </div>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-[#F1F1F1] p-1 rounded-[12px]">
              <button
                type="button"
                onClick={() => setModalTab('details')}
                className={cn(
                  "flex-1 py-1.5 px-3 rounded-[9px] font-medium text-xs transition-all cursor-pointer",
                  modalTab === 'details'
                    ? "bg-white text-[#0A0A0A] shadow-xs"
                    : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                Details & Scope
              </button>

              <button
                type="button"
                onClick={() => setModalTab('journey')}
                className={cn(
                  "flex-1 py-1.5 px-3 rounded-[9px] font-medium text-xs transition-all cursor-pointer",
                  modalTab === 'journey'
                    ? "bg-white text-[#0A0A0A] shadow-xs"
                    : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                8-Stage Journey (Controls)
              </button>

              <button
                type="button"
                onClick={() => setModalTab('chat')}
                className={cn(
                  "flex-1 py-1.5 px-3 rounded-[9px] font-medium text-xs transition-all cursor-pointer",
                  modalTab === 'chat'
                    ? "bg-white text-[#0A0A0A] shadow-xs"
                    : "text-neutral-500 hover:text-[#0A0A0A]"
                )}
              >
                Doubts & Chat Thread
              </button>
            </div>

            {/* TAB 1: DETAILS & SCOPE */}
            {modalTab === 'details' && (
              <div className="space-y-4">
                {/* Internal Admin Notes (Hidden from customer) */}
                <div className="p-3.5 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-[#0A0A0A] font-semibold text-xs">
                      <Shield className="w-3.5 h-3.5 text-[#0E2A1C]" />
                      <span>Internal Notes (Admin & Team Only · Not visible in Customer Portal)</span>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    defaultValue={selectedRecord.internal_notes || ''}
                    onBlur={(e) => handleSaveInternalNotes(selectedRecord.id, e.target.value)}
                    placeholder="Enter private team notes regarding carving progress, factory dispatch or client preferences..."
                    className="w-full p-2.5 rounded-[10px] border border-[#ECECEC] text-xs font-sans bg-white focus:outline-none focus:ring-2 focus:ring-[#0E2A1C]"
                  />
                  <span className="text-[10px] text-neutral-400 block text-right">
                    Auto-saved upon clicking outside this box.
                  </span>
                </div>

                {selectedRecord.state?.fields && (
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-neutral-500 block">Deities & Worship</span>
                      <p className="text-[#0A0A0A] mt-0.5">{selectedRecord.state.fields.deity || 'Not specified'}</p>
                      <p className="text-neutral-500 mt-0.5">{selectedRecord.state.fields.rituals}</p>
                    </div>

                    <div>
                      <span className="font-medium text-neutral-500 block">Available Dimensions & Features</span>
                      <p className="text-[#0A0A0A] mt-0.5">{selectedRecord.state.fields.dimensions || 'Pending confirmation'}</p>
                      <p className="text-neutral-500 mt-0.5">{selectedRecord.state.fields.features}</p>
                    </div>

                    <div>
                      <span className="font-medium text-neutral-500 block">Recommended Scope & Budget</span>
                      <p className="text-[#0A0A0A] mt-0.5">{selectedRecord.state.fields.scope}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="font-mono font-semibold text-[#0A0A0A]">Budget: {selectedRecord.state.fields.estimate}</span>
                      </div>
                    </div>

                    {selectedRecord.selected_reference && (
                      <div>
                        <span className="font-medium text-neutral-500 block mb-1">Selected Reference</span>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-[#ECECEC]">
                          {selectedRecord.selected_reference.data && (
                            <img
                              src={selectedRecord.selected_reference.data}
                              alt={selectedRecord.selected_reference.caption || 'Reference'}
                              className="w-14 h-14 rounded-lg object-cover border border-neutral-200 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#0A0A0A] truncate">
                              {selectedRecord.selected_reference.caption || 'Selected Reference'}
                            </p>
                            <p className="text-[10px] text-neutral-500 capitalize mt-0.5">
                              Source: {selectedRecord.selected_reference.source ? selectedRecord.selected_reference.source.replace('_', ' ') : 'Reference selection'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: 8-STAGE JOURNEY STATUS CONTROLS */}
            {modalTab === 'journey' && (
              <div className="space-y-3">
                <div className="pb-1">
                  <h4 className="text-xs font-semibold text-[#0A0A0A]">
                    Manage 8-Stage Progress for {selectedRecord.client_name}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Update milestone statuses below. Changes reflect instantly in the client’s portal view.
                  </p>
                </div>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {JOURNEY_STAGES.map((stg, idx) => {
                    const currentStageState = journeyStages.find(s => s.stage === idx)?.status || 'not_started';
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-[12px] bg-[#FAFAFA] border border-[#ECECEC] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-neutral-400">
                              Stage {idx + 1}
                            </span>
                            <span className="font-semibold text-xs text-[#0A0A0A]">
                              {stg.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C5C5C]">
                            {stg.description}
                          </p>
                        </div>

                        {/* Status Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateStageStatus(idx, 'not_started')}
                            className={cn(
                              "px-2 py-1 rounded-[8px] text-[10px] font-mono transition-all cursor-pointer border",
                              currentStageState === 'not_started'
                                ? "bg-neutral-800 text-white border-neutral-800"
                                : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-100"
                            )}
                          >
                            Not Started
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateStageStatus(idx, 'in_progress')}
                            className={cn(
                              "px-2 py-1 rounded-[8px] text-[10px] font-mono transition-all cursor-pointer border",
                              currentStageState === 'in_progress'
                                ? "bg-[#0E2A1C] text-white border-[#0E2A1C] shadow-xs"
                                : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-100"
                            )}
                          >
                            In Progress
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateStageStatus(idx, 'completed')}
                            className={cn(
                              "px-2 py-1 rounded-[8px] text-[10px] font-mono transition-all cursor-pointer border",
                              currentStageState === 'completed'
                                ? "bg-emerald-950/20 text-[#0E2A1C] border-emerald-800/40 font-bold"
                                : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-100"
                            )}
                          >
                            Completed
                          </button>
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
                  currentUserRole="admin"
                  currentUserName={profile?.name || "Svvayam Studio"}
                  currentUserId={user?.id || 'admin-user'}
                />
              </div>
            )}

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewProposal(selectedRecord)}
                className="text-xs"
              >
                <span>Open Full Proposal</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenConsultation(selectedRecord)}
                className="text-xs"
              >
                <span>Edit Consultation</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
