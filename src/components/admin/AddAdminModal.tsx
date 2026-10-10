import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (admin: { name: string; email: string; password: string }) => void;
}

export const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManualHelp, setShowManualHelp] = useState(false);

  // Success state with created credentials
  const [createdAdmin, setCreatedAdmin] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // Strong password generator: >= 10 chars with letter, number and symbol
  const handleGeneratePassword = () => {
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%&*';
    let pwd = '';
    pwd += upper.charAt(Math.floor(Math.random() * upper.length));
    pwd += lower.charAt(Math.floor(Math.random() * lower.length));
    pwd += numbers.charAt(Math.floor(Math.random() * numbers.length));
    pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));
    const all = upper + lower + numbers + symbols;
    for (let i = 0; i < 8; i++) {
      pwd += all.charAt(Math.floor(Math.random() * all.length));
    }
    // Shuffle
    const shuffled = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(shuffled);
    setShowPassword(true);
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setCreatedAdmin(null);
    setCopiedCredentials(false);
    setShowManualHelp(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      setErrorMessage('Please enter the administrator full name.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid administrator email address.');
      return;
    }
    if (password.trim().length < 10) {
      setErrorMessage('Password must be at least 10 characters.');
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(password);

    if (!hasLetter || !hasNumber || !hasSymbol) {
      setErrorMessage('Password must contain at least one letter, one number, and one symbol.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const finalPassword = password.trim();

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.functions.invoke('manage-admin', {
          body: {
            action: 'register_admin',
            name: name.trim(),
            email: cleanEmail,
            password: finalPassword
          }
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || 'Failed to create administrator account.');
        }
      }

      const result = {
        name: name.trim(),
        email: cleanEmail,
        password: finalPassword
      };

      setCreatedAdmin(result);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: any) {
      console.error('Error creating admin:', err);
      setErrorMessage(err?.message || 'Failed to create administrator account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!createdAdmin) return;
    const copyText = `Svvayam Administrator Access\nName: ${createdAdmin.name}\nEmail: ${createdAdmin.email}\nPassword: ${createdAdmin.password}\nPortal Link: ${window.location.origin}/login?role=admin`;
    navigator.clipboard.writeText(copyText);
    setCopiedCredentials(true);
    setTimeout(() => setCopiedCredentials(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={createdAdmin ? "Administrator Account Created" : "Create Administrator"}
      subtitle={createdAdmin ? "Securely share these credentials with the new admin" : "Add another Svvayam admin team member"}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs font-sans">
        {createdAdmin ? (
          <div className="space-y-4">
            <div className="p-4 rounded-[14px] bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Administrator account created successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                This admin account can now sign in immediately using their email address and temporary password. They will be prompted to set their own permanent password on first login.
              </p>
            </div>

            <div className="p-4 rounded-[14px] bg-neutral-50 border border-neutral-200 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-mono uppercase text-[10px]">Full Name</span>
                <strong className="text-[#0A0A0A] font-sans font-semibold">{createdAdmin.name}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-mono uppercase text-[10px]">Email Address</span>
                <strong className="text-[#0A0A0A] font-mono">{createdAdmin.email}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-mono uppercase text-[10px]">Temporary Password</span>
                <strong className="text-[#0A0A0A] font-mono tracking-wider">{createdAdmin.password}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleCopyCredentials}
                className="px-3.5 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs text-neutral-800 hover:text-black flex items-center gap-1.5 cursor-pointer font-sans transition-colors"
              >
                {copiedCredentials ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Copy Credentials</span>
                  </>
                )}
              </button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleClose}
                className="bg-[#0A0A0A] text-white px-5 cursor-pointer"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Enter the details of the new admin. Their consultations will display their name as the consultant.
            </p>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Administrator Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                Administrator Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ar. Jagirdhar / Pooja Sharma"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              />
              <p className="text-[11px] text-neutral-400 font-sans">
                This name will be saved and displayed as the Consultant for consultations created by this admin.
              </p>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. pooja@svvayam.com"
                required
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              />
              <p className="text-[11px] text-neutral-400 font-mono">Used to sign in as Administrator</p>
            </div>

            {/* Temporary Password with generator & toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700">
                  Temporary Password
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="text-[11px] text-purple-700 hover:text-purple-900 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Generate strong password</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 10 characters (letter, number, symbol)"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">At least 10 characters with a letter, number and symbol</p>
            </div>

            {/* Expandable Manual Supabase instructions */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowManualHelp(!showManualHelp)}
                className="text-[11px] text-neutral-500 hover:text-[#0A0A0A] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <span>{showManualHelp ? 'Hide' : 'Need manual instructions for Supabase Dashboard?'}</span>
                {showManualHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showManualHelp && (
                <div className="mt-2.5 p-3 rounded-[12px] bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 font-sans space-y-1.5 text-left">
                  <p className="font-semibold text-neutral-900">Alternative: Create admin directly in Supabase Dashboard:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Go to <strong>Authentication &gt; Users &gt; Add user &gt; Create user</strong>.</li>
                    <li>Email: <code className="bg-neutral-200 px-1 py-0.5 rounded text-[10px]">&lt;admin-email&gt;</code>, set password, check <em>Auto Confirm User</em>.</li>
                    <li>Copy the generated User UUID.</li>
                    <li>In <strong>SQL Editor</strong>, run:
                      <pre className="mt-1 p-2 bg-neutral-900 text-neutral-100 rounded text-[10px] overflow-x-auto font-mono whitespace-pre">
{`insert into public.profiles (id, email, role, is_active, name, must_change_password)
values ('<USER-UUID>', '<ADMIN-EMAIL>', 'admin', true, '<FULL-NAME>', true)
on conflict (id) do update set role = 'admin', email = excluded.email, name = excluded.name;`}
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
                onClick={handleClose}
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmitting}
                className="bg-[#0A0A0A] text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>{isSubmitting ? 'Creating Administrator...' : 'Create Administrator'}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
