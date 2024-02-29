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

// Just as a reminder as to what the exported elements do
// eslint-disable-next-line
{/* 

initializeApp: This function initializes a Firebase app instance with the provided Firebase configuration. 
It needs to be called before any other Firebase SDK functions.

getFirestore: This function returns a Firestore database instance that allows you to interact with Cloud Firestore, 
which is Firebase's NoSQL database. You can perform operations like adding documents, querying data, and updating documents using this instance.

getStorage: This function returns a Cloud Storage instance, which allows you to store and retrieve user-generated content like images, videos, 
and other files. You can upload files, get URLs to access them, and manage storage using this instance.

collection: This function is used to reference a specific collection within Cloud Firestore. Collections are containers 
for documents, and you use this function to access a specific collection to perform operations like adding documents or querying data within that collection.

addDoc: This function is used to add a new document to a Firestore collection. You pass the collection reference and the data you want to add as parameters to this function.

doc: This function is used to reference a specific document within a Firestore collection. You provide the collection reference and the document ID 
as parameters to get a reference to the document.

getDoc: This function retrieves a single document snapshot from Firestore based on the provided document reference. It allows you to retrieve the data stored in a specific document.

setDoc: This function is used to set data for a specific document within a Firestore collection. You provide the document reference and the data you want to set as 
parameters to update or overwrite the existing document data.

ref: This function is used to reference a file or directory within Cloud Storage. You provide the storage reference path as a parameter to access files or directories.

uploadBytes: This function is used to upload data in the form of bytes to Cloud Storage. You provide the storage reference and the data bytes you want to upload as parameters.

getDownloadURL: This function retrieves a URL that can be used to download a file stored in Cloud Storage. You provide the storage reference for the file as a parameter, and it returns the download URL.

getAuth: This function is used to obtain the authentication service instance from Firebase Authentication. Once you have the authentication service instance, you can use it to perform various authentication-related 
operations such as signing in, signing out, creating users, and managing user authentication state.

signOut: This function is used to sign out the currently authenticated user. When called, it ends the user's session and revokes their authentication credentials.

onAuthStateChanged: This function is an observer that listens for changes in the user's authentication state. It is typically used to track the user's sign-in status in real-time. When the authentication state 
changes (e.g., user signs in or signs out), this function is invoked with the user's authentication data (if signed in) or null (if signed out).

*/}