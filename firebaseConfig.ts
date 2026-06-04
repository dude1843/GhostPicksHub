import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB41JNv0R7UJQLLYndJ-N6rBPD1zyTO1R8",
  authDomain: "ghostpickshub.firebaseapp.com",
  projectId: "ghostpickshub",
  storageBucket: "ghostpickshub.firebasestorage.app",
  messagingSenderId: "715512663356",
  appId: "1:715512663356:web:7a5ae48ec64e7ef54b2239"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);