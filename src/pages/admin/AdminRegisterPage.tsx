import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useAuth, getRegisteredCustomers, saveRegisteredCustomers } from '../../context/AuthContext';
import { useConsultation } from '../../context/ConsultationContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { extractSurname, formatProjectName, cn } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct, CustomerRecord } from '../../types/consultation';
import type { ConsultationRecord } from './AdminClientsPage';
import { Sparkles, Play, Loader2, AlertCircle, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

const COMMON_PASSWORDS = new Set([
  'password', 'password1', 'password12', 'password123', 'password1234',
  '12345678', '123456789', '1234567890', 'qwertyuiop', 'qwerty123',
  'admin123', 'welcome123', 'letmein123', 'pass1234', 'iloveyou123',
  'svvayam123', 'svvayam1234', 'svvayam@123', 'temple123', 'mandir123'
]);

const checkIsCommonOrContainsPersonal = (
  pw: string,
  custName: string,
  custSurname: string,
  custPhone: string
): boolean => {
  const cleanPw = pw.toLowerCase().trim();
  if (!cleanPw) return false;
  if (COMMON_PASSWORDS.has(cleanPw)) return true;

  // Check if contains customer's name (if 3+ characters)
  const cleanName = custName.toLowerCase().trim().replace(/[^a-z]/g, '');
  if (cleanName.length >= 3 && cleanPw.includes(cleanName)) {
    return true;
  }

  // Check if contains customer's surname (if 3+ characters)
  const cleanSurname = custSurname.toLowerCase().trim().replace(/[^a-z]/g, '');
  if (cleanSurname.length >= 3 && cleanPw.includes(cleanSurname)) {
    return true;
  }

  // Check if contains customer's phone digits
  const phoneDigits = custPhone.replace(/\D/g, '').slice(-10);
  if (phoneDigits.length >= 6 && cleanPw.includes(phoneDigits)) {
    return true;
  }
  if (phoneDigits.length >= 6) {
    const last6 = phoneDigits.slice(-6);
    if (cleanPw.includes(last6)) return true;
  }

  return false;
};

export const AdminRegisterPage: React.FC = () => {
  const { isAdmin, isLoading: authLoading, profile } = useAuth();
  const { importSession, setSlide } = useConsultation();
  const navigate = useNavigate();

  // Form Fields
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

  // Touched state per field (prevents showing errors on untouched fields upon initial load)
  const [touched, setTouched] = useState<Record<string, boolean>>({
    title: false,
    name: false,
    surname: false,
    phone: false,
    password: false,
    product: false,
    location: false,
    linkedConsultationId: false,
  });

  const markTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingCustomerNotice, setExistingCustomerNotice] = useState<{ id: string; name: string; phone: string; project_name?: string } | null>(null);

  // Field-level inline errors
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  // Auto-generate project name live preview: "<Title> <Surname>'s <Product>"
  const generatedProjectName = useMemo(() => {
    const finalSurname = surname.trim() || (name.trim() ? extractSurname(name.trim()) : '');
    return formatProjectName(title, finalSurname, product);
  }, [title, surname, name, product]);

  // Live password criteria check (8+ chars, letter, number, symbol)
  const passwordCriteria = useMemo(() => {
    return {
      hasMinLength: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[^a-zA-Z0-9\s]/.test(password),
    };
  }, [password]);

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

  // Handle Full Name change: automatically extract surname if not manually customized
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
    // Re-check password if already touched (in case password contained the name)
    if (touched.password && password) {
      const pwErr = validateField('password', password, val, surname, phone);
      setErrors(prev => ({ ...prev, password: pwErr }));
    }
  };

  const handleSurnameChange = (val: string) => {
    setSurnameTouched(true);
    setSurname(val);
    if (errors.surname) {
      setErrors(prev => ({ ...prev, surname: undefined }));
    }
    if (touched.password && password) {
      const pwErr = validateField('password', password, name, val, phone);
      setErrors(prev => ({ ...prev, password: pwErr }));
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
    if (touched.password && password) {
      const pwErr = validateField('password', password, name, surname, digits);
      setErrors(prev => ({ ...prev, password: pwErr }));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (touched.password) {
      const pwErr = validateField('password', val, name, surname, phone);
      setErrors(prev => ({ ...prev, password: pwErr }));
    }
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  // Field-level Validator
  const validateField = (
    fieldName: string,
    val?: string,
    currentName = name,
    currentSurname = surname,
    currentPhone = phone
  ): string | undefined => {
    switch (fieldName) {
      case 'title':
        return !title ? 'Title is required' : undefined;
      case 'name':
        return !(val !== undefined ? val : currentName).trim() ? 'Full customer name is required' : undefined;
      case 'surname':
        return !(val !== undefined ? val : currentSurname).trim() ? 'Surname is required' : undefined;
      case 'phone': {
        const p = val !== undefined ? val : currentPhone;
        const clean = p.replace(/\D/g, '').slice(-10);
        if (!p.trim()) return 'Mobile number is required';
        if (clean.length !== 10) return 'Please enter exactly 10 digits';
        return undefined;
      }
      case 'password': {
        const pw = val !== undefined ? val : password;
        if (!pw.trim()) {
          return 'Password is required';
        }
        if (checkIsCommonOrContainsPersonal(pw, currentName, currentSurname, currentPhone)) {
          return 'That password is too common. Try a different one with a mix of letters, numbers and symbols.';
        }
        const meetsCriteria =
          pw.length >= 8 &&
          /[a-zA-Z]/.test(pw) &&
          /[0-9]/.test(pw) &&
          /[^a-zA-Z0-9\s]/.test(pw);
        if (!meetsCriteria) {
          return 'Password is too weak. Add letters, numbers and a symbol like @ # $ !';
        }
        return undefined;
      }
      case 'product':
        return !product ? 'Product type is required' : undefined;
      case 'location':
        return !(val !== undefined ? val : location).trim() ? 'Project location is required' : undefined;
      case 'linkedConsultationId':
        return consultationOption === 'link_existing' && !linkedConsultationId
          ? 'Please select a consultation to link'
          : undefined;
      default:
        return undefined;
    }
  };

  // Comprehensive Form Validation on Submit
  const validateForm = (): boolean => {
    const newErrors: Record<string, string | undefined> = {
      title: validateField('title'),
      name: validateField('name'),
      surname: validateField('surname'),
      phone: validateField('phone'),
      password: validateField('password'),
      product: validateField('product'),
      location: validateField('location'),
      linkedConsultationId: validateField('linkedConsultationId'),
    };

    const cleaned: Record<string, string> = {};
    for (const [k, v] of Object.entries(newErrors)) {
      if (v) cleaned[k] = v;
    }

    setErrors(cleaned);
    return Object.keys(cleaned).length === 0;
  };

  // Submit Handler: "Start Live Consultation"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setExistingCustomerNotice(null);

    // Mark all fields as touched on submit
    setTouched({
      title: true,
      name: true,
      surname: true,
      phone: true,
      password: true,
      product: true,
      location: true,
      linkedConsultationId: true,
    });

    // Validate all required fields inline
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

      // 1. Check if mobile number already exists in database or local cache (Prevent Duplicates)
      let existingClient: CustomerRecord | null = null;

      if (isSupabaseConfigured && supabase) {
        try {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, name, phone, project_name')
            .or(`phone.eq.${formattedPhone},phone.ilike.%${cleanDigits}%`)
            .limit(1);

          if (profiles && profiles.length > 0) {
            existingClient = profiles[0] as CustomerRecord;
          }
        } catch (queryErr) {
          console.warn('Profiles duplicate query note:', queryErr);
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

      // If customer already exists: show notice with shortcut to their consultation
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

      // 2. Perform Registration
      let customerUserId = 'cust-' + cleanDigits;
      let linkedConsultId = linkedConsultationId || '';
      let createdProjectId: string | null = null;
      let usedEdgeFunction = false;

      // Try Edge Function first if Supabase is active
      if (isSupabaseConfigured && supabase) {
        try {
          const response = await supabase.functions.invoke('register-customer', {
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

          if (response.data?.success && response.data.customer) {
            customerUserId = response.data.customer.id;
            linkedConsultId = response.data.customer.consultation_id;
            createdProjectId = response.data.customer.project_id || null;
            usedEdgeFunction = true;
          } else if (response.data?.code === 'CUSTOMER_EXISTS' || response.data?.error?.includes('already exists')) {
            setExistingCustomerNotice({
              id: response.data?.customer?.id || 'existing',
              name: response.data?.customer?.name || name.trim(),
              phone: formattedPhone,
              project_name: response.data?.customer?.project_name
            });
            setSubmitting(false);
            return;
          } else if (response.error) {
            // Check if error contains CUSTOMER_EXISTS
            if (typeof (response.error as any).context?.json === 'function') {
              try {
                const errJson = await (response.error as any).context.json();
                if (errJson?.code === 'CUSTOMER_EXISTS' || errJson?.error?.includes('already exists')) {
                  setExistingCustomerNotice({
                    id: errJson?.customer?.id || 'existing',
                    name: errJson?.customer?.name || name.trim(),
                    phone: formattedPhone,
                    project_name: errJson?.customer?.project_name
                  });
                  setSubmitting(false);
                  return;
                }
              } catch {}
            }
            console.warn('Edge Function returned non-2xx status, using seamless direct registration fallback.');
          }
        } catch (edgeErr) {
          console.warn('Edge Function unreachable, using seamless direct registration fallback:', edgeErr);
        }
      }

      // 3. Fallback: Direct registration in Supabase tables & local cache (never blocks the consultation flow)
      if (!usedEdgeFunction) {
        if (isSupabaseConfigured && supabase) {
          // Attempt creating customer in Auth via temporary client with session persistence disabled
          try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
            const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
            if (supabaseUrl && supabasePublishableKey) {
              const tempClient = createClient(supabaseUrl, supabasePublishableKey, {
                auth: { persistSession: false, autoRefreshToken: false }
              });
              const { data: authData } = await tempClient.auth.signUp({
                email: `${cleanDigits}@svvayam.internal`,
                password: password.trim(),
                options: {
                  data: {
                    name: name.trim(),
                    phone: formattedPhone,
                    title,
                    surname: finalSurname,
                    product,
                    project_name: finalProjectName,
                    role: 'client'
                  }
                }
              });
              if (authData?.user?.id) {
                customerUserId = authData.user.id;
              }
            }
          } catch (signUpErr) {
            console.warn('Auth sign up notice (proceeding with profile):', signUpErr);
          }

          // Insert / update customer profile
          try {
            await supabase.from('profiles').upsert({
              id: customerUserId,
              name: name.trim(),
              phone: formattedPhone,
              role: 'client',
              title,
              surname: finalSurname,
              product,
              project_name: finalProjectName,
              location: cleanLocation,
              is_active: true
            }, { onConflict: 'id' });
          } catch (profErr) {
            console.warn('Profiles upsert notice:', profErr);
          }

          // Insert project
          try {
            const { data: newProj } = await supabase.from('projects').insert({
              client_id: customerUserId,
              project_name: finalProjectName,
              product_type: product,
              location: cleanLocation || 'India',
              status: 'draft'
            }).select('id').maybeSingle();
            if (newProj?.id) {
              createdProjectId = newProj.id;
            }
          } catch (projErr) {
            console.warn('Projects insert notice:', projErr);
          }

          // Insert / link consultation
          if (consultationOption === 'create_new' || !linkedConsultId) {
            try {
              const { data: newConsult } = await supabase.from('consultations').insert({
                client_id: customerUserId,
                project_id: createdProjectId,
                client_phone: formattedPhone,
                created_by: profile?.id || undefined,
                project_name: finalProjectName,
                client_name: name.trim(),
                title,
                surname: finalSurname,
                product,
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
                  date: new Date().toLocaleDateString('en-CA'),
                },
                status: 'draft',
                portal_visible: true,
                current_step: 1
              }).select('id').maybeSingle();
              if (newConsult?.id) {
                linkedConsultId = newConsult.id;
              }
            } catch (consErr) {
              console.warn('Consultations insert notice:', consErr);
            }
          }
        }

        // Save new customer in local registered customers store
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
        if (!currentCustomers.some(c => c.phone.replace(/\D/g, '').endsWith(cleanDigits))) {
          saveRegisteredCustomers([newCustomer, ...currentCustomers]);
        }
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
          <div className="p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-rose-900">{errorMessage}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-600 hover:text-rose-900 font-semibold cursor-pointer shrink-0"
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
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
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

        {/* Live Project Name Generated Preview Card */}
        <div className="p-5 rounded-[18px] bg-white border border-[#ECECEC] shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center space-x-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
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

        {/* Registration Form Card: Symmetrical 2-Column Grid */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 items-start">
              {/* ROW 1 - Col 1: Title Dropdown */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Title
                </label>
                <select
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value as CustomerTitle);
                    if (touched.title) {
                      setErrors(prev => ({ ...prev, title: undefined }));
                    }
                  }}
                  onBlur={() => markTouched('title')}
                  className={cn(
                    "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none transition-colors",
                    touched.title && errors.title
                      ? "border-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
                  )}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                <div className="min-h-[20px] mt-1">
                  {touched.title && errors.title && (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.title}</p>
                  )}
                </div>
              </div>

              {/* ROW 1 - Col 2: Full Customer Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Full Customer Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => markTouched('name')}
                  placeholder="e.g. Mala Sharma"
                  autoFocus
                  className={cn(
                    "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none transition-colors box-border",
                    touched.name && errors.name
                      ? "border-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
                  )}
                />
                <div className="min-h-[20px] mt-1">
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* ROW 2 - Col 1: Surname */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Surname (Family Name)
                </label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => handleSurnameChange(e.target.value)}
                  onBlur={() => markTouched('surname')}
                  placeholder="e.g. Sharma"
                  className={cn(
                    "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none transition-colors box-border",
                    touched.surname && errors.surname
                      ? "border-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
                  )}
                />
                <div className="min-h-[20px] mt-1">
                  {touched.surname && errors.surname ? (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.surname}</p>
                  ) : (
                    <p className="text-[11px] text-neutral-400 font-mono">Exact spelling preserved</p>
                  )}
                </div>
              </div>

              {/* ROW 2 - Col 2: Product Type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Product Type
                </label>
                <select
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value as CustomerProduct);
                    if (touched.product) {
                      setErrors(prev => ({ ...prev, product: undefined }));
                    }
                  }}
                  onBlur={() => markTouched('product')}
                  className={cn(
                    "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none transition-colors",
                    touched.product && errors.product
                      ? "border-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
                  )}
                >
                  <option value="Temple">Temple</option>
                  <option value="Puja Mandir">Puja Mandir</option>
                  <option value="Sanctum">Sanctum</option>
                </select>
                <div className="min-h-[20px] mt-1">
                  {touched.product && errors.product && (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.product}</p>
                  )}
                </div>
              </div>

              {/* ROW 3 - Col 1: Mobile Number with Fixed +91 Prefix */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Mobile Number
                </label>
                <div className={cn(
                  "flex items-center h-11 w-full rounded-[12px] border bg-white overflow-hidden transition-colors",
                  touched.phone && errors.phone
                    ? "border-rose-500 ring-1 ring-rose-500"
                    : "border-[#E5E5E5] focus-within:ring-1 focus-within:ring-[#0A0A0A] focus-within:border-[#0A0A0A]"
                )}>
                  <span className="flex items-center justify-center px-3.5 h-full bg-[#F7F7F7] border-r border-[#E5E5E5] text-xs font-mono font-semibold text-[#0A0A0A] select-none shrink-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => markTouched('phone')}
                    placeholder="9845012345"
                    maxLength={10}
                    className="w-full min-w-0 h-full px-3.5 bg-transparent text-xs font-mono text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none box-border"
                  />
                </div>
                <div className="min-h-[20px] mt-1">
                  {touched.phone && errors.phone ? (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.phone}</p>
                  ) : (
                    <p className="text-[11px] text-neutral-400 font-mono">Fixed +91 prefix · Exactly 10 digits</p>
                  )}
                </div>
              </div>

              {/* ROW 3 - Col 2: Password with Show/Hide and Portal Helper */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap">
                    Password
                  </label>
                  <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline truncate">
                    Used for the customer's portal login
                  </span>
                </div>
                <div className={cn(
                  "relative flex items-center h-11 w-full rounded-[12px] border bg-white transition-colors",
                  touched.password && errors.password
                    ? "border-rose-500 ring-1 ring-rose-500"
                    : "border-[#E5E5E5] focus-within:ring-1 focus-within:ring-[#0A0A0A] focus-within:border-[#0A0A0A]"
                )}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => markTouched('password')}
                    placeholder="Create customer password"
                    className="w-full min-w-0 h-full px-3.5 pr-11 bg-transparent text-xs font-sans text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none box-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] p-1 rounded transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Live Password Strength Checklist */}
                <div className="mt-2 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors",
                      passwordCriteria.hasMinLength
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-medium"
                        : "bg-neutral-50 text-neutral-400 border-neutral-200"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        passwordCriteria.hasMinLength ? "bg-emerald-500" : "bg-neutral-300"
                      )} />
                      8+ characters
                    </span>

                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors",
                      passwordCriteria.hasLetter
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-medium"
                        : "bg-neutral-50 text-neutral-400 border-neutral-200"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        passwordCriteria.hasLetter ? "bg-emerald-500" : "bg-neutral-300"
                      )} />
                      A letter
                    </span>

                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors",
                      passwordCriteria.hasNumber
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-medium"
                        : "bg-neutral-50 text-neutral-400 border-neutral-200"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        passwordCriteria.hasNumber ? "bg-emerald-500" : "bg-neutral-300"
                      )} />
                      A number
                    </span>

                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border transition-colors",
                      passwordCriteria.hasSymbol
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-medium"
                        : "bg-neutral-50 text-neutral-400 border-neutral-200"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        passwordCriteria.hasSymbol ? "bg-emerald-500" : "bg-neutral-300"
                      )} />
                      A symbol
                    </span>
                  </div>

                  {/* Reserved fixed-height error/helper text */}
                  <div className="min-h-[18px]">
                    {touched.password && errors.password ? (
                      <p className="text-[11px] text-rose-600 font-sans leading-tight animate-fadeIn">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="text-[11px] text-neutral-400 font-sans sm:hidden">
                        Used for the customer's portal login
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 4: Project Location (Full Width) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 whitespace-nowrap mb-1.5">
                  Project Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onBlur={() => markTouched('location')}
                  placeholder="e.g. Indiranagar, Bengaluru / Jubilee Hills, Hyderabad"
                  className={cn(
                    "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none transition-colors box-border",
                    touched.location && errors.location
                      ? "border-rose-500 ring-1 ring-rose-500"
                      : "border-[#E5E5E5] focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
                  )}
                />
                <div className="min-h-[20px] mt-1">
                  {touched.location && errors.location ? (
                    <p className="text-[11px] text-rose-600 font-sans">{errors.location}</p>
                  ) : (
                    <p className="text-[11px] text-neutral-400 font-mono">City / Neighborhood for site analysis & shipping</p>
                  )}
                </div>
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
                    onBlur={() => markTouched('linkedConsultationId')}
                    className={cn(
                      "w-full h-11 px-3.5 rounded-[12px] border bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1",
                      touched.linkedConsultationId && errors.linkedConsultationId
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
                  {touched.linkedConsultationId && errors.linkedConsultationId && (
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
                      <Loader2 className="w-3.5 h-3.5 text-[#FACC15] animate-spin" />
                      <span>STARTING LIVE CONSULTATION...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
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
