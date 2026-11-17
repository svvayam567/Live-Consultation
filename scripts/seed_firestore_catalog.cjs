/**
 * Seeds Firestore collection 'client_projects' with the 90 curated projects
 * from public/assets/clients_manifest.json, including order_index, dimensions,
 * designDetail, structureType, stages, and image arrays.
 */

const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo",
  authDomain: "live-consultation.firebaseapp.com",
  projectId: "live-consultation",
  storageBucket: "live-consultation.firebasestorage.app",
  messagingSenderId: "612020199498",
  appId: "1:612020199498:web:98b2f7a545a837a9f406b3"
};

async function main() {
  const manifestPath = path.join(__dirname, '..', 'public', 'assets', 'clients_manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  console.log(`Loaded ${manifest.length} projects from clients_manifest.json`);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Writing projects to Firestore collection "client_projects"...');

  // Write in batches of 50
  for (let i = 0; i < manifest.length; i += 40) {
    const chunk = manifest.slice(i, i + 40);
    const batch = writeBatch(db);

    chunk.forEach((proj, idx) => {
      const orderIndex = i + idx;
      const ref = doc(db, 'client_projects', proj.id);
      const data = {
        ...proj,
        order_index: orderIndex,
        is_published: true,
        updated_at: new Date().toISOString()
      };
      batch.set(ref, data, { merge: true });
    });

    await batch.commit();
    console.log(`Committed batch ${i + 1} to ${Math.min(i + 40, manifest.length)}`);
  }

  console.log('✓ Successfully seeded all 90 projects to Firestore client_projects collection!');
}

main().catch(console.error);
