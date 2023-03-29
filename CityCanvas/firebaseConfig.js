// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBh6qSyGArAKpNrN4vuBWBuD7ciXlZbW1s',
  authDomain: 'city-canvas-006.firebaseapp.com',
  projectId: 'city-canvas-006',
  storageBucket: 'city-canvas-006.appspot.com',
  messagingSenderId: '1069868832044',
  appId: '1:1069868832044:web:489b84f0b99558d99b8889',
  measurementId: 'G-Q046VWXL1L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
