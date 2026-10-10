import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, User, ShieldCheck, Shield, Info, Eye, EyeOff } from 'lucide-react';
import { cn, normalizeToE164 } from '../lib/utils';

export const LoginPage: React.FC = () => {
  const {
    user,
    isAdmin,
    isCustomer,
    isLoading,
    signInWithPhone,
    verifyOtp,
    signInWithPassword,
    resendCooldown,
    lockoutNotice,
    clearLockoutNotice
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Role can be 'customer' or 'admin'
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'customer';
  const [activeRole, setActiveRole] = useState<'customer' | 'admin'>(initialRole);
  const redirectUrl = searchParams.get('redirect');

  const [phone, setPhone] = useState(initialRole === 'admin' ? '+91 8074257384' : '+91 9845012345');
  const [password, setPassword] = useState(initialRole === 'admin' ? '' : '123456');
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calmNotice, setCalmNotice] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Sync role with query param if it changes
  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'admin' || r === 'customer') {
      setActiveRole(r);
      if (r === 'admin') {
        setPhone('+91 8074257384');
      } else {
        setPhone('+91 9845012345');
      }
    }
  }, [searchParams]);

  // Sync context cooldown to local timer if higher
  useEffect(() => {
    if (resendCooldown > countdown) {
      setCountdown(resendCooldown);
    }
  }, [resendCooldown]);

  // If already logged in, skip login page and go straight to user's section
  useEffect(() => {
    if (user && !isLoading) {
      if (isAdmin) {
        navigate(redirectUrl || '/showcase', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    }
  }, [user, isAdmin, isCustomer, isLoading, navigate, redirectUrl]);

  // 60-second client-side countdown timer on button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRoleChange = (newRole: 'customer' | 'admin') => {
    setActiveRole(newRole);
    setSearchParams({ role: newRole });
    setError(null);
    setCalmNotice(null);
    clearLockoutNotice();
    setStep('phone');
    setOtp('');
    if (newRole === 'admin') {
      setPhone('+91 8074257384');
      setPassword('');
    } else {
      setPhone('+91 9845012345');
      setPassword('123456');
    }
  };

  // Unified Password Login Handler (Customer & Admin)
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const cleanDigits = phone.replace(/\D/g, '').slice(-10);
    if (cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password || password.trim().length < 6) {
      setError('Please enter your password (minimum 6 characters).');
      return;
    }

    setLoading(true);
    setError(null);
    setCalmNotice(null);
    clearLockoutNotice();

    const formatted = '+91' + cleanDigits;
    const res = await signInWithPassword(formatted, password.trim(), activeRole);
    setLoading(false);

    if (res.success) {
      if (activeRole === 'admin') {
        navigate(redirectUrl || '/showcase', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading || countdown > 0) return;

    const normalized = normalizeToE164(phone);
    setPhone(normalized);

    const digitsOnly = normalized.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid mobile number with country code (e.g. +91 9845012345).');
      return;
    }

    setLoading(true);
    setError(null);
    setCalmNotice(null);

    const res = await signInWithPhone(normalized, undefined, activeRole);
    setLoading(false);

    if (res.success) {
      // Transition immediately to the OTP entry screen
      setStep('otp');
      setCountdown(60);
      setCalmNotice('Verification code sent. Enter 123456 in demo mode.');
    } else {
      // Check if the error returned was a rate-limit notice
      const errLower = (res.error || '').toLowerCase();
      if (errLower.includes('rate limit') || errLower.includes('wait') || errLower.includes('seconds')) {
        const match = res.error?.match(/(\d+)\s*(?:seconds?|s\b)/i);
        const waitSec = match ? parseInt(match[1], 10) : 60;
        setCountdown(waitSec);
        setStep('otp');
        setCalmNotice(`A verification code was requested recently. You can enter it now or resend in ${waitSec}s.`);
      } else {
        setError(res.error || "This number isn't registered. Please contact the Svvayam team.");
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError(null);
    setCalmNotice(null);

    const normalized = normalizeToE164(phone);
    const res = await verifyOtp(normalized, otp.trim(), undefined, activeRole);
    setLoading(false);

    if (res.success) {
      if (activeRole === 'admin') {
        navigate(redirectUrl || '/showcase', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    } else {
      setError(res.error || 'Invalid or expired OTP code.');
    }
  };

  // Quick fill demo numbers in development
  const handleFillDemo = (demoPhone: string, role: 'customer' | 'admin', demoPassword?: string) => {
    setActiveRole(role);
    setSearchParams({ role });
    setPhone(demoPhone);
    if (demoPassword) setPassword(demoPassword);
    setOtp('123456');
    setError(null);
    setCalmNotice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col justify-center items-center p-4 antialiased text-[#0A0A0A]">
      <div className="w-full max-w-sm bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-7 sm:p-8 space-y-6">
        {/* Header: Logo & Brand Copy */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo className="h-8 object-contain mx-auto" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-[#5C5C5C] font-sans tracking-wide leading-relaxed">
              Handcrafted sacred spaces and temple architecture for discerning homes.
            </p>
          </div>
        </div>

        {/* Two Choices: Customer vs Admin (No sign-up anywhere) */}
        {step === 'phone' && (
          <div className="bg-[#F1F1F1] p-1 rounded-[14px] flex items-center text-xs font-sans">
            <button
              type="button"
              onClick={() => handleRoleChange('customer')}
              className={cn(
                "flex-1 py-2 px-3 rounded-[11px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer",
                activeRole === 'customer'
                  ? "bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  : "text-[#5C5C5C] hover:text-[#0A0A0A]"
              )}
            >
              {activeRole === 'customer' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] shrink-0" />
              )}
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={cn(
                "flex-1 py-2 px-3 rounded-[11px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer",
                activeRole === 'admin'
                  ? "bg-gradient-to-b from-[#2A2A2A] to-[#0A0A0A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  : "text-[#5C5C5C] hover:text-[#0A0A0A]"
              )}
            >
              {activeRole === 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] shrink-0" />
              )}
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        )}

        {/* Calm Informational Message */}
        {calmNotice && (
          <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-[12px] flex items-start gap-2 text-xs text-[#0E2A1C] font-sans">
            <Info className="w-4 h-4 shrink-0 text-[#0E2A1C] mt-0.5" />
            <div className="flex-1 leading-relaxed">{calmNotice}</div>
          </div>
        )}

        {/* Instant Lockout Notice or Error Notification */}
        {(lockoutNotice || error) && (
          <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-[12px] flex items-start gap-2.5 text-xs text-red-900 font-sans shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
            <div className="flex-1 font-medium leading-relaxed">
              {lockoutNotice || error}
            </div>
          </div>
        )}

        {/* PASSWORD LOGIN FORM (DEFAULT FOR BOTH ADMIN AND CUSTOMER) */}
        {authMode === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                {activeRole === 'admin' ? "Admin Mobile Number" : "Registered Mobile Number"}
              </label>
              <div className="flex rounded-[12px] shadow-xs">
                <span className="inline-flex items-center px-3.5 rounded-l-[12px] border border-r-0 border-[#E5E5E5] bg-[#F7F7F7] text-xs font-mono font-semibold text-[#0A0A0A] select-none">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone.replace(/^\+91\s*/, '')}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone('+91 ' + digits);
                  }}
                  placeholder={activeRole === 'admin' ? "8074257384" : "9845012345"}
                  maxLength={10}
                  required
                  autoFocus
                  className="flex-1 px-3.5 py-2.5 rounded-r-[12px] border border-[#E5E5E5] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                {activeRole === 'admin' ? "10-digit administrator mobile number" : "10-digit registered number"}
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={activeRole === 'admin' ? "Enter administrator password" : "Enter portal password"}
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
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                {activeRole === 'admin' ? "Temporary or permanent admin password" : "Password provided by Svvayam team"}
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full relative group overflow-hidden border border-[#0A0A0A] hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Verifying Credentials...' : activeRole === 'admin' ? 'Sign In as Administrator' : 'Sign In to Portal'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              </span>
            </Button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('otp');
                  setStep('phone');
                  setError(null);
                  clearLockoutNotice();
                }}
                className="text-xs text-neutral-500 hover:text-[#0A0A0A] underline cursor-pointer font-sans"
              >
                Sign in with OTP instead
              </button>
            </div>
          </form>
        ) : step === 'phone' ? (
          /* OTP PHONE ENTRY */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <Input
              label={activeRole === 'customer' ? "Registered Mobile Number" : "Admin Mobile Number"}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9845012345"
              required
              autoFocus
              helperText={
                activeRole === 'customer'
                  ? "Only pre-registered numbers can sign in. Default is +91."
                  : "Restricted to authorized Svvayam administrator accounts."
              }
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || countdown > 0}
              className="w-full relative group overflow-hidden border border-[#0A0A0A] hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>
                  {loading
                    ? 'Sending verification code...'
                    : countdown > 0
                    ? `Resend in ${countdown}s`
                    : 'Sign In with OTP'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              </span>
            </Button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('password');
                  setError(null);
                  clearLockoutNotice();
                }}
                className="text-xs text-neutral-500 hover:text-[#0A0A0A] underline cursor-pointer font-sans"
              >
                Sign in with Password instead
              </button>
            </div>
          </form>
        ) : (
          /* OTP VERIFICATION STEP */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center pb-1">
              <span className="text-xs text-[#5C5C5C] font-sans">
                Enter the 6-digit code sent to <strong className="text-[#0A0A0A] font-mono">{phone}</strong>
              </span>
            </div>

            <Input
              label="6-Digit Verification Code"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              required
              autoFocus
              className="text-center tracking-widest text-lg font-mono"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full border border-[#0A0A0A] hover:bg-neutral-800 transition-colors"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </Button>

            <div className="flex items-center justify-between text-xs text-[#5C5C5C] pt-2 font-sans">
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setCalmNotice(null);
                  setError(null);
                }}
                className="flex items-center gap-1 hover:text-[#0A0A0A] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change mobile</span>
              </button>

              <button
                type="button"
                disabled={countdown > 0 || loading}
                onClick={() => handleSendOtp()}
                className="text-[#0A0A0A] hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        {/* Demo Mode Hint Card - ONLY shown in development / demo mode, hidden in production */}
        {(import.meta.env.DEV || import.meta.env.VITE_SHOW_DEMO_CARD === 'true') && (
          <div className="p-3.5 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC] text-[11px] text-[#5C5C5C] space-y-2 font-sans shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#0A0A0A] font-medium">
                <Shield className="w-3.5 h-3.5 text-[#0E2A1C]" />
                <span>Demo mode: Test Credentials</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-neutral-200 text-[#0A0A0A] font-semibold">
                Pass / OTP: 123456
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between">
                <span>Customer: <strong className="text-[#0A0A0A]">+91 9845012345</strong> (Pass: 123456)</span>
                <button
                  type="button"
                  onClick={() => handleFillDemo('+91 9845012345', 'customer', '123456')}
                  className="text-xs text-[#0E2A1C] underline font-sans cursor-pointer hover:text-black font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Admin: <strong className="text-[#0A0A0A]">+91 8074257384</strong> (Svvayam Admin)</span>
                <button
                  type="button"
                  onClick={() => handleFillDemo('+918074257384', 'admin')}
                  className="text-xs text-[#0E2A1C] underline font-sans cursor-pointer hover:text-black font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between text-neutral-500">
                <span>Staff: <strong className="text-neutral-700">+91 9182424228</strong> (Studio Staff)</span>
                <button
                  type="button"
                  onClick={() => handleFillDemo('+919182424228', 'admin')}
                  className="text-xs text-neutral-600 underline font-sans cursor-pointer hover:text-black font-medium"
                >
                  Use
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

