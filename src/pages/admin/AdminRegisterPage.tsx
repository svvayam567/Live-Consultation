import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth, getRegisteredCustomers, saveRegisteredCustomers } from '../../context/AuthContext';
import { useConsultation } from '../../context/ConsultationContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { extractSurname, formatProjectName, cn } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct, CustomerRecord } from '../../types/consultation';
import type { ConsultationRecord } from './AdminClientsPage';
import { Sparkles, Play, Loader2, AlertCircle } from 'lucide-react';

export const AdminRegisterPage: React.FC = () => {
  const { isAdmin, isLoading: authLoading, profile } = useAuth();
  const { importSession, setSlide } = useConsultation();
  const navigate = useNavigate();

  const [title, setTitle] = useState<CustomerTitle>('Mr.');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState<CustomerProduct>('Temple');
  const [location, setLocation] = useState('');
  const [consultationOption, setConsultationOption] = useState<'create_new' | 'link_existing'>('create_new');
  const [linkedConsultationId, setLinkedConsultationId] = useState('');
  const [existingConsultations, setExistingConsultations] = useState<Array<{ id: string; client_name: string; project_name?: string; current_step?: number; client_phone?: string }>>([]);

  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Field-level inline errors
  const [errors, setErrors] = useState<{
    title?: string;
    name?: string;
    surname?: string;
    phone?: string;
    product?: string;
    location?: string;
    linkedConsultationId?: string;
  }>({});

  // Auto-generate project name live preview: "<Title> <Surname>'s <Product>"
  const generatedProjectName = useMemo(() => {
    const finalSurname = surname.trim() || (name.trim() ? extractSurname(name.trim()) : '');
    return formatProjectName(title, finalSurname, product);
  }, [title, surname, name, product]);

  // Load consultations for linking option
  useEffect(() => {
    const loadConsultations = async () => {
      const list: Array<{ id: string; client_name: string; project_name?: string; current_step?: number; client_phone?: string }> = [];

      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase
            .from('consultations')
            .select('id, fields, project_name, current_step, client_phone')
            .order('updated_at', { ascending: false });

          if (data) {
            data.forEach((c: any) => {
              list.push({
                id: c.id,
                client_name: c.fields?.client || 'Untitled Consultation',
                project_name: c.project_name || c.fields?.projectName,
                current_step: c.current_step || 1,
                client_phone: c.client_phone || c.fields?.phone
              });
            });
          }
        } catch {
          // Ignored
        }
      }

      try {
        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            parsed.forEach((c: any) => {
              if (!list.some(item => item.id === c.id)) {
                list.push({
                  id: c.id,
                  client_name: c.client_name,
                  project_name: c.project_name,
                  current_step: c.current_step || 1,
                  client_phone: c.client_phone
                });
              }
            });
          }
        }
      } catch {
        // Ignored
      }

      setExistingConsultations(list);
    };

    loadConsultations();
  }, []);

  // Filtered consultations for linking (if phone is typed, prioritize matching phone)
  const clientMatchingConsultations = useMemo(() => {
    const cleanDigits = phone.replace(/\D/g, '').slice(-10);
    if (cleanDigits.length >= 6) {
      const matches = existingConsultations.filter(c =>
        c.client_phone && c.client_phone.replace(/\D/g, '').endsWith(cleanDigits)
      );
      if (matches.length > 0) return matches;
    }
    return existingConsultations;
  }, [existingConsultations, phone]);

  // When full name changes, automatically extract surname if not manually customized
  const handleNameChange = (val: string) => {
    setName(val);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
    if (!surnameTouched) {
      const extracted = extractSurname(val);
      setSurname(extracted);
      if (extracted && errors.surname) {
        setErrors(prev => ({ ...prev, surname: undefined }));
      }
    }
  };

  const handleSurnameChange = (val: string) => {
    setSurnameTouched(true);
    setSurname(val);
    if (errors.surname) {
      setErrors(prev => ({ ...prev, surname: undefined }));
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  // Inline Validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!title) {
      newErrors.title = 'Title is required';
    }

    if (!name.trim()) {
      newErrors.name = 'Full customer name is required';
    }

    if (!surname.trim()) {
      newErrors.surname = 'Surname is required';
    }

    const cleanDigits = phone.replace(/\D/g, '').slice(-10);
    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (cleanDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!product) {
      newErrors.product = 'Product type is required';
    }

    if (!location.trim()) {
      newErrors.location = 'Project location is required';
    }

    if (consultationOption === 'link_existing' && !linkedConsultationId) {
      newErrors.linkedConsultationId = 'Please select a consultation to link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler: "Start Live Consultation"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // a) Validate all required fields inline
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const cleanDigits = phone.replace(/\D/g, '').slice(-10);
      const formattedPhone = '+91' + cleanDigits;
      const finalSurname = surname.trim() || extractSurname(name.trim());
      const finalProjectName = formatProjectName(title, finalSurname, product);
      const cleanLocation = location.trim();

      // b) Check if mobile number already exists to prevent duplicate customer
      let existingClient: CustomerRecord | null = null;

      // Check in Supabase profiles
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .or(`phone.eq.${formattedPhone},phone.ilike.%${cleanDigits}`)
            .limit(1);

          if (profiles && profiles.length > 0) {
            const p = profiles[0];
            existingClient = {
              id: p.id,
              name: p.name,
              title: p.title || title,
              surname: p.surname || finalSurname,
              product: p.product || product,
              project_name: p.project_name || finalProjectName,
              phone: p.phone,
              location: p.location || cleanLocation,
              is_active: p.is_active ?? true,
              created_at: p.created_at
            };
          }
        } catch (err) {
          console.warn('Supabase profile query fallback:', err);
        }
      }

      // Check in local registered customers
      if (!existingClient) {
        const localCustomers = getRegisteredCustomers();
        const matchedLocal = localCustomers.find(c =>
          c.phone.replace(/\D/g, '').endsWith(cleanDigits)
        );
        if (matchedLocal) {
          existingClient = matchedLocal;
        }
      }

      const isExisting = Boolean(existingClient);
      const clientId = existingClient ? existingClient.id : 'cust-' + Date.now().toString().slice(-4);
      const projectId = 'proj-' + Date.now().toString().slice(-4);

      // If mobile number is new: create customer profile with role 'customer'
      if (!isExisting) {
        const newCustomer: CustomerRecord = {
          id: clientId,
          name: name.trim(),
          title,
          surname: finalSurname,
          product,
          project_name: finalProjectName,
          phone: formattedPhone,
          location: cleanLocation,
          is_active: true,
          created_at: new Date().toISOString()
        };

        // Save locally
        const currentCustomers = getRegisteredCustomers();
        saveRegisteredCustomers([newCustomer, ...currentCustomers]);

        // Save in Supabase
        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('profiles').upsert({
              id: clientId,
              name: name.trim(),
              title,
              surname: finalSurname,
              product,
              project_name: finalProjectName,
              phone: formattedPhone,
              role: 'customer',
              location: cleanLocation,
              is_active: true
            });
          } catch (err) {
            console.warn('Supabase profile creation note:', err);
          }
        }
      }

      // Create new project row attached to this client
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('projects').insert({
            client_id: clientId,
            project_name: finalProjectName,
            product_type: product,
            location: cleanLocation,
            status: 'draft'
          });
        } catch (err) {
          console.warn('Supabase project creation note:', err);
        }
      }

      // Handle Consultation Creation or Linking
      if (consultationOption === 'link_existing' && linkedConsultationId) {
        // Link Existing Consultation
        let foundExistingConsultation: any = null;

        // Try local storage
        try {
          const stored = localStorage.getItem('svvayam_admin_consultations_v1');
          if (stored) {
            const list = JSON.parse(stored);
            foundExistingConsultation = list.find((c: any) => c.id === linkedConsultationId);
          }
        } catch {}

        // If found in local or Supabase, update and open
        const resumeStep = foundExistingConsultation?.current_step || (foundExistingConsultation?.state?.slide ? foundExistingConsultation.state.slide + 1 : 1);

        if (foundExistingConsultation?.state) {
          const updatedState = {
            ...foundExistingConsultation.state,
            project_name: finalProjectName,
            client_id: clientId,
            project_id: projectId,
            fields: {
              ...foundExistingConsultation.state.fields,
              client: name.trim(),
              title,
              surname: finalSurname,
              product,
              projectName: finalProjectName,
              project_name: finalProjectName,
              location: cleanLocation,
              phone: formattedPhone,
              client_phone: formattedPhone
            }
          };
          importSession(updatedState);
          setSlide(Math.max(0, Math.min(7, resumeStep - 1)));
        }

        // Navigate to consultation at last completed step
        navigate(`/admin/consultation?id=${linkedConsultationId}&client=${clientId}&step=${resumeStep}`, {
          state: {
            notice: isExisting
              ? 'Existing client found, new project created and linked'
              : 'Consultation linked successfully'
          }
        });
        return;
      }

      // Default: Create New Consultation
      const consultId = 'draft-' + Date.now().toString().slice(-4);
      const newConsultState: any = {
        version: 1,
        id: consultId,
        slide: 0,
        project_name: finalProjectName,
        client_id: clientId,
        project_id: projectId,
        fields: {
          client: name.trim(),
          title,
          surname: finalSurname,
          product,
          projectName: finalProjectName,
          project_name: finalProjectName,
          phone: formattedPhone,
          client_phone: formattedPhone,
          location: cleanLocation,
          date: new Date().toISOString().split('T')[0],
          deity: '',
          rituals: '',
          dimensions: '',
          scope: '',
          estimate: ''
        },
        images: [],
        gallery: Array(16).fill(null),
        journey: Array(8).fill(null),
        selected_reference: null
      };

      // Save consultation draft in local storage for Admin listing
      const newConsultRecord: ConsultationRecord = {
        id: consultId,
        client_name: name.trim(),
        project_name: finalProjectName,
        title,
        surname: finalSurname,
        product,
        client_phone: formattedPhone,
        location: cleanLocation,
        consultant: profile?.name || 'Svvayam Staff',
        consultant_phone: profile?.phone || '+91 8074257384',
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        portal_visible: true,
        updated_at: new Date().toISOString(),
        current_step: 1,
        state: newConsultState
      };

      try {
        const storedConsultations = localStorage.getItem('svvayam_admin_consultations_v1');
        const list = storedConsultations ? JSON.parse(storedConsultations) : [];
        localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify([newConsultRecord, ...list]));
      } catch (err) {
        console.warn('Storage save note:', err);
      }

      // Also save to Supabase consultations
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('consultations').insert({
            id: consultId,
            client_id: clientId,
            project_id: projectId,
            project_name: finalProjectName,
            client_name: name.trim(),
            client_phone: formattedPhone,
            status: 'draft',
            fields: newConsultState.fields,
            current_step: 1,
            state: newConsultState
          });
        } catch (err) {
          console.warn('Supabase consultation insert note:', err);
        }
      }

      // Initialize ConsultationContext with this project and jump to Step 1
      importSession(newConsultState);
      setSlide(0);

      // Immediately navigate to Live Consultation Step 1
      navigate(`/admin/consultation?id=${consultId}&client=${clientId}&step=1`, {
        state: {
          notice: isExisting ? 'Existing client found, new project created' : undefined
        }
      });
    } catch (err: any) {
      console.error('Registration and consultation start error:', err);
      setErrorMessage(err?.message || 'Failed to start live consultation. Please try again.');
      setSubmitting(false);
    }
  };

  // Guard: Admin only
  if (!authLoading && !isAdmin) {
    return <Navigate to="/client" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col antialiased text-[#0A0A0A] pb-24 sm:pb-12">
      <AdminNav activeSection="register" />

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
        {/* Error Notice Banner if saving failed */}
        {errorMessage && (
          <div className="p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-600 hover:text-rose-900 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Project Name Generated Preview Card (Matches Screenshot Exactly) */}
        <div className="p-5 rounded-[18px] bg-white border border-[#E5CE00]/50 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center space-x-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#0E2A1C] text-[#FFE500] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-semibold text-[#0A0A0A]">
                {generatedProjectName || 'Temple'}
              </h2>
              <p className="text-[11px] font-mono text-neutral-400">
                Formula: &lt;Title&gt; &lt;Surname&gt;'s &lt;Product&gt; · Exact spelling preserved
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form Card (Matches Screenshot Exactly) */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Title Dropdown */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Title
                </label>
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value as CustomerTitle)}
                  className={cn(
                    "w-full px-3.5 py-2.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1",
                    errors.title
                      ? "border-rose-500 focus:ring-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-[#0A0A0A]"
                  )}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                {errors.title && (
                  <p className="mt-1 text-[11px] text-rose-600 font-sans">{errors.title}</p>
                )}
              </div>

              {/* Full Name */}
              <div className="sm:col-span-2">
                <Input
                  label="Full Customer Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Mala Sharma"
                  error={errors.name}
                  autoFocus
                />
              </div>

              {/* Editable Surname */}
              <div>
                <Input
                  label="Surname (family name)"
                  value={surname}
                  onChange={(e) => handleSurnameChange(e.target.value)}
                  placeholder="e.g. Sharma"
                  helperText="Exact spelling preserved (e.g. Pal)"
                  error={errors.surname}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <Input
                  label="Mobile Number"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="9845012345"
                  helperText="+91 default added automatically"
                  error={errors.phone}
                />
              </div>

              {/* Product Type Dropdown */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Product Type
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value as CustomerProduct)}
                  className={cn(
                    "w-full px-3.5 py-2.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1",
                    errors.product
                      ? "border-rose-500 focus:ring-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-[#0A0A0A]"
                  )}
                >
                  <option value="Temple">Temple</option>
                  <option value="Puja Mandir">Puja Mandir</option>
                  <option value="Sanctum">Sanctum</option>
                </select>
                {errors.product && (
                  <p className="mt-1 text-[11px] text-rose-600 font-sans">{errors.product}</p>
                )}
              </div>

              {/* Project Location */}
              <div className="sm:col-span-3">
                <Input
                  label="Project Location"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru / Jubilee Hills, Hyderabad"
                  error={errors.location}
                />
              </div>
            </div>

            {/* Consultation Linking Option (Radio Cards matching screenshot) */}
            <div className="space-y-3 pt-4 border-t border-[#ECECEC]">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                Consultation Lifecycle
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <label
                  className={cn(
                    "p-4 rounded-[14px] border cursor-pointer transition-all flex items-start space-x-3",
                    consultationOption === 'create_new'
                      ? "bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A]"
                      : "border-[#ECECEC] hover:bg-neutral-50"
                  )}
                >
                  <input
                    type="radio"
                    name="consultOption"
                    value="create_new"
                    checked={consultationOption === 'create_new'}
                    onChange={() => {
                      setConsultationOption('create_new');
                      setErrors(prev => ({ ...prev, linkedConsultationId: undefined }));
                    }}
                    className="mt-0.5 accent-[#0A0A0A]"
                  />
                  <div>
                    <strong className="block text-[#0A0A0A]">Create New Consultation</strong>
                    <span className="text-[11px] text-neutral-500">Initializes fresh draft in 8-stage journey</span>
                  </div>
                </label>

                <label
                  className={cn(
                    "p-4 rounded-[14px] border cursor-pointer transition-all flex items-start space-x-3",
                    consultationOption === 'link_existing'
                      ? "bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A]"
                      : "border-[#ECECEC] hover:bg-neutral-50"
                  )}
                >
                  <input
                    type="radio"
                    name="consultOption"
                    value="link_existing"
                    checked={consultationOption === 'link_existing'}
                    onChange={() => setConsultationOption('link_existing')}
                    className="mt-0.5 accent-[#0A0A0A]"
                  />
                  <div>
                    <strong className="block text-[#0A0A0A]">Link Existing Consultation</strong>
                    <span className="text-[11px] text-neutral-500">Attach an existing consultation record</span>
                  </div>
                </label>
              </div>

              {consultationOption === 'link_existing' && (
                <div className="pt-2 animate-fadeIn space-y-1.5">
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                    Select Consultation to Link
                  </label>
                  <select
                    value={linkedConsultationId}
                    onChange={(e) => {
                      setLinkedConsultationId(e.target.value);
                      if (errors.linkedConsultationId) {
                        setErrors(prev => ({ ...prev, linkedConsultationId: undefined }));
                      }
                    }}
                    className={cn(
                      "w-full px-3.5 py-2.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1",
                      errors.linkedConsultationId
                        ? "border-rose-500 focus:ring-rose-500 ring-1 ring-rose-500"
                        : "border-[#E5E5E5] focus:ring-[#0A0A0A]"
                    )}
                  >
                    <option value="">-- Choose unassigned or client consultation --</option>
                    {clientMatchingConsultations.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.project_name || c.client_name} (Step {c.current_step || 1} · ID: {c.id.slice(0, 8)})
                      </option>
                    ))}
                  </select>
                  {errors.linkedConsultationId && (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.linkedConsultationId}</p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-[#ECECEC]">
              {/* Cancel Button */}
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate('/admin/clients')}
                disabled={submitting}
                className="text-xs rounded-full px-5 hover:bg-neutral-100"
              >
                CANCEL
              </Button>

              {/* Start Live Consultation Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
                className="text-xs font-semibold px-6 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 shadow-md transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-[#FFE500] animate-spin" />
                      <span>STARTING LIVE CONSULTATION...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-[#FFE500] text-[#FFE500]" />
                      <span>START LIVE CONSULTATION</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminRegisterPage;
