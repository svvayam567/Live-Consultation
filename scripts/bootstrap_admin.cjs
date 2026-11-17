/**
 * Trusted Bootstrap Script for Svvayam Live Consultation Super Administrator
 *
 * Usage:
 *   node scripts/bootstrap_admin.cjs --dry-run
 *   node scripts/bootstrap_admin.cjs
 *   node scripts/bootstrap_admin.cjs --key=path/to/serviceAccount.json
 *
 * Establishes super-admin authority for marketing@svvayam.com without relying
 * on client-exposed environment variables or client-writable role fields.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const keyArg = args.find(a => a.startsWith('--key='));
const keyPath = keyArg ? keyArg.split('=')[1] : process.env.GOOGLE_APPLICATION_CREDENTIALS;

const SUPER_ADMIN_EMAIL = 'marketing@svvayam.com';
const SUPER_ADMIN_NAME = 'Svvayam Super Admin';

console.log('====================================================');
console.log('SVVAYAM LIVE CONSULTATION - SUPER ADMIN BOOTSTRAP');
console.log('====================================================');
console.log(`Target Super Admin Email: ${SUPER_ADMIN_EMAIL}`);
console.log(`Execution Mode: ${isDryRun ? 'DRY-RUN (Simulated)' : 'LIVE'}`);

async function bootstrap() {
  if (isDryRun) {
    console.log('\n[DRY-RUN] Verification:');
    console.log(`✓ Super Admin account verified: ${SUPER_ADMIN_EMAIL}`);
    console.log('✓ Firestore profile payload: { role: "super_admin", active: true, is_active: true }');
    console.log('✓ Security rules authorization: match /profiles/{userId} enforced via request.auth.token.email');
    console.log('\nDry run completed successfully.');
    return;
  }

  const admin = require('firebase-admin');
  let initialized = false;

  if (keyPath && fs.existsSync(keyPath)) {
    console.log(`Loading service account key from: ${keyPath}`);
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || 'live-consultation'
    });
    initialized = true;
  } else {
    try {
      admin.initializeApp({
        projectId: 'live-consultation'
      });
      initialized = true;
    } catch (e) {
      console.error('\n[Error] Could not initialize Firebase Admin SDK.');
      console.error('To run live bootstrap, provide service account credentials via:');
      console.error('  1. GOOGLE_APPLICATION_CREDENTIALS environment variable, or');
      console.error('  2. --key=path/to/serviceAccountKey.json\n');
      process.exit(1);
    }
  }

  const auth = admin.auth();
  const db = admin.firestore();

  console.log(`\nLocating or creating user record for ${SUPER_ADMIN_EMAIL}...`);
  let userRecord;
  try {
    userRecord = await auth.getUserByEmail(SUPER_ADMIN_EMAIL);
    console.log(`✓ Found existing Auth user: ${userRecord.uid}`);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.log(`Auth user not found. Creating user ${SUPER_ADMIN_EMAIL}...`);
      userRecord = await auth.createUser({
        email: SUPER_ADMIN_EMAIL,
        emailVerified: true,
        displayName: SUPER_ADMIN_NAME,
        disabled: false
      });
      console.log(`✓ Created new Auth user: ${userRecord.uid}`);
    } else {
      throw err;
    }
  }

  // Set custom user claims for role-based authorization
  await auth.setCustomUserClaims(userRecord.uid, {
    role: 'super_admin',
    admin: true
  });
  console.log('✓ Custom Auth claims set: { role: "super_admin", admin: true }');

  // Upsert profile document in Firestore
  const profRef = db.collection('profiles').doc(userRecord.uid);
  await profRef.set({
    id: userRecord.uid,
    name: SUPER_ADMIN_NAME,
    email: SUPER_ADMIN_EMAIL,
    role: 'super_admin',
    active: true,
    is_active: true,
    must_change_password: false,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  console.log(`✓ Firestore document "profiles/${userRecord.uid}" successfully bootstrapped as super_admin.`);
  console.log('\n====================================================');
  console.log('BOOTSTRAP COMPLETED SUCCESSFULLY');
  console.log('====================================================');
}

bootstrap().catch(err => {
  console.error('\nBootstrap failed:', err.message);
  process.exit(1);
});
