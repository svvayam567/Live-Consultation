import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import { Modal } from '../ui/Modal';
import { LogOut, User, ShieldCheck, Home, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, profile, isAdmin, isSuperAdmin, isCustomer, logout } = useAuth();
  const navigate = useNavigate();
  const [chooserOpen, setChooserOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('signin') === '1';
    }
    return false;
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleChoose = (role: 'customer' | 'admin') => {
    setChooserOpen(false);
    navigate(`/login?role=${role}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#ECECEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand / Logo */}
          <div className="flex items-center space-x-4">
            <Link to={isAdmin ? "/showcase" : isCustomer ? "/client" : "/"} className="flex items-center group">
              <Logo className="h-7 sm:h-8 object-contain" />
            </Link>
          </div>

          {/* Right: User / Admin / Customer / Sign In */}
          <div className="flex items-center space-x-4 text-xs font-sans">
            {user ? (
              <div className="flex items-center space-x-3 sm:space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin/clients"
                    className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#0A0A0A] hover:underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0E2A1C]" />
                    <span>Clients & Consultations</span>
                  </Link>
                )}

                {isCustomer && !isAdmin && (
                  <Link
                    to="/client"
                    className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#0A0A0A] hover:underline font-medium"
                  >
                    <Home className="w-3.5 h-3.5 text-[#0E2A1C]" />
                    <span>My Sanctum</span>
                  </Link>
                )}

                <div className="flex items-center space-x-1.5 text-[#5C5C5C]">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-medium text-[#0A0A0A] hidden sm:inline">
                    {isAdmin ? `Logged in as ${profile?.name || user.phone}` : (profile?.name || user.phone)}
                  </span>
                  {isSuperAdmin ? (
                    <span className="text-[9px] uppercase tracking-wider bg-[#0A0A0A] text-white font-bold px-2 py-0.5 rounded-full font-mono">
                      SUPER ADMIN
                    </span>
                  ) : isAdmin ? null : isCustomer ? (
                    <span className="text-[10px] uppercase tracking-wider bg-emerald-950/10 border border-emerald-800/30 text-[#0E2A1C] px-2 py-0.5 rounded-full font-mono">
                      Customer
                    </span>
                  ) : null}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors flex items-center space-x-1 text-xs cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setChooserOpen(true)}
                className="text-[#0A0A0A] font-medium hover:text-neutral-700 transition-colors text-xs px-3.5 py-1.5 rounded-full border border-[#ECECEC] bg-white shadow-xs hover:border-[#0A0A0A] cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Two-Option Sign In Chooser Modal */}
      <Modal
        isOpen={chooserOpen}
        onClose={() => setChooserOpen(false)}
        title="Sign In to Svvayam"
        subtitle="Select your account type to continue. Sign up is by invitation only."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2">
          {/* Option 1: Customer */}
          <button
            type="button"
            onClick={() => handleChoose('customer')}
            className="w-full text-left p-4 rounded-[16px] border border-[#ECECEC] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-all group flex items-start gap-3.5 cursor-pointer shadow-xs"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#F4F4F4] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#0A0A0A] group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#0A0A0A]">
                  Sign in as Customer
                </h4>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0A0A0A] transition-colors" />
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">
                View your sacred pooja mandir consultation, approved reference, live 8-stage progress, and message our architects.
              </p>
            </div>
          </button>

          {/* Option 2: Admin */}
          <button
            type="button"
            onClick={() => handleChoose('admin')}
            className="w-full text-left p-4 rounded-[16px] border border-[#ECECEC] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-all group flex items-start gap-3.5 cursor-pointer shadow-xs"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#F4F4F4] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#0E2A1C] group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#0A0A0A]">
                  Sign in as Admin
                </h4>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0A0A0A] transition-colors" />
              </div>
              <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">
                Live consultation workflow console, client onboarding, proposal generator, and project asset management.
              </p>
            </div>
          </button>

          <p className="text-[11px] text-center text-[#737373] pt-2">
            No public registration. If your home consultation is scheduled, contact the Svvayam team for access.
          </p>
        </div>
      </Modal>
    </>
  );
};
