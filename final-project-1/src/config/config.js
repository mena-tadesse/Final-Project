// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbXKNXKshCZJXDTkF4XM_BvnetfvMCdTM",
  authDomain: "finalprojectv2-91b35.firebaseapp.com",
  projectId: "finalprojectv2-91b35",
  storageBucket: "finalprojectv2-91b35.firebasestorage.app",
  messagingSenderId: "616498646938",
  appId: "1:616498646938:web:19ecb66ad7eabe2058b423",
  measurementId: "G-Q5FRP16NT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
export const firestore = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service