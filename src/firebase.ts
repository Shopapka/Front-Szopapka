// src/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCkXuUYjX0bblGc04CP0YyzFm9dQYeEqs",

  authDomain: "szopapka.firebaseapp.com",

  projectId: "szopapka",

  storageBucket: "szopapka.firebasestorage.app",

  messagingSenderId: "677749640634",

  appId: "1:677749640634:web:37e98d8eae772ff3676183",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence: ", error);
});
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
