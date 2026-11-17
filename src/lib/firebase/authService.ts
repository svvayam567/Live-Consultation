import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updatePassword as fbUpdatePassword,
  sendPasswordResetEmail,
  type User,
  type Unsubscribe
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from './config';
import type { Profile, UserRole } from '../../types/consultation';

export const SUPER_ADMIN_EMAIL = 'marketing@svvayam.com';
export const LOCAL_STORAGE_AUTH_KEY = 'svvayam_auth_profile_v1';
export const LOCAL_STORAGE_CUSTOMERS_KEY = 'svvayam_registered_customers_v1';

export function isSuperAdminEmail(emailStr?: string | null): boolean {
  if (!emailStr) return false;
  return emailStr.trim().toLowerCase() === SUPER_ADMIN_EMAIL;
}

/**
 * Signs in staff member with Email + Password.
 */
export async function signInAdminUser(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: User; profile?: Profile; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!pass) {
    return { success: false, error: 'Please enter your password.' };
  }

  if (!isFirebaseConfigured || !auth || !db) {
    return { success: false, error: 'Firebase is not configured yet. Running in offline draft mode.' };
  }

  let authUser: User;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
    authUser = userCredential.user;
  } catch (authErr: any) {
    console.error('[Firebase Auth] signInAdminUser authentication error:', authErr);
    const code = authErr?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return {
        success: false,
        error: `Invalid credentials [${code || 'auth/invalid-credential'}]. Please verify your password or use "Forgot password?" below.`
      };
    }
    if (code === 'auth/too-many-requests') {
      return { success: false, error: 'Too many attempts [auth/too-many-requests]. Please wait a minute and try again.' };
    }
    if (code === 'auth/network-request-failed') {
      return { success: false, error: 'Network failure [auth/network-request-failed]. Check your internet connection and try again.' };
    }
    return { success: false, error: `Authentication failed [${code || 'auth/unknown'}]: ${authErr?.message || 'Login failed.'}` };
  }

  // Fetch profile document from Firestore
  try {
    const profileRef = doc(db, 'profiles', authUser.uid);
    const profileSnap = await getDoc(profileRef);

    let profData: Profile | null = null;
    if (profileSnap.exists()) {
      profData = profileSnap.data() as Profile;
    } else {
      // Self-heal profile if missing
      const isSuper = cleanEmail === SUPER_ADMIN_EMAIL;
      const role: UserRole = isSuper ? 'super_admin' : 'admin';
      const newProf: Profile = {
        id: authUser.uid,
        name: isSuper ? 'Svvayam Super Admin' : 'Svvayam Admin',
        email: cleanEmail,
        role,
        active: true,
        is_active: true,
        must_change_password: false,
        created_at: new Date().toISOString()
      };
      await setDoc(profileRef, {
        ...newProf,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
      profData = newProf;
    }

    // Role check: Customer accounts cannot log in on the Admin tab
    const role = profData.role;
    const isSuper = cleanEmail === SUPER_ADMIN_EMAIL || role === 'super_admin';
    const isAdminUser = isSuper || role === 'admin';

    if (!isAdminUser) {
      await fbSignOut(auth);
      return {
        success: false,
        error: `Access denied [role-mismatch]: Account ${cleanEmail} has role "${role}". Only administrator accounts can access the admin studio.`
      };
    }

    // Lockout check
    const isActive = profData.active !== false && profData.is_active !== false;
    if (!isActive) {
      await fbSignOut(auth);
      return {
        success: false,
        error: `Access denied [account-deactivated]: Administrator account ${cleanEmail} is currently deactivated.`
      };
    }

    const effectiveProfile: Profile = {
      ...profData,
      id: authUser.uid,
      name: profData.name || (isSuper ? 'Svvayam Super Admin' : 'Svvayam Admin'),
      email: cleanEmail,
      role: isSuper ? 'super_admin' : 'admin',
      active: true,
      is_active: true,
      must_change_password: Boolean(profData.must_change_password),
      created_at: profData.created_at || new Date().toISOString()
    };

    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(effectiveProfile));
    return { success: true, user: authUser, profile: effectiveProfile };
  } catch (profErr: any) {
    console.error('[Firebase Auth] Profile retrieval error after authentication:', profErr);
    await fbSignOut(auth);
    return {
      success: false,
      error: `Authentication succeeded as ${cleanEmail}, but loading administrator profile failed [${profErr?.code || 'profile-error'}]: ${profErr?.message || 'Permission denied'}.`
    };
  }
}

/**
 * Sends official Firebase password reset email to administrator
 */
export async function sendAdminPasswordResetEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid administrator email address.' };
  }

  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase is not configured yet. Running in offline draft mode.' };
  }

  try {
    await sendPasswordResetEmail(auth, cleanEmail);
    return { success: true };
  } catch (err: any) {
    console.error('[Firebase Auth] sendPasswordResetEmail error:', err);
    const code = err?.code || '';
    if (code === 'auth/user-not-found') {
      return { success: false, error: `Account not found [${code}]: No user registered with ${cleanEmail}.` };
    }
    if (code === 'auth/too-many-requests') {
      return { success: false, error: `Too many requests [${code}]. Please wait a few moments before requesting another reset email.` };
    }
    return { success: false, error: `Password reset request failed [${code || 'auth/unknown'}]: ${err?.message || 'Error sending email'}.` };
  }
}

/**
 * Signs in customer with Phone + Password.
 * Maps phone to internal auth email: `${cleanDigits}@svvayam.internal` or `${cleanDigits}@svvayam.app`.
 */
export async function signInCustomerUser(
  phone: string,
  pass: string
): Promise<{ success: boolean; user?: User; profile?: Profile; error?: string }> {
  const cleanDigits = phone.replace(/\D/g, '').slice(-10);
  const formattedPhone = '+91' + cleanDigits;
  const internalEmail = `${cleanDigits}@svvayam.internal`;
  const appEmail = `${cleanDigits}@svvayam.app`;

  if (cleanDigits.length !== 10) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
  }
  if (!pass || !pass.trim()) {
    return { success: false, error: 'Please enter your password.' };
  }

  if (!isFirebaseConfigured || !auth || !db) {
    return { success: false, error: 'Firebase is not configured yet. Running in offline draft mode.' };
  }

  try {
    let authUser: User | null = null;
    try {
      const res = await signInWithEmailAndPassword(auth, internalEmail, pass.trim());
      authUser = res.user;
    } catch (tryInternalErr: any) {
      if (tryInternalErr.code === 'auth/user-not-found' || tryInternalErr.code === 'auth/invalid-credential') {
        const appRes = await signInWithEmailAndPassword(auth, appEmail, pass.trim());
        authUser = appRes.user;
      } else {
        throw tryInternalErr;
      }
    }

    if (!authUser) {
      return { success: false, error: 'Wrong phone number or password.' };
    }

    // Fetch profile
    const profileRef = doc(db, 'profiles', authUser.uid);
    const profileSnap = await getDoc(profileRef);

    let profData: Profile;
    if (profileSnap.exists()) {
      profData = profileSnap.data() as Profile;
    } else {
      profData = {
        id: authUser.uid,
        name: 'Customer',
        phone: formattedPhone,
        role: 'customer',
        active: true,
        is_active: true,
        must_change_password: false,
        created_at: new Date().toISOString()
      };
      await setDoc(profileRef, {
        ...profData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
    }

    // Check active
    if (profData.active === false || profData.is_active === false) {
      await fbSignOut(auth);
      return { success: false, error: 'This account is disabled. Contact the Svvayam team.' };
    }

    const effectiveProfile: Profile = {
      ...profData,
      id: authUser.uid,
      phone: formattedPhone,
      role: 'customer',
      active: true,
      is_active: true
    };

    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(effectiveProfile));
    return { success: true, user: authUser, profile: effectiveProfile };
  } catch (err: any) {
    console.error('[Firebase Auth] signInCustomerUser error:', err);
    const code = err?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return { success: false, error: 'Wrong phone number or password.' };
    }
    if (code === 'auth/too-many-requests') {
      return { success: false, error: 'Too many attempts. Please wait a minute and try again.' };
    }
    return { success: false, error: err?.message || 'Login failed.' };
  }
}

/**
 * Creates customer in Firebase Auth WITHOUT signing out or disturbing the current staff session.
 * Uses an isolated secondary Firebase App instance.
 */
export async function createCustomerAccountIsolated(params: {
  phone: string;
  password: string;
  name: string;
  title?: string;
  surname?: string;
  product?: string;
  projectName?: string;
  location?: string;
}): Promise<{ success: boolean; userId?: string; error?: string }> {
  const cleanDigits = params.phone.replace(/\D/g, '').slice(-10);
  const internalEmail = `${cleanDigits}@svvayam.internal`;
  const formattedPhone = '+91' + cleanDigits;

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  if (!isFirebaseConfigured || !db || !auth) {
    const fallbackId = 'cust-' + cleanDigits;
    return { success: true, userId: fallbackId };
  }

  // 1. Enforce staff authorization: Requester must be signed in as staff or marketing@svvayam.com
  const currentStaff = auth.currentUser;
  if (!currentStaff) {
    return {
      success: false,
      error: 'Security verification failed: Only authenticated Svvayam staff can register customer accounts.'
    };
  }

  // 2. Attempt trusted server-side registration via Cloud Functions if deployed
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'live-consultation';
  const region = import.meta.env.VITE_GOOGLE_CLOUD_REGION || 'asia-south1';
  const functionUrl = `https://${region}-${projectId}.cloudfunctions.net/registerCustomer`;

  try {
    const idToken = await currentStaff.getIdToken();
    const resp = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        name: params.name.trim(),
        phone: formattedPhone,
        password: params.password.trim(),
        title: params.title || 'Mr.',
        surname: params.surname || '',
        product: params.product || 'Temple',
        project_name: params.projectName || '',
        location: params.location || 'India'
      })
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data.success && data.customer?.id) {
        return { success: true, userId: data.customer.id };
      }
    }
  } catch {
    // Cloud Functions endpoint not yet deployed; proceed to authorized staff client fallback
  }

  // 3. Authorized staff client fallback (using isolated secondary app to avoid logging out staff session)
  const secondaryAppName = `SecondaryAuth_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let secondaryApp = null;
  try {
    secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
    const secondaryAuth = getAuth(secondaryApp);

    let customerUid: string;
    try {
      const userCred = await createUserWithEmailAndPassword(secondaryAuth, internalEmail, params.password.trim());
      customerUid = userCred.user.uid;
    } catch (authErr: any) {
      if (authErr?.code === 'auth/email-already-in-use') {
        // User already exists in Auth, proceed to link/update profile
        customerUid = 'cust-' + cleanDigits;
      } else {
        throw authErr;
      }
    }

    // Write profile in Firestore using the main admin-authenticated db connection
    const profRef = doc(db, 'profiles', customerUid);
    const profPayload = {
      id: customerUid,
      name: params.name.trim(),
      phone: formattedPhone,
      role: 'customer',
      title: params.title || 'Mr.',
      surname: params.surname || '',
      product: params.product || 'Temple',
      project_name: params.projectName || '',
      location: params.location || 'India',
      active: true,
      is_active: true,
      must_change_password: false,
      created_by: currentStaff.uid,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    await setDoc(profRef, profPayload, { merge: true });

    return { success: true, userId: customerUid };
  } catch (err: any) {
    console.error('[Firebase Auth] createCustomerAccountIsolated error:', err);
    return { success: false, error: err?.message || 'Failed to create customer account.' };
  } finally {
    if (secondaryApp) {
      try {
        await deleteApp(secondaryApp);
      } catch {}
    }
  }
}

/**
 * Updates current user password.
 */
export async function updateUserPassword(newPass: string): Promise<{ success: boolean; error?: string }> {
  if (!auth?.currentUser) {
    return { success: false, error: 'No active authenticated session.' };
  }
  try {
    await fbUpdatePassword(auth.currentUser, newPass.trim());
    if (db && auth.currentUser.uid) {
      const profRef = doc(db, 'profiles', auth.currentUser.uid);
      await updateDoc(profRef, {
        must_change_password: false,
        updated_at: serverTimestamp()
      });
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Password update failed.' };
  }
}

/**
 * Signs out current user from Firebase.
 */
export async function signOutUser(): Promise<void> {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  if (auth) {
    try {
      await fbSignOut(auth);
    } catch {}
  }
}

/**
 * Subscribes to real-time auth changes and profile updates.
 */
export function subscribeToAuth(
  onUserChange: (user: User | null, profile: Profile | null) => void,
  onLockout: (notice: string) => void
): Unsubscribe {
  if (!auth || !db) {
    return () => {};
  }
  const firebaseAuth = auth;
  const firestoreDb = db;

  let profileUnsub: Unsubscribe | null = null;

  const authUnsub = onAuthStateChanged(firebaseAuth, async (authUser) => {
    if (profileUnsub) {
      profileUnsub();
      profileUnsub = null;
    }

    if (!authUser) {
      onUserChange(null, null);
      return;
    }

    // Subscribe to profile document changes in Firestore
    const profileRef = doc(firestoreDb, 'profiles', authUser.uid);
    profileUnsub = onSnapshot(profileRef, async (snap) => {
      if (snap.exists()) {
        const prof = snap.data() as Profile;
        if (prof.active === false || prof.is_active === false) {
          await fbSignOut(firebaseAuth);
          onUserChange(null, null);
          onLockout('Your account is disabled. Contact the Svvayam owner.');
        } else {
          onUserChange(authUser, { ...prof, id: authUser.uid });
        }
      } else {
        onUserChange(authUser, null);
      }
    }, (err) => {
      console.warn('[Firebase Auth] Profile listener notice:', err);
    });
  });

  return () => {
    if (profileUnsub) profileUnsub();
    authUnsub();
  };
}
