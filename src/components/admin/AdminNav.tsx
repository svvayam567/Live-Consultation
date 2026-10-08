import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import {
  Users,
  UserPlus,
  Sparkles,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AdminNavProps {
  activeSection?: 'clients' | 'register' | 'consultation';
}

export const AdminNav: React.FC<AdminNavProps> = ({ activeSection }) => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current active section from prop or location
  const currentSection = activeSection || (
    location.pathname.startsWith('/admin/register')
      ? 'register'
      : location.pathname.startsWith('/admin/consultation') || location.pathname.startsWith('/consult')
      ? 'consultation'
      : 'clients'
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    {
      id: 'clients',
      label: 'Clients',
      path: '/admin/clients',
      icon: Users
    },
    {
      id: 'register',
      label: 'Register',
      path: '/admin/register',
      icon: UserPlus
    },
    {
      id: 'consultation',
      label: 'Consultation',
      path: '/admin/consultation',
      icon: Sparkles
    }
  ];

  return (
    <>
      {/* Persistent Desktop Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#ECECEC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand Logo & Admin Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/admin/clients" className="flex items-center group">
              <Logo className="h-7 sm:h-8 object-contain" />
            </Link>
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-[#ECECEC] text-[10px] font-mono text-[#0A0A0A]">
              <ShieldCheck className="w-3 h-3 text-[#0E2A1C]" />
              <span className="font-semibold uppercase tracking-wider">Admin Studio</span>
            </div>
          </div>

          {/* Center: Desktop Section Switcher (Monochrome Black and White Active State) */}
          <nav className="hidden sm:flex items-center space-x-1 bg-[#F5F5F5] p-1 rounded-full border border-[#ECECEC]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer",
                    isActive
                      ? "bg-[#0A0A0A] text-white font-semibold shadow-xs border border-[#0A0A0A]"
                      : "text-[#5C5C5C] hover:text-[#0A0A0A] hover:bg-white/60 font-medium"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-[#737373]")} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: User Identity & Log Out */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-sans">
            <div className="hidden md:flex items-center space-x-1.5 text-[#5C5C5C]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-[#0A0A0A] truncate max-w-[140px]">
                {profile?.name || user?.phone || 'Admin'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#ECECEC] bg-white text-[#5C5C5C] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors cursor-pointer text-xs"
              title="Log out of Svvayam Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Mobile Bottom Tab Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECECEC] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-[12px] text-[10px] font-sans transition-all flex-1",
                isActive
                  ? "bg-[#0A0A0A] text-white font-bold shadow-xs border border-[#0A0A0A]"
                  : "text-[#737373] hover:text-[#0A0A0A]"
              )}
            >
              <Icon className={cn("w-4 h-4 mb-0.5", isActive ? "text-white" : "")} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-[12px] text-[10px] font-sans text-[#737373] hover:text-[#0A0A0A] transition-colors flex-1"
        >
          <LogOut className="w-4 h-4 mb-0.5 text-neutral-400" />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};
