// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi3fb_g68IG974nCEFS3c5HCdUYKXRWPc",
  authDomain: "stealth-new.firebaseapp.com",
  projectId: "stealth-new",
  storageBucket: "stealth-new.appspot.com",
  messagingSenderId: "459126002660",
  appId: "1:459126002660:web:594228558d1b3258f16df1",
  measurementId: "G-JBYWW80R3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
