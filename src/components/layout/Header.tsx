import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import { LogOut, User, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#ECECEC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center group">
            <Logo className="h-7 sm:h-8 object-contain" />
          </Link>
        </div>

        {/* Right: User / Admin / Logout */}
        <div className="flex items-center space-x-4 text-xs font-sans">
          {user ? (
            <div className="flex items-center space-x-3 sm:space-x-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#0A0A0A] hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0E2A1C]" />
                  <span>Clients & Consultations</span>
                </Link>
              )}

              <div className="flex items-center space-x-1.5 text-[#5C5C5C]">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-[#0A0A0A] hidden sm:inline">
                  {profile?.name || user.phone}
                </span>
                {isAdmin && (
                  <span className="text-[10px] uppercase tracking-wider bg-neutral-100 border border-[#ECECEC] text-[#0A0A0A] px-2 py-0.5 rounded-full font-mono">
                    Admin
                  </span>
                )}
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
            <Link
              to="/login"
              className="text-[#5C5C5C] hover:text-[#0A0A0A] transition-colors text-xs font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
