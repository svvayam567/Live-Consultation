import React, { useState, useMemo } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth, getRegisteredCustomers, saveRegisteredCustomers } from '../../context/AuthContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { normalizeToE164, extractSurname, formatProjectName } from '../../lib/utils';
import type { CustomerTitle, CustomerProduct, CustomerRecord, ConsultationRecord } from '../../types/consultation';
import { UserPlus, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const AdminRegisterPage: React.FC = () => {
  const { isAdmin, isLoading: authLoading, profile } = useAuth();
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
  const [existingConsultations, setExistingConsultations] = useState<Array<{ id: string; client_name: string; project_name?: string }>>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Auto-generate project name live preview: "<Title> <Surname>'s <Product>"
  const generatedProjectName = useMemo(() => {
    const finalSurname = surname || extractSurname(name);
    return formatProjectName(title, finalSurname, product);
  }, [title, surname, name, product]);

  // Load existing consultations for linking option
  React.useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.from('consultations').select('id, fields, project_name').then(({ data }) => {
        if (data) {
          setExistingConsultations(
            data.map((c: any) => ({
              id: c.id,
              client_name: c.fields?.client || 'Untitled Consultation',
              project_name: c.project_name
            }))
          );
        }
      });
    } else {
      try {
        const stored = localStorage.getItem('svvayam_admin_consultations_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setExistingConsultations(parsed.map(c => ({ id: c.id, client_name: c.client_name, project_name: c.project_name })));
          }
        }
      } catch {
        // Ignored
      }
    }
  }, []);

  // When full name changes, automatically extract surname if surname field was not manually touched
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

  // Handle customer registration submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setToastMsg('Please enter both customer name and mobile number.');
      return;
    }

    setSubmitting(true);
    const formattedPhone = normalizeToE164(phone);
    const surnameFinal = surname.trim() || extractSurname(name.trim());
    const finalProjectName = formatProjectName(title, surnameFinal, product);

    // Call Supabase Edge Function if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.functions.invoke('register-customer', {
          body: {
            action: 'register',
            name: name.trim(),
            title,
            surname: surnameFinal,
            product,
            project_name: finalProjectName,
            phone: formattedPhone,
            location: location.trim(),
            create_new_consultation: consultationOption === 'create_new',
            consultation_id: consultationOption === 'link_existing' ? linkedConsultationId : undefined
          }
        });

        if (error) throw error;

        // Navigate to clients page with celebratory highlight
        navigate(`/admin/clients?highlight=new&project=${encodeURIComponent(finalProjectName)}`, {
          state: { message: `Customer ${name} registered with project "${finalProjectName}"!` }
        });
        return;
      } catch (err: any) {
        console.warn('Edge function notice, applying resilient local registration:', err);
      }
    }

    // Resilient local store registration
    const newCustId = 'cust-' + Date.now().toString().slice(-4);
    let linkedId = linkedConsultationId;

    if (consultationOption === 'create_new' || !linkedId) {
      linkedId = 'draft-' + Date.now().toString().slice(-4);
      const newConsult: ConsultationRecord = {
        id: linkedId,
        client_name: name.trim(),
        project_name: finalProjectName,
        title,
        surname: surnameFinal,
        product,
        client_phone: formattedPhone,
        location: location.trim() || 'Pending location',
        consultant: profile?.name || 'Svvayam Admin',
        consultant_phone: profile?.phone || '+91 8074257384',
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        portal_visible: true,
        updated_at: new Date().toISOString(),
        current_step: 0,
        state: {
          version: 1,
          slide: 0,
          project_name: finalProjectName,
          fields: {
            client: name.trim(),
            title,
            surname: surnameFinal,
            product,
            projectName: finalProjectName,
            project_name: finalProjectName,
            phone: formattedPhone,
            location: location.trim(),
            date: new Date().toISOString().split('T')[0]
          },
          images: [],
          gallery: Array(16).fill(null),
          journey: Array(8).fill(null),
          selected_reference: null
        }
      };

      try {
        const storedConsultations = localStorage.getItem('svvayam_admin_consultations_v1');
        const list = storedConsultations ? JSON.parse(storedConsultations) : [];
        localStorage.setItem('svvayam_admin_consultations_v1', JSON.stringify([newConsult, ...list]));
      } catch (err) {
        console.warn('Storage save error:', err);
      }
    }

    const newCustomer: CustomerRecord = {
      id: newCustId,
      name: name.trim(),
      title,
      surname: surnameFinal,
      product,
      project_name: finalProjectName,
      phone: formattedPhone,
      location: location.trim() || 'Bengaluru',
      is_active: true,
      consultation_id: linkedId,
      portal_visible: true,
      created_at: new Date().toISOString()
    };

    const currentCustomers = getRegisteredCustomers();
    saveRegisteredCustomers([newCustomer, ...currentCustomers]);

    setSubmitting(false);
    navigate(`/admin/clients?highlight=${newCustId}`, {
      state: { message: `Customer ${name} registered with project "${finalProjectName}"!` }
    });
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
        {/* Header Breadcrumb & Title */}
        <div className="space-y-1.5 border-b border-[#ECECEC] pb-5">
          <button
            onClick={() => navigate('/admin/clients')}
            className="flex items-center space-x-1.5 text-xs text-neutral-500 hover:text-[#0A0A0A] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Client Explorer</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-[#FFE500]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-medium text-[#0A0A0A]">
              Register New Customer
            </h1>
          </div>
          <p className="text-xs text-neutral-500 font-sans">
            Provision a dedicated customer portal account and assign their sacred sanctum project identity.
          </p>
        </div>

        {/* Live Project Name Generated Preview Card */}
        <div className="p-5 rounded-[18px] bg-white border border-[#E5CE00]/50 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
              Official Project Identity
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE500]/30 text-neutral-900 font-semibold border border-[#E5CE00]/50">
              Auto-Generated
            </span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#0E2A1C] text-[#FFE500] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-semibold text-[#0A0A0A]">
                {generatedProjectName}
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
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
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
                  label="Full Customer Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Mala Sharma"
                  required
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
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <Input
                  label="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9845012345"
                  helperText="+91 default added automatically"
                  required
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
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                >
                  <option value="Temple">Temple</option>
                  <option value="Puja Mandir">Puja Mandir</option>
                  <option value="Sanctum">Sanctum</option>
                </select>
              </div>

              {/* Project Location */}
              <div className="sm:col-span-3">
                <Input
                  label="Project Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru / Jubilee Hills, Hyderabad"
                />
              </div>
            </div>

            {/* Consultation Linking Option */}
            <div className="space-y-3 pt-4 border-t border-[#ECECEC]">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                Consultation Lifecycle
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <label className={`p-4 rounded-[14px] border cursor-pointer transition-all flex items-start space-x-3 ${consultationOption === 'create_new' ? 'bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A]' : 'border-[#ECECEC] hover:bg-neutral-50'}`}>
                  <input
                    type="radio"
                    name="consultOption"
                    value="create_new"
                    checked={consultationOption === 'create_new'}
                    onChange={() => setConsultationOption('create_new')}
                    className="mt-0.5 accent-[#0A0A0A]"
                  />
                  <div>
                    <strong className="block text-[#0A0A0A]">Create New Consultation</strong>
                    <span className="text-[11px] text-neutral-500">Initializes fresh draft in 8-stage journey</span>
                  </div>
                </label>

                <label className={`p-4 rounded-[14px] border cursor-pointer transition-all flex items-start space-x-3 ${consultationOption === 'link_existing' ? 'bg-[#FAFAFA] border-[#0A0A0A] ring-1 ring-[#0A0A0A]' : 'border-[#ECECEC] hover:bg-neutral-50'}`}>
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
                <div className="pt-2">
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                    Select Consultation to Link
                  </label>
                  <select
                    value={linkedConsultationId}
                    onChange={(e) => setLinkedConsultationId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A]"
                  >
                    <option value="">-- Choose unassigned consultation --</option>
                    {existingConsultations.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.project_name || c.client_name} (ID: {c.id.slice(0, 8)})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-[#ECECEC]">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate('/admin/clients')}
                disabled={submitting}
                className="text-xs"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
                className="text-xs font-semibold px-6 bg-[#0A0A0A] text-white hover:bg-neutral-800"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE500]" />
                  <span>{submitting ? 'Registering...' : 'Save & Register Customer'}</span>
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
