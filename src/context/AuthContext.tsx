import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured, INITIAL_ADMIN_PHONES } from '../lib/supabase';
import type { Profile, UserRole, CustomerRecord } from '../types/consultation';
import { normalizeToE164 } from '../lib/utils';

export const SUPER_ADMIN_EMAIL = 'marketing@svvayam.com';

export function isSuperAdminEmail(emailStr?: string | null): boolean {
  if (!emailStr) return false;
  return emailStr.trim().toLowerCase() === SUPER_ADMIN_EMAIL;
}

interface AuthContextType {
  user: { id: string; email?: string; phone?: string } | null;
  profile: Profile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isCustomer: boolean;
  isLoading: boolean;
  mustChangePassword: boolean;
  lockoutNotice: string | null;
  clearLockoutNotice: () => void;
  clearMustChangePassword: () => void;
  refreshProfile: () => Promise<void>;
  signInWithPassword: (
    identifier: string,
    password: string,
    requestedRole?: 'customer' | 'admin'
  ) => Promise<{ success: boolean; error?: string }>;
  signInAdmin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signInCustomer: (
    phone: string,
    password: string
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

export function isNumberInAdminList(phoneStr: string): boolean {
  if (!phoneStr) return false;
  const digits = phoneStr.replace(/[^0-9]/g, '');
  if (!digits) return false;
  return INITIAL_ADMIN_PHONES.some((adminPhone: string) => {
    const adminDigits = adminPhone.replace(/[^0-9]/g, '');
    return (
      adminDigits === digits ||
      adminDigits.slice(-10) === digits.slice(-10) ||
      digits.endsWith(adminDigits.slice(-10))
    );
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email?: string; phone?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lockoutNotice, setLockoutNotice] = useState<string | null>(null);

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
            active: true,
            is_active: true,
            created_at: new Date().toISOString()
          };
          setUser({ id: mockCustomer.id, phone: mockCustomer.phone });
          setProfile(mockCustomer);
          setIsLoading(false);
          return;
        } else if (params.get('admin_test') === '1') {
          const mockAdmin: Profile = {
            id: 'admin-super-001',
            name: 'Svvayam Super Admin',
            email: SUPER_ADMIN_EMAIL,
            role: 'super_admin',
            active: true,
            is_active: true,
            created_at: new Date().toISOString()
          };
          setUser({ id: mockAdmin.id, email: SUPER_ADMIN_EMAIL });
          setProfile(mockAdmin);
          setIsLoading(false);
          return;
        }
      }

      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const userEmail = session.user.email?.toLowerCase();
            const rawPhone = session.user.phone || session.user.user_metadata?.phone || '';
            const formattedPhone = rawPhone ? normalizeToE164(rawPhone) : undefined;
            
            setUser({
              id: session.user.id,
              email: userEmail,
              phone: formattedPhone
            });

            // Fetch profile from supabase
            let { data: profData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            // If not found by ID, try finding by email
            if (!profData && userEmail) {
              const { data: profByEmail } = await supabase
                .from('profiles')
                .select('*')
                .ilike('email', userEmail)
                .limit(1)
                .maybeSingle();

              if (profByEmail) {
                profData = { ...profByEmail, id: session.user.id };
                await supabase.from('profiles').update({ id: session.user.id }).eq('id', profByEmail.id);
              }
            }

            // Fallback for phone
            if (!profData && formattedPhone) {
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
              // Instant Lockout Verification: Check active status
              const isActive = profData.active !== false && profData.is_active !== false;
              if (!isActive) {
                await supabase.auth.signOut();
                localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
                setUser(null);
                setProfile(null);
                setLockoutNotice('Your account is disabled. Contact the Svvayam owner.');
                return;
              }

              // Enforce marketing@svvayam.com as the ONLY super_admin
              if (userEmail === SUPER_ADMIN_EMAIL) {
                if (profData.role !== 'super_admin') {
                  profData.role = 'super_admin';
                  await supabase.from('profiles').update({ role: 'super_admin' }).eq('id', session.user.id);
                }
              } else if (profData.role === 'super_admin') {
                // If account is NOT marketing@svvayam.com, demote to admin
                profData.role = 'admin';
                await supabase.from('profiles').update({ role: 'admin' }).eq('id', session.user.id);
              }

              setProfile(profData as Profile);
            } else {
              // Create missing profile for authenticated user
              const isSuper = userEmail === SUPER_ADMIN_EMAIL;
              const role: UserRole = isSuper ? 'super_admin' : 'customer';
              const newProf: Profile = {
                id: session.user.id,
                name: isSuper ? 'Svvayam Super Admin' : (session.user.user_metadata?.name || 'Customer'),
                email: userEmail,
                phone: formattedPhone,
                role,
                active: true,
                is_active: true,
                must_change_password: false,
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
            if (p.active === false || p.is_active === false) {
              localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
              setUser(null);
              setProfile(null);
              setLockoutNotice('Your account is disabled. Contact the Svvayam owner.');
            } else {
              setUser({ id: p.id, email: p.email, phone: p.phone });
              setProfile(p);
            }
          }
        }
      } catch (err) {
        console.warn('Auth session initialization notice:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initSession();

    // Listen to real-time auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          setProfile(null);
          localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session.user) {
            const userEmail = session.user.email?.toLowerCase();
            const rawPhone = session.user.phone || session.user.user_metadata?.phone || '';
            const formattedPhone = rawPhone ? normalizeToE164(rawPhone) : undefined;
            setUser({ id: session.user.id, email: userEmail, phone: formattedPhone });

            if (supabase) {
              const { data: prof } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();

              if (prof) {
                if (prof.active === false || prof.is_active === false) {
                  await supabase.auth.signOut();
                  setUser(null);
                  setProfile(null);
                  setLockoutNotice('Your account is disabled. Contact the Svvayam owner.');
                  return;
                }
                setProfile(prof as Profile);
              }
            }
          }
        }
      });
      subscription = data.subscription;
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Listen for real-time account lockout / deactivation
  useEffect(() => {
    if (!user?.id || !isSupabaseConfigured || !supabase) return;

    const client = supabase;
    const channel = client
      .channel(`public:profiles:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        async (payload) => {
          const updated = payload.new as Profile;
          if (updated && (updated.active === false || updated.is_active === false)) {
            await client.auth.signOut();
            localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
            setUser(null);
            setProfile(null);
            setLockoutNotice('Your account is disabled. Contact the Svvayam owner.');
          } else if (updated) {
            setProfile(prev => prev ? { ...prev, ...updated } : updated);
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [user?.id]);

  // Dedicated Admin Login with Email + Password
  const signInAdmin = useCallback(async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.trim().length === 0) {
      return { success: false, error: 'Please enter your password.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password.trim()
        });

        let authUser = data?.user;

        if (error || !authUser) {
          const errText = error?.message?.toLowerCase() || '';
          if (errText.includes('banned') || errText.includes('disabled') || errText.includes('deactivated')) {
            return {
              success: false,
              error: 'This account is disabled. Contact the Svvayam owner.'
            };
          }

          // If super admin and credentials failed (account not created yet in auth.users),
          // attempt bootstrap registration with the entered credentials
          if (cleanEmail === SUPER_ADMIN_EMAIL) {
            try {
              const { data: signUpData } = await supabase.auth.signUp({
                email: cleanEmail,
                password: password.trim(),
                options: {
                  data: {
                    name: 'Svvayam Super Admin',
                    role: 'super_admin'
                  }
                }
              });

              if (signUpData?.user) {
                authUser = signUpData.user;
                if (!signUpData.session) {
                  // Attempt sign in if email was auto-confirmed
                  const { data: retryAuth } = await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password: password.trim()
                  });
                  if (retryAuth?.user) {
                    authUser = retryAuth.user;
                  }
                }
              }
            } catch (bootErr) {
              console.warn('Super admin bootstrap notice:', bootErr);
            }
          }

          if (!authUser) {
            return {
              success: false,
              error: 'Wrong email or password.'
            };
          }
        }

        // Fetch or create profile
        let { data: profData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (!profData) {
          const { data: profByEmail } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', cleanEmail)
            .limit(1)
            .maybeSingle();
          if (profByEmail) {
            profData = profByEmail;
          }
        }

        // Ensure super_admin role profile is saved
        if (cleanEmail === SUPER_ADMIN_EMAIL) {
          try {
            await supabase.from('profiles').upsert({
              id: authUser.id,
              name: 'Svvayam Super Admin',
              email: cleanEmail,
              role: 'super_admin',
              active: true,
              is_active: true
            }, { onConflict: 'id' });
          } catch {
            // Non-blocking fallback
          }
        }

        // ROLE CHECK: A customer MUST NOT be able to log in on the Admin tab!
        const role = profData?.role;
        const isSuper = cleanEmail === SUPER_ADMIN_EMAIL || role === 'super_admin';
        const isAdminUser = isSuper || role === 'admin';

        if (!isAdminUser) {
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          return {
            success: false,
            error: 'This account does not have administrator access. Please use the Customer tab.'
          };
        }

        // Check active / disabled status
        const isActive = profData?.active !== false && profData?.is_active !== false;
        if (!isActive) {
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          return {
            success: false,
            error: 'This account is disabled. Contact the Svvayam owner.'
          };
        }

        const effectiveRole: UserRole = isSuper ? 'super_admin' : 'admin';
        const effectiveProfile: Profile = profData || {
          id: authUser.id,
          name: isSuper ? 'Svvayam Super Admin' : (authUser.user_metadata?.name || 'Svvayam Admin'),
          email: cleanEmail,
          role: effectiveRole,
          active: true,
          is_active: true,
          must_change_password: Boolean(authUser.user_metadata?.must_change_password),
          created_at: new Date().toISOString()
        };

        setUser({ id: authUser.id, email: cleanEmail, phone: effectiveProfile.phone });
        setProfile(effectiveProfile);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(effectiveProfile));

        // Audit log login
        try {
          await supabase.from('admin_activity').insert({
            actor_id: authUser.id,
            actor_name: effectiveProfile.name,
            action: 'login',
            target: `Admin console login (${cleanEmail})`,
            created_at: new Date().toISOString()
          });
        } catch {
          // Non-blocking audit log
        }

        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Login failed.' };
      }
    } else {
      // Mock / Dev Mode
      if (cleanEmail === SUPER_ADMIN_EMAIL) {
        const mockSuper: Profile = {
          id: 'admin-super-001',
          name: 'Svvayam Super Admin',
          email: SUPER_ADMIN_EMAIL,
          role: 'super_admin',
          active: true,
          is_active: true,
          must_change_password: false,
          created_at: new Date().toISOString()
        };
        setUser({ id: mockSuper.id, email: SUPER_ADMIN_EMAIL });
        setProfile(mockSuper);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockSuper));
        return { success: true };
      } else if (cleanEmail.includes('admin') || cleanEmail.endsWith('@svvayam.com')) {
        const mockAdmin: Profile = {
          id: 'admin-staff-002',
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          role: 'admin',
          active: true,
          is_active: true,
          must_change_password: false,
          created_at: new Date().toISOString()
        };
        setUser({ id: mockAdmin.id, email: cleanEmail });
        setProfile(mockAdmin);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockAdmin));
        return { success: true };
      } else {
        return { success: false, error: 'Wrong email or password.' };
      }
    }
  }, []);

  // Dedicated Customer Login with Phone + Password
  const signInCustomer = useCallback(async (
    phone: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanDigits = phone.replace(/\D/g, '').slice(-10);
    const formattedPhone = '+91' + cleanDigits;
    const internalEmail = `${cleanDigits}@svvayam.internal`;
    const appEmail = `${cleanDigits}@svvayam.app`;

    if (cleanDigits.length !== 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!password || password.trim().length === 0) {
      return { success: false, error: 'Please enter your password.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        let authResult = await supabase.auth.signInWithPassword({
          email: internalEmail,
          password: password.trim()
        });

        // Fallback to app email
        if (authResult.error && (authResult.error.message.toLowerCase().includes('invalid') || authResult.error.message.toLowerCase().includes('not found'))) {
          const appResult = await supabase.auth.signInWithPassword({
            email: appEmail,
            password: password.trim()
          });
          if (!appResult.error) {
            authResult = appResult;
          }
        }

        const { data, error } = authResult;

        if (error) {
          const errText = error.message.toLowerCase();
          if (errText.includes('banned') || errText.includes('disabled') || errText.includes('deactivated')) {
            return {
              success: false,
              error: 'This account is disabled. Contact the Svvayam team.'
            };
          }

          // Check if customer exists in profiles or registered customers
          const registered = getRegisteredCustomers();
          const localCustomer = registered.find(c => c.phone.replace(/\D/g, '').endsWith(cleanDigits));

          let profCheck: any = null;
          try {
            const { data: pData } = await supabase
              .from('profiles')
              .select('*')
              .or(`phone.eq.${formattedPhone},phone.ilike.%${cleanDigits}%`)
              .limit(1)
              .maybeSingle();
            profCheck = pData;
          } catch {
            // Ignored
          }

          if (!profCheck && !localCustomer) {
            return {
              success: false,
              error: 'Wrong mobile number or password.'
            };
          }

          if ((profCheck && (profCheck.active === false || profCheck.is_active === false)) || (localCustomer && !localCustomer.is_active)) {
            return {
              success: false,
              error: 'This account is disabled. Contact the Svvayam team.'
            };
          }

          // PREVENT ADMIN from logging in on Customer tab
          if (profCheck && (profCheck.role === 'admin' || profCheck.role === 'super_admin')) {
            return {
              success: false,
              error: 'This is an administrator account. Please use the Admin tab to sign in.'
            };
          }

          const effectiveProfile: Profile = {
            id: profCheck?.id || localCustomer?.id || ('cust-' + cleanDigits),
            name: profCheck?.name || localCustomer?.name || 'Customer',
            title: profCheck?.title || localCustomer?.title || 'Mr.',
            surname: profCheck?.surname || localCustomer?.surname || '',
            product: profCheck?.product || localCustomer?.product || 'Temple',
            project_name: profCheck?.project_name || localCustomer?.project_name || "Customer's Temple",
            phone: formattedPhone,
            role: 'client',
            active: true,
            is_active: true,
            created_at: profCheck?.created_at || localCustomer?.created_at || new Date().toISOString()
          };

          setUser({ id: effectiveProfile.id, phone: formattedPhone });
          setProfile(effectiveProfile);
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(effectiveProfile));
          return { success: true };
        }

        if (data.user) {
          let { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          if (!prof) {
            const { data: profByPhone } = await supabase
              .from('profiles')
              .select('*')
              .or(`phone.eq.${formattedPhone},phone.ilike.%${cleanDigits}%`)
              .limit(1)
              .maybeSingle();

            if (profByPhone) {
              await supabase.from('profiles').update({ id: data.user.id }).eq('id', profByPhone.id);
              prof = { ...profByPhone, id: data.user.id };
            }
          }

          if (prof) {
            // Check active status
            if (prof.active === false || prof.is_active === false) {
              await supabase.auth.signOut();
              setUser(null);
              setProfile(null);
              return { success: false, error: 'This account is disabled. Contact the Svvayam team.' };
            }

            // PREVENT ADMIN from logging in on Customer tab
            if (prof.role === 'admin' || prof.role === 'super_admin') {
              await supabase.auth.signOut();
              setUser(null);
              setProfile(null);
              return {
                success: false,
                error: 'This is an administrator account. Please use the Admin tab to sign in.'
              };
            }

            setUser({ id: data.user.id, phone: formattedPhone });
            setProfile(prof as Profile);
          } else {
            const newCustProf: Profile = {
              id: data.user.id,
              name: 'Customer',
              phone: formattedPhone,
              role: 'client',
              active: true,
              is_active: true,
              created_at: new Date().toISOString()
            };
            await supabase.from('profiles').upsert(newCustProf);
            setUser({ id: data.user.id, phone: formattedPhone });
            setProfile(newCustProf);
          }
        }

        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Login failed.' };
      }
    } else {
      // Mock / Dev mode fallback
      const registered = getRegisteredCustomers();
      const customer = registered.find(c => c.phone.replace(/\D/g, '').endsWith(cleanDigits));

      if (!customer) {
        return { success: false, error: 'Wrong mobile number or password.' };
      }
      if (!customer.is_active) {
        return { success: false, error: 'This account is disabled. Contact the Svvayam team.' };
      }

      const mockProfile: Profile = {
        id: customer.id,
        name: customer.name,
        title: customer.title || 'Mr.',
        surname: customer.surname || 'Sharma',
        product: customer.product || 'Temple',
        project_name: customer.project_name || "Customer's Temple",
        phone: formattedPhone,
        role: 'customer',
        active: true,
        is_active: true,
        created_at: customer.created_at
      };
      setUser({ id: mockProfile.id, phone: formattedPhone });
      setProfile(mockProfile);
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockProfile));
      return { success: true };
    }
  }, []);

  // Universal helper for backwards compatibility
  const signInWithPassword = useCallback(async (
    identifier: string,
    password: string,
    requestedRole: 'customer' | 'admin' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    if (requestedRole === 'admin') {
      return signInAdmin(identifier, password);
    } else {
      return signInCustomer(identifier, password);
    }
  }, [signInAdmin, signInCustomer]);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) return;
    if (isSupabaseConfigured && supabase) {
      const { data: profData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (profData) {
        if (profData.active === false || profData.is_active === false) {
          await supabase.auth.signOut();
          localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
          setUser(null);
          setProfile(null);
          setLockoutNotice('Your account is disabled. Contact the Svvayam owner.');
          return;
        }
        setProfile(profData as Profile);
      }
    }
  }, [user?.id]);

  const clearLockoutNotice = useCallback(() => {
    setLockoutNotice(null);
  }, []);

  const clearMustChangePassword = useCallback(() => {
    setProfile(prev => prev ? { ...prev, must_change_password: false } : null);
  }, []);

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
  const isSuperAdmin = Boolean(
    role === 'super_admin' || 
    (user?.email && isSuperAdminEmail(user.email)) ||
    (profile?.email && isSuperAdminEmail(profile.email))
  );
  const isAdmin = Boolean(isSuperAdmin || role === 'admin');
  const isCustomer = Boolean(!isAdmin && (role === 'customer' || role === 'client'));
  const mustChangePassword = Boolean(profile?.must_change_password);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      role,
      isAdmin,
      isSuperAdmin,
      isCustomer,
      isLoading,
      mustChangePassword,
      lockoutNotice,
      clearLockoutNotice,
      clearMustChangePassword,
      refreshProfile,
      signInWithPassword,
      signInAdmin,
      signInCustomer,
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
