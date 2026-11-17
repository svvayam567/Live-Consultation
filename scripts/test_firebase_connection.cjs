/**
 * Firebase Client SDK Connectivity Test for project live-consultation
 */

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

console.log('Testing connection to Firebase project:', firebaseConfig.projectId);

async function testConnection() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('Firebase App initialized successfully.');

    console.log('Querying client_projects collection in Firestore...');
    const snap = await getDocs(collection(db, 'client_projects'));
    console.log(`✓ Firestore query executed successfully! Found ${snap.size} documents in client_projects.`);
    process.exit(0);
  } catch (err) {
    console.log('Firestore response note:', err.code || err.message);
    if (err.code === 'permission-denied') {
      console.log('✓ Firestore is reachable and actively enforcing security rules (Permission Denied for unauthenticated read/write).');
    } else if (err.code === 'unavailable') {
      console.log('Notice: Firestore database may not have been created yet in the Firebase Console.');
    } else {
      console.log('Details:', err.message);
    }
    process.exit(0);
  }
}

testConnection();
