import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useConsultation } from '../../context/ConsultationContext';
import { getRegisteredCustomers, saveRegisteredCustomers } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { formatProjectName, extractSurname, normalizeToE164, cn } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct, CustomerRecord } from '../../types/consultation';
import {
  Sparkles,
  Search,
  UserCheck,
  UserPlus,
  FolderKanban,
  CheckCircle2,
  RefreshCw,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

interface PastProjectItem {
  id: string;
  project_name: string;
  product_type: CustomerProduct;
  location?: string;
  status: string;
  date?: string;
}

const SEED_PAST_PROJECTS: Record<string, PastProjectItem[]> = {
  '9845012345': [
    {
      id: 'proj-mala-01',
      project_name: "Mrs. Sharma's Temple",
      product_type: 'Temple',
      location: 'Bengaluru, Indiranagar',
      status: 'completed',
      date: '2026-08-15'
    }
  ],
  '9845099887': [
    {
      id: 'proj-sanjay-01',
      project_name: "Dr. Sanjay's Sanctum",
      product_type: 'Sanctum',
      location: 'Hyderabad, Jubilee Hills',
      status: 'completed',
      date: '2026-06-20'
    }
  ]
};

export const Step1Purpose: React.FC = () => {
  const { state, updateField } = useConsultation();
  const [searchParams] = useSearchParams();

  // Search and directory state
  const [searchQuery, setSearchQuery] = useState('');
  const [availableClients, setAvailableClients] = useState<CustomerRecord[]>([]);
  const [clientProjects, setClientProjects] = useState<Record<string, PastProjectItem[]>>(SEED_PAST_PROJECTS);
  const [loadingDirectory, setLoadingDirectory] = useState(false);

  // Mode: 'picker' | 'new_client' | 'configured'
  const isInitiallyConfigured = Boolean(state.fields.client && state.fields.location);
  const [mode, setMode] = useState<'picker' | 'new_client' | 'configured'>(
    isInitiallyConfigured ? 'configured' : 'picker'
  );

  // Selected client for existing client flow
  const [selectedClient, setSelectedClient] = useState<CustomerRecord | null>(null);

  // Form fields for new or existing client
  const [title, setTitle] = useState<CustomerTitle>(
    (state.fields.title as CustomerTitle) || 'Mr.'
  );
  const [name, setName] = useState(state.fields.client || '');
  const [surname, setSurname] = useState(
    state.fields.surname || (state.fields.client ? extractSurname(state.fields.client) : '')
  );
  const [surnameTouched, setSurnameTouched] = useState(Boolean(state.fields.surname));
  const [phone, setPhone] = useState(state.fields.client_phone || state.fields.phone || '+91 ');
  const [product, setProduct] = useState<CustomerProduct>(
    (state.fields.product as CustomerProduct) || 'Temple'
  );
  const [location, setLocation] = useState(state.fields.location || '');
  const [consultDate, setConsultDate] = useState(
    state.fields.date || new Date().toLocaleDateString('en-CA')
  );

  const [savingNotice, setSavingNotice] = useState<string | null>(null);

  // Canonical Project Name preview: "<Title> <Surname>'s <Product>"
  const canonicalProjectName = useMemo(() => {
    const s = surname.trim() || extractSurname(name.trim());
    return formatProjectName(title, s, product);
  }, [title, surname, name, product]);

  // Load clients and past projects
  const loadDirectory = async () => {
    setLoadingDirectory(true);
    try {
      const list: CustomerRecord[] = [...getRegisteredCustomers()];

      // Fetch profiles from Supabase if configured
      if (isSupabaseConfigured && supabase) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .in('role', ['customer', 'client']);

        if (profiles) {
          profiles.forEach((p: any) => {
            if (!list.some(c => c.phone === p.phone || c.id === p.id)) {
              list.push({
                id: p.id,
                name: p.name,
                title: p.title || 'Mr.',
                surname: p.surname || extractSurname(p.name),
                product: p.product || 'Temple',
                project_name: p.project_name,
                phone: p.phone,
                location: p.location || 'India',
                is_active: p.is_active ?? true,
                created_at: p.created_at || new Date().toISOString()
              });
            }
          });
        }

        // Fetch past projects
        const { data: dbProjects } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbProjects) {
          const map: Record<string, PastProjectItem[]> = { ...SEED_PAST_PROJECTS };
          dbProjects.forEach((proj: any) => {
            const cleanKey = proj.client_id;
            if (!map[cleanKey]) map[cleanKey] = [];
            map[cleanKey].push({
              id: proj.id,
              project_name: proj.project_name,
              product_type: proj.product_type || 'Temple',
              location: proj.location,
              status: proj.status || 'in_progress',
              date: proj.created_at?.slice(0, 10)
            });
          });
          setClientProjects(map);
        }
      }

      setAvailableClients(list);
    } catch (err) {
      console.warn('Directory load fallback:', err);
    } finally {
      setLoadingDirectory(false);
    }
  };

  useEffect(() => {
    loadDirectory();
  }, []);

  // Select an existing client
  const handleSelectExistingClient = (cust: CustomerRecord) => {
    setSelectedClient(cust);
    setName(cust.name);
    setTitle(cust.title || 'Mr.');
    const s = cust.surname || extractSurname(cust.name);
    setSurname(s);
    setSurnameTouched(true);
    setPhone(cust.phone);
    if (cust.location) {
      setLocation(cust.location);
    }
    setMode('picker'); // Stay in picker view with client selected
  };

  // Handle URL parameters (?client=... or ?phone=...)
  useEffect(() => {
    const clientParam = searchParams.get('client');
    const phoneParam = searchParams.get('phone');

    if (clientParam || phoneParam) {
      const match = availableClients.find(c =>
        (clientParam && c.id === clientParam) ||
        (phoneParam && c.phone.replace(/\D/g, '').endsWith(phoneParam.replace(/\D/g, '').slice(-10)))
      );
      if (match) {
        handleSelectExistingClient(match);
      }
    }
  }, [searchParams, availableClients]);

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const cleanDigits = q.replace(/\D/g, '');

    return availableClients.filter(c => {
      const nameMatch = c.name.toLowerCase().includes(q) || (c.surname && c.surname.toLowerCase().includes(q));
      const phoneMatch = cleanDigits.length >= 3 && c.phone.replace(/\D/g, '').includes(cleanDigits);
      return nameMatch || phoneMatch;
    });
  }, [availableClients, searchQuery]);

  // Name change handler with auto-surname
  const handleNameChange = (val: string) => {
    setName(val);
    if (!surnameTouched) {
      setSurname(extractSurname(val));
    }
  };

  const handleSurnameChange = (val: string) => {
    setSurnameTouched(true);
    setSurname(val);
  };

  // Commit configuration to ConsultationContext and backend
  const handleConfirmProject = async () => {
    if (!name.trim()) {
      alert('Please enter or select a client name.');
      return;
    }
    if (!location.trim()) {
      alert('Please enter a project location.');
      return;
    }

    setSavingNotice('Configuring sacred project...');

    const cleanSurname = surname.trim() || extractSurname(name.trim());
    const finalProjectName = formatProjectName(title, cleanSurname, product);
    const cleanPhone = normalizeToE164(phone);

    let customerId = selectedClient?.id;
    let projectId = 'proj-' + Date.now().toString().slice(-4);

    // If new client or client without ID
    if (!customerId) {
      // Check if phone already exists to prevent duplicate
      const existing = availableClients.find(c =>
        c.phone.replace(/\D/g, '').endsWith(cleanPhone.replace(/\D/g, '').slice(-10))
      );

      if (existing) {
        customerId = existing.id;
      } else {
        customerId = 'cust-' + Date.now().toString().slice(-4);
        const newCust: CustomerRecord = {
          id: customerId,
          name: name.trim(),
          title,
          surname: cleanSurname,
          product,
          project_name: finalProjectName,
          phone: cleanPhone,
          location: location.trim(),
          is_active: true,
          created_at: new Date().toISOString()
        };

        const current = getRegisteredCustomers();
        const updated = [newCust, ...current];
        saveRegisteredCustomers(updated);
        setAvailableClients(updated);

        // Provision in Supabase if online
        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('profiles').upsert({
              id: customerId,
              name: name.trim(),
              title,
              surname: cleanSurname,
              product,
              project_name: finalProjectName,
              phone: cleanPhone,
              role: 'customer',
              is_active: true
            }, { onConflict: 'id' });
          } catch (err) {
            console.warn('Supabase profile creation notice:', err);
          }
        }
      }
    }

    // Provision Project in Supabase if online
    if (isSupabaseConfigured && supabase && customerId) {
      try {
        const { data: newProj } = await supabase.from('projects').insert({
          client_id: customerId,
          project_name: finalProjectName,
          product_type: product,
          location: location.trim(),
          status: 'draft'
        }).select('id').single();

        if (newProj?.id) {
          projectId = newProj.id;
        }
      } catch (err) {
        console.warn('Supabase project creation notice:', err);
      }
    }

    // Update Consultation State
    updateField('client', name.trim());
    updateField('title', title);
    updateField('surname', cleanSurname);
    updateField('product', product);
    updateField('projectName', finalProjectName);
    updateField('project_name', finalProjectName);
    updateField('location', location.trim());
    updateField('date', consultDate);
    updateField('client_phone', cleanPhone);
    updateField('phone', cleanPhone);

    if (customerId) updateField('client_id', customerId);
    if (projectId) updateField('project_id', projectId);

    setSavingNotice(null);
    setMode('configured');
  };

  // Get past projects for the currently selected client
  const activeClientPastProjects = useMemo(() => {
    if (!selectedClient) return [];
    const byId = clientProjects[selectedClient.id] || [];
    const digits = selectedClient.phone.replace(/\D/g, '').slice(-10);
    const byPhone = clientProjects[digits] || [];
    return [...byId, ...byPhone];
  }, [selectedClient, clientProjects]);

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="space-y-2 border-b border-[#ECECEC] pb-5">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          Step 01 · Purpose &amp; Client Project Setup
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#0A0A0A] tracking-tight">
          Let’s plan your sacred sanctum
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-2xl leading-relaxed font-sans">
          Select or register your client, confirm past project history, and define the project scope for today&apos;s architectural consultation.
        </p>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: CONFIGURED & CONFIRMED VIEW                      */}
      {/* ======================================================== */}
      {mode === 'configured' && (
        <div className="space-y-6">
          {/* Confirmed Project Badge */}
          <div className="p-5 rounded-[20px] bg-gradient-to-r from-emerald-950/5 via-[#0E2A1C]/10 to-neutral-50 border border-emerald-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#0E2A1C] text-[#FFE500] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-[#0E2A1C] uppercase tracking-wider font-semibold bg-[#0E2A1C]/10 px-2 py-0.5 rounded-full">
                    Confirmed Project
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    {canonicalProjectName}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-medium text-[#0A0A0A]">
                  {canonicalProjectName}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C5C5C] font-sans pt-1">
                  <span className="flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#0E2A1C]" />
                    <span className="font-medium text-[#0A0A0A]">{title} {name}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center space-x-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{phone || 'No phone'}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{location}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center space-x-1 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{consultDate}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="self-start md:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode('picker')}
                className="text-xs text-[#5C5C5C] hover:text-[#0A0A0A]"
              >
                <span>Edit Client / Project</span>
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-[14px] bg-neutral-50 border border-[#ECECEC] text-xs text-[#5C5C5C] flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Client identity saved. Steps 2 through 8 will automatically use this project configuration.
              </span>
            </span>
            <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline">
              Click &quot;Next&quot; below to proceed to Worship
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: CLIENT PICKER & SEARCH                           */}
      {/* ======================================================== */}
      {mode === 'picker' && (
        <div className="space-y-6">
          {/* Top search & Add New Client button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search existing client by mobile number or name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-white border border-[#ECECEC] text-xs font-sans text-[#0A0A0A] placeholder-neutral-400 focus:outline-none focus:border-[#0A0A0A] shadow-xs"
                autoFocus={!selectedClient}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedClient(null);
                  setName('');
                  setSurname('');
                  setPhone('+91 ');
                  setLocation('');
                  setMode('new_client');
                }}
                className="text-xs flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add New Client</span>
              </Button>

              <button
                type="button"
                onClick={loadDirectory}
                disabled={loadingDirectory}
                className="p-2 rounded-[12px] bg-white border border-[#ECECEC] text-neutral-400 hover:text-[#0A0A0A] transition-colors"
                title="Refresh client list"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", loadingDirectory && "animate-spin")} />
              </button>
            </div>
          </div>

          {/* Search Results Dropdown List */}
          {searchQuery.trim().length > 0 && !selectedClient && (
            <div className="bg-white rounded-[16px] border border-[#ECECEC] shadow-md p-3 space-y-2 max-h-60 overflow-y-auto">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-2">
                Matching Registered Clients ({filteredClients.length})
              </div>

              {filteredClients.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectExistingClient(c)}
                  className="p-2.5 rounded-[10px] hover:bg-neutral-50 border border-transparent hover:border-[#ECECEC] transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#0A0A0A]">
                      {c.title} {c.name}
                    </div>
                    <div className="text-[11px] text-[#5C5C5C] font-mono">
                      {c.phone} · {c.location || 'India'}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#0A0A0A] text-white font-medium hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-colors">
                    Select
                  </span>
                </div>
              ))}

              {filteredClients.length === 0 && (
                <div className="p-4 text-center text-xs text-[#737373] space-y-2">
                  <p>No client matched &quot;{searchQuery}&quot;.</p>
                  <button
                    type="button"
                    onClick={() => {
                      const cleanDigits = searchQuery.replace(/\D/g, '');
                      if (cleanDigits.length >= 5) {
                        setPhone('+91 ' + cleanDigits);
                      } else {
                        setName(searchQuery);
                        setSurname(extractSurname(searchQuery));
                      }
                      setMode('new_client');
                    }}
                    className="text-xs font-semibold text-[#0A0A0A] underline"
                  >
                    Register as new client &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Selected Client Card & Past Projects */}
          {selectedClient ? (
            <div className="space-y-6 pt-2">
              <div className="p-4 rounded-[16px] bg-neutral-50 border border-[#ECECEC] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-xs">
                    {selectedClient.title?.[0] || 'C'}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A0A0A]">
                      {selectedClient.title} {selectedClient.name}
                    </h4>
                    <p className="text-xs text-[#5C5C5C] font-mono">
                      {selectedClient.phone} · {selectedClient.location || 'India'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedClient(null);
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#737373] hover:text-[#0A0A0A] underline cursor-pointer"
                >
                  Switch Client
                </button>
              </div>

              {/* Past Projects List */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#737373]">
                  <FolderKanban className="w-3.5 h-3.5 text-[#0E2A1C]" />
                  <span>Past Projects History ({activeClientPastProjects.length})</span>
                </div>

                {activeClientPastProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeClientPastProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-[12px] bg-white border border-[#ECECEC] text-xs space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#0A0A0A]">{p.project_name}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                            {p.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#737373]">
                          {p.product_type} · {p.location || 'India'} {p.date ? `· ${p.date}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-[12px] bg-white border border-dashed border-[#ECECEC] text-xs text-neutral-500 text-center">
                    No past projects on file for this client. This consultation will create their first project.
                  </div>
                )}
              </div>

              {/* Configure NEW Project for this Client */}
              <div className="p-5 rounded-[18px] bg-white border border-[#ECECEC] shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-[#0A0A0A]">
                      Configure New Project
                    </h4>
                    <p className="text-xs text-[#5C5C5C] font-sans">
                      Select the sanctum product type and installation location for this consultation.
                    </p>
                  </div>

                  {/* Canonical Name Preview */}
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Generated Project</span>
                    <span className="text-xs font-serif font-bold text-[#0A0A0A]">
                      &quot;{canonicalProjectName}&quot;
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product Type Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Product Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Temple', 'Puja Mandir', 'Sanctum'] as CustomerProduct[]).map((prod) => (
                        <button
                          key={prod}
                          type="button"
                          onClick={() => setProduct(prod)}
                          className={cn(
                            "py-2 px-2 rounded-[10px] text-xs font-medium border text-center transition-all cursor-pointer",
                            product === prod
                              ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs"
                              : "bg-white text-[#5C5C5C] border-[#ECECEC] hover:border-neutral-400"
                          )}
                        >
                          {prod}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Location */}
                  <div>
                    <Input
                      label="New Project Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, Indiranagar"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="text-[11px] font-mono text-[#737373]">
                    Naming: <strong className="text-[#0A0A0A]">&lt;Title&gt; &lt;Surname&gt;&apos;s &lt;Product&gt;</strong>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConfirmProject}
                    disabled={!location.trim() || savingNotice !== null}
                    className="text-xs px-5"
                  >
                    <span>{savingNotice || 'Continue with this Project &rarr;'}</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Directory overview if no client searched/selected yet */
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                <span>Recent Clients Directory</span>
                <span>Select to Launch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableClients.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectExistingClient(c)}
                    className="p-3.5 rounded-[14px] bg-white border border-[#ECECEC] hover:border-[#0A0A0A] shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-xs text-[#0A0A0A] group-hover:text-[#0E2A1C] transition-colors">
                        {c.title} {c.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {c.phone} · {c.location || 'India'}
                      </div>
                    </div>

                    <span className="text-[11px] font-medium text-neutral-400 group-hover:text-[#0A0A0A] transition-colors">
                      Select &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: ADD NEW CLIENT (INLINE FORM, ENTERED ONCE)       */}
      {/* ======================================================== */}
      {mode === 'new_client' && (
        <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <UserPlus className="w-3.5 h-3.5 text-[#0E2A1C]" />
                <span>Register New Client</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0A0A0A]">
                Enter Client &amp; Project Details (Entered Once)
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setMode('picker')}
              className="text-xs text-[#737373] hover:text-[#0A0A0A] underline cursor-pointer"
            >
              Cancel &amp; Search Directory
            </button>
          </div>

          {/* Project Naming Preview Banner */}
          <div className="p-3.5 rounded-[14px] bg-neutral-50 border border-[#ECECEC] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Project Name Format: &lt;Title&gt; &lt;Surname&gt;&apos;s &lt;Product&gt;
              </span>
              <div className="text-sm font-serif font-bold text-[#0A0A0A]">
                &quot;{canonicalProjectName}&quot;
              </div>
            </div>

            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Preview
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Title
              </label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value as CustomerTitle)}
                className="w-full px-3 py-2 rounded-[10px] border border-[#ECECEC] text-xs bg-white font-sans focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="sm:col-span-2">
              <Input
                label="Full Client Name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Mala Sharma"
                required
                autoFocus
              />
            </div>

            {/* Surname (Exact spelling) */}
            <div>
              <Input
                label="Surname (Family Name)"
                value={surname}
                onChange={(e) => handleSurnameChange(e.target.value)}
                placeholder="e.g. Sharma"
                helperText="Exact spelling preserved"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <Input
                label="Mobile Number (+91)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9845012345"
                helperText="SMS OTP login number"
                required
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Product Type
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value as CustomerProduct)}
                className="w-full px-3 py-2 rounded-[10px] border border-[#ECECEC] text-xs bg-white font-sans focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              >
                <option value="Temple">Temple</option>
                <option value="Puja Mandir">Puja Mandir</option>
                <option value="Sanctum">Sanctum</option>
              </select>
            </div>

            {/* Project Location */}
            <div className="sm:col-span-2">
              <Input
                label="Project Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, Indiranagar"
                required
              />
            </div>

            {/* Consultation Date */}
            <div>
              <Input
                label="Consultation Date"
                type="date"
                value={consultDate}
                onChange={(e) => setConsultDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-xs text-neutral-400 font-sans">
              Will create customer profile &amp; project record
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode('picker')}
                className="text-xs"
              >
                <span>Back</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmProject}
                disabled={!name.trim() || !location.trim() || savingNotice !== null}
                className="text-xs px-5"
              >
                <span>{savingNotice || 'Create Client & Continue'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1Purpose;
