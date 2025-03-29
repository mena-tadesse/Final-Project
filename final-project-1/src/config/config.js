// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAynjay-QkoGVr9vLXLBiUjwzxkOrjJNm8",
  authDomain: "fir-authentication-453cc.firebaseapp.com",
  projectId: "fir-authentication-453cc",
  storageBucket: "fir-authentication-453cc.firebasestorage.app",
  messagingSenderId: "214785538475",
  appId: "1:214785538475:web:8268c96038d1b66788faee",
  measurementId: "G-VKJZT6491D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)