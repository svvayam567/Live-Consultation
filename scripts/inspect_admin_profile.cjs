const fs = require('fs');
const path = require('path');
const https = require('https');

const cfgPath = path.join(process.env.USERPROFILE || 'C:\\Users\\SRIVSNU', '.config', 'configstore', 'firebase-tools.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const token = cfg.tokens.access_token;
const projectId = 'live-consultation';

async function getDoc(docPath) {
  return new Promise((resolve, reject) => {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${docPath}`;
    https.get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const p1 = await getDoc('profiles/QCuAQI1tEHVGdeckDJjiJg25B8s2');
  console.log('=== profiles/QCuAQI1tEHVGdeckDJjiJg25B8s2 ===');
  console.log(JSON.stringify(p1.fields, null, 2));

  const p2 = await getDoc('profiles/admin-marketing-svvayam');
  console.log('=== profiles/admin-marketing-svvayam ===');
  console.log(JSON.stringify(p2.fields, null, 2));
}

run().catch(console.error);
