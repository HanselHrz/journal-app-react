// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7x614e_mty_2lmSr52ShnI2H5wh2ehhU",
  authDomain: "react-practica-6330b.firebaseapp.com",
  projectId: "react-practica-6330b",
  storageBucket: "react-practica-6330b.appspot.com",
  messagingSenderId: "687959176034",
  appId: "1:687959176034:web:a5b9c109fdfef86e4ef23b"
};

// Initialize Firebase
export const FirebaseApp    = initializeApp(firebaseConfig);
export const FirebaseAuth   = getAuth(FirebaseApp);
export const FirestoreDB    = getFirestore(FirebaseApp);