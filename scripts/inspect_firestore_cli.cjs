const fs = require('fs');
const path = require('path');
const https = require('https');

const cfgPath = path.join(process.env.USERPROFILE || 'C:\\Users\\SRIVSNU', '.config', 'configstore', 'firebase-tools.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const token = cfg.tokens.access_token;
const projectId = 'live-consultation';

async function listDocs(collectionName) {
  return new Promise((resolve, reject) => {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?pageSize=300`;
    https.get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const colls = [
    'profiles',
    'consultations',
    'projects',
    'client_projects',
    'direct_inquiries',
    'inquiries',
    'messages',
    'chat_conversations',
    'clients'
  ];

  for (const c of colls) {
    const res = await listDocs(c);
    if (res.error) {
      console.log(`Collection ${c}: ERROR ${res.error.message}`);
    } else {
      const docs = res.documents || [];
      console.log(`\nCollection "${c}": ${docs.length} documents`);
      docs.forEach((d) => {
        const id = d.name.split('/').pop();
        const fields = {};
        for (const [k, v] of Object.entries(d.fields || {})) {
          fields[k] = v.stringValue || v.integerValue || v.booleanValue || (v.timestampValue ? v.timestampValue : JSON.stringify(v));
        }
        console.log(`  [${id}] -> name: "${fields.name || fields.client_name || fields.full_name || ''}", email: "${fields.email || ''}", phone: "${fields.phone || fields.client_phone || ''}", role: "${fields.role || ''}", proj: "${fields.project_name || ''}"`);
      });
    }
  }
}

run().catch(console.error);
