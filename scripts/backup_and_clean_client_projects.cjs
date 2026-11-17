const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo",
  authDomain: "live-consultation.firebaseapp.com",
  projectId: "live-consultation",
  storageBucket: "live-consultation.firebasestorage.app",
  messagingSenderId: "612020199498",
  appId: "1:612020199498:web:98b2f7a545a837a9f406b3"
};

async function backupClientProjects() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('--- 1. Fetching client_projects from Firestore for backup ---');
  const snap = await getDocs(collection(db, 'client_projects'));
  console.log(`Found ${snap.size} documents in client_projects.`);

  const records = [];
  snap.forEach(d => {
    records.push({ id: d.id, ...d.data() });
  });

  const backupPath = path.join(__dirname, '..', 'migration_backups', `client_projects_backup_${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(records, null, 2));
  console.log(`✓ Backed up ${records.length} obsolete portfolio documents to: ${backupPath}`);
  return records;
}

backupClientProjects().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
