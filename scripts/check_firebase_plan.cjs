const fs = require('fs');
const path = require('path');
const https = require('https');

const cfgPath = path.join(process.env.USERPROFILE, '.config', 'configstore', 'firebase-tools.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const refreshToken = cfg.tokens.refresh_token;

function postForm(url, body) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams(body).toString();
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function getJson(url, token) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { Authorization: `Bearer ${token}` }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data, status: res.statusCode }); }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Refreshing token for', cfg.user.email);
  const refreshRes = await postForm('https://oauth2.googleapis.com/token', {
    refresh_token: refreshToken,
    client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
    client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
    grant_type: 'refresh_token'
  });

  if (refreshRes.error) {
    console.error('Refresh token failed:', refreshRes);
    return;
  }

  const accessToken = refreshRes.access_token;
  console.log('Successfully refreshed access token!');

  // Save back to firebase-tools.json so CLI works
  cfg.tokens.access_token = accessToken;
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  console.log('Updated firebase-tools.json with fresh access token.');

  // Check Cloud Billing (determines Spark vs Blaze)
  console.log('\n--- Checking Cloud Billing Info (Spark vs Blaze) ---');
  const billing = await getJson('https://cloudbilling.googleapis.com/v1/projects/live-consultation/billingInfo', accessToken);
  console.log('Billing Response:', billing);
  if (billing.billingAccountName && billing.billingEnabled) {
    console.log(`PLAN: BLAZE (Pay as you go) - Billing Account: ${billing.billingAccountName}`);
  } else {
    console.log('PLAN: SPARK (Free tier) - Billing is NOT enabled.');
  }

  // Check Firebase Project
  console.log('\n--- Checking Firebase Project Info ---');
  const proj = await getJson('https://firebase.googleapis.com/v1beta1/projects/live-consultation', accessToken);
  console.log('Project details:', proj);
}

main().catch(console.error);
