import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { ArrowLeft, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, signInWithPhone, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/consult';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate(redirectUrl, { replace: true });
    }
  }, [user, navigate, redirectUrl]);

  // Resend cooldown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.trim();
    if (cleanPhone.length < 10) {
      setError('Please enter a valid mobile number with country code (e.g. +91 9182424228).');
      return;
    }

    setLoading(true);
    setError(null);
    const res = await signInWithPhone(cleanPhone, name);
    setLoading(false);

    if (res.success) {
      setStep('otp');
      setCountdown(30);
    } else {
      setError(res.error || 'Failed to send OTP. Please check the mobile number.');
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
    const res = await verifyOtp(phone.trim(), otp.trim(), name.trim());
    setLoading(false);

    if (res.success) {
      navigate(redirectUrl, { replace: true });
    } else {
      setError(res.error || 'Invalid or expired OTP code.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] to-[#E6E6E6] flex flex-col justify-center items-center p-4 antialiased text-[#0A0A0A]">
      <div className="w-full max-w-sm bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-8 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block">
            <Logo className="h-8 object-contain mx-auto" />
          </Link>
          <div className="space-y-1">
            <h2 className="text-xl font-display font-semibold text-[#0A0A0A]">
              {step === 'phone' ? 'Live Consultation Sign In' : 'Enter 6-Digit OTP'}
            </h2>
            <p className="text-xs text-[#5C5C5C] max-w-xs mx-auto font-sans">
              {step === 'phone'
                ? 'Sign in to access consultation workflows and client proposals.'
                : `Verification code sent to ${phone}`}
            </p>
          </div>
        </div>

        {error && <Toast type="error" message={error} onClose={() => setError(null)} />}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anand Sharma"
              required
              autoFocus
            />

            <Input
              label="Mobile Number (with country code)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9182424228"
              required
              helperText="Default country code is +91 for India"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Sending code...' : 'Send Verification OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
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
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
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

        {/* Development & Testing Credentials Info */}
        <div className="p-3.5 bg-[#FAFAFA] rounded-[14px] border border-[#ECECEC] text-[11px] text-[#5C5C5C] space-y-1.5 font-sans">
          <div className="flex items-center gap-1 text-[#0A0A0A] font-medium">
            <Shield className="w-3.5 h-3.5 text-[#0E2A1C]" />
            <span>Test Phone Numbers (Fixed OTP: 123456)</span>
          </div>
          <div className="space-y-0.5 font-mono text-[10px]">
            <div>Admin: <strong className="text-[#0A0A0A]">+91 9182424228</strong></div>
            <div>Consultant / Client: <strong className="text-[#0A0A0A]">+91 8074257384</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
