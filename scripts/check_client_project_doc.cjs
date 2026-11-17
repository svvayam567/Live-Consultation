const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit, query } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo",
  authDomain: "live-consultation.firebaseapp.com",
  projectId: "live-consultation",
  storageBucket: "live-consultation.firebasestorage.app",
  messagingSenderId: "612020199498",
  appId: "1:612020199498:web:98b2f7a545a837a9f406b3"
};

async function main() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const q = query(collection(db, 'client_projects'), limit(1));
  const snap = await getDocs(q);
  snap.forEach(d => {
    console.log('Doc ID:', d.id);
    console.log('Doc Data:', JSON.stringify(d.data(), null, 2));
  });
}

main().catch(console.error);
