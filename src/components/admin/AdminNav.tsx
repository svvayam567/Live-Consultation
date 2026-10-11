import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import {
  Users,
  UserPlus,
  Sparkles,
  LogOut,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AddAdminModal } from './AddAdminModal';

export interface AdminNavProps {
  activeSection?: 'showcase' | 'consultation' | 'clients' | 'team' | 'register';
}

function getInitials(name?: string): string {
  if (!name) return 'SA';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getMaskedPhone(phone?: string, email?: string): string {
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length >= 10) {
      const last4 = digits.slice(-4);
      return `+91 ••••• ${last4}`;
    }
  }
  if (email && email.includes('@')) {
    const [local, domain] = email.split('@');
    if (local.length > 2) {
      return `${local.slice(0, 2)}•••••@${domain}`;
    }
    return email;
  }
  return '+91 ••••• 4228';
}

export const AdminNav: React.FC<AdminNavProps> = ({ activeSection }) => {
  const { user, profile, logout, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);

  const avatarBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const addAdminBtnRef = useRef<HTMLButtonElement>(null);
  const logoutBtnRef = useRef<HTMLButtonElement>(null);

  // Determine current active section from prop or current pathname (register maps to clients)
  const currentSection = activeSection === 'register' ? 'clients' : (activeSection || (
    location.pathname.startsWith('/showcase')
      ? 'showcase'
      : location.pathname.startsWith('/admin/consultation') || location.pathname.startsWith('/consult')
      ? 'consultation'
      : location.pathname.startsWith('/admin/team')
      ? 'team'
      : 'clients'
  ));

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Keyboard navigation & accessibility inside dropdown
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!dropdownOpen) return;
    const focusableElements = dropdownRef.current?.querySelectorAll<HTMLButtonElement>(
      'button[role="menuitem"]:not([disabled])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const items = Array.from(focusableElements);
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === 'Escape') {
      e.preventDefault();
      setDropdownOpen(false);
      avatarBtnRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex].focus();
    } else if (e.key === 'Tab') {
      if (e.shiftKey && currentIndex === 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && currentIndex === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    }
  }, [dropdownOpen]);

  // Focus first item when dropdown opens
  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => {
        if (isSuperAdmin && addAdminBtnRef.current) {
          addAdminBtnRef.current.focus();
        } else if (logoutBtnRef.current) {
          logoutBtnRef.current.focus();
        }
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen, isSuperAdmin]);

  // Ordered nav items: Showcase, Consultation, Clients, Team
  const navItems = [
    {
      id: 'showcase',
      label: 'Showcase',
      path: '/showcase',
      icon: Eye
    },
    {
      id: 'consultation',
      label: 'Consultation',
      path: '/admin/consultation',
      icon: Sparkles
    },
    {
      id: 'clients',
      label: 'Clients',
      path: '/admin/clients',
      icon: Users
    },
    ...(isSuperAdmin ? [
      {
        id: 'team',
        label: 'Team',
        path: '/admin/team',
        icon: ShieldCheck
      }
    ] : [])
  ];

  const adminName = profile?.name || (isSuperAdmin ? 'Svvayam Super Admin' : 'Svvayam Admin');
  const userInitials = getInitials(adminName);
  const maskedPhone = getMaskedPhone(profile?.phone || user?.phone, profile?.email || user?.email);

  return (
    <>
      {/* Slim Top Navigation Bar: exactly 64px high, white background, 1px #ECECEC hairline below */}
      <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-[#ECECEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
          
          {/* 1. Left: Svvayam Logo only (No badge next to it) */}
          <div className="flex items-center">
            <Link
              to="/showcase"
              className="flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#0E2A1C] focus-visible:ring-offset-2"
              title="Return to Architectural Showcase"
            >
              <Logo className="h-7 sm:h-8 object-contain transition-transform" />
            </Link>
          </div>

          {/* 2. Centre: Segmented Navigation Container (Showcase, Consultation, Clients, Team) */}
          <nav
            aria-label="Admin Navigation"
            className="hidden md:flex items-center bg-[#F5F5F5] p-1 rounded-full border border-[#ECECEC] relative"
          >
            {navItems.map((item) => {
              const isActive = currentSection === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "relative px-3.5 lg:px-5 py-1.5 rounded-full text-[14px] font-sans font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0E2A1C] focus-visible:ring-offset-2",
                    isActive
                      ? "text-white"
                      : "text-[#5C5C5C] hover:text-[#0A0A0A]"
                  )}
                >
                  {/* Sliding active black glossy pill (animated via transform only, 250ms) */}
                  {isActive && (
                    <motion.span
                      layoutId="admin-active-pill"
                      transition={{
                        type: "tween",
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_4px_rgba(0,0,0,0.15)] z-0"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: ONE account button (40px round avatar with user initials) */}
          <div className="relative flex items-center">
            <button
              ref={avatarBtnRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-label="Account options"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-semibold transition-all cursor-pointer outline-none select-none",
                "bg-[#F4F4F4] text-[#0A0A0A] border border-[#ECECEC] hover:border-[#0A0A0A]",
                "focus-visible:ring-2 focus-visible:ring-[#0E2A1C] focus-visible:ring-offset-2",
                dropdownOpen && "border-[#0A0A0A] shadow-xs"
              )}
              title={`${adminName} - Account options`}
            >
              <span>{userInitials}</span>
            </button>

            {/* Account Dropdown Card */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  role="menu"
                  aria-label="Account options"
                  onKeyDown={handleDropdownKeyDown}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-[14px] border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] p-3 z-50 text-left outline-none"
                >
                  {/* User Profile Header */}
                  <div className="px-2 py-1">
                    <div className="font-sans font-medium text-sm text-[#0A0A0A] truncate">
                      {adminName}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[9px] font-bold uppercase tracking-wider font-mono">
                        {isSuperAdmin ? 'Super Admin' : 'Admin'}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#5C5C5C] mt-1.5">
                      {maskedPhone}
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="border-t border-[#ECECEC] my-2" />

                  <div className="space-y-1">
                    {/* Add Admin (Only for Super Admins) */}
                    {isSuperAdmin && (
                      <button
                        ref={addAdminBtnRef}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setDropdownOpen(false);
                          setAddAdminModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-sans font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-[10px] transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0E2A1C] cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4 text-[#5C5C5C]" />
                        <span>Add Admin</span>
                      </button>
                    )}

                    {/* Log out */}
                    <button
                      ref={logoutBtnRef}
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-sans font-medium text-red-600 hover:bg-red-50/70 rounded-[10px] transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0E2A1C] cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Log out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Persistent Mobile Fixed Bottom Tab Bar (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECECEC] px-3 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center min-h-[44px] py-1 px-3 rounded-[12px] font-sans transition-all flex-1 text-center",
                isActive
                  ? "bg-[#0A0A0A] text-white font-medium shadow-xs"
                  : "text-[#737373] hover:text-[#0A0A0A]"
              )}
            >
              <Icon className={cn("w-4 h-4 mb-0.5", isActive ? "text-white" : "text-[#737373]")} />
              <span className="whitespace-nowrap font-medium text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Add Administrator Modal triggered from account dropdown */}
      <AddAdminModal
        isOpen={addAdminModalOpen}
        onClose={() => setAddAdminModalOpen(false)}
      />
    </>
  );
};

export default AdminNav;
