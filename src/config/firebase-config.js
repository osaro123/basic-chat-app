import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA1le-IlRRT-_kmlKM_BS78ylH0Nz6v_ic",
  authDomain: "chat-app-8e927.firebaseapp.com",
  projectId: "chat-app-8e927",
  storageBucket: "chat-app-8e927.appspot.com",
  messagingSenderId: "267628352292",
  appId: "1:267628352292:web:4162e498364832cd2b59b1",
  measurementId: "G-VKM33CXRSZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)