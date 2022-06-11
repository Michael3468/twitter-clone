// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfwLwsLa1-m7c70HlX-Ht3QewYyssUzK8',
  authDomain: 'twitter-clone-66ac6.firebaseapp.com',
  projectId: 'twitter-clone-66ac6',
  storageBucket: 'twitter-clone-66ac6.appspot.com',
  messagingSenderId: '311899289907',
  appId: '1:311899289907:web:aa1ba03b714164b7fb6646',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
