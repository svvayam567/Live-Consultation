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
const backupArg = args.find((a) => a.endsWith('.json')) || 'migration_backups/customer_cleanup_backup_1793620629077.json';
const backupFilePath = path.isAbsolute(backupArg) ? backupArg : path.join(__dirname, '..', backupArg);

if (!fs.existsSync(backupFilePath)) {
  console.error(`Backup file not found: ${backupFilePath}`);
  process.exit(1);
}

const backupData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));

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

async function restoreDoc(docName, fields) {
  const url = `https://firestore.googleapis.com/v1/${docName}`;
  await fetchJson(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields })
  });
}

async function restore() {
  console.log(`Restoring backup from: ${backupFilePath}`);
  const { profiles, consultations, projects } = backupData.cleanupRecords;

  console.log(`Restoring ${profiles.length} profiles...`);
  for (const p of profiles) {
    await restoreDoc(p.path, p.data.fields);
  }

  console.log(`Restoring ${consultations.length} consultations...`);
  for (const c of consultations) {
    await restoreDoc(c.path, c.data.fields);
  }

  console.log(`Restoring ${projects.length} projects...`);
  for (const pr of projects) {
    await restoreDoc(pr.path, pr.data.fields);
  }

  console.log('✓ Restore completed successfully.');
}

restore().catch(console.error);
