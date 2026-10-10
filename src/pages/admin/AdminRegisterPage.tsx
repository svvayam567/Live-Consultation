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
import { Sparkles, Play, Loader2, AlertCircle, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

export const AdminRegisterPage: React.FC = () => {
  const { isAdmin, isLoading: authLoading, profile } = useAuth();
  const { importSession, setSlide } = useConsultation();
  const navigate = useNavigate();

  const [title, setTitle] = useState<CustomerTitle>('Mr.');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [product, setProduct] = useState<CustomerProduct>('Temple');
  const [location, setLocation] = useState('');
  const [consultationOption, setConsultationOption] = useState<'create_new' | 'link_existing'>('create_new');
  const [linkedConsultationId, setLinkedConsultationId] = useState('');
  const [existingConsultations, setExistingConsultations] = useState<Array<{ id: string; client_name: string; project_name?: string; current_step?: number; client_phone?: string }>>([]);

  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingCustomerNotice, setExistingCustomerNotice] = useState<{ id: string; name: string; phone: string; project_name?: string } | null>(null);

  // Field-level inline errors
  const [errors, setErrors] = useState<{
    title?: string;
    name?: string;
    surname?: string;
    phone?: string;
    password?: string;
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
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
    if (existingCustomerNotice) {
      setExistingCustomerNotice(null);
    }
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
      newErrors.phone = 'Please enter exactly 10 digits';
    }

    if (!password.trim()) {
      newErrors.password = 'Create password is required';
    } else if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    setExistingCustomerNotice(null);

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

      // b) Check if mobile number already exists (Prevent duplicate customer accounts)
      let existingClient: CustomerRecord | null = null;

      if (isSupabaseConfigured && supabase) {
        try {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .or(`phone.eq.${formattedPhone},phone.ilike.%${cleanDigits}`)
            .limit(1);

          if (profiles && profiles.length > 0) {
            existingClient = profiles[0] as CustomerRecord;
          }
        } catch (err) {
          console.warn('Supabase profile query fallback:', err);
        }
      }

      if (!existingClient) {
        const localCustomers = getRegisteredCustomers();
        const matchedLocal = localCustomers.find(c =>
          c.phone.replace(/\D/g, '').endsWith(cleanDigits)
        );
        if (matchedLocal) {
          existingClient = matchedLocal;
        }
      }

      // If customer already exists: Show "Customer already exists" and stop without creating duplicate
      if (existingClient) {
        setExistingCustomerNotice({
          id: existingClient.id,
          name: existingClient.name,
          phone: existingClient.phone || formattedPhone,
          project_name: existingClient.project_name
        });
        setSubmitting(false);
        return;
      }

      // c) Call Edge Function to create Customer Login + Profile (role = 'client') + Project + Consultation
      let customerUserId: string;
      let linkedConsultId: string;
      let createdProjectId: string | null = null;

      if (isSupabaseConfigured && supabase) {
        const { data: edgeRes, error: edgeErr } = await supabase.functions.invoke('register-customer', {
          body: {
            action: 'register',
            name: name.trim(),
            phone: formattedPhone,
            password: password.trim(),
            title,
            surname: finalSurname,
            product,
            project_name: finalProjectName,
            location: cleanLocation,
            create_new_consultation: consultationOption === 'create_new',
            consultation_id: linkedConsultationId || undefined
          }
        });

        if (edgeErr || !edgeRes?.success) {
          if (edgeRes?.code === 'CUSTOMER_EXISTS' || edgeRes?.error?.includes('already exists')) {
            setExistingCustomerNotice({
              id: edgeRes?.customer?.id || 'existing',
              name: edgeRes?.customer?.name || name.trim(),
              phone: formattedPhone,
              project_name: edgeRes?.customer?.project_name
            });
            setSubmitting(false);
            return;
          }
          // Account creation failed: Do NOT save half-created customer, show clear error and keep form filled in
          throw new Error(edgeRes?.error || edgeErr?.message || 'Failed to create customer login. Please try again.');
        }

        customerUserId = edgeRes.customer.id;
        linkedConsultId = edgeRes.customer.consultation_id;
        createdProjectId = edgeRes.customer.project_id || null;
      } else {
        // Dev Mock Mode Fallback
        customerUserId = 'cust-' + Date.now().toString().slice(-4);
        linkedConsultId = 'draft-' + Date.now().toString().slice(-4);
        createdProjectId = 'proj-' + Date.now().toString().slice(-4);

        const newCustomer: CustomerRecord = {
          id: customerUserId,
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

        const currentCustomers = getRegisteredCustomers();
        saveRegisteredCustomers([newCustomer, ...currentCustomers]);
      }

      // Handle Linking Existing Consultation
      if (consultationOption === 'link_existing' && linkedConsultationId) {
        let foundExistingConsultation: any = null;

        try {
          const stored = localStorage.getItem('svvayam_admin_consultations_v1');
          if (stored) {
            const list = JSON.parse(stored);
            foundExistingConsultation = list.find((c: any) => c.id === linkedConsultationId);
          }
        } catch {}

        const resumeStep = foundExistingConsultation?.current_step || (foundExistingConsultation?.state?.slide ? foundExistingConsultation.state.slide + 1 : 1);

        if (foundExistingConsultation?.state) {
          const updatedState = {
            ...foundExistingConsultation.state,
            project_name: finalProjectName,
            client_id: customerUserId,
            project_id: createdProjectId,
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

        navigate(`/admin/consultation?id=${linkedConsultationId}&client=${customerUserId}&step=${resumeStep}`, {
          state: {
            newCredentials: {
              phone: formattedPhone,
              password: password.trim(),
              clientName: name.trim(),
              projectName: finalProjectName
            }
          }
        });
        return;
      }

      // Default: Setup New Consultation draft and jump to Step 1
      const consultId = linkedConsultId || ('draft-' + Date.now().toString().slice(-4));
      const newConsultState: any = {
        version: 1,
        id: consultId,
        slide: 0,
        project_name: finalProjectName,
        client_id: customerUserId,
        project_id: createdProjectId,
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

      // Save consultation draft in local storage for Admin records
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

      // Initialize ConsultationContext with this project and jump to Step 1
      importSession(newConsultState);
      setSlide(0);

      // Immediately navigate to Live Consultation Step 1
      // Pass one-time newCredentials in router state (never stored in DB or Sheets)
      navigate(`/admin/consultation?id=${consultId}&client=${customerUserId}&step=1`, {
        state: {
          newCredentials: {
            phone: formattedPhone,
            password: password.trim(),
            clientName: name.trim(),
            projectName: finalProjectName
          }
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
              className="text-xs text-rose-600 hover:text-rose-900 font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Existing Customer Notice Banner (Prevent Duplicates) */}
        {existingCustomerNotice && (
          <div className="p-5 rounded-[18px] bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-3 animate-fadeIn shadow-xs">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-amber-950 font-sans">
                  Customer already exists with mobile number {existingCustomerNotice.phone}
                </h4>
                <p className="text-amber-800 leading-relaxed font-sans">
                  An account for <strong>{existingCustomerNotice.name}</strong> is already registered. To prevent duplicate accounts, open or continue their consultation instead.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-amber-200/80">
              <button
                type="button"
                onClick={() => navigate(`/admin/consultation?client=${existingCustomerNotice.id}&step=1`)}
                className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white hover:bg-neutral-800 font-semibold text-xs cursor-pointer flex items-center gap-2 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Open Existing Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setExistingCustomerNotice(null)}
                className="px-3.5 py-2 rounded-full border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-medium cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Live Project Name Generated Preview Card (Monochrome Black & White) */}
        <div className="p-5 rounded-[18px] bg-white border border-[#ECECEC] shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center space-x-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0">
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

        {/* Registration Form Card */}
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
                  helperText="Exact spelling preserved"
                  error={errors.surname}
                />
              </div>

              {/* Mobile Number with Fixed +91 Prefix (10 digits) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-[12px] shadow-xs">
                  <span className="inline-flex items-center px-3.5 rounded-l-[12px] border border-r-0 border-[#E5E5E5] bg-[#F7F7F7] text-xs font-mono font-semibold text-[#0A0A0A] select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="9845012345"
                    maxLength={10}
                    className={cn(
                      "flex-1 px-3.5 py-2.5 rounded-r-[12px] border bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:ring-1",
                      errors.phone
                        ? "border-rose-500 focus:ring-rose-500 ring-1 ring-rose-500"
                        : "border-[#E5E5E5] focus:ring-[#0A0A0A]"
                    )}
                  />
                </div>
                {errors.phone ? (
                  <p className="mt-1 text-[11px] text-rose-600 font-sans">{errors.phone}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-neutral-400 font-mono">Fixed +91 prefix · Exactly 10 digits</p>
                )}
              </div>

              {/* Create Password Field with Show/Hide Toggle */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Create Password (Portal Login)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: undefined }));
                      }
                    }}
                    placeholder="Min 6 characters"
                    className={cn(
                      "w-full px-3.5 py-2.5 pr-10 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1",
                      errors.password
                        ? "border-rose-500 focus:ring-rose-500 ring-1 ring-rose-500"
                        : "border-[#E5E5E5] focus:ring-[#0A0A0A]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-[11px] text-rose-600 font-sans">{errors.password}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-neutral-400 font-mono">Min 6 characters · Shared with customer</p>
                )}
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
              <div className="sm:col-span-2">
                <Input
                  label="Project Location"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru / Jubilee Hills, Hyderabad"
                  error={errors.location}
                />
              </div>
            </div>

            {/* Consultation Linking Option (Radio Cards) */}
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
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                      <span>STARTING LIVE CONSULTATION...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
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

