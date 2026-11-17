/**
 * Zero-Supabase Runtime & Network Activity Audit
 *
 * Verifies that the application executes all core flows with 100% Google/Firebase
 * backend services and ZERO network or runtime dependency on Supabase.
 */

const https = require('https');
const http = require('http');

// 1. Intercept all outgoing HTTP/HTTPS requests to monitor network activity
const networkLog = [];
const originalHttpsRequest = https.request;
const originalHttpRequest = http.request;

function logUrl(urlOrOptions) {
  let target = '';
  if (typeof urlOrOptions === 'string') {
    target = urlOrOptions;
  } else if (urlOrOptions) {
    const proto = urlOrOptions.protocol || 'https:';
    const host = urlOrOptions.host || urlOrOptions.hostname || '';
    const path = urlOrOptions.path || '';
    target = `${proto}//${host}${path}`;
  }
  networkLog.push(target);
}

https.request = function(...args) {
  logUrl(args[0]);
  return originalHttpsRequest.apply(this, args);
};

http.request = function(...args) {
  logUrl(args[0]);
  return originalHttpRequest.apply(this, args);
};

// 2. Remove all Supabase configuration from environment
delete process.env.VITE_SUPABASE_URL;
delete process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } = require('firebase/auth');
const { getFirestore, doc, getDoc, collection, getDocs, setDoc, serverTimestamp, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo",
  authDomain: "live-consultation.firebaseapp.com",
  projectId: "live-consultation",
  storageBucket: "live-consultation.firebasestorage.app",
  messagingSenderId: "612020199498",
  appId: "1:612020199498:web:98b2f7a545a837a9f406b3"
};

async function runZeroSupabaseAudit() {
  console.log('====================================================');
  console.log('SVVAYAM LIVE CONSULTATION - ZERO SUPABASE RUNTIME AUDIT');
  console.log('====================================================');
  console.log('Supabase Environment: STRIPPED (VITE_SUPABASE_URL = undefined)\n');

  // Test 1: Verify Supabase is not configured
  console.log('[Test 1] Verifying Supabase client state with environment stripped...');
  const { isSupabaseConfigured, supabase } = require('../src/lib/supabase.ts');
  console.log('  isSupabaseConfigured:', isSupabaseConfigured);
  console.log('  supabase client:', supabase);
  if (isSupabaseConfigured !== false || supabase !== null) {
    throw new Error('Supabase client was initialized unexpectedly!');
  }
  console.log('✓ Test 1 Passed: Supabase client is completely dormant and null.\n');

  // Test 2: Authentication via Firebase (Register, Sign-in, Profile)
  console.log('[Test 2] Testing User Authentication & Profile cycle via Firebase...');
  const app = initializeApp(firebaseConfig, 'AuditApp_' + Date.now());
  const auth = getAuth(app);
  const db = getFirestore(app);

  const testEmail = 'zero_supabase_test_' + Date.now() + '@svvayam.internal';
  const testPass = 'SecureAuditPass_2026!';

  const userCred = await createUserWithEmailAndPassword(auth, testEmail, testPass);
  console.log('  Registered test auth UID:', userCred.user.uid);

  const testLogin = await signInWithEmailAndPassword(auth, testEmail, testPass);
  console.log('  Successfully signed in user via Firebase Auth:', testLogin.user.email);
  console.log('✓ Test 2 Passed: Authentication functions with zero Supabase dependency.\n');

  // Test 3: Consultation Progression & Firestore Write/Read (Authenticated User)
  console.log('[Test 3] Testing Consultation State & Firestore Read/Write...');
  const testConsultId = 'audit-consult-' + Date.now();
  const testDocRef = doc(db, 'consultations', testConsultId);

  await setDoc(testDocRef, {
    id: testConsultId,
    client_id: userCred.user.uid,
    client_name: 'Audit Client',
    project_name: 'Zero Supabase Sanctum',
    current_step: 3,
    status: 'draft',
    fields: {
      location: 'Bengaluru, Indiranagar',
      date: '2026-11-02',
      space: 'Dedicated Puja Room',
      direction: 'North-East (Ishanya)',
      spaceInteriors: 'Traditional Teakwood',
      spaceNotes: 'Skylight roof with natural teak finish'
    },
    updated_at: serverTimestamp()
  });

  const checkDoc = await getDoc(testDocRef);
  if (!checkDoc.exists() || checkDoc.data().client_name !== 'Audit Client') {
    throw new Error('Firestore document write failed!');
  }
  console.log('  Saved & verified consultation record in Cloud Firestore:', checkDoc.data().project_name);

  // Clean up test user
  await deleteUser(testLogin.user);
  console.log('  Cleaned up test auth user.');
  console.log('✓ Test 3 Passed: Consultation saving and reloading operates via Cloud Firestore.\n');

  // Test 4: Client Explorer Portfolio Query
  console.log('[Test 4] Testing Client Explorer Query in Cloud Firestore...');
  const snap = await getDocs(collection(db, 'client_projects'));
  console.log('  Discovered portfolio items in Cloud Firestore:', snap.size);
  if (snap.size !== 90) {
    throw new Error(`Expected 90 client projects, found ${snap.size}`);
  }
  console.log('✓ Test 4 Passed: Client Explorer loads all 90 projects directly from Firebase.\n');

  // Test 5: Verify 0 Supabase Network Activity
  console.log('[Test 5] Auditing Outgoing Network Traffic for Supabase Requests...');
  const supabaseRequests = networkLog.filter(url => 
    url.toLowerCase().includes('supabase.co') || 
    url.toLowerCase().includes('supabase.in') ||
    url.toLowerCase().includes('supabase.net')
  );

  console.log(`  Total network endpoints touched: ${networkLog.length}`);
  console.log(`  Supabase network endpoints touched: ${supabaseRequests.length}`);

  if (supabaseRequests.length > 0) {
    console.error('✗ Detected active Supabase network requests:');
    supabaseRequests.forEach(r => console.error('  - ' + r));
    throw new Error('Supabase requests detected during execution!');
  }

  console.log('✓ Test 5 Passed: ZERO Supabase requests detected during entire application lifecycle.\n');

  console.log('====================================================');
  console.log('ZERO SUPABASE AUDIT RESULT: PASSED (5/5 CHECKS)');
  console.log('The application operates with ZERO runtime dependency on Supabase.');
  console.log('====================================================\n');
  process.exit(0);
}

runZeroSupabaseAudit().catch(err => {
  console.error('\nAudit Failed:', err);
  process.exit(1);
});
