// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-shorts-generator-fc934.firebaseapp.com",
  projectId: "ai-shorts-generator-fc934",
  storageBucket: "ai-shorts-generator-fc934.firebasestorage.app",
  messagingSenderId: "382187545667",
  appId: "1:382187545667:web:75caa4224c47a2ee7fe0f6",
  measurementId: "G-SVPL63NDWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)