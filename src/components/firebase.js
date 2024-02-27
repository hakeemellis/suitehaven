// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIOEAfpiriK6TB792Pi24tENQNvKals7w",
  authDomain: "suitehaven-b4621.firebaseapp.com",
  projectId: "suitehaven-b4621",
  storageBucket: "suitehaven-b4621.appspot.com",
  messagingSenderId: "83916952328",
  appId: "1:83916952328:web:629b3788622c01771c92bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {firebaseConfig, app, db, storage, collection, addDoc, doc, getDoc, setDoc, ref, uploadBytes, getDownloadURL };
