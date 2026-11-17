/**
 * Test Firebase Auth API status on live-consultation
 */
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo",
  authDomain: "live-consultation.firebaseapp.com",
  projectId: "live-consultation",
  storageBucket: "live-consultation.firebasestorage.app",
  messagingSenderId: "612020199498",
  appId: "1:612020199498:web:98b2f7a545a837a9f406b3"
};

async function testAuth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  try {
    await signInWithEmailAndPassword(auth, 'marketing@svvayam.com', 'dummyPassword123!');
  } catch (err) {
    console.log('Auth API response code:', err.code);
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      console.log('✓ Firebase Authentication is ENABLED and operational on live-consultation.');
    } else if (err.code === 'auth/operation-not-allowed') {
      console.log('Notice: Email/Password sign-in provider is not yet enabled in Firebase Console > Authentication > Sign-in method.');
    } else if (err.code === 'auth/configuration-not-found') {
      console.log('Notice: Firebase Authentication is not yet activated in Firebase Console > Authentication.');
    } else {
      console.log('Auth error message:', err.message);
    }
  }
}

testAuth();
