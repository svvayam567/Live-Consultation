const fs = require('fs');
const path = require('path');
const https = require('https');

const cfgPath = path.join(process.env.USERPROFILE || 'C:\\Users\\SRIVSNU', '.config', 'configstore', 'firebase-tools.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const token = cfg.tokens.access_token;
const projectId = 'live-consultation';

async function updateProfile(uid) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/profiles/${uid}?updateMask.fieldPaths=must_change_password`;
  const body = JSON.stringify({
    fields: {
      must_change_password: { booleanValue: false }
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run() {
  console.log('Clearing must_change_password for QCuAQI1tEHVGdeckDJjiJg25B8s2...');
  const res1 = await updateProfile('QCuAQI1tEHVGdeckDJjiJg25B8s2');
  console.log('Result:', JSON.stringify(res1.fields?.must_change_password));

  console.log('Clearing must_change_password for admin-marketing-svvayam...');
  const res2 = await updateProfile('admin-marketing-svvayam');
  console.log('Result:', JSON.stringify(res2.fields?.must_change_password));
}

run().catch(console.error);
