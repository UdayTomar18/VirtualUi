import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_APIKEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualui-644cc.firebaseapp.com",
  projectId: "virtualui-644cc",
  storageBucket: "virtualui-644cc.firebasestorage.app",
  messagingSenderId: "643058358678",
  appId: "1:643058358678:web:39cd06354e16f0cca425b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider}