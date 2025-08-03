// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
 apiKey: "AIzaSyDxQOfIkyi0Ps_3qu9cGI2OmPVBhX9Hwvk",
  authDomain: "faceball-bbe55.firebaseapp.com", 
  projectId: "faceball-bbe55",
  storageBucket: "faceball-bbe55.firebasestorage.app",
  messagingSenderId: "797496331807",
  appId: "1:797496331807:android:48ac7d3af8abce2ed9cf2a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
