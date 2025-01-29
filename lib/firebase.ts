import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0FEHkKrMrf5NufskUEeXjyO3FKe9wNFc',
  authDomain: 'sdsa-dda0a.firebaseapp.com',
  projectId: 'sdsa-dda0a',
  storageBucket: 'sdsa-dda0a.firebasestorage.app',
  messagingSenderId: '543307978403',
  appId: '1:543307978403:web:396287667ce488c4115116',
  measurementId: 'G-DK8665P0CV',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
