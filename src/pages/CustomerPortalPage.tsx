import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Header } from '../components/layout/Header';
import { PortalChat } from '../components/portal/PortalChat';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { JOURNEY_STAGES } from '../lib/constants';
import { assetUrl, cn, formatProjectName, extractSurname } from '../lib/utils';
import type {
  JourneyStageProgress,
  JourneyUpdate,
  SelectedReference
} from '../types/consultation';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
  Printer,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

interface CustomerPortalData {
  id: string;
  client_name: string;
  project_name?: string;
  client_phone: string;
  location: string;
  date: string;
  status: string;
  current_step: number;
  portal_visible: boolean;
  fields: Record<string, string>;
  selected_reference: SelectedReference | null;
  stage_progress: JourneyStageProgress[];
  updates: JourneyUpdate[];
}

export const CustomerPortalPage: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [portalData, setPortalData] = useState<CustomerPortalData | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'requirements' | 'reference' | 'scope' | 'proposal' | 'journey' | 'updates' | 'messages'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('section');
      if (p && ['overview', 'requirements', 'reference', 'scope', 'proposal', 'journey', 'updates', 'messages'].includes(p)) {
        return p as any;
      }
    }
    return 'overview';
  });
  const [messagePrefill, setMessagePrefill] = useState<string | null>(null);
  const [chatModalOpen, setChatModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('chat') === '1';
    }
    return false;
  });
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  // Load customer consultation data
  useEffect(() => {
    async function loadPortal() {
      setLoading(true);

      if (!user) {
        setLoading(false);
        return;
      }

      const cleanPhone = (user.phone || '').replace(/[^0-9]/g, '');

      // 1. Supabase Live Query
      if (isSupabaseConfigured && supabase) {
        try {
          // Query restricted customer consultation view or consultations table
          const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .or(`client_id.eq.${user.id},client_phone.ilike.%${cleanPhone.slice(-10)}%`)
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (!error && data) {
            // Check visibility
            if (!data.portal_visible) {
              setPortalData({
                id: data.id,
                client_name: profile?.name || data.fields?.client || 'Valued Customer',
                client_phone: user.phone || profile?.phone || '',
                location: data.fields?.location || 'Pending location',
                date: data.fields?.date || new Date().toISOString().slice(0, 10),
                status: data.status || 'draft',
                current_step: data.current_step || 0,
                portal_visible: false,
                fields: {},
                selected_reference: null,
                stage_progress: [],
                updates: []
              });
              setLoading(false);
              return;
            }

            // Fetch stage progress & updates
            const [{ data: stagesData }, { data: updatesData }] = await Promise.all([
              supabase.from('journey_stage_progress').select('*').eq('consultation_id', data.id),
              supabase.from('journey_updates').select('*').eq('consultation_id', data.id).order('created_at', { ascending: false })
            ]);

            const rawRef = data.selected_reference || (Array.isArray(data.selected_refs) ? data.selected_refs[0] : null);
            const clientName = profile?.name || data.fields?.client || 'Valued Customer';
            const projName = data.project_name
              || data.fields?.projectName
              || data.fields?.project_name
              || (clientName.includes('Sharma') ? "Mrs. Sharma's Temple" : formatProjectName(data.fields?.title, data.fields?.surname || extractSurname(clientName), data.fields?.product || 'Temple'));

            setPortalData({
              id: data.id,
              client_name: clientName,
              project_name: projName,
              client_phone: user.phone || profile?.phone || '',
              location: data.fields?.location || 'Bengaluru, India',
              date: data.fields?.date || new Date().toISOString().slice(0, 10),
              status: data.status || 'draft',
              current_step: data.current_step || 0,
              portal_visible: true,
              fields: data.fields || {},
              selected_reference: rawRef,
              stage_progress: (stagesData as JourneyStageProgress[]) || [],
              updates: (updatesData as JourneyUpdate[]) || []
            });
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Customer portal query notice:', err);
        }
      }

      // 2. Mock / Local Dev Mode Fallback
      try {
        const storedConsultations = localStorage.getItem('svvayam_admin_consultations_v1');
        let matchedConsultation: any = null;

        if (storedConsultations) {
          const list = JSON.parse(storedConsultations);
          matchedConsultation = list.find((c: any) =>
            c.client_id === user.id ||
            c.state?.client_id === user.id ||
            (c.client_phone && c.client_phone.replace(/[^0-9]/g, '').includes(cleanPhone.slice(-10))) ||
            (c.client_name && profile?.name && c.client_name.toLowerCase().includes(profile.name.toLowerCase()))
          );
        }

        // If not matched, use realistic demo seed record (Mala Sharma)
        if (!matchedConsultation) {
          matchedConsultation = {
            id: 'seed-001',
            client_name: profile?.name || 'Mala Sharma',
            project_name: "Mrs. Sharma's Temple",
            client_phone: user.phone || '+91 9845012345',
            location: 'Bengaluru, Indiranagar',
            date: '2026-10-06',
            status: 'proposal_sent',
            current_step: 7,
            portal_visible: true,
            selected_reference: {
              data: assetUrl('assets/clients/Dr. Sanjay/3D MODEL/3d_model_01.png'),
              caption: 'Dedicated pooja room · Rich detail',
              kind: 'Selected reference',
              source: 'grid'
            },
            fields: {
              client: profile?.name || 'Mala Sharma',
              title: 'Mrs.',
              surname: 'Sharma',
              product: 'Temple',
              projectName: "Mrs. Sharma's Temple",
              location: 'Bengaluru, Indiranagar',
              date: '2026-10-06',
              deity: 'Lord Venkateshwara, Radha Krishna',
              rituals: 'Daily morning aarti and weekly abhishekam with brass jaladhari',
              idol: '18 inches Lord Venkateshwara brass idol + 12 inches Radha Krishna murtis',
              dimensions: '6 ft W × 4 ft D × 9 ft H',
              dimensionType: 'Clear internal pooja room dimensions',
              features: 'Deep pull-out drawers for pooja samagri, brass bell hangings, teak jali folding doors',
              site: 'Civil flooring completed, false ceiling electrical conduit ready',
              approvers: 'Mala Sharma & Ramesh Sharma',
              budget: '12–15 lakh',
              installation: 'Before Diwali 2026',
              decision: 'Ready for 3D modeling sign-off',
              scope: 'Dedicated Sanctum with Shikhara and teakwood jali doors',
              materials: 'Burma Teakwood with solid brass bell panels and Makrana white marble sanctum base',
              estimate: '15 lakh',
              timeline: '3–4 months',
              exclusions: 'Taxes extra (GST 18%), site civil masonry preparation excluded'
            }
          };
        }

        const mockUpdates: JourneyUpdate[] = [
          {
            id: 'upd-1',
            consultation_id: matchedConsultation.id,
            stage: 2,
            title: '3D Wireframe & Proportion Visualisation Ready',
            note: 'Our Bengaluru design studio has drafted the initial 3D volumetric model incorporating your 18-inch Lord Venkateshwara deity clearance and brass bell door specifications.',
            created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
            is_read: false
          },
          {
            id: 'upd-2',
            consultation_id: matchedConsultation.id,
            stage: 0,
            title: 'Initial Consultation Package Documented',
            note: 'Your pooja room requirements and design direction have been captured. The preliminary proposal is ready for family review.',
            created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
            is_read: true
          }
        ];

        const clientName = matchedConsultation.client_name || profile?.name || 'Mala Sharma';
        const projName = matchedConsultation.project_name
          || matchedConsultation.fields?.projectName
          || (clientName.includes('Sharma') ? "Mrs. Sharma's Temple" : formatProjectName(matchedConsultation.fields?.title, matchedConsultation.fields?.surname || extractSurname(clientName), matchedConsultation.fields?.product || 'Temple'));

        setPortalData({
          id: matchedConsultation.id,
          client_name: clientName,
          project_name: projName,
          client_phone: user.phone || matchedConsultation.client_phone,
          location: matchedConsultation.location || matchedConsultation.fields?.location || 'Bengaluru, India',
          date: matchedConsultation.date || matchedConsultation.fields?.date || '2026-10-06',
          status: matchedConsultation.status || 'draft',
          current_step: matchedConsultation.current_step || 7,
          portal_visible: matchedConsultation.portal_visible !== false,
          fields: matchedConsultation.fields || matchedConsultation.state?.fields || {},
          selected_reference: matchedConsultation.selected_reference || matchedConsultation.state?.selected_reference || null,
          stage_progress: [
            { stage: 0, status: 'completed', start_date: '2026-10-06', completion_date: '2026-10-06', notes: 'First consultation concluded successfully.' },
            { stage: 1, status: 'completed', start_date: '2026-10-07', completion_date: '2026-10-07', notes: 'Design onboarding confirmed.' },
            { stage: 2, status: 'in_progress', start_date: '2026-10-08', notes: 'Live 3D modeling and teakwood ornamentation review.' }
          ],
          updates: mockUpdates
        });
      } catch (e) {
        console.error('Portal mock error:', e);
      } finally {
        setLoading(false);
      }
    }

    loadPortal();
  }, [user, profile]);

  const handleAskAbout = (sectionName: string) => {
    setMessagePrefill(sectionName);
    setChatModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex items-center justify-center text-xs text-[#5C5C5C] font-sans">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin"></div>
          <span>Loading your sacred sanctuary portal...</span>
        </div>
      </div>
    );
  }

  // Waiting Screen if portal_visible === false
  if (!portalData || !portalData.portal_visible) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
        <Header />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-16 flex flex-col justify-center items-center text-center">
          <div className="bg-white rounded-[24px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-8 sm:p-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#0E2A1C]/10 text-[#0E2A1C] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0E2A1C] bg-[#0E2A1C]/10 px-3 py-1 rounded-full">
                Curation In Progress
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#0A0A0A]">
                Your Project Portal is Being Prepared
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed max-w-md mx-auto font-sans">
                Namaste {profile?.name || user?.phone}. Our temple architects and guild craftsmen are finalizing your consultation package, 3D renderings, and milestone timeline.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] rounded-[16px] border border-[#ECECEC] text-xs text-[#5C5C5C] text-left space-y-2 font-sans">
              <div className="flex items-center space-x-2 text-[#0A0A0A] font-medium">
                <Clock className="w-4 h-4 text-[#0E2A1C]" />
                <span>What happens next?</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                As soon as our studio publishes your consultation documentation, this portal will unlock with your full project specifications, 8-stage journey proofs, and direct messaging with our team.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+919182424228"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-sans hover:bg-neutral-800 transition-colors inline-flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Contact Svvayam Studio (+91 9182424228)</span>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="w-full sm:w-auto text-xs"
              >
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Calculate Overall Journey Progress
  const completedStagesCount = portalData.stage_progress.filter(s => s.status === 'completed').length;
  const currentStageIndex = Math.min(completedStagesCount, 7);
  const currentStageMeta = JOURNEY_STAGES[currentStageIndex];
  const progressPercent = Math.round(((completedStagesCount + 0.3) / 8) * 100);

  const fields = portalData.fields || {};
  const unreadUpdatesCount = portalData.updates.filter(u => !u.is_read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col antialiased text-[#0A0A0A]">
      <Header />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
        {/* Project Hero Banner Card */}
        <section className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ECECEC] pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-950/10 border border-emerald-800/30 text-[#0E2A1C] px-2.5 py-0.5 rounded-full">
                  Live Client Portal
                </span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-xs text-neutral-500 font-sans">
                  ID: {portalData.id.slice(0, 8)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#0A0A0A]">
                {portalData.project_name || `${portalData.client_name}’s Sacred Sanctuary`}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C5C5C] mt-1 font-sans">
                <div className="flex items-center gap-1.5 font-medium text-[#0A0A0A]">
                  <span>Client: {portalData.client_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0E2A1C]" />
                  <span>{portalData.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Consultation Date: {portalData.date}</span>
                </div>
              </div>

            </div>

            {/* Quick Action: Open Messages */}
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMessagePrefill(null);
                  setChatModalOpen(true);
                }}
                className="rounded-full px-4 h-9 shadow-[0_8px_16px_rgba(0,0,0,0.25)] flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message Architects</span>
              </Button>
            </div>
          </div>

          {/* Overall 8-Stage Journey Progress Tracker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#0A0A0A]">Current Milestone:</span>
                <span className="font-semibold text-[#0E2A1C]">
                  Stage {currentStageIndex + 1} of 8 · {currentStageMeta?.title}
                </span>
              </div>
              <span className="font-mono text-neutral-500 font-medium">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#F1F1F1] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0A0A0A] to-[#0E2A1C] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="text-[11px] text-[#737373] font-sans">
              {currentStageMeta?.description}
            </p>
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'requirements', label: 'My Requirements' },
            { id: 'reference', label: 'Chosen Reference' },
            { id: 'scope', label: 'Scope & Budget' },
            { id: 'proposal', label: 'Proposal' },
            { id: 'journey', label: '8-Stage Journey' },
            { id: 'updates', label: `Updates ${unreadUpdatesCount > 0 ? `(${unreadUpdatesCount})` : ''}` },
            { id: 'messages', label: 'Message the Team' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer",
                activeSection === tab.id
                  ? "bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  : "bg-white text-[#5C5C5C] hover:text-[#0A0A0A] border border-[#ECECEC]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* SECTION: OVERVIEW                                        */}
        {/* ======================================================== */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Summary Card */}
            <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#0A0A0A]">
                  Sanctum Overview
                </h3>
                <button
                  type="button"
                  onClick={() => handleAskAbout('Sanctum Overview')}
                  className="text-xs text-[#0E2A1C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ask about this</span>
                </button>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="p-3 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC]">
                  <span className="text-neutral-400 text-[10px] uppercase font-mono block">Deities & Worship</span>
                  <p className="text-[#0A0A0A] font-medium mt-0.5">{fields.deity || 'Lord Venkateshwara, Radha Krishna'}</p>
                </div>

                <div className="p-3 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC]">
                  <span className="text-neutral-400 text-[10px] uppercase font-mono block">Sanctum Dimensions</span>
                  <p className="text-[#0A0A0A] font-medium mt-0.5">{fields.dimensions || '6 ft W × 4 ft D × 9 ft H'}</p>
                  <span className="text-neutral-500 text-[11px]">{fields.dimensionType || 'Internal clear space'}</span>
                </div>

                <div className="p-3 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC]">
                  <span className="text-neutral-400 text-[10px] uppercase font-mono block">Design Direction</span>
                  <p className="text-[#0A0A0A] font-medium mt-0.5">{fields.scope || 'Dedicated Sanctum with Shikhara and teakwood jali doors'}</p>
                </div>
              </div>
            </div>

            {/* Chosen Reference Mini Card */}
            <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#0A0A0A]">
                    Approved Reference Style
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveSection('reference')}
                    className="text-xs text-[#0E2A1C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View full</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {portalData.selected_reference ? (
                  <div className="rounded-[16px] overflow-hidden border border-[#ECECEC] bg-[#FAFAFA]">
                    <img
                      src={portalData.selected_reference.data}
                      alt={portalData.selected_reference.caption}
                      className="w-full h-44 object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => setSelectedImageModal(portalData.selected_reference?.data || null)}
                    />
                    <div className="p-3">
                      <p className="text-xs font-medium text-[#0A0A0A]">
                        {portalData.selected_reference.caption}
                      </p>
                      <span className="text-[10px] text-neutral-500 capitalize">
                        Source: {portalData.selected_reference.source ? portalData.selected_reference.source.replace('_', ' ') : 'Sacred grid reference'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 rounded-[16px] border border-dashed border-neutral-300 flex items-center justify-center text-xs text-neutral-400">
                    No visual reference selected yet
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 font-sans border-t border-[#ECECEC]">
                <span>Indicative Budget:</span>
                <span className="font-mono font-semibold text-[#0A0A0A]">
                  {fields.estimate || '15 lakh'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: MY REQUIREMENTS (STEPS 1 TO 4)                 */}
        {/* ======================================================== */}
        {activeSection === 'requirements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
                <div>
                  <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                    My Worship & Space Requirements
                  </h3>
                  <p className="text-xs text-[#5C5C5C] font-sans">
                    Detailed parameters captured during your live architectural consultation.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAskAbout('My Worship Requirements')}
                  className="text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>Ask about this</span>
                </Button>
              </div>

              {/* Step 2: Worship */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider font-mono">
                  1. How Your Family Worships
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Deities & Traditions</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.deity || 'Not specified'}</p>
                  </div>
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Idol Dimensions & Clearance</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.idol || 'Standard clearances planned'}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Rituals & Usage</span>
                    <p className="text-[#0A0A0A] leading-relaxed mt-1">{fields.rituals || 'Daily morning rituals and family prayer'}</p>
                  </div>
                </div>
              </div>

              {/* Step 3: Space */}
              <div className="space-y-3 pt-3 border-t border-[#ECECEC]">
                <h4 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider font-mono">
                  2. Confirmed Space & Essentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Dimensions (W × D × H)</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.dimensions || '6 ft W × 4 ft D × 9 ft H'}</p>
                    <span className="text-[11px] text-neutral-500">{fields.dimensionType || 'Internal clear dimensions'}</span>
                  </div>
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Site Status</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.site || 'Civil masonry ready'}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Essentials (Storage, Doors, Lighting)</span>
                    <p className="text-[#0A0A0A] leading-relaxed mt-1">{fields.features || 'Pooja samagri storage, brass bell hangings, teak jali doors'}</p>
                  </div>
                </div>
              </div>

              {/* Step 4: Alignment */}
              <div className="space-y-3 pt-3 border-t border-[#ECECEC]">
                <h4 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider font-mono">
                  3. Aligned Expectations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Family Approvers</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.approvers || portalData.client_name}</p>
                  </div>
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Budget Range</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.budget || fields.estimate || '12–15 lakh'}</p>
                  </div>
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Desired Installation</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.installation || 'Before upcoming festival'}</p>
                  </div>
                  <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Decision Timeline</span>
                    <p className="text-[#0A0A0A] font-medium mt-1">{fields.decision || 'Upon 3D rendering review'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: MY CHOSEN REFERENCE                             */}
        {/* ======================================================== */}
        {activeSection === 'reference' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                  My Chosen Reference
                </h3>
                <p className="text-xs text-[#5C5C5C] font-sans">
                  The single sacred design reference guiding your proportions, carving tiers, and finish.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAbout('Chosen Reference')}
                className="text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>Ask about this</span>
              </Button>
            </div>

            {portalData.selected_reference ? (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="rounded-[20px] overflow-hidden border border-[#ECECEC] shadow-sm bg-[#FAFAFA]">
                  <img
                    src={portalData.selected_reference.data}
                    alt={portalData.selected_reference.caption}
                    className="w-full max-h-[460px] object-cover cursor-pointer hover:scale-101 transition-transform duration-300"
                    onClick={() => setSelectedImageModal(portalData.selected_reference?.data || null)}
                  />
                  <div className="p-5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0E2A1C] bg-[#0E2A1C]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Approved Architectural Direction
                    </span>
                    <h4 className="text-base font-semibold text-[#0A0A0A]">
                      {portalData.selected_reference.caption}
                    </h4>
                    <p className="text-xs text-[#5C5C5C] leading-relaxed font-sans">
                      This master reference establishes the timber carvings, marble cladding proportions, and brass door details customized for your sanctum.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-neutral-400">
                No visual reference selected yet.
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: SCOPE & BUDGET (STEP 6)                          */}
        {/* ======================================================== */}
        {activeSection === 'scope' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                  Proposed Scope & Indicative Budget
                </h3>
                <p className="text-xs text-[#5C5C5C] font-sans">
                  Approved scope specifications and indicative investments for your handcrafted execution.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAbout('Proposed Scope and Budget')}
                className="text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>Ask about this</span>
              </Button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Architectural Scope & Direction</span>
                <p className="text-[#0A0A0A] font-medium leading-relaxed mt-1">
                  {fields.scope || 'Dedicated Sanctum with Shikhara, intricately carved pillar mandapam, and teakwood jali doors'}
                </p>
              </div>

              <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Proposed Materials & Finishes</span>
                <p className="text-[#0A0A0A] font-medium leading-relaxed mt-1">
                  {fields.materials || 'Burma Teakwood with Makrana white marble base, hand-chiseled motifs, and antiqued brass fixtures'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Indicative Budget</span>
                  <p className="text-base font-display font-semibold text-[#0A0A0A] mt-1">
                    {fields.estimate || '15 lakh'}
                  </p>
                  <span className="text-[11px] text-neutral-500">Based on initial dimensions and material choices</span>
                </div>

                <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Execution Timeline</span>
                  <p className="text-base font-display font-semibold text-[#0A0A0A] mt-1">
                    {fields.timeline || '3–4 months'}
                  </p>
                  <span className="text-[11px] text-neutral-500">From 3D sign-off and material lock</span>
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECECEC]">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Exclusions & Assumptions</span>
                <p className="text-neutral-600 leading-relaxed mt-1">
                  {fields.exclusions || 'Taxes extra (GST 18%), site civil masonry preparation and external electrical wiring excluded.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: PROPOSAL (STEP 8)                               */}
        {/* ======================================================== */}
        {activeSection === 'proposal' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                  Preliminary Architectural Proposal
                </h3>
                <p className="text-xs text-[#5C5C5C] font-sans">
                  The complete consultation summary document prepared by Svvayam.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/proposal/${portalData.id}`)}
                  className="text-xs flex items-center gap-1.5"
                >
                  <span>Interactive View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Proposal Summary Card */}
            <div className="p-6 rounded-[16px] border border-[#ECECEC] bg-[#FAFAFA] space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <span className="font-semibold text-sm text-[#0A0A0A]">Svvayam Bespoke Sanctum Proposal</span>
                <span className="font-mono text-neutral-500">Date: {portalData.date}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-mono block">Client & Location</span>
                  <p className="font-medium text-[#0A0A0A]">{portalData.client_name} · {portalData.location}</p>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase font-mono block">Indicative Budget</span>
                  <p className="font-medium text-[#0A0A0A]">{fields.estimate || '15 lakh'}</p>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-mono block">Design Inclusions</span>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-neutral-600">
                  <li>Co-curated mood board, concept and spatial layout development</li>
                  <li>Live 3D photorealistic visualization and material sample approvals</li>
                  <li>Dedicated guild project manager and site installation handover</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: 8-STAGE JOURNEY                                 */}
        {/* ======================================================== */}
        {activeSection === 'journey' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                  {portalData.project_name || portalData.client_name} — 8-Stage Creation Journey
                </h3>

                <p className="text-xs text-[#5C5C5C] font-sans">
                  Track every milestone from inception to site installation and auspicious handover.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAbout('8-Stage Journey')}
                className="text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>Ask about this</span>
              </Button>
            </div>

            <div className="space-y-4">
              {JOURNEY_STAGES.map((stage, idx) => {
                const stageProg = portalData.stage_progress.find(s => s.stage === idx);
                const isCompleted = stageProg?.status === 'completed' || (idx < currentStageIndex);
                const isInProgress = stageProg?.status === 'in_progress' || (idx === currentStageIndex);

                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 sm:p-5 rounded-[16px] border transition-all text-xs font-sans",
                      isInProgress
                        ? "bg-white border-[#0E2A1C] shadow-[0_4px_20px_rgba(14,42,28,0.08)] ring-1 ring-[#0E2A1C]/20"
                        : isCompleted
                        ? "bg-[#FAFAFA] border-[#ECECEC]"
                        : "bg-white/50 border-[#F0F0F0] opacity-75"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0",
                          isCompleted
                            ? "bg-[#2A2A2A] text-white"
                            : isInProgress
                            ? "bg-gradient-to-b from-[#2A2A2A] to-[#0E2A1C] text-white shadow-xs"
                            : "bg-[#F1F1F1] text-neutral-400"
                        )}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-[#0A0A0A]">
                              Stage {idx + 1}: {stage.title}
                            </h4>
                            <span className={cn(
                              "text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border",
                              isCompleted
                                ? "bg-neutral-100 text-[#0A0A0A] border-neutral-300"
                                : isInProgress
                                ? "bg-[#0E2A1C]/10 text-[#0E2A1C] border-[#0E2A1C]/30"
                                : "bg-neutral-50 text-neutral-400 border-neutral-200"
                            )}>
                              {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                            </span>
                          </div>
                          <p className="text-xs text-[#5C5C5C] mt-0.5 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-neutral-400 font-mono shrink-0 pl-11 sm:pl-0">
                        {stageProg?.start_date && (
                          <div>Started: {stageProg.start_date}</div>
                        )}
                        {stageProg?.completion_date && (
                          <div className="text-[#0E2A1C]">Completed: {stageProg.completion_date}</div>
                        )}
                      </div>
                    </div>

                    {stageProg?.notes && (
                      <div className="mt-3 pt-3 border-t border-[#ECECEC] text-[11px] text-[#5C5C5C] pl-11">
                        <strong>Studio Update:</strong> {stageProg.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: UPDATES TIMELINE FEED                           */}
        {/* ======================================================== */}
        {activeSection === 'updates' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                  Studio Progress Feed
                </h3>
                <p className="text-xs text-[#5C5C5C] font-sans">
                  Live architectural updates, CAD releases, and workshop proofs from Bengaluru.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAbout('Progress Updates')}
                className="text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>Ask about this</span>
              </Button>
            </div>

            {portalData.updates.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400">
                No progress updates posted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {portalData.updates.map((upd) => (
                  <div
                    key={upd.id}
                    className="p-5 rounded-[16px] bg-[#FAFAFA] border border-[#ECECEC] space-y-2 relative"
                  >
                    {!upd.is_read && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0E2A1C]" title="Unread update"></span>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-[#0E2A1C]/10 text-[#0E2A1C] border border-[#0E2A1C]/20 px-2 py-0.5 rounded-full">
                        Stage {upd.stage !== undefined ? upd.stage + 1 : 'General'}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {new Date(upd.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-[#0A0A0A]">
                      {upd.title}
                    </h4>
                    <p className="text-xs text-[#5C5C5C] leading-relaxed font-sans">
                      {upd.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: MESSAGE THE TEAM (DOUBTS & REPLIES)             */}
        {/* ======================================================== */}
        {activeSection === 'messages' && (
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-4">
            <div className="border-b border-[#ECECEC] pb-4">
              <h3 className="text-lg font-display font-medium text-[#0A0A0A]">
                Message the Svvayam Team
              </h3>
              <p className="text-xs text-[#5C5C5C] font-sans">
                Ask questions or clarify doubts regarding your sanctum dimensions, materials, and artisan timeline.
              </p>
            </div>
            <PortalChat
              consultationId={portalData.id}
              customerId={user?.id}
              projectName={portalData.project_name}
              currentUserRole="customer"
              currentUserName={portalData.client_name}
              currentUserId={user?.id || 'customer-user'}
              prefillContext={messagePrefill}
              onClearPrefill={() => setMessagePrefill(null)}
              className="border-none shadow-none"
            />
          </div>
        )}
      </main>

      {/* Floating Action Button for Messages on Mobile */}
      <button
        onClick={() => {
          setMessagePrefill(null);
          setChatModalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-full p-4 shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-white/20 transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer"
        title="Direct Message with Svvayam Studio"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-sans font-medium pr-1 hidden sm:inline">Message Studio</span>
      </button>

      {/* Messages Modal (Customer to Svvayam Team) */}
      <Modal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        title={portalData.project_name || "Direct Studio Inquiry"}
        subtitle={`Live messaging with Svvayam architects for ${portalData.client_name}`}
        maxWidth="2xl"
      >
        <PortalChat
          consultationId={portalData.id}
          customerId={user?.id}
          projectName={portalData.project_name}
          currentUserRole="customer"
          currentUserName={portalData.client_name}
          currentUserId={user?.id || 'customer-user'}
          prefillContext={messagePrefill}
          onClearPrefill={() => setMessagePrefill(null)}
          className="border-none shadow-none"
        />
      </Modal>


      {/* Image Preview Modal */}
      {selectedImageModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedImageModal(null)}
          maxWidth="4xl"
          showCloseButton={true}
        >
          <div className="p-2 flex items-center justify-center">
            <img
              src={selectedImageModal}
              alt="Preview"
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
