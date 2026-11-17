const fs = require('fs');
const path = require('path');
const https = require('https');

const cfgPath = path.join(process.env.USERPROFILE || 'C:\\Users\\SRIVSNU', '.config', 'configstore', 'firebase-tools.json');
if (!fs.existsSync(cfgPath)) {
  console.error('firebase-tools.json not found');
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const token = cfg.tokens.access_token;
const projectId = 'live-consultation';

const args = process.argv.slice(2);
const isExecute = args.includes('--execute');

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve(data ? JSON.parse(data) : {});
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function listAllDocuments(collectionName) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?pageSize=300`;
  const res = await fetchJson(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.documents || [];
}

async function deleteDocument(docPath) {
  const url = `https://firestore.googleapis.com/v1/${docPath}`;
  await fetchJson(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function main() {
  console.log(`Starting customer cleanup audit on Firestore project: ${projectId}`);
  console.log(`Mode: ${isExecute ? 'EXECUTE (REAL DELETION)' : 'DRY-RUN (AUDIT & BACKUP ONLY)'}\n`);

  // 1. Inspect profiles
  const profilesDocs = await listAllDocuments('profiles');
  console.log(`Total 'profiles' found: ${profilesDocs.length}`);

  const preservedProfiles = [];
  const cleanupProfiles = [];

  for (const d of profilesDocs) {
    const id = d.name.split('/').pop();
    const fields = d.fields || {};
    const role = fields.role?.stringValue;
    const email = fields.email?.stringValue;
    const isSuperAdmin = role === 'super_admin' || email === 'marketing@svvayam.com';
    const isAdmin = role === 'admin';

    if (isSuperAdmin || isAdmin || id === 'QCuAQI1tEHVGdeckDJjiJg25B8s2' || id === 'admin-marketing-svvayam') {
      preservedProfiles.push({ id, email, role, path: d.name, data: d });
    } else {
      cleanupProfiles.push({ id, name: fields.name?.stringValue, path: d.name, data: d });
    }
  }

  console.log(`  -> Preserved Staff/Admin Profiles: ${preservedProfiles.length}`);
  preservedProfiles.forEach((p) => console.log(`     [PRESERVED] ${p.id} (${p.email || 'no-email'}, role: ${p.role})`));
  console.log(`  -> Cleanup Target Customer Profiles: ${cleanupProfiles.length}`);

  // 2. Inspect consultations
  const consultationsDocs = await listAllDocuments('consultations');
  console.log(`\nTotal 'consultations' found: ${consultationsDocs.length}`);
  const cleanupConsultations = consultationsDocs.map((d) => ({
    id: d.name.split('/').pop(),
    client_name: d.fields?.client_name?.stringValue || d.fields?.fields?.mapValue?.fields?.client?.stringValue,
    path: d.name,
    data: d
  }));
  console.log(`  -> Cleanup Target Consultations: ${cleanupConsultations.length}`);

  // 3. Inspect projects
  const projectsDocs = await listAllDocuments('projects');
  console.log(`\nTotal 'projects' found: ${projectsDocs.length}`);
  const cleanupProjects = projectsDocs.map((d) => ({
    id: d.name.split('/').pop(),
    name: d.fields?.project_name?.stringValue,
    path: d.name,
    data: d
  }));
  console.log(`  -> Cleanup Target Projects: ${cleanupProjects.length}`);

  // 4. Inspect client_projects (Portfolio Explorer collection)
  const clientProjectsDocs = await listAllDocuments('client_projects');
  console.log(`\nTotal 'client_projects' (Portfolio) found: ${clientProjectsDocs.length}`);
  console.log(`  -> PRESERVING all ${clientProjectsDocs.length} client_projects (Portfolio) docs intact.`);

  // 5. Inspect direct_inquiries
  const directInquiriesDocs = await listAllDocuments('direct_inquiries');
  console.log(`\nTotal 'direct_inquiries' found: ${directInquiriesDocs.length}`);
  console.log(`  -> PRESERVING all ${directInquiriesDocs.length} direct inquiries intact.`);

  // 6. Create Full Backup
  const backupData = {
    timestamp: new Date().toISOString(),
    projectId,
    summary: {
      preservedProfilesCount: preservedProfiles.length,
      cleanupProfilesCount: cleanupProfiles.length,
      cleanupConsultationsCount: cleanupConsultations.length,
      cleanupProjectsCount: cleanupProjects.length,
      preservedPortfolioCount: clientProjectsDocs.length,
      preservedDirectInquiriesCount: directInquiriesDocs.length
    },
    preservedProfiles: preservedProfiles.map((p) => ({ id: p.id, email: p.email, role: p.role })),
    cleanupRecords: {
      profiles: cleanupProfiles,
      consultations: cleanupConsultations,
      projects: cleanupProjects
    }
  };

  const backupDir = path.join(__dirname, '..', 'migration_backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const backupFile = path.join(backupDir, `customer_cleanup_backup_${Date.now()}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
  console.log(`\n✓ Restorable backup created successfully at:\n  ${backupFile}`);

  if (!isExecute) {
    console.log('\n[DRY RUN COMPLETE] To perform the actual deletion, run with --execute');
    return;
  }

  // 7. Perform Deletion
  console.log('\n--- Executing Deletions by Explicit Document ID ---');

  let deletedProfiles = 0;
  for (const p of cleanupProfiles) {
    await deleteDocument(p.path);
    deletedProfiles++;
  }
  console.log(`✓ Deleted ${deletedProfiles} customer profile documents.`);

  let deletedConsultations = 0;
  for (const c of cleanupConsultations) {
    await deleteDocument(c.path);
    deletedConsultations++;
  }
  console.log(`✓ Deleted ${deletedConsultations} consultation documents.`);

  let deletedProjects = 0;
  for (const pr of cleanupProjects) {
    await deleteDocument(pr.path);
    deletedProjects++;
  }
  console.log(`✓ Deleted ${deletedProjects} project documents.`);

  console.log('\n✓ Cleanup complete! All target legacy customer records removed while preserving staff and portfolio.');
}

main().catch((err) => {
  console.error('Error during cleanup:', err);
  process.exit(1);
});
