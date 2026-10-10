import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

export const LoginPage: React.FC = () => {
  const {
    user,
    isAdmin,
    isLoading,
    signInAdmin,
    signInCustomer,
    lockoutNotice,
    clearLockoutNotice
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Role can be 'customer' or 'admin'
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'customer';
  const [activeRole, setActiveRole] = useState<'customer' | 'admin'>(initialRole);
  const redirectUrl = searchParams.get('redirect');

  // Customer Form state
  const [customerPhone, setCustomerPhone] = useState('9845012345');
  const [customerPassword, setCustomerPassword] = useState('123456');
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);

  // Admin Form state
  const [adminEmail, setAdminEmail] = useState('marketing@svvayam.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync role with query param if it changes
  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'admin' || r === 'customer') {
      setActiveRole(r);
    }
  }, [searchParams]);

  // If already logged in, redirect user to the appropriate screen
  useEffect(() => {
    if (user && !isLoading) {
      if (isAdmin) {
        navigate(redirectUrl || '/showcase', { replace: true });
      } else {
        navigate(redirectUrl || '/client', { replace: true });
      }
    }
  }, [user, isAdmin, isLoading, navigate, redirectUrl]);

  const handleRoleChange = (newRole: 'customer' | 'admin') => {
    setActiveRole(newRole);
    setSearchParams({ role: newRole });
    setError(null);
    clearLockoutNotice();
  };

  // Customer Login (Phone + Password)
  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const cleanDigits = customerPhone.replace(/\D/g, '').slice(-10);
    if (cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!customerPassword) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError(null);
    clearLockoutNotice();

    const formatted = '+91' + cleanDigits;
    const res = await signInCustomer(formatted, customerPassword.trim());
    setLoading(false);

    if (res.success) {
      navigate(redirectUrl || '/client', { replace: true });
    } else {
      setError(res.error || 'Wrong mobile number or password.');
    }
  };

  // Admin Login (Email + Password ONLY)
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = adminEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid administrator email address.');
      return;
    }

    if (!adminPassword) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError(null);
    clearLockoutNotice();

    const res = await signInAdmin(cleanEmail, adminPassword.trim());
    setLoading(false);

    if (res.success) {
      navigate(redirectUrl || '/showcase', { replace: true });
    } else {
      setError(res.error || 'Wrong email or password.');
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
              Bespoke Sacred Architecture for Discerning Homes.
            </p>
          </div>
        </div>

        {/* Clear Option Switcher: Customer vs Admin Tabs */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />
            )}
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Friendly Error Notice */}
        {(lockoutNotice || error) && (
          <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-[12px] flex items-start gap-2.5 text-xs text-red-900 font-sans shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
            <div className="flex-1 font-medium leading-relaxed">
              {lockoutNotice || error}
            </div>
          </div>
        )}

        {/* CUSTOMER LOGIN FORM: Phone + Password */}
        {activeRole === 'customer' ? (
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Registered Mobile Number
              </label>
              <div className="flex rounded-[12px] shadow-xs">
                <span className="inline-flex items-center px-3.5 rounded-l-[12px] border border-r-0 border-[#E5E5E5] bg-[#F7F7F7] text-xs font-mono font-semibold text-[#0A0A0A] select-none">
                  +91
                </span>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setCustomerPhone(digits);
                  }}
                  placeholder="9845012345"
                  maxLength={10}
                  required
                  autoFocus
                  className="flex-1 px-3.5 py-2.5 rounded-r-[12px] border border-[#E5E5E5] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                10-digit pre-registered customer mobile number
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showCustomerPassword ? 'text' : 'password'}
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                  placeholder="Enter customer portal password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
                <button
                  type="button"
                  onClick={() => setShowCustomerPassword(!showCustomerPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                  title={showCustomerPassword ? 'Hide password' : 'Show password'}
                >
                  {showCustomerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                Password provided by Svvayam studio
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full relative group overflow-hidden border border-[#0A0A0A] bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Verifying Customer...' : 'Sign In to Portal'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              </span>
            </Button>
          </form>
        ) : (
          /* ADMIN LOGIN FORM: Email + Password ONLY (No phone, No OTP) */
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="marketing@svvayam.com"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              />
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                Official Svvayam administrator email address
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
                  title={showAdminPassword ? 'Hide password' : 'Show password'}
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                Secure admin studio access credentials
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full relative group overflow-hidden border border-[#0A0A0A] bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>{loading ? 'Authenticating Admin...' : 'Sign In as Administrator'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              </span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
