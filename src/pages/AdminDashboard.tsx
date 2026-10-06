import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConsultation } from '../context/ConsultationContext';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Modal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { money, indicativeAmount } from '../lib/utils';
import {
  ShieldCheck,
  Search,
  RefreshCw,
  FileSpreadsheet,
  Grid,
  Layers,
  ArrowLeft,
  ExternalLink,
  Eye
} from 'lucide-react';
import type { ConsultationState } from '../types/consultation';

interface ConsultationRecord {
  id: string;
  client_name: string;
  client_phone: string;
  location: string;
  consultant: string;
  consultant_phone?: string;
  status: 'draft' | 'proposal_sent' | 'completed';
  updated_at: string;
  estimate?: string;
  state?: Partial<ConsultationState>;
}

// Initial seed consultation records for admin view
const SEED_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: 'seed-001',
    client_name: 'Mala Sharma',
    client_phone: '+91 9845012345',
    location: 'Bengaluru, Indiranagar',
    consultant: 'Svvayam Admin',
    consultant_phone: '+91 9182424228',
    status: 'proposal_sent',
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    estimate: '15 lakh',
    state: {
      fields: {
        client: 'Mala Sharma',
        location: 'Bengaluru, Indiranagar',
        date: '2026-10-06',
        deity: 'Lord Venkateshwara, Radha Krishna',
        rituals: 'Daily morning aarti and weekly abhishekam',
        dimensions: '6 ft W × 4 ft D × 9 ft H',
        scope: 'Dedicated Sanctum with Shikhara and teakwood jali doors',
        estimate: '15 lakh',
        timeline: '3–4 months'
      }
    }
  },
  {
    id: 'seed-002',
    client_name: 'Dr. Sanjay Reddy',
    client_phone: '+91 9701020304',
    location: 'Hyderabad, Jubilee Hills',
    consultant: 'Team Svvayam',
    consultant_phone: '+91 9182424228',
    status: 'completed',
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    estimate: '45 lakh',
    state: {
      fields: {
        client: 'Dr. Sanjay Reddy',
        location: 'Hyderabad, Jubilee Hills',
        date: '2026-10-04',
        deity: 'Shivling and Parvati Devi',
        rituals: 'Extensive temple abhishek rituals with brass jaladhari',
        dimensions: '10 ft W × 8 ft D × 12 ft H',
        scope: 'Grand Stone Mandapam in Bansi Paharpur Pink Sandstone',
        estimate: '45 lakh',
        timeline: '5–6 months'
      }
    }
  },
  {
    id: 'seed-003',
    client_name: 'Yuva Balakumaran',
    client_phone: '+91 9444055667',
    location: 'Chennai, Adyar',
    consultant: 'Svvayam Consultant',
    consultant_phone: '+91 8074257384',
    status: 'draft',
    updated_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    estimate: '28 lakh',
    state: {
      fields: {
        client: 'Yuva Balakumaran',
        location: 'Chennai, Adyar',
        date: '2026-10-05',
        deity: 'Lord Murugan',
        rituals: 'Traditional South Indian puja ritual layout',
        dimensions: '8 ft W × 5 ft D × 10 ft H',
        scope: 'Teakwood sanctum with hand-carved pillars and brass cladding',
        estimate: '28 lakh',
        timeline: '4 months'
      }
    }
  }
];

export const AdminDashboard: React.FC = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { triggerSheetsSync, importSession } = useConsultation();
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'proposal_sent' | 'completed'>('all');
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Non-admins who open its URL are immediately redirected away
  if (!authLoading && !isAdmin) {
    return <Navigate to="/consult" replace />;
  }

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
          const mapped: ConsultationRecord[] = data.map((row: any) => ({
            id: row.id,
            client_name: row.fields?.client || row.client_phone || 'Untitled Client',
            client_phone: row.client_phone || row.fields?.phone || 'Not recorded',
            location: row.fields?.location || 'Pending',
            consultant: row.profiles?.name || 'Svvayam Team',
            consultant_phone: row.profiles?.phone,
            status: row.status || 'draft',
            updated_at: row.updated_at,
            estimate: row.fields?.estimate,
            state: {
              id: row.id,
              fields: row.fields,
              selected: row.selected_refs || [],
              status: row.status,
              slide: row.current_step || 0
            }
          }));
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

  useEffect(() => {
    if (isAdmin) {
      loadConsultations();
    }
  }, [isAdmin]);

  const filteredConsultations = useMemo(() => {
    return consultations.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.client_name.toLowerCase().includes(q) ||
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
    if (record.state) {
      importSession(record.state as ConsultationState);
      navigate(`/proposal/${record.id}`);
    }
  };

  const handleSyncSingleSheet = async (record: ConsultationRecord) => {
    setSyncingId(record.id);
    const res = await triggerSheetsSync();
    setSyncingId(null);
    if (res.success) {
      setToastMsg(`Consultation for ${record.client_name} successfully synced to Google Sheet!`);
    } else {
      setToastMsg(`Sheet sync: ${res.message || 'Saved locally (requires Google Service Account secret in Edge function)'}`);
    }
    setTimeout(() => setToastMsg(null), 4000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs text-neutral-400">
        Verifying administrative privileges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased text-[#0A0A0A]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#0A0A0A]" />
              <h1 className="text-xl sm:text-2xl font-medium text-[#0A0A0A]">
                Clients and Consultations
              </h1>
            </div>
            <p className="text-xs text-neutral-500">
              Admin console: View all client consultations, review proposals, and export to Google Sheets.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/consult">
              <Button variant="outline" size="sm" className="text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Return to Live Consultation</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={loadConsultations}
              className="text-xs"
              title="Refresh list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

        {/* Section 1: Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Box */}
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

          {/* Status Filter Buttons */}
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

        {/* Section 2: Searchable Consultations Table */}
        <div className="border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-medium text-neutral-500 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Mobile Number</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Consultant</th>
                <th className="py-3 px-4">Indicative Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loadingConsultations ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-400">
                    Loading consultation records...
                  </td>
                </tr>
              ) : filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-400">
                    No matching consultation records found.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((item) => {
                  const est = indicativeAmount(item.estimate);
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-[#0A0A0A]">
                        {item.client_name}
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
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setSelectedRecord(item)}
                            className="p-1 border border-neutral-200 hover:border-[#0A0A0A] text-neutral-600 hover:text-[#0A0A0A] cursor-pointer"
                            title="Inspect details"
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

        {/* Section 3: Integrations & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Google Sheets Sync Card */}
          <div className="p-5 border border-neutral-200 space-y-3">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-[#0A0A0A]" />
              <h3 className="text-sm font-medium text-[#0A0A0A]">
                Google Sheets Automation
              </h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
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

          {/* Reference Matrix Setup */}
          <div className="p-5 border border-neutral-200 space-y-3">
            <div className="flex items-center space-x-2">
              <Grid className="w-4 h-4 text-[#0A0A0A]" />
              <h3 className="text-sm font-medium text-[#0A0A0A]">
                4×4 Reference Grid
              </h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Configure the 16 reference images once in Supabase Storage. Shared across all team onboarding calls.
            </p>
            <Link to="/consult">
              <Button variant="outline" size="sm" className="text-xs">
                <span>Setup Matrix (Step 5)</span>
              </Button>
            </Link>
          </div>

          {/* 8-Stage Journey Proofs */}
          <div className="p-5 border border-neutral-200 space-y-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#0A0A0A]" />
              <h3 className="text-sm font-medium text-[#0A0A0A]">
                8-Stage Journey Files
              </h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Upload factory blueprints, carving proofs and dispatch videos for customer walkthroughs.
            </p>
            <Link to="/consult">
              <Button variant="outline" size="sm" className="text-xs">
                <span>Manage Files (Step 7)</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Consultation Inspection Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={`Consultation Details: ${selectedRecord.client_name}`}
          subtitle={`Location: ${selectedRecord.location} • Status: ${selectedRecord.status}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-3">
              <div>
                <span className="font-medium text-neutral-500 block">Client Contact</span>
                <span className="font-mono text-[#0A0A0A]">{selectedRecord.client_phone}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-500 block">Consultant</span>
                <span className="text-[#0A0A0A]">{selectedRecord.consultant}</span>
              </div>
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
