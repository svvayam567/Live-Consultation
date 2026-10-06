import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured, INITIAL_ADMIN_PHONES } from '../lib/supabase';
import type { Profile, UserRole } from '../types/consultation';

interface AuthContextType {
  user: { id: string; phone: string } | null;
  profile: Profile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  resendCooldown: number;
  signInWithPhone: (phone: string, name?: string) => Promise<{ success: boolean; error?: string; devOtp?: string }>;
  verifyOtp: (phone: string, token: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  updateProfileName: (name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_AUTH_KEY = 'svvayam_auth_profile_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; phone: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [pendingName, setPendingName] = useState<string>('');

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(c => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Load session on startup
  useEffect(() => {
    async function initSession() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.phone) {
            setUser({ id: session.user.id, phone: session.user.phone });
            // Fetch profile from supabase
            const { data: profData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profData) {
              setProfile(profData as Profile);
            } else {
              // Create default profile if not found
              const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
              const userDigits = cleanDigits(session.user.phone || '');
              const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === userDigits);
              const role: UserRole = isInitialAdmin ? 'admin' : 'client';
              const newProf: Profile = {
                id: session.user.id,
                name: pendingName || (role === 'admin' ? 'Svvayam Admin' : 'Team Member'),
                phone: session.user.phone,
                role,
                created_at: new Date().toISOString()
              };
              await supabase.from('profiles').insert(newProf);
              setProfile(newProf);
            }
          }
        } else {
          // Dev mock storage check
          const stored = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
          if (stored) {
            const p: Profile = JSON.parse(stored);
            setUser({ id: p.id, phone: p.phone });
            setProfile(p);
          }
        }
      } catch (err) {
        console.warn('Auth session initialization notice:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initSession();

    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user?.phone) {
          setUser({ id: session.user.id, phone: session.user.phone });
          const { data: profData } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profData) setProfile(profData as Profile);
        } else {
          setUser(null);
          setProfile(null);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [pendingName]);

  const signInWithPhone = useCallback(async (phone: string, name?: string): Promise<{ success: boolean; error?: string; devOtp?: string }> => {
    if (name) setPendingName(name);

    // Format phone with default +91 if missing
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
    }

    setResendCooldown(30);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to send OTP';
        return { success: false, error: message };
      }
    } else {
      // Mock development mode: auto-generate standard dev OTP '123456'
      console.log(`[Dev Mock Auth] OTP for ${formattedPhone} is: 123456`);
      return { success: true, devOtp: '123456' };
    }
  }, []);

  const verifyOtp = useCallback(async (phone: string, token: string, name?: string): Promise<{ success: boolean; error?: string }> => {
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
    }

    const currentName = name || pendingName;

    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      try {
        const { data, error } = await client.auth.verifyOtp({
          phone: formattedPhone,
          token: token.trim(),
          type: 'sms',
        });
        if (error) return { success: false, error: error.message };

        if (data.user) {
          setUser({ id: data.user.id, phone: formattedPhone });
          // Check or create profile
          const { data: prof } = await client.from('profiles').select('*').eq('id', data.user.id).single();
          if (prof) {
            setProfile(prof as Profile);
          } else {
            const role: UserRole = INITIAL_ADMIN_PHONES.includes(formattedPhone) ? 'admin' : 'client';
            const newProf: Profile = {
              id: data.user.id,
              name: currentName || 'Team Member',
              phone: formattedPhone,
              role,
              created_at: new Date().toISOString()
            };
            await client.from('profiles').insert(newProf);
            setProfile(newProf);
          }
        }
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'OTP verification failed';
        return { success: false, error: message };
      }
    } else {
      // Mock dev check: accept '123456'
      if (token.trim() === '123456' || token.trim().length === 6) {
        const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
        const enteredDigits = cleanDigits(formattedPhone);
        const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === enteredDigits);
        const role: UserRole = isInitialAdmin ? 'admin' : 'client';
        const mockProfile: Profile = {
          id: 'mock-user-' + enteredDigits,
          name: currentName || (role === 'admin' ? 'Svvayam Admin' : 'Svvayam Team Member'),
          phone: formattedPhone,
          role,
          created_at: new Date().toISOString(),
        };

        setUser({ id: mockProfile.id, phone: formattedPhone });
        setProfile(mockProfile);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockProfile));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid 6-digit OTP. In development mock mode, enter 123456.' };
      }
    }
  }, [pendingName]);

  const updateProfileName = useCallback(async (name: string): Promise<boolean> => {
    if (!profile) return false;
    const updated = { ...profile, name };
    setProfile(updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').update({ name }).eq('id', profile.id);
    } else {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(updated));
    }
    return true;
  }, [profile]);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setUser(null);
    setProfile(null);
  }, []);

  const role = profile?.role || null;
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      role,
      isAdmin,
      isLoading,
      resendCooldown,
      signInWithPhone,
      verifyOtp,
      updateProfileName,
      signOut,
      logout: signOut,
      isMockMode: !isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
