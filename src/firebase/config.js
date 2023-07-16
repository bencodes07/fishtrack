import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";

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
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export default app;
