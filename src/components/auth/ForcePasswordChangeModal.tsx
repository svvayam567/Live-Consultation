import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

const COMMON_PASSWORDS = new Set([
  'password', 'password1', 'password12', 'password123', 'password1234',
  '12345678', '123456789', '1234567890', 'qwertyuiop', 'qwerty123',
  'admin123', 'admin1234', 'welcome123', 'letmein123', 'pass1234',
  'svvayam123', 'svvayam1234', 'svvayam@123', 'temple123', 'mandir123'
]);

export const ForcePasswordChangeModal: React.FC = () => {
  const { user, profile, clearMustChangePassword, refreshProfile } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Live checklist validations
  const checks = useMemo(() => {
    const p = password;
    const hasMinLength = p.length >= 10;
    const hasLetter = /[a-zA-Z]/.test(p);
    const hasNumber = /\d/.test(p);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(p);
    const matchesConfirm = confirmPassword.length > 0 && p === confirmPassword;

    // Check personal info / common passwords
    const cleanPw = p.toLowerCase().trim();
    let isPersonalOrCommon = false;
    let personalReason = '';

    if (COMMON_PASSWORDS.has(cleanPw)) {
      isPersonalOrCommon = true;
      personalReason = 'Password is too common and easily guessed';
    } else if (profile?.name) {
      const nameParts = profile.name.toLowerCase().split(/\s+/).filter(part => part.length >= 3);
      for (const part of nameParts) {
        if (cleanPw.includes(part)) {
          isPersonalOrCommon = true;
          personalReason = `Password contains your name "${part}"`;
          break;
        }
      }
    }

    if (!isPersonalOrCommon && user?.phone) {
      const phoneDigits = user.phone.replace(/\D/g, '').slice(-10);
      if (phoneDigits.length >= 6) {
        const last6 = phoneDigits.slice(-6);
        if (cleanPw.includes(last6)) {
          isPersonalOrCommon = true;
          personalReason = 'Password contains your phone number sequence';
        }
      }
    }

    const notPersonalOrCommon = !isPersonalOrCommon;

    const allPassed =
      hasMinLength &&
      hasLetter &&
      hasNumber &&
      hasSymbol &&
      matchesConfirm &&
      notPersonalOrCommon;

    return {
      hasMinLength,
      hasLetter,
      hasNumber,
      hasSymbol,
      matchesConfirm,
      notPersonalOrCommon,
      personalReason,
      allPassed
    };
  }, [password, confirmPassword, profile?.name, user?.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checks.allPassed || submitting) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured && supabase) {
        // 1. Update Auth password
        const { error: authErr } = await supabase.auth.updateUser({
          password: password.trim()
        });

        if (authErr) {
          throw new Error(authErr.message || 'Failed to update password.');
        }

        // 2. Clear must_change_password flag on profiles table
        if (user?.id) {
          const { error: profErr } = await supabase
            .from('profiles')
            .update({ must_change_password: false })
            .eq('id', user.id);

          if (profErr) {
            console.warn('Profile flag update notice:', profErr);
          }
        }

        // 3. Log password change event
        try {
          await supabase.rpc('log_admin_activity', {
            p_action: 'admin_password_reset',
            p_target: 'Updated initial temporary password to permanent password'
          });
        } catch {
          // Non-critical audit notice
        }
      }

      setSuccess(true);
      setTimeout(async () => {
        clearMustChangePassword();
        await refreshProfile();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while setting your new password.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-[24px] border border-neutral-200 shadow-2xl p-7 sm:p-8 space-y-6">
        {/* Brand & Security Header */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo className="h-8 object-contain mx-auto" />
          </div>
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-[#0A0A0A]">
              Set your new password
            </h2>
            <p className="text-xs text-[#5C5C5C] font-sans leading-relaxed">
              Your account was created or reset with a temporary password. For security, you must set a permanent password to continue.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[12px] flex items-start gap-2 text-xs text-red-900 font-sans">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1 font-medium">{errorMsg}</div>
          </div>
        )}

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif text-neutral-900">Password Updated Successfully</h3>
            <p className="text-xs text-neutral-500 font-sans">Taking you to your admin dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  required
                  autoFocus
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
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                  title={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Live Security Checklist */}
            <div className="p-3.5 bg-neutral-50 rounded-[14px] border border-neutral-200/80 space-y-2 text-xs font-sans">
              <span className="block text-[11px] font-mono uppercase text-neutral-500 font-semibold tracking-wider">
                Password Requirements
              </span>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  {checks.hasMinLength ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    </span>
                  )}
                  <span className={cn(checks.hasMinLength ? "text-emerald-900 font-medium" : "text-neutral-500")}>
                    At least 10 characters long
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  {checks.hasLetter ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    </span>
                  )}
                  <span className={cn(checks.hasLetter ? "text-emerald-900 font-medium" : "text-neutral-500")}>
                    At least 1 letter (A-Z, a-z)
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  {checks.hasNumber ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    </span>
                  )}
                  <span className={cn(checks.hasNumber ? "text-emerald-900 font-medium" : "text-neutral-500")}>
                    At least 1 number (0-9)
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  {checks.hasSymbol ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    </span>
                  )}
                  <span className={cn(checks.hasSymbol ? "text-emerald-900 font-medium" : "text-neutral-500")}>
                    At least 1 special symbol (e.g. !@#$%^&*)
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  {checks.matchesConfirm ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    </span>
                  )}
                  <span className={cn(checks.matchesConfirm ? "text-emerald-900 font-medium" : "text-neutral-500")}>
                    Passwords match
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  {checks.notPersonalOrCommon ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  )}
                  <span className={cn(checks.notPersonalOrCommon ? "text-emerald-900 font-medium" : "text-red-700")}>
                    {checks.personalReason || "Does not contain your name, phone, or common passwords"}
                  </span>
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!checks.allPassed || submitting}
              className="w-full relative group overflow-hidden border border-[#0A0A0A] hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{submitting ? 'Saving New Password...' : 'Save New Password & Continue'}</span>
              </span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
