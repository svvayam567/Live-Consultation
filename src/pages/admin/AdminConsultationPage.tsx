import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useConsultation } from '../../context/ConsultationContext';
import { getRegisteredCustomers } from '../../context/AuthContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Toast } from '../../components/ui/Toast';
import { StepIndicator } from '../../components/consultation/StepIndicator';
import { Step1Purpose } from '../../components/consultation/Step1Purpose';
import { Step2Worship } from '../../components/consultation/Step2Worship';
import { Step3Space } from '../../components/consultation/Step3Space';
import { Step4Alignment } from '../../components/consultation/Step4Alignment';
import { Step5Examples } from '../../components/consultation/Step5Examples';
import { Step6Scope } from '../../components/consultation/Step6Scope';
import { Step7Journey } from '../../components/consultation/Step7Journey';
import { Step8Proposal } from '../../components/consultation/Step8Proposal';
import { Button } from '../../components/ui/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { formatProjectName } from '../../lib/utils';
import type { ConsultationState, CustomerRecord } from '../../types/consultation';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  UserPlus,
  Sparkles,
  Users,
  Building2,
  Phone,
  MapPin,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2
} from 'lucide-react';

interface ConsultationClientItem {
  id: string;
  name: string;
  project_name: string;
  phone: string;
  location: string;
  status: 'draft' | 'proposal_sent' | 'completed';
  current_step?: number;
  state?: any;
}

const SEED_CLIENTS: ConsultationClientItem[] = [
  {
    id: 'seed-001',
    name: 'Mala Sharma',
    project_name: "Mrs. Sharma's Temple",
    phone: '+91 9845012345',
    location: 'Bengaluru, Indiranagar',
    status: 'draft',
    current_step: 4
  },
  {
    id: 'seed-002',
    name: 'Dr. Sanjay',
    project_name: "Dr. Sanjay's Sanctum",
    phone: '+91 9845099887',
    location: 'Hyderabad, Jubilee Hills',
    status: 'proposal_sent',
    current_step: 7
  },
  {
    id: 'seed-003',
    name: 'Rajesh K.',
    project_name: "Mr. K.'s Temple",
    phone: '+91 9988776655',
    location: 'Chennai, Mylapore',
    status: 'completed',
    current_step: 8
  }
];

export const AdminConsultationPage: React.FC = () => {
  const {
    state,
    currentSlide,
    nextSlide,
    prevSlide,
    totalSelectedCount,
    setSlide,
    importSession,
    updateField,
    resetConsultation
  } = useConsultation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [availableClients, setAvailableClients] = useState<ConsultationClientItem[]>(SEED_CLIENTS);
  const [clientSearch, setClientSearch] = useState('');
  const [loadingClients, setLoadingClients] = useState(false);
  const [isPickingClient, setIsPickingClient] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(location.state?.notice || null);

  // One-time Customer Credentials confirmation state from registration
  const [credentialsModal, setCredentialsModal] = useState<{
    phone: string;
    password: string;
    clientName: string;
    projectName: string;
  } | null>(location.state?.newCredentials || null);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // Read URL parameters
  const clientParam = searchParams.get('client');
  const idParam = searchParams.get('id');
  const stepParam = searchParams.get('step');

  // Track previous slide to scroll to top ONLY when user moves to a DIFFERENT step
  const prevSlideRef = useRef<number | null>(null);

  useEffect(() => {
    // Only scroll to top if moving to a different step, and NOT on initial mount
    if (prevSlideRef.current !== null && prevSlideRef.current !== currentSlide) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Support ?step=1..8 query parameter without re-triggering on every render
  useEffect(() => {
    if (stepParam) {
      const s = parseInt(stepParam, 10);
      if (!isNaN(s) && s >= 1 && s <= 8) {
        const targetSlide = s - 1;
        if (currentSlide !== targetSlide) {
          setSlide(targetSlide);
        }
      }
    }
  }, [stepParam, currentSlide, setSlide]);

  // Load client directory for selector
  const loadClientDirectory = async () => {
    setLoadingClients(true);
    try {
      const clientList: ConsultationClientItem[] = [];

      // 1. Fetch from Supabase consultations
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('consultations')
          .select('id, client_name, project_name, client_phone, fields, current_step, status, state')
          .order('updated_at', { ascending: false });

        if (!error && data) {
          data.forEach((row: any) => {
            const f = row.fields || {};
            const proj = row.project_name || f.projectName || f.project_name || (f.surname ? formatProjectName(f.title, f.surname, f.product) : `${row.client_name || 'Client'}'s Sanctum`);
            clientList.push({
              id: row.id,
              name: row.client_name || f.client || 'Client',
              project_name: proj,
              phone: row.client_phone || f.phone || '',
              location: f.location || 'India',
              status: row.status || 'draft',
              current_step: row.current_step || 1,
              state: row.state
            });
          });
        }
      }

      // 2. Add registered customers from local storage
      const localCustomers: CustomerRecord[] = getRegisteredCustomers();
      localCustomers.forEach(c => {
        if (!clientList.some(item => item.phone === c.phone || item.id === c.id)) {
          clientList.push({
            id: c.id,
            name: c.name,
            project_name: c.project_name || formatProjectName(c.title, c.surname, c.product),
            phone: c.phone,
            location: c.location || 'India',
            status: 'draft',
            current_step: 1
          });
        }
      });

      // 3. Fallback to seed clients if list is empty
      SEED_CLIENTS.forEach(seed => {
        if (!clientList.some(item => item.id === seed.id || item.phone === seed.phone)) {
          clientList.push(seed);
        }
      });

      setAvailableClients(clientList);
    } catch (err) {
      console.warn('Error loading client directory:', err);
      setAvailableClients(SEED_CLIENTS);
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    loadClientDirectory();
  }, []);

  // If ?id= query param is set, load that consultation once
  const loadedIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (idParam && loadedIdRef.current !== idParam) {
      try {
        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const list = JSON.parse(stored);
          const found = list.find((c: any) => c.id === idParam);
          if (found?.state) {
            loadedIdRef.current = idParam;
            importSession(found.state);
            if (found.current_step && !stepParam) {
              setSlide(Math.max(0, Math.min(7, found.current_step - 1)));
            }
            setIsPickingClient(false);
            return;
          }
        }
      } catch {}
    }
  }, [idParam, stepParam, importSession, setSlide]);

  // If ?client= query param is set, load that client's consultation once
  const loadedClientRef = useRef<string | null>(null);
  useEffect(() => {
    if (clientParam && loadedClientRef.current !== clientParam && availableClients.length > 0) {
      const matched = availableClients.find(c => c.id === clientParam);
      if (matched) {
        loadedClientRef.current = clientParam;
        if (matched.state) {
          importSession(matched.state as ConsultationState);
        } else {
          // Initialize fields with client data if state is empty
          if (state.fields.client !== matched.name) {
            updateField('client', matched.name);
            updateField('projectName', matched.project_name);
            updateField('location', matched.location);
          }
        }
        setIsPickingClient(false);
      }
    }
  }, [clientParam, availableClients, importSession, updateField, state.fields.client]);

  // When clicking Consultation tab with no parameters, auto-resume the most recent draft once
  const autoResumedRef = useRef(false);
  useEffect(() => {
    if (!clientParam && !idParam && !autoResumedRef.current && !state.fields.client && !state.project_name) {
      try {
        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.state) {
            autoResumedRef.current = true;
            importSession(parsed[0].state);
            const resumeStep = parsed[0].current_step || 1;
            setSlide(Math.max(0, Math.min(7, resumeStep - 1)));
            setIsPickingClient(false);
          }
        }
      } catch {}
    }
  }, [clientParam, idParam, state.fields.client, state.project_name, importSession, setSlide]);

  // Determine if active consultation is ready
  const hasActiveClient = Boolean(
    (state.fields.client && state.fields.client.trim().length > 0) ||
    (state.project_name && state.project_name.trim().length > 0) ||
    clientParam ||
    idParam
  );

  const showPicker = isPickingClient || (!hasActiveClient && !clientParam && !idParam);

  // Filter clients in picker
  const filteredClients = useMemo(() => {
    if (!clientSearch.trim()) return availableClients;
    const q = clientSearch.toLowerCase();
    return availableClients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.project_name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  }, [availableClients, clientSearch]);

  const handleSelectClient = (clientItem: ConsultationClientItem) => {
    if (clientItem.state) {
      importSession(clientItem.state as ConsultationState);
    } else {
      resetConsultation();
      updateField('client', clientItem.name);
      updateField('projectName', clientItem.project_name);
      updateField('location', clientItem.location);
    }
    setSearchParams({ client: clientItem.id });
    setIsPickingClient(false);
  };

  const handleStartWalkIn = () => {
    resetConsultation();
    updateField('client', 'Walk-in Client');
    updateField('projectName', "Sanctum Architecture");
    updateField('location', 'Studio');
    setSearchParams({});
    setIsPickingClient(false);
  };

  // Step 4 (Slide index 4 = Examples) requires exactly 1 selected reference
  const isNextDisabled =
    currentSlide === 7 ||
    (currentSlide === 4 && totalSelectedCount !== 1);

  const renderCurrentStep = () => {
    switch (currentSlide) {
      case 0:
        return <Step1Purpose />;
      case 1:
        return <Step2Worship />;
      case 2:
        return <Step3Space />;
      case 3:
        return <Step4Alignment />;
      case 4:
        return <Step5Examples />;
      case 5:
        return <Step6Scope />;
      case 6:
        return <Step7Journey />;
      case 7:
        return <Step8Proposal />;
      default:
        return <Step1Purpose />;
    }
  };

  const activeProjectTitle =
    state.fields.projectName ||
    state.project_name ||
    (state.fields.client ? `${state.fields.client}'s Sanctum` : 'Active Consultation');

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      {/* Persistent Admin Navigation (Desktop Top Bar / Mobile Bottom Bar) */}
      <AdminNav activeSection="consultation" />

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* One-time Customer Credentials Confirmation Modal (Shown once after registration) */}
      {credentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[22px] border border-neutral-200 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5 text-[#0A0A0A]">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Customer Login Created</span>
              </div>
              <h3 className="text-base sm:text-lg font-display font-semibold text-[#0A0A0A] pt-1">
                Share Login Credentials with Customer
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                The customer can now log into their Sanctum Portal using their mobile number and this password.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-[14px] border border-neutral-200 p-4 space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-sans">Customer & Project</span>
                <span className="font-semibold text-neutral-900 font-sans text-xs">
                  {credentialsModal.clientName} · {credentialsModal.projectName}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200/80 pt-2.5">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-sans">Mobile Number</span>
                  <span className="font-semibold text-neutral-900 text-xs">{credentialsModal.phone}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200/80 pt-2.5">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-sans">Password</span>
                  <span className="font-semibold text-neutral-900 text-xs">
                    {showModalPassword ? credentialsModal.password : '••••••••'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModalPassword(!showModalPassword)}
                  className="text-xs font-sans text-neutral-600 hover:text-black underline cursor-pointer"
                >
                  {showModalPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="p-3 bg-neutral-100/80 rounded-[12px] border border-neutral-200/60 text-[11px] text-neutral-600 font-sans leading-relaxed">
              <strong>Notice:</strong> This password is shown once only and is not stored in plain text anywhere in the database or in Google Sheets. Please share it with the customer now.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  const textToCopy = `Svvayam Sanctum Portal Login\nMobile: ${credentialsModal.phone}\nPassword: ${credentialsModal.password}\nPortal Link: ${window.location.origin}/client`;
                  navigator.clipboard.writeText(textToCopy);
                  setCopiedCredentials(true);
                  setTimeout(() => setCopiedCredentials(false), 2500);
                }}
                className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                {copiedCredentials ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCredentials ? 'Copied to Clipboard!' : 'Copy Credentials'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCredentialsModal(null)}
                className="px-5 py-2 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                Done & Begin Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 1: Choose Client to Start Consultation */}
      {showPicker ? (
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-8 flex-1">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECECEC]">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#737373] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#0E2A1C]" />
                <span>Consultation Studio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#0A0A0A]">
                Choose a Client to Begin
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5C5C] font-sans mt-1">
                Select a registered customer to launch their tailored 8-stage sacred consultation journey.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {hasActiveClient && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsPickingClient(false)}
                  className="text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Resume Current</span>
                </Button>
              )}
              <Link to="/admin/register">
                <Button variant="primary" size="sm" className="text-xs">
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  <span>Register Customer</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Search bar & quick actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Search by client name, project name, phone, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-white border border-[#ECECEC] text-xs font-sans text-[#0A0A0A] placeholder-neutral-400 focus:outline-none focus:border-[#0A0A0A] shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadClientDirectory}
                disabled={loadingClients}
                className="px-3 py-2 rounded-[12px] bg-white border border-[#ECECEC] text-xs font-sans text-[#5C5C5C] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Refresh client list"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingClients ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleStartWalkIn}
                className="px-3 py-2 rounded-[12px] bg-neutral-100 hover:bg-neutral-200 border border-[#E5E5E5] text-xs font-sans text-[#0A0A0A] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                title="Start consultation without prior client registration"
              >
                <span>Walk-in Session</span>
              </button>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#737373] uppercase tracking-wider flex items-center justify-between">
              <span>Registered Clients ({filteredClients.length})</span>
              <span>Select to Launch</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white rounded-[16px] border border-[#ECECEC] p-5 shadow-xs hover:shadow-md hover:border-[#0A0A0A] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-display font-semibold text-base text-[#0A0A0A] group-hover:text-[#0E2A1C] transition-colors">
                          {client.project_name}
                        </h2>
                        <div className="flex items-center space-x-1.5 text-xs text-[#5C5C5C] font-sans mt-0.5">
                          <Users className="w-3 h-3 text-neutral-400" />
                          <span className="font-medium text-[#0A0A0A]">{client.name}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                          client.status === 'completed'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : client.status === 'proposal_sent'
                            ? 'bg-neutral-100 text-neutral-800 border-neutral-300'
                            : 'bg-neutral-100 text-[#5C5C5C] border-neutral-200'
                        }`}
                      >
                        {client.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#737373] font-sans pt-2 border-t border-neutral-100">
                      <div className="flex items-center space-x-1.5 truncate">
                        <Phone className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="font-mono text-[11px] truncate">{client.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="truncate">{client.location || 'India'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-neutral-100">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {client.current_step ? `Step 0${client.current_step}` : 'Not started'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSelectClient(client)}
                      className="px-3.5 py-1.5 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-all text-xs font-sans font-medium flex items-center gap-1.5 shadow-xs cursor-pointer group/btn"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>Start Consultation</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredClients.length === 0 && (
                <div className="col-span-full bg-white rounded-[16px] border border-dashed border-[#ECECEC] p-10 text-center space-y-3">
                  <Building2 className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p className="text-sm font-sans text-[#737373]">
                    No clients matched &quot;{clientSearch}&quot;.
                  </p>
                  <Link to="/admin/register">
                    <Button variant="primary" size="sm" className="text-xs">
                      <UserPlus className="w-3.5 h-3.5 mr-1" />
                      <span>Register New Customer</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        /* Screen 2: Active 8-Stage Consultation Flow */
        <>
          {/* Active Client Context Banner */}
          <div className="bg-white/95 border-b border-[#ECECEC] px-4 sm:px-8 py-2.5 backdrop-blur-md">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#0A0A0A] shrink-0" />
                <span className="font-semibold text-[#0A0A0A] font-display text-sm tracking-tight truncate">
                  {activeProjectTitle}
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-[#5C5C5C] truncate">
                  {state.fields.client || 'Client'}
                </span>
                {state.fields.location && (
                  <>
                    <span className="text-neutral-300 hidden md:inline">·</span>
                    <span className="text-[#737373] hidden md:inline truncate">
                      {state.fields.location}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPickingClient(true)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium text-[#5C5C5C] hover:text-[#0A0A0A] hover:bg-neutral-100 border border-[#ECECEC] transition-colors cursor-pointer"
                  title="Switch or select another client for consultation"
                >
                  Switch Client
                </button>
                <Link
                  to="/admin/clients"
                  className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium text-[#737373] hover:text-[#0A0A0A] hover:bg-neutral-100 transition-colors flex items-center gap-1"
                  title="View all clients in Client Explorer"
                >
                  <span>Clients</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* 8-Step Progress Indicator & Top Action Bar */}
          <StepIndicator />

          {/* Main Slide Container with Generous Whitespace & Soft Layered Card */}
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 pb-36 sm:pb-28">
            <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-6 sm:p-10 transition-all duration-300">
              {renderCurrentStep()}
            </div>
          </main>

          {/* Minimal Sticky Bottom Navigation Footer */}
          <footer className="no-print sticky bottom-14 sm:bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#ECECEC] shadow-xs">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
              <Button
                variant="secondary"
                size="md"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Back</span>
              </Button>

              <div className="text-xs text-[#5C5C5C] font-mono">
                {`Step 0${currentSlide + 1} of 08`}
              </div>

              <div className="flex items-center gap-3">
                {currentSlide === 4 && totalSelectedCount !== 1 && (
                  <span className="text-[11px] text-[#737373] hidden sm:inline font-sans">
                    Select one reference to continue
                  </span>
                )}
                <Button
                  variant="primary"
                  size="md"
                  onClick={nextSlide}
                  disabled={isNextDisabled}
                  title={currentSlide === 4 && totalSelectedCount !== 1 ? 'Select one reference to continue' : undefined}
                  className="text-xs"
                >
                  <span>
                    {currentSlide === 6
                      ? 'Review proposal'
                      : currentSlide === 7
                      ? 'Proposal finalized'
                      : 'Next'}
                  </span>
                  {currentSlide < 6 && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
                </Button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default AdminConsultationPage;
