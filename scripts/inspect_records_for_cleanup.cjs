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

async function inspect() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  await signInWithEmailAndPassword(auth, 'marketing@svvayam.com', 'TemporaryTestPass123!#');
  console.log('✓ Signed in as super admin');

  const colls = ['profiles', 'projects', 'consultations', 'client_projects', 'direct_inquiries', 'inquiries', 'messages', 'chat_conversations', 'clients'];
  for (const c of colls) {
    try {
      const snap = await getDocs(collection(db, c));
      console.log(`\n=== Collection: ${c} (${snap.size} docs) ===`);
      snap.docs.forEach((d) => {
        const data = d.data();
        console.log(`  [${d.id}]`, JSON.stringify({
          email: data.email,
          phone: data.phone || data.client_phone,
          name: data.name || data.client_name || data.full_name,
          role: data.role,
          title: data.title,
          project_name: data.project_name,
          created_at: data.created_at || data.createdAt || data.date
        }));
      });
    } catch (e) {
      console.log(`\n=== Collection: ${c} (error: ${e.message}) ===`);
    }
  }
}

inspect().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
