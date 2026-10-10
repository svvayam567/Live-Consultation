import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import { Modal } from '../ui/Modal';
import {
  Users,
  UserPlus,
  Sparkles,
  LogOut,
  ShieldCheck,
  Eye,
  User,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AdminNavProps {
  activeSection?: 'showcase' | 'clients' | 'register' | 'consultation';
}

export const AdminNav: React.FC<AdminNavProps> = ({ activeSection }) => {
  const { user, profile, updateProfileName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editingName, setEditingName] = useState(profile?.name || '');
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  // Determine current active section from prop or location
  const currentSection = activeSection || (
    location.pathname.startsWith('/showcase')
      ? 'showcase'
      : location.pathname.startsWith('/admin/register')
      ? 'register'
      : location.pathname.startsWith('/admin/consultation') || location.pathname.startsWith('/consult')
      ? 'consultation'
      : 'clients'
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveName = async () => {
    if (!editingName.trim()) return;
    setSavingName(true);
    setNameSuccess(false);
    try {
      await updateProfileName(editingName.trim());
      setNameSuccess(true);
      setTimeout(() => {
        setNameSuccess(false);
        setProfileModalOpen(false);
      }, 1000);
    } catch (err) {
      console.warn('Error updating profile name:', err);
    } finally {
      setSavingName(false);
    }
  };

  const navItems = [
    {
      id: 'showcase',
      label: 'Showcase',
      path: '/showcase',
      icon: Eye
    },
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

  const adminDisplayName = profile?.name || 'Svvayam Admin';

  return (
    <>
      {/* Persistent Desktop Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#ECECEC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand Logo (Always redirects to /showcase for Admin) & Admin Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/showcase"
              className="flex items-center group cursor-pointer"
              title="Return to Architectural Showcase"
            >
              <Logo className="h-7 sm:h-8 object-contain transition-transform group-hover:scale-102" />
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
                    "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer",
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

          {/* Right: User Identity & Profile Edit Pill & Log Out */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-xs font-sans">
            {/* Clickable Profile Pill: "Logged in as <name>" */}
            <button
              type="button"
              onClick={() => {
                setEditingName(profile?.name || '');
                setNameSuccess(false);
                setProfileModalOpen(true);
              }}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#ECECEC] bg-white hover:border-[#0A0A0A] hover:bg-neutral-50 transition-colors text-[#5C5C5C] cursor-pointer"
              title="Click to edit your consultant display name"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-xs">
                Logged in as <strong className="text-[#0A0A0A] font-medium">{adminDisplayName}</strong>
              </span>
            </button>

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
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-[12px] text-[10px] font-sans transition-all flex-1",
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
          onClick={() => {
            setEditingName(profile?.name || '');
            setNameSuccess(false);
            setProfileModalOpen(true);
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-[12px] text-[10px] font-sans text-[#737373] hover:text-[#0A0A0A] transition-colors flex-1"
          title="Admin Profile"
        >
          <User className="w-4 h-4 mb-0.5 text-neutral-400" />
          <span>Profile</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-[12px] text-[10px] font-sans text-[#737373] hover:text-[#0A0A0A] transition-colors flex-1"
        >
          <LogOut className="w-4 h-4 mb-0.5 text-neutral-400" />
          <span>Log out</span>
        </button>
      </div>

      {/* Admin Profile Edit Modal */}
      {profileModalOpen && (
        <Modal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          title="Consultant Profile"
          subtitle="Customize your consultant name across client consultations and live proposals."
          maxWidth="sm"
        >
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Mobile Number (Login ID)
              </label>
              <div className="px-3.5 py-2.5 bg-neutral-100 rounded-[12px] text-xs font-mono text-[#0A0A0A] border border-neutral-200">
                {user?.phone || '+91 8074257384'}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Consultant Full Name
              </label>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                placeholder="e.g. Ar. Jagirdhar"
                className="w-full px-3.5 py-2.5 text-xs rounded-[12px] border border-[#ECECEC] focus:border-[#0A0A0A] focus:outline-none bg-white shadow-2xs text-[#0A0A0A]"
              />
              <p className="text-[11px] text-[#5C5C5C] leading-relaxed">
                This name is automatically recorded on all new client consultations you conduct.
              </p>
            </div>

            {nameSuccess && (
              <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-[10px] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Display name updated successfully!</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECECEC]">
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-500 hover:text-[#0A0A0A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingName || !editingName.trim()}
                onClick={handleSaveName}
                className="px-4 py-1.5 text-xs font-medium bg-[#0A0A0A] text-white rounded-full hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
              >
                {savingName ? 'Saving...' : 'Save Name'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminNav;
