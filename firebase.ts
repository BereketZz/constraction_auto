// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{ getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "constuction-auto.firebaseapp.com",
  projectId: "constuction-auto",
  storageBucket: "constuction-auto.appspot.com",
  messagingSenderId: "254055237336",
  appId: "1:254055237336:web:33215cbd7076339a86b9ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db= getFirestore(app)