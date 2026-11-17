const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo',
  authDomain: 'live-consultation.firebaseapp.com',
  projectId: 'live-consultation',
  storageBucket: 'live-consultation.firebasestorage.app',
  messagingSenderId: '612020199498',
  appId: '1:612020199498:web:98b2f7a545a837a9f406b3'
};

async function verifyAllCollections() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  await signInWithEmailAndPassword(auth, 'marketing@svvayam.com', 'TemporaryTestPass123!#');
  console.log('✓ Signed in as super_admin: marketing@svvayam.com');

  const colls = ['profiles', 'projects', 'consultations', 'client_projects'];
  for (const c of colls) {
    const snap = await getDocs(collection(db, c));
    console.log(`✓ Collection "${c}": ${snap.size} live documents.`);
  }
  process.exit(0);
}

verifyAllCollections().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
