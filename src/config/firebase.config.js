import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "connectify-29152.firebaseapp.com",
  projectId: "connectify-29152",
  storageBucket: "connectify-29152.appspot.com",
  messagingSenderId: "3931100447",
  appId: "1:3931100447:web:4570c89760c241823a0c2a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
