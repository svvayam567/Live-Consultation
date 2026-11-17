const fs = require('fs');
const path = require('path');

const cfgPath = path.join(process.env.USERPROFILE || 'C:\\Users\\SRIVSNU', '.config', 'configstore', 'firebase-tools.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const token = cfg.tokens.access_token;
const projectId = 'live-consultation';

async function deleteObsoleteClientProjects() {
  console.log('--- 1. Fetching document list from client_projects ---');
  let pageToken = '';
  const docNames = [];

  do {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/client_projects?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      throw new Error(`Failed to list documents: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    (data.documents || []).forEach(d => docNames.push(d.name));
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  console.log(`Found ${docNames.length} obsolete portfolio documents in client_projects.`);

  let deletedCount = 0;
  for (const name of docNames) {
    const delUrl = `https://firestore.googleapis.com/v1/${name}`;
    const delRes = await fetch(delUrl, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (delRes.ok) {
      deletedCount++;
    } else {
      console.warn(`Failed to delete ${name}: ${delRes.status}`);
    }
  }

  console.log(`✓ Successfully deleted ${deletedCount}/${docNames.length} obsolete documents from client_projects.`);
}

deleteObsoleteClientProjects().catch(console.error);
