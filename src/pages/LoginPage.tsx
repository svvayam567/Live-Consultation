import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { ArrowLeft, User, ShieldCheck, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

export const LoginPage: React.FC = () => {
  const { user, isAdmin, isCustomer, isLoading, signInWithPhone, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Role can be 'customer' or 'admin'
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'customer';
  const [activeRole, setActiveRole] = useState<'customer' | 'admin'>(initialRole);
  const redirectUrl = searchParams.get('redirect');

  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Sync role with query param if it changes
  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'admin' || r === 'customer') {
      setActiveRole(r);
    }
  }, [searchParams]);

  // If already logged in, skip login page and go straight to user's section
  useEffect(() => {
    if (user && !isLoading) {
      if (isAdmin) {
        navigate(redirectUrl || '/admin', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    }
  }, [user, isAdmin, isCustomer, isLoading, navigate, redirectUrl]);

  // Resend cooldown timer
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
    setStep('phone');
    setOtp('');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (cleanPhone.length < 10) {
      setError('Please enter a valid mobile number with country code (e.g. +91 9845012345).');
      return;
    }

    setLoading(true);
    setError(null);
    const res = await signInWithPhone(cleanPhone, undefined, activeRole);
    setLoading(false);

    if (res.success) {
      setStep('otp');
      setCountdown(30);
    } else {
      setError(res.error || "This number isn't registered. Please contact the Svvayam team.");
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
    const res = await verifyOtp(phone.trim(), otp.trim(), undefined, activeRole);
    setLoading(false);

    if (res.success) {
      if (activeRole === 'admin') {
        navigate(redirectUrl || '/admin', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    } else {
      setError(res.error || 'Invalid or expired OTP code.');
    }
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500] shadow-[0_0_8px_#FFE500] shrink-0" />
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500] shadow-[0_0_8px_#FFE500] shrink-0" />
              )}
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        )}

        {error && <Toast type="error" message={error} onClose={() => setError(null)} />}

        {step === 'phone' ? (
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
              disabled={loading}
              className="w-full relative group overflow-hidden border border-[#FFE500]/30 hover:border-[#FFE500] transition-colors"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Sending code...' : 'Sign In with OTP'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500] group-hover:scale-125 transition-transform" />
              </span>
            </Button>
          </form>
        ) : (
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
              className="w-full border border-[#FFE500]/30 hover:border-[#FFE500] transition-colors"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500]" />
              </span>
            </Button>

            <div className="flex items-center justify-between text-xs text-[#5C5C5C] pt-2 font-sans">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="flex items-center gap-1 hover:text-[#0A0A0A] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change mobile</span>
              </button>

              <button
                type="button"
                disabled={countdown > 0 || loading}
                onClick={handleSendOtp}
                className="text-[#0A0A0A] hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        {/* Development & Verification Credentials */}
        <div className="p-3 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC] text-[11px] text-[#5C5C5C] space-y-1.5 font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#0A0A0A] font-medium">
              <Shield className="w-3.5 h-3.5 text-[#0E2A1C]" />
              <span>Registered Numbers (OTP: 123456)</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500]" />
          </div>
          <div className="space-y-1 font-mono text-[10px]">
            <div>
              Customer: <strong className="text-[#0A0A0A]">+91 9845012345</strong> (Mala Sharma)
            </div>
            <div>
              Admin: <strong className="text-[#0A0A0A]">+91 9182424228</strong> (Svvayam Staff)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
