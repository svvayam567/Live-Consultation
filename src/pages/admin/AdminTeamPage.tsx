import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminNav } from '../../components/admin/AdminNav';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import type { AdminUserRecord, AdminActivityRecord, AdminActivityAction } from '../../types/consultation';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Power,
  RotateCcw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  History,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';

const LOCAL_STORAGE_MOCK_ADMINS_KEY = 'svvayam_mock_admins_v1';
const LOCAL_STORAGE_MOCK_ACTIVITY_KEY = 'svvayam_mock_admin_activity_v1';

// Initial default seed admins if none exists
const SEED_ADMINS: AdminUserRecord[] = [
  {
    id: 'admin-super-001',
    name: 'Svvayam Super Admin',
    email: 'marketing@svvayam.com',
    role: 'super_admin',
    active: true,
    must_change_password: false,
    last_sign_in_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: 'admin-staff-002',
    name: 'Studio Consultant',
    email: 'consultant@svvayam.com',
    role: 'admin',
    active: true,
    must_change_password: false,
    last_sign_in_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 15).toISOString()
  }
];

export const AdminTeamPage: React.FC = () => {
  const { user, profile, isSuperAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not super_admin
  useEffect(() => {
    if (!authLoading && !isSuperAdmin) {
      navigate('/admin/clients', { replace: true });
    }
  }, [authLoading, isSuperAdmin, navigate]);

  const [activeTab, setActiveTab] = useState<'members' | 'activity'>('members');
  const [admins, setAdmins] = useState<AdminUserRecord[]>([]);
  const [activityLogs, setActivityLogs] = useState<AdminActivityRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [actorFilter, setActorFilter] = useState<string>('all');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [newCredentials, setNewCredentials] = useState<{ name: string; email: string; password: string } | null>(null);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // Add Admin Form
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [submittingAdd, setSubmittingAdd] = useState(false);

  // Reset Password Modal
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [targetAdminForReset, setTargetAdminForReset] = useState<AdminUserRecord | null>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [submittingReset, setSubmittingReset] = useState(false);

  // Delete Modal with 10-second countdown
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetAdminForDelete, setTargetAdminForDelete] = useState<AdminUserRecord | null>(null);
  const [deleteCountdown, setDeleteCountdown] = useState<number>(10);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Password generator
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
    let res = '';
    // Ensure at least 1 uppercase, 1 lowercase, 1 number, 1 special
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%&*';
    res += upper.charAt(Math.floor(Math.random() * upper.length));
    res += lower.charAt(Math.floor(Math.random() * lower.length));
    res += numbers.charAt(Math.floor(Math.random() * numbers.length));
    res += symbols.charAt(Math.floor(Math.random() * symbols.length));
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Shuffle
    return res.split('').sort(() => 0.5 - Math.random()).join('');
  };

  // Load Admin list and Activity Logs
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Fetch via Edge Function or direct RPC/RLS
        let fetchedAdmins: AdminUserRecord[] = [];
        let fetchedLogs: AdminActivityRecord[] = [];

        try {
          let res = await supabase.functions.invoke('manage-admin', {
            body: { action: 'list_admins' }
          });
          if (!res.data?.success) {
            res = await supabase.functions.invoke('register-customer', {
              body: { action: 'list_admins' }
            });
          }
          if (res.data?.success && Array.isArray(res.data.admins)) {
            fetchedAdmins = res.data.admins;
          }
        } catch (e) {
          console.warn('Edge function list_admins fallback:', e);
        }

        // Fallback direct table query if function returns empty
        if (fetchedAdmins.length === 0) {
          const { data: profs } = await supabase
            .from('profiles')
            .select('id, name, email, phone, role, active, is_active, must_change_password, created_at')
            .in('role', ['admin', 'super_admin'])
            .order('created_at', { ascending: false });

          if (profs) {
            fetchedAdmins = profs.map(p => ({
              id: p.id,
              name: p.name || 'Unnamed Admin',
              email: p.email || (p.role === 'super_admin' ? 'marketing@svvayam.com' : (p.phone ? `${p.phone}@svvayam.app` : 'admin@svvayam.com')),
              phone: p.phone,
              role: p.role as 'super_admin' | 'admin',
              active: p.active !== false && p.is_active !== false,
              must_change_password: Boolean(p.must_change_password),
              last_sign_in_at: null,
              created_at: p.created_at || new Date().toISOString()
            }));
          }
        }

        // Fetch activity logs
        try {
          const { data: logsData } = await supabase
            .from('admin_activity')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(150);

          if (logsData) {
            fetchedLogs = logsData as AdminActivityRecord[];
          }
        } catch (e) {
          console.warn('Direct activity log fetch error:', e);
        }

        if (fetchedAdmins.length > 0) setAdmins(fetchedAdmins);
        setActivityLogs(fetchedLogs);
      } else {
        // Dev Mock Mode
        const storedAdmins = localStorage.getItem(LOCAL_STORAGE_MOCK_ADMINS_KEY);
        if (storedAdmins) {
          setAdmins(JSON.parse(storedAdmins));
        } else {
          setAdmins(SEED_ADMINS);
          localStorage.setItem(LOCAL_STORAGE_MOCK_ADMINS_KEY, JSON.stringify(SEED_ADMINS));
        }

        const storedLogs = localStorage.getItem(LOCAL_STORAGE_MOCK_ACTIVITY_KEY);
        if (storedLogs) {
          setActivityLogs(JSON.parse(storedLogs));
        }
      }
    } catch (err: any) {
      console.error('Failed to load team data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Countdown timer for Delete Modal
  useEffect(() => {
    if (!deleteModalOpen) {
      setDeleteCountdown(10);
      return;
    }
    if (deleteCountdown > 0) {
      const timer = setTimeout(() => {
        setDeleteCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [deleteModalOpen, deleteCountdown]);

  // Open Add Admin Modal
  const handleOpenAddModal = () => {
    setAddName('');
    setAddEmail('');
    setAddPassword(generateStrongPassword());
    setShowAddPassword(false);
    setAddModalOpen(true);
  };

  // Submit Add Admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = addName.trim();
    const cleanEmail = addEmail.trim().toLowerCase();
    const cleanPass = addPassword.trim();

    if (!cleanName) {
      setToastMessage({ type: 'error', text: 'Please enter the administrator full name.' });
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setToastMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (cleanEmail === 'marketing@svvayam.com') {
      setToastMessage({ type: 'error', text: 'Cannot create another super administrator account.' });
      return;
    }
    
    // Live checklist validation (min 10 chars, letter, number, symbol)
    const hasMinLen = cleanPass.length >= 10;
    const hasLetter = /[a-zA-Z]/.test(cleanPass);
    const hasNumber = /[0-9]/.test(cleanPass);
    const hasSymbol = /[^a-zA-Z0-9]/.test(cleanPass);

    if (!hasMinLen || !hasLetter || !hasNumber || !hasSymbol) {
      setToastMessage({
        type: 'error',
        text: 'Password must be at least 10 characters and include at least one letter, one number, and one symbol.'
      });
      return;
    }

    setSubmittingAdd(true);

    try {
      if (isSupabaseConfigured && supabase) {
        let response = await supabase.functions.invoke('manage-admin', {
          body: {
            action: 'register_admin',
            name: cleanName,
            email: cleanEmail,
            password: cleanPass
          }
        });

        if (!response.data?.success) {
          response = await supabase.functions.invoke('register-customer', {
            body: {
              action: 'register_admin',
              name: cleanName,
              email: cleanEmail,
              password: cleanPass
            }
          });
        }

        if (!response.data?.success) {
          throw new Error(response.data?.error || response.error?.message || 'Failed to create administrator account.');
        }
      } else {
        // Mock fallback
        const newMockAdmin: AdminUserRecord = {
          id: 'admin-' + Date.now(),
          name: cleanName,
          email: cleanEmail,
          role: 'admin',
          active: true,
          must_change_password: true,
          last_sign_in_at: null,
          created_at: new Date().toISOString()
        };
        const updated = [newMockAdmin, ...admins];
        setAdmins(updated);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ADMINS_KEY, JSON.stringify(updated));

        const newLog: AdminActivityRecord = {
          id: 'log-' + Date.now(),
          actor_id: user?.id || null,
          actor_name: profile?.name || 'Super Admin',
          action: 'admin_created',
          target: `${cleanName} (${cleanEmail})`,
          created_at: new Date().toISOString()
        };
        const updatedLogs = [newLog, ...activityLogs];
        setActivityLogs(updatedLogs);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ACTIVITY_KEY, JSON.stringify(updatedLogs));
      }

      setAddModalOpen(false);
      setNewCredentials({
        name: cleanName,
        email: cleanEmail,
        password: cleanPass
      });
      setCredentialsModalOpen(true);
      setToastMessage({ type: 'success', text: `Administrator ${cleanName} created successfully.` });
      loadData(true);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Error creating administrator.' });
    } finally {
      setSubmittingAdd(false);
    }
  };

  // Toggle Active Status
  const handleToggleActive = async (adminItem: AdminUserRecord) => {
    // Prevent disabling self or primary super admin
    if (adminItem.email?.toLowerCase() === 'marketing@svvayam.com' || adminItem.role === 'super_admin' || adminItem.id === user?.id) {
      setToastMessage({ type: 'error', text: 'Super Administrator accounts cannot be disabled.' });
      return;
    }

    const nextActive = !adminItem.active;
    try {
      if (isSupabaseConfigured && supabase) {
        let response = await supabase.functions.invoke('manage-admin', {
          body: {
            action: 'toggle_admin_active',
            admin_id: adminItem.id,
            active: nextActive
          }
        });

        if (!response.data?.success) {
          response = await supabase.functions.invoke('register-customer', {
            body: {
              action: 'toggle_admin_active',
              admin_id: adminItem.id,
              active: nextActive
            }
          });
        }

        if (!response.data?.success) {
          throw new Error(response.data?.error || response.error?.message || 'Failed to update admin status.');
        }
      } else {
        // Mock fallback
        const updated = admins.map(a => a.id === adminItem.id ? { ...a, active: nextActive } : a);
        setAdmins(updated);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ADMINS_KEY, JSON.stringify(updated));

        const newLog: AdminActivityRecord = {
          id: 'log-' + Date.now(),
          actor_id: user?.id || null,
          actor_name: profile?.name || 'Super Admin',
          action: nextActive ? 'admin_enabled' : 'admin_disabled',
          target: `${adminItem.name} (${adminItem.email || adminItem.phone || adminItem.id})`,
          created_at: new Date().toISOString()
        };
        const updatedLogs = [newLog, ...activityLogs];
        setActivityLogs(updatedLogs);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ACTIVITY_KEY, JSON.stringify(updatedLogs));
      }

      setToastMessage({
        type: 'success',
        text: `Administrator ${adminItem.name} is now ${nextActive ? 'Active' : 'Disabled (Instant Lockout)'}.`
      });
      loadData(true);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Failed to toggle administrator status.' });
    }
  };

  // Open Reset Password Modal
  const handleOpenResetModal = (adminItem: AdminUserRecord) => {
    setTargetAdminForReset(adminItem);
    setResetPasswordVal(generateStrongPassword());
    setShowResetPassword(false);
    setResetModalOpen(true);
  };

  // Confirm Reset Password
  const handleConfirmResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAdminForReset) return;
    if (resetPasswordVal.trim().length < 10) {
      setToastMessage({ type: 'error', text: 'Temporary password must be at least 10 characters.' });
      return;
    }

    setSubmittingReset(true);
    try {
      if (isSupabaseConfigured && supabase) {
        let response = await supabase.functions.invoke('manage-admin', {
          body: {
            action: 'reset_admin_password',
            admin_id: targetAdminForReset.id,
            password: resetPasswordVal.trim()
          }
        });

        if (!response.data?.success) {
          response = await supabase.functions.invoke('register-customer', {
            body: {
              action: 'reset_admin_password',
              admin_id: targetAdminForReset.id,
              password: resetPasswordVal.trim()
            }
          });
        }

        if (!response.data?.success) {
          throw new Error(response.data?.error || response.error?.message || 'Failed to reset password.');
        }
      } else {
        // Mock fallback
        const updated = admins.map(a => a.id === targetAdminForReset.id ? { ...a, must_change_password: true } : a);
        setAdmins(updated);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ADMINS_KEY, JSON.stringify(updated));

        const newLog: AdminActivityRecord = {
          id: 'log-' + Date.now(),
          actor_id: user?.id || null,
          actor_name: profile?.name || 'Super Admin',
          action: 'admin_password_reset',
          target: `${targetAdminForReset.name} (${targetAdminForReset.email || targetAdminForReset.phone})`,
          created_at: new Date().toISOString()
        };
        const updatedLogs = [newLog, ...activityLogs];
        setActivityLogs(updatedLogs);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ACTIVITY_KEY, JSON.stringify(updatedLogs));
      }

      setResetModalOpen(false);
      setNewCredentials({
        name: targetAdminForReset.name,
        email: targetAdminForReset.email || '',
        password: resetPasswordVal.trim()
      });
      setCredentialsModalOpen(true);
      setToastMessage({
        type: 'success',
        text: `Temporary password for ${targetAdminForReset.name} has been set. Forced password change is active.`
      });
      loadData(true);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Failed to reset password.' });
    } finally {
      setSubmittingReset(false);
    }
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (adminItem: AdminUserRecord) => {
    if (adminItem.email?.toLowerCase() === 'marketing@svvayam.com' || adminItem.role === 'super_admin' || adminItem.id === user?.id) {
      setToastMessage({ type: 'error', text: 'Super Administrator accounts cannot be deleted.' });
      return;
    }
    setTargetAdminForDelete(adminItem);
    setDeleteCountdown(10);
    setDeleteModalOpen(true);
  };

  // Confirm Delete Admin
  const handleConfirmDelete = async () => {
    if (!targetAdminForDelete || isDeleting || deleteCountdown > 0) return;

    setIsDeleting(true);
    try {
      if (isSupabaseConfigured && supabase) {
        let response = await supabase.functions.invoke('manage-admin', {
          body: {
            action: 'delete_admin',
            admin_id: targetAdminForDelete.id
          }
        });

        if (!response.data?.success) {
          response = await supabase.functions.invoke('register-customer', {
            body: {
              action: 'delete_admin',
              admin_id: targetAdminForDelete.id
            }
          });
        }

        if (!response.data?.success) {
          throw new Error(response.data?.error || response.error?.message || 'Failed to delete administrator.');
        }
      } else {
        // Mock fallback
        const updated = admins.filter(a => a.id !== targetAdminForDelete.id);
        setAdmins(updated);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ADMINS_KEY, JSON.stringify(updated));

        const newLog: AdminActivityRecord = {
          id: 'log-' + Date.now(),
          actor_id: user?.id || null,
          actor_name: profile?.name || 'Super Admin',
          action: 'admin_deleted',
          target: `${targetAdminForDelete.name} (${targetAdminForDelete.email || targetAdminForDelete.phone})`,
          created_at: new Date().toISOString()
        };
        const updatedLogs = [newLog, ...activityLogs];
        setActivityLogs(updatedLogs);
        localStorage.setItem(LOCAL_STORAGE_MOCK_ACTIVITY_KEY, JSON.stringify(updatedLogs));
      }

      setDeleteModalOpen(false);
      setToastMessage({ type: 'success', text: `Administrator ${targetAdminForDelete.name} removed successfully.` });
      setTargetAdminForDelete(null);
      loadData(true);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Failed to delete administrator.' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Copy credentials helper
  const handleCopyCredentials = () => {
    if (!newCredentials) return;
    const text = `Svvayam Architectural Staff Access Credentials\nName: ${newCredentials.name}\nEmail: ${newCredentials.email}\nTemporary Password: ${newCredentials.password}\nPortal URL: ${window.location.origin}\nNote: Admins log in using Email + Password. You will be prompted to set your permanent password on first login.`;
    navigator.clipboard.writeText(text);
    setCopiedCredentials(true);
    setTimeout(() => setCopiedCredentials(false), 2000);
  };

  // Filtered Admins
  const filteredAdmins = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return admins;
    return admins.filter(a =>
      a.name.toLowerCase().includes(q) ||
      (a.email && a.email.toLowerCase().includes(q)) ||
      (a.phone && a.phone.toLowerCase().includes(q))
    );
  }, [admins, searchQuery]);

  // Unique Actors list for Activity filter
  const uniqueActors = useMemo(() => {
    const set = new Set<string>();
    activityLogs.forEach(l => {
      if (l.actor_name) set.add(l.actor_name);
    });
    return Array.from(set);
  }, [activityLogs]);

  // Filtered Activity Logs
  const filteredLogs = useMemo(() => {
    return activityLogs.filter(log => {
      if (actionFilter !== 'all' && log.action !== actionFilter) return false;
      if (actorFilter !== 'all' && log.actor_name !== actorFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const actorMatch = log.actor_name?.toLowerCase().includes(q);
        const targetMatch = log.target?.toLowerCase().includes(q);
        const actionMatch = log.action.toLowerCase().includes(q);
        if (!actorMatch && !targetMatch && !actionMatch) return false;
      }
      return true;
    });
  }, [activityLogs, actionFilter, actorFilter, searchQuery]);

  // Action Badge styling helper
  const renderActionBadge = (action: AdminActivityAction | string) => {
    switch (action) {
      case 'admin_created':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Admin Created
          </span>
        );
      case 'admin_disabled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-50 text-red-800 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Admin Disabled
          </span>
        );
      case 'admin_enabled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Admin Enabled
          </span>
        );
      case 'admin_deleted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 text-neutral-800 border border-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            Admin Deleted
          </span>
        );
      case 'admin_password_reset':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Password Reset
          </span>
        );
      case 'customer_created':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-indigo-50 text-indigo-800 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Customer Created
          </span>
        );
      case 'consultation_deleted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-rose-50 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Consultation Deleted
          </span>
        );
      case 'login':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-sky-50 text-sky-800 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            Admin Login
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono bg-neutral-100 text-neutral-700">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#0A0A0A] font-sans antialiased pb-24">
      {/* Top Persistent Navigation */}
      <AdminNav activeSection="team" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Header section */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                Super Admin Privilege
              </span>
              <span className="text-xs text-neutral-400 font-mono">•</span>
              <span className="text-xs text-neutral-500 font-mono">Row Level Security Enforced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#0A0A0A]">
              Team Management & Security
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5C5C] max-w-2xl font-sans">
              Manage architectural staff credentials, enforce instant session lockout, and review immutable audit activity logs.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 border-[#ECECEC] hover:bg-neutral-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
              <span>Refresh</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Administrator</span>
            </Button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer",
              activeTab === 'members'
                ? "bg-[#0A0A0A] text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-black hover:bg-white"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Administrators</span>
            <span className={cn(
              "ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono",
              activeTab === 'members' ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
            )}>
              {admins.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer",
              activeTab === 'activity'
                ? "bg-[#0A0A0A] text-white shadow-xs font-semibold"
                : "text-neutral-600 hover:text-black hover:bg-white"
            )}
          >
            <History className="w-3.5 h-3.5" />
            <span>Activity Audit Log</span>
            <span className={cn(
              "ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono",
              activeTab === 'activity' ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
            )}>
              {activityLogs.length}
            </span>
          </button>
        </div>

        {/* TAB 1: MEMBERS */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            {/* Search Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-[12px] border border-[#E5E5E5] bg-neutral-50/50 text-xs text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:bg-white font-sans"
                />
              </div>

              <span className="text-xs text-neutral-400 font-mono">
                Showing {filteredAdmins.length} of {admins.length} admins
              </span>
            </div>

            {/* Administrators Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                    <th className="py-3 px-3">Administrator</th>
                    <th className="py-3 px-3">Email Address</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Account Status</th>
                    <th className="py-3 px-3">Password Status</th>
                    <th className="py-3 px-3">Last Login</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-400 font-sans text-xs">
                        Loading administrators...
                      </td>
                    </tr>
                  ) : filteredAdmins.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-400 font-sans text-xs">
                        No administrators found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAdmins.map((adm) => {
                      const isPrimarySuperAdmin = adm.email?.toLowerCase() === 'marketing@svvayam.com' || adm.role === 'super_admin';
                      const isCurrentCaller = adm.id === user?.id;

                      return (
                        <tr key={adm.id} className="hover:bg-neutral-50/60 transition-colors">
                          {/* Name with Avatar Initials */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs font-semibold shrink-0",
                                adm.role === 'super_admin'
                                  ? "bg-purple-100 text-purple-900 border border-purple-200"
                                  : "bg-neutral-100 text-neutral-800 border border-neutral-200"
                              )}>
                                {adm.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium text-[#0A0A0A] flex items-center gap-1.5">
                                  <span>{adm.name}</span>
                                  {isCurrentCaller && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700">
                                      You
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-neutral-400 font-mono">
                                  ID: {adm.id.slice(0, 8)}...
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-3.5 px-3 font-mono text-neutral-700">
                            {adm.email || adm.phone || '—'}
                          </td>

                          {/* Role Badge */}
                          <td className="py-3.5 px-3">
                            {adm.role === 'super_admin' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-50 text-purple-900 border border-purple-200">
                                <ShieldCheck className="w-3 h-3 text-purple-700" />
                                Super Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                                Admin
                              </span>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-3">
                            {adm.active ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-50 text-red-800 border border-red-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                Disabled (Locked Out)
                              </span>
                            )}
                          </td>

                          {/* Password Status */}
                          <td className="py-3.5 px-3">
                            {adm.must_change_password ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200" title="Admin must set a new password on their next login">
                                <Clock className="w-2.5 h-2.5 text-amber-600" />
                                Temp Password
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 text-neutral-600">
                                Permanent
                              </span>
                            )}
                          </td>

                          {/* Last Login */}
                          <td className="py-3.5 px-3 text-[11px] text-neutral-500 font-mono">
                            {adm.last_sign_in_at
                              ? new Date(adm.last_sign_in_at).toLocaleString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Never logged in'}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Enable / Disable Button */}
                              <button
                                type="button"
                                onClick={() => handleToggleActive(adm)}
                                disabled={isPrimarySuperAdmin || isCurrentCaller}
                                className={cn(
                                  "p-1.5 rounded-lg border text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
                                  adm.active
                                    ? "border-red-200 text-red-600 hover:bg-red-50"
                                    : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                )}
                                title={
                                  isPrimarySuperAdmin
                                    ? "Cannot disable Super Administrator"
                                    : isCurrentCaller
                                    ? "Cannot disable your own account"
                                    : adm.active
                                    ? "Disable Administrator (Instant Session Lockout)"
                                    : "Enable Administrator"
                                }
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>

                              {/* Reset Password Button */}
                              <button
                                type="button"
                                onClick={() => handleOpenResetModal(adm)}
                                className="p-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                                title="Reset Administrator Password"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => handleOpenDeleteModal(adm)}
                                disabled={isPrimarySuperAdmin || isCurrentCaller}
                                className="p-1.5 rounded-lg border border-neutral-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                title={
                                  isPrimarySuperAdmin
                                    ? "Cannot delete Super Administrator"
                                    : isCurrentCaller
                                    ? "Cannot delete your own account"
                                    : "Delete Administrator"
                                }
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVITY AUDIT LOG */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECECEC] pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search audit log..."
                    className="pl-8 pr-3 py-1.5 rounded-[10px] border border-[#E5E5E5] bg-neutral-50/50 text-xs text-[#0A0A0A] focus:outline-none focus:bg-white font-sans w-48"
                  />
                </div>

                {/* Action Filter */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <Filter className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-[10px] border border-[#E5E5E5] bg-white text-xs text-[#0A0A0A] focus:outline-none font-sans"
                  >
                    <option value="all">All Action Types</option>
                    <option value="admin_created">Admin Created</option>
                    <option value="admin_disabled">Admin Disabled</option>
                    <option value="admin_enabled">Admin Enabled</option>
                    <option value="admin_deleted">Admin Deleted</option>
                    <option value="admin_password_reset">Password Reset</option>
                    <option value="customer_created">Customer Created</option>
                    <option value="consultation_deleted">Consultation Deleted</option>
                    <option value="login">Admin Login</option>
                  </select>
                </div>

                {/* Actor Filter */}
                {uniqueActors.length > 0 && (
                  <select
                    value={actorFilter}
                    onChange={(e) => setActorFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-[10px] border border-[#E5E5E5] bg-white text-xs text-[#0A0A0A] focus:outline-none font-sans"
                  >
                    <option value="all">All Administrators</option>
                    {uniqueActors.map(act => (
                      <option key={act} value={act}>{act}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="text-[11px] font-mono text-neutral-400">
                Append-only log • {filteredLogs.length} events recorded
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Actor (Admin)</th>
                    <th className="py-3 px-3">Security Action</th>
                    <th className="py-3 px-3">Target Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-neutral-400 font-sans text-xs">
                        Loading audit activity records...
                      </td>
                    </tr>
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-neutral-400 font-sans text-xs">
                        No audit events recorded yet matching your filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-3.5 px-3 font-mono text-neutral-500 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-medium text-[#0A0A0A]">
                            {log.actor_name || 'System Admin'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          {renderActionBadge(log.action)}
                        </td>

                        <td className="py-3.5 px-3 font-mono text-neutral-700">
                          {log.target || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.text}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* MODAL 1: ADD ADMINISTRATOR */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Administrator"
      >
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <p className="text-xs text-neutral-500 font-sans">
            Create administrative credentials for a team member. The administrator will be required to set their own permanent password on their first login.
          </p>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
              Administrator Full Name
            </label>
            <input
              type="text"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              placeholder="e.g. Ar. Jagirdhar / Studio Associate"
              required
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              placeholder="e.g. staff@svvayam.com"
              required
              className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-sans text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                Temporary Password
              </label>
              <button
                type="button"
                onClick={() => setAddPassword(generateStrongPassword())}
                className="text-[11px] text-[#0A0A0A] hover:underline flex items-center gap-1 font-mono cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Generate Strong</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showAddPassword ? 'text' : 'password'}
                value={addPassword}
                onChange={(e) => setAddPassword(e.target.value)}
                placeholder="At least 10 characters"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              />
              <button
                type="button"
                onClick={() => setShowAddPassword(!showAddPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
              >
                {showAddPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Password Checklist */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-[12px] border border-neutral-200/80 text-[11px] font-mono">
              <div className={cn("flex items-center gap-1.5", addPassword.length >= 10 ? "text-emerald-700 font-semibold" : "text-neutral-500")}>
                <span className={cn("w-1.5 h-1.5 rounded-full", addPassword.length >= 10 ? "bg-emerald-600" : "bg-neutral-300")} />
                10+ characters
              </div>
              <div className={cn("flex items-center gap-1.5", /[a-zA-Z]/.test(addPassword) ? "text-emerald-700 font-semibold" : "text-neutral-500")}>
                <span className={cn("w-1.5 h-1.5 rounded-full", /[a-zA-Z]/.test(addPassword) ? "bg-emerald-600" : "bg-neutral-300")} />
                At least 1 letter
              </div>
              <div className={cn("flex items-center gap-1.5", /[0-9]/.test(addPassword) ? "text-emerald-700 font-semibold" : "text-neutral-500")}>
                <span className={cn("w-1.5 h-1.5 rounded-full", /[0-9]/.test(addPassword) ? "bg-emerald-600" : "bg-neutral-300")} />
                At least 1 number
              </div>
              <div className={cn("flex items-center gap-1.5", /[^a-zA-Z0-9]/.test(addPassword) ? "text-emerald-700 font-semibold" : "text-neutral-500")}>
                <span className={cn("w-1.5 h-1.5 rounded-full", /[^a-zA-Z0-9]/.test(addPassword) ? "bg-emerald-600" : "bg-neutral-300")} />
                At least 1 symbol
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAddModalOpen(false)}
              disabled={submittingAdd}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={submittingAdd}
              className="bg-[#0A0A0A] text-white hover:bg-neutral-800"
            >
              {submittingAdd ? 'Creating...' : 'Create Administrator'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: CREDENTIALS CREATED ONCE DISPLAY */}
      <Modal
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
        title="Administrator Credentials Generated"
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-[12px] flex items-start gap-2 text-xs text-amber-900 font-sans">
            <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <div className="flex-1 font-medium leading-relaxed">
              These credentials will only be shown once. Please copy and share them securely with the new team member. Plain passwords are never stored in plaintext.
            </div>
          </div>

          {newCredentials && (
            <div className="p-4 bg-neutral-900 text-white rounded-[16px] space-y-2.5 font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center text-neutral-400 text-[11px] border-b border-neutral-800 pb-2">
                <span>SVVAYAM ADMIN CREDENTIALS</span>
                <span className="text-emerald-400">STATUS: ACTIVE</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400 font-sans">Full Name:</span>
                <span className="font-semibold text-white">{newCredentials.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400 font-sans">Email Address:</span>
                <span className="font-semibold text-white">{newCredentials.email}</span>
              </div>
              <div className="flex justify-between py-1 items-center">
                <span className="text-neutral-400 font-sans">Temporary Password:</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 font-bold select-all tracking-wider">
                  {newCredentials.password}
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 font-sans pt-2 border-t border-neutral-800">
                Prompted to set permanent password on first sign in.
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyCredentials}
              className="flex items-center gap-1.5"
            >
              {copiedCredentials ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCredentials ? 'Copied to Clipboard' : 'Copy All Credentials'}</span>
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setCredentialsModalOpen(false)}
              className="bg-[#0A0A0A] text-white hover:bg-neutral-800"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: RESET PASSWORD */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset Administrator Password"
      >
        <form onSubmit={handleConfirmResetPassword} className="space-y-4">
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Set a new temporary password for <strong>{targetAdminForReset?.name}</strong> ({targetAdminForReset?.email || targetAdminForReset?.phone}). Setting a temporary password forces them to create a permanent password on their next login.
          </p>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                New Temporary Password
              </label>
              <button
                type="button"
                onClick={() => setResetPasswordVal(generateStrongPassword())}
                className="text-[11px] text-[#0A0A0A] hover:underline flex items-center gap-1 font-mono cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Generate Strong</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showResetPassword ? 'text' : 'password'}
                value={resetPasswordVal}
                onChange={(e) => setResetPasswordVal(e.target.value)}
                placeholder="At least 10 characters"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-[12px] border border-[#E5E5E5] bg-white text-xs font-mono text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
              />
              <button
                type="button"
                onClick={() => setShowResetPassword(!showResetPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0A0A0A] cursor-pointer"
              >
                {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResetModalOpen(false)}
              disabled={submittingReset}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={submittingReset}
              className="bg-[#0A0A0A] text-white hover:bg-neutral-800"
            >
              {submittingReset ? 'Setting...' : 'Set Temporary Password'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 4: DELETE CONFIRMATION WITH 10-SECOND COUNTDOWN */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Administrator?"
      >
        <div className="space-y-4">
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-[14px] flex items-start gap-2.5 text-xs text-red-900 font-sans">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold">
                Permanent Administrator Removal: {targetAdminForDelete?.name} ({targetAdminForDelete?.email || targetAdminForDelete?.phone})
              </p>
              <p>
                Deleting this administrator account permanently revokes access and deletes their login credentials. This action cannot be undone.
              </p>
            </div>
          </div>

          {/* 10-Second Countdown Indicator */}
          {deleteCountdown > 0 ? (
            <div className="space-y-2 py-2">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                <span>Safety verification lock</span>
                <span className="font-bold text-red-600">Please wait {deleteCountdown}s...</span>
              </div>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((10 - deleteCountdown) / 10) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 font-sans text-center">
                The confirm deletion button will activate once the timer reaches zero.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-[12px] text-xs text-neutral-700 font-sans text-center">
              Safety countdown elapsed. Click <strong>Confirm Deletion</strong> to finalize.
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            {deleteCountdown === 0 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white hover:bg-red-700 border-red-600"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Deletion'}
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={true}
                className="opacity-40 cursor-not-allowed text-neutral-400"
              >
                Confirm Deletion ({deleteCountdown}s)
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTeamPage;
