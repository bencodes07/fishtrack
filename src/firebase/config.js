/* import firebase from "firebase/app"; */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbdl70QURdWjla5jma3oYDzvhx47VjR0c",
  authDomain: "fishtrack-27044.firebaseapp.com",
  projectId: "fishtrack-27044",
  storageBucket: "fishtrack-27044.appspot.com",
  messagingSenderId: "535672827016",
  appId: "1:535672827016:web:936548e2acb1ba3474433d",
  measurementId: "G-BKXPF9GB39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
