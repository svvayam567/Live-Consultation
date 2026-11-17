/**
 * Automated Firebase Environment Configurator for Svvayam Live Consultation
 *
 * Usage:
 *   node scripts/setup_firebase_env.cjs
 *
 * Automatically:
 * 1. Verifies that the CLI is authenticated and has access to project "live-consultation"
 * 2. Checks if the authenticated account is marketing@svvayam.com (rejects mismatch)
 * 3. Finds or creates the Firebase Web App for Live Consultation
 * 4. Retrieves the actual SDK configuration directly from Google
 * 5. Safely writes/updates .env while strictly preserving unrelated environment variables
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const envPath = path.join(projectRoot, '.env');
const targetProjectId = 'live-consultation';
const expectedEmail = 'marketing@svvayam.com';

const firebaseBin = path.join(projectRoot, 'node_modules/.bin/firebase.cmd');

console.log('====================================================');
console.log('SVVAYAM LIVE CONSULTATION - FIREBASE ENV SETUP');
console.log('====================================================');

// Helper to run firebase command with JSON output
function runFirebase(cmd) {
  try {
    const fullCmd = `"${firebaseBin}" ${cmd} --json`;
    const out = execSync(fullCmd, { cwd: projectRoot, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    return JSON.parse(out);
  } catch (err) {
    let stderr = err.stderr ? err.stderr.toString() : '';
    let stdout = err.stdout ? err.stdout.toString() : '';
    try {
      const parsed = JSON.parse(stdout);
      return parsed;
    } catch {
      throw new Error(stderr || stdout || err.message);
    }
  }
}

async function setup() {
  // 1. Verify Authentication & Identity
  console.log('\n1. Verifying CLI Authentication & Account Identity...');
  let loginInfo;
  try {
    loginInfo = runFirebase('login:list');
  } catch (e) {
    console.error('\n[Error] Firebase CLI is not authenticated.');
    console.error('Run the following in your terminal to sign in:');
    console.error('  npx firebase login\n');
    process.exit(1);
  }

  // Find active user
  const user = loginInfo?.result?.[0]?.user || loginInfo?.result?.user;
  const activeEmail = (user?.email || '').toLowerCase().trim();

  console.log(`Active CLI Account: ${activeEmail || 'None detected'}`);

  if (!activeEmail) {
    console.error('\n[Error] No active CLI account found.');
    console.error('Please run: npx firebase login');
    process.exit(1);
  }

  if (activeEmail !== expectedEmail) {
    console.warn('\n[ACCOUNT MISMATCH WARNING]');
    console.warn(`Authenticated Account: ${activeEmail}`);
    console.warn(`Expected Account:      ${expectedEmail}`);
    console.warn('The migration requires the authorized company account: marketing@svvayam.com');
    console.warn('To switch accounts, run:');
    console.warn(`  npx firebase login:use ${expectedEmail}`);
    console.warn('  or run "npx firebase login:add" to authenticate marketing@svvayam.com.\n');
  } else {
    console.log(`✓ Confirmed intended company account: ${activeEmail}`);
  }

  // 2. Verify Access to live-consultation
  console.log(`\n2. Verifying Project Access to "${targetProjectId}"...`);
  const projectsList = runFirebase('projects:list');
  const projects = projectsList?.result || [];
  const found = projects.find(p => p.projectId === targetProjectId);

  if (!found) {
    console.error(`\n[Error] The account ${activeEmail} does not have access to project "${targetProjectId}".`);
    console.error('Available projects:');
    projects.forEach(p => console.error(`  - ${p.projectId} (${p.displayName})`));
    console.error(`\nPlease check project permissions in Firebase Console for ${activeEmail}.`);
    process.exit(1);
  }

  console.log(`✓ Confirmed access to project: ${found.displayName || targetProjectId} (${targetProjectId})`);

  // 3. Find or Create Web App
  console.log(`\n3. Locating Firebase Web App for "${targetProjectId}"...`);
  const appsList = runFirebase(`apps:list WEB --project=${targetProjectId}`);
  const webApps = appsList?.result || [];

  let appId = null;
  if (webApps.length > 0) {
    appId = webApps[0].appId;
    console.log(`✓ Found existing Web App: "${webApps[0].displayName}" (App ID: ${appId})`);
  } else {
    console.log(`No existing Web App found. Creating "Svvayam Live Consultation"...`);
    const created = runFirebase(`apps:create WEB "Svvayam Live Consultation" --project=${targetProjectId}`);
    appId = created?.result?.appId;
    console.log(`✓ Created Web App: App ID ${appId}`);
  }

  // 4. Retrieve Actual SDK Config
  console.log(`\n4. Retrieving Official SDK Configuration...`);
  const sdkConfigResult = runFirebase(`apps:sdkconfig WEB ${appId} --project=${targetProjectId}`);
  const config = sdkConfigResult?.result?.sdkConfig || sdkConfigResult?.result;

  if (!config || !config.apiKey) {
    throw new Error('Failed to parse SDK configuration from Firebase response.');
  }

  console.log('✓ Successfully retrieved configuration:');
  console.log(`  - Project ID:      ${config.projectId}`);
  console.log(`  - Auth Domain:     ${config.authDomain}`);
  console.log(`  - Storage Bucket:  ${config.storageBucket || '(none)'}`);
  console.log(`  - App ID:          ${config.appId}`);

  // 5. Safely Update .env Preserving Unrelated Variables
  console.log(`\n5. Updating local .env file safely...`);
  let existingEnv = {};
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8');
    raw.split(/\r?\n/).forEach(line => {
      const idx = line.indexOf('=');
      if (idx !== -1 && !line.trim().startsWith('#')) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        existingEnv[k] = v;
      }
    });
  }

  // Update Firebase values
  existingEnv.VITE_FIREBASE_API_KEY = config.apiKey;
  existingEnv.VITE_FIREBASE_AUTH_DOMAIN = config.authDomain;
  existingEnv.VITE_FIREBASE_PROJECT_ID = config.projectId;
  existingEnv.VITE_FIREBASE_STORAGE_BUCKET = config.storageBucket || `${targetProjectId}.appspot.com`;
  existingEnv.VITE_FIREBASE_MESSAGING_SENDER_ID = config.messagingSenderId || '';
  existingEnv.VITE_FIREBASE_APP_ID = config.appId;

  // Preserve or set default regional setting
  if (!existingEnv.VITE_GOOGLE_CLOUD_REGION) {
    existingEnv.VITE_GOOGLE_CLOUD_REGION = 'asia-south1';
  }

  // Format into .env
  let newEnvContent = '# =============================================================================\n';
  newEnvContent += '# Svvayam Live Consultation - Environment Variables\n';
  newEnvContent += '# Target: Firebase Project "live-consultation"\n';
  newEnvContent += '# =============================================================================\n\n';
  newEnvContent += '# 1. Firebase Client Configuration (Retrieved from Firebase)\n';
  newEnvContent += `VITE_FIREBASE_API_KEY=${existingEnv.VITE_FIREBASE_API_KEY}\n`;
  newEnvContent += `VITE_FIREBASE_AUTH_DOMAIN=${existingEnv.VITE_FIREBASE_AUTH_DOMAIN}\n`;
  newEnvContent += `VITE_FIREBASE_PROJECT_ID=${existingEnv.VITE_FIREBASE_PROJECT_ID}\n`;
  newEnvContent += `VITE_FIREBASE_STORAGE_BUCKET=${existingEnv.VITE_FIREBASE_STORAGE_BUCKET}\n`;
  newEnvContent += `VITE_FIREBASE_MESSAGING_SENDER_ID=${existingEnv.VITE_FIREBASE_MESSAGING_SENDER_ID}\n`;
  newEnvContent += `VITE_FIREBASE_APP_ID=${existingEnv.VITE_FIREBASE_APP_ID}\n\n`;
  newEnvContent += '# 2. Regional Configuration\n';
  newEnvContent += `VITE_GOOGLE_CLOUD_REGION=${existingEnv.VITE_GOOGLE_CLOUD_REGION}\n\n`;

  // Append any unrelated variables
  const standardKeys = new Set([
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_GOOGLE_CLOUD_REGION',
    'VITE_INITIAL_ADMIN_PHONES' // Excluded for security
  ]);

  let preservedCount = 0;
  let otherSection = '';
  for (const [k, v] of Object.entries(existingEnv)) {
    if (!standardKeys.has(k)) {
      otherSection += `${k}=${v}\n`;
      preservedCount++;
    }
  }

  if (otherSection) {
    newEnvContent += '# 3. Preserved Application Environment Variables\n' + otherSection;
  }

  fs.writeFileSync(envPath, newEnvContent, 'utf8');
  console.log(`✓ .env updated successfully (${preservedCount} unrelated variables preserved).`);

  console.log('\n====================================================');
  console.log('FIREBASE CONFIGURATION COMPLETE & READY');
  console.log('====================================================\n');
}

setup().catch(err => {
  console.error('\nSetup error:', err.message);
  process.exit(1);
});
