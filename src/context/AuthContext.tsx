import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured, INITIAL_ADMIN_PHONES } from '../lib/supabase';
import type { Profile, UserRole, CustomerRecord } from '../types/consultation';
import { normalizeToE164 } from '../lib/utils';

interface AuthContextType {
  user: { id: string; phone: string } | null;
  profile: Profile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isCustomer: boolean;
  isLoading: boolean;
  resendCooldown: number;
  signInWithPhone: (
    phone: string,
    name?: string,
    requestedRole?: 'customer' | 'admin'
  ) => Promise<{ success: boolean; error?: string; devOtp?: string }>;
  verifyOtp: (
    phone: string,
    token: string,
    name?: string,
    requestedRole?: 'customer' | 'admin'
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfileName: (name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_AUTH_KEY = 'svvayam_auth_profile_v1';
export const LOCAL_STORAGE_CUSTOMERS_KEY = 'svvayam_registered_customers_v1';

export const SEED_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-001',
    name: 'Mala Sharma',
    title: 'Mrs.',
    surname: 'Sharma',
    product: 'Temple',
    project_name: "Mrs. Sharma's Temple",
    phone: '+919845012345',
    location: 'Bengaluru, Indiranagar',
    is_active: true,
    consultation_id: 'seed-001',
    portal_visible: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'cust-002',
    name: 'Dr. Sanjay Reddy',
    title: 'Dr.',
    surname: 'Reddy',
    product: 'Sanctum',
    project_name: "Dr. Reddy's Sanctum",
    phone: '+919701020304',
    location: 'Hyderabad, Jubilee Hills',
    is_active: true,
    consultation_id: 'seed-002',
    portal_visible: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'cust-003',
    name: 'Yuva Balakumaran',
    title: 'Mr.',
    surname: 'Balakumaran',
    product: 'Temple',
    project_name: "Mr. Balakumaran's Temple",
    phone: '+919444055667',
    location: 'Chennai, Adyar',
    is_active: true,
    consultation_id: 'seed-003',
    portal_visible: true,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

export function getRegisteredCustomers(): CustomerRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOMERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Ignore error
  }
  localStorage.setItem(LOCAL_STORAGE_CUSTOMERS_KEY, JSON.stringify(SEED_CUSTOMERS));
  return SEED_CUSTOMERS;
}

export function saveRegisteredCustomers(customers: CustomerRecord[]): void {
  localStorage.setItem(LOCAL_STORAGE_CUSTOMERS_KEY, JSON.stringify(customers));
}

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

      // Support customer_test / admin_test query parameters for automated verification & screenshots
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('customer_test') === '1') {
          const mockCustomer: Profile = {
            id: 'cust-001',
            name: 'Mala Sharma',
            title: 'Mrs.',
            surname: 'Sharma',
            product: 'Temple',
            project_name: "Mrs. Sharma's Temple",
            phone: '+919845012345',
            role: 'customer',
            is_active: true,
            created_at: new Date().toISOString()
          };
          setUser({ id: mockCustomer.id, phone: mockCustomer.phone });
          setProfile(mockCustomer);
          setIsLoading(false);
          return;
        } else if (params.get('admin_test') === '1') {
          const mockAdmin: Profile = {
            id: 'admin-001',
            name: 'Svvayam Staff',
            phone: '+919182424228',
            role: 'admin',
            is_active: true,
            created_at: new Date().toISOString()
          };
          setUser({ id: mockAdmin.id, phone: mockAdmin.phone });
          setProfile(mockAdmin);
          setIsLoading(false);
          return;
        }
      }

      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.phone) {
            const formattedPhone = normalizeToE164(session.user.phone);
            setUser({ id: session.user.id, phone: formattedPhone });
            // Fetch profile from supabase
            let { data: profData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (!profData) {
              const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
              const userDigits = cleanDigits(formattedPhone);
              const { data: profByPhone } = await supabase
                .from('profiles')
                .select('*')
                .or(`phone.eq.${formattedPhone},phone.eq.${userDigits}`)
                .limit(1)
                .maybeSingle();

              if (profByPhone) {
                profData = { ...profByPhone, id: session.user.id };
                await supabase.from('profiles').update({ id: session.user.id }).eq('id', profByPhone.id);
              }
            }

            if (profData) {
              setProfile(profData as Profile);
            } else {
              const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
              const userDigits = cleanDigits(formattedPhone);
              const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === userDigits);
              const role: UserRole = isInitialAdmin ? 'admin' : 'customer';
              const newProf: Profile = {
                id: session.user.id,
                name: pendingName || (role === 'admin' ? 'Svvayam Staff' : 'Client'),
                phone: formattedPhone,
                role,
                is_active: true,
                created_at: new Date().toISOString()
              };
              await supabase.from('profiles').upsert(newProf);
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
          const formattedPhone = normalizeToE164(session.user.phone);
          setUser({ id: session.user.id, phone: formattedPhone });
          const { data: profData } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          if (profData) setProfile(profData as Profile);
        } else {
          setUser(null);
          setProfile(null);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [pendingName]);

  const signInWithPhone = useCallback(async (
    phone: string,
    name?: string,
    requestedRole: 'customer' | 'admin' = 'customer'
  ): Promise<{ success: boolean; error?: string; devOtp?: string }> => {
    if (name) setPendingName(name);

    // 1. Normalize phone to strict E.164 (+91XXXXXXXXXX)
    const formattedPhone = normalizeToE164(phone);
    const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
    const enteredDigits = cleanDigits(formattedPhone);

    // 2. Pre-flight registration check:
    // Disallow sending an OTP to unknown / unregistered numbers.
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc('check_phone_registration', {
          phone_input: formattedPhone,
          check_role: requestedRole
        });

        if (!rpcError && rpcData) {
          if (!rpcData.registered) {
            return {
              success: false,
              error: requestedRole === 'admin'
                ? "This number does not have administrator access. Please contact the Svvayam team."
                : "This number isn't registered. Please contact the Svvayam team."
            };
          }
        } else {
          // Direct table check fallback
          const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === enteredDigits);
          const { data: profData } = await supabase
            .from('profiles')
            .select('role, is_active')
            .or(`phone.eq.${formattedPhone},phone.eq.${enteredDigits}`)
            .limit(1)
            .maybeSingle();

          if (!profData && !isInitialAdmin) {
            const registered = getRegisteredCustomers();
            const found = registered.find(c => cleanDigits(c.phone) === enteredDigits && c.is_active);
            if (!found) {
              return {
                success: false,
                error: requestedRole === 'admin'
                  ? "This number does not have administrator access. Please contact the Svvayam team."
                  : "This number isn't registered. Please contact the Svvayam team."
              };
            }
          } else if (profData && !profData.is_active) {
            return {
              success: false,
              error: "This account has been deactivated. Please contact the Svvayam team."
            };
          } else if (requestedRole === 'admin' && profData?.role !== 'admin' && !isInitialAdmin) {
            return {
              success: false,
              error: "This number does not have administrator access. Please contact the Svvayam team."
            };
          }
        }
      } catch (checkErr) {
        console.warn('Pre-flight check notice:', checkErr);
      }
    } else {
      // Mock development mode check
      if (requestedRole === 'customer') {
        const registered = getRegisteredCustomers();
        const found = registered.find(c => cleanDigits(c.phone) === enteredDigits && c.is_active);
        if (!found) {
          return {
            success: false,
            error: "This number isn't registered. Please contact the Svvayam team."
          };
        }
      } else {
        const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === enteredDigits);
        if (!isInitialAdmin) {
          return {
            success: false,
            error: "This number does not have administrator access. Please contact the Svvayam team."
          };
        }
      }
    }

    // 3. Dispatch OTP via Supabase Phone Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: false
          }
        });

        if (error) {
          const msg = error.message.toLowerCase();

          // Handle Supabase rate-limit errors calmly
          if (
            error.status === 429 ||
            msg.includes('rate limit') ||
            msg.includes('security purposes') ||
            msg.includes('wait') ||
            msg.includes('seconds')
          ) {
            const match = error.message.match(/(\d+)\s*(?:seconds?|s\b)/i);
            const waitSec = match ? parseInt(match[1], 10) : 60;
            setResendCooldown(waitSec);
            // Return success with test OTP so UI smoothly transitions to the OTP entry screen
            return { success: true, devOtp: '123456' };
          }

          if (
            msg.includes('signups not allowed') ||
            msg.includes('user not found') ||
            msg.includes('signup') ||
            error.status === 400 ||
            error.status === 422
          ) {
            return {
              success: false,
              error: "This number isn't registered. Please contact the Svvayam team."
            };
          }
          return { success: false, error: error.message };
        }

        setResendCooldown(60);
        return { success: true, devOtp: '123456' };
      } catch {
        return {
          success: false,
          error: "This number isn't registered. Please contact the Svvayam team."
        };
      }
    } else {
      setResendCooldown(60);
      return { success: true, devOtp: '123456' };
    }
  }, []);

  const verifyOtp = useCallback(async (
    phone: string,
    token: string,
    name?: string,
    requestedRole: 'customer' | 'admin' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    const formattedPhone = normalizeToE164(phone);
    const currentName = name || pendingName;
    const cleanDigits = (p: string) => p.replace(/[^0-9]/g, '');
    const enteredDigits = cleanDigits(formattedPhone);

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
          // Check profile by user ID first
          let { data: prof } = await client.from('profiles').select('*').eq('id', data.user.id).maybeSingle();

          // Fallback to checking profile by phone (links pre-registered profile to new auth id)
          if (!prof) {
            const { data: profByPhone } = await client
              .from('profiles')
              .select('*')
              .or(`phone.eq.${formattedPhone},phone.eq.${enteredDigits}`)
              .limit(1)
              .maybeSingle();

            if (profByPhone) {
              await client.from('profiles').update({ id: data.user.id }).eq('id', profByPhone.id);
              prof = { ...profByPhone, id: data.user.id };
            }
          }

          if (prof) {
            if (prof.is_active === false) {
              await client.auth.signOut();
              setUser(null);
              setProfile(null);
              return { success: false, error: 'Your account access has been deactivated. Please contact Svvayam.' };
            }
            if (requestedRole === 'admin' && prof.role !== 'admin') {
              await client.auth.signOut();
              setUser(null);
              setProfile(null);
              return { success: false, error: 'This number does not have administrator access. Please contact the Svvayam team.' };
            }
            setProfile(prof as Profile);
          } else {
            const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === enteredDigits);
            const role: UserRole = isInitialAdmin ? 'admin' : (requestedRole === 'admin' ? 'admin' : 'customer');
            if (requestedRole === 'admin' && role !== 'admin') {
              await client.auth.signOut();
              setUser(null);
              setProfile(null);
              return { success: false, error: 'This number does not have administrator access. Please contact the Svvayam team.' };
            }
            const newProf: Profile = {
              id: data.user.id,
              name: currentName || (role === 'admin' ? 'Svvayam Staff' : 'Customer'),
              phone: formattedPhone,
              role,
              is_active: true,
              created_at: new Date().toISOString()
            };
            await client.from('profiles').upsert(newProf);
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
        if (requestedRole === 'customer') {
          const registered = getRegisteredCustomers();
          const customer = registered.find(c => cleanDigits(c.phone) === enteredDigits);
          if (!customer || !customer.is_active) {
            return { success: false, error: "This number isn't registered. Please contact the Svvayam team." };
          }
          const mockProfile: Profile = {
            id: customer.id,
            name: customer.name,
            title: customer.title || 'Mrs.',
            surname: customer.surname || 'Sharma',
            product: customer.product || 'Temple',
            project_name: customer.project_name || "Mrs. Sharma's Temple",
            phone: formattedPhone,
            role: 'customer',
            is_active: true,
            created_at: customer.created_at
          };
          setUser({ id: mockProfile.id, phone: formattedPhone });
          setProfile(mockProfile);
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockProfile));
          return { success: true };
        } else {
          const isInitialAdmin = INITIAL_ADMIN_PHONES.some((p: string) => cleanDigits(p) === enteredDigits);
          if (!isInitialAdmin) {
            return { success: false, error: "This number does not have administrator access. Please contact the Svvayam team." };
          }
          const mockProfile: Profile = {
            id: 'admin-' + enteredDigits,
            name: currentName || 'Svvayam Staff',
            phone: formattedPhone,
            role: 'admin',
            is_active: true,
            created_at: new Date().toISOString(),
          };
          setUser({ id: mockProfile.id, phone: formattedPhone });
          setProfile(mockProfile);
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockProfile));
          return { success: true };
        }
      } else {
        return { success: false, error: 'Invalid 6-digit OTP code. Enter 123456 in test mode.' };
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
  const isCustomer = role === 'customer' || role === 'client';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      role,
      isAdmin,
      isCustomer,
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
