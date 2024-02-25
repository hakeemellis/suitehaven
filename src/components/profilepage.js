import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { db, storage } from './firebase';

const MyProfilePage = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  // Function to handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = storage.ref(`users/${user.uid}/profilePhoto`);
    storageRef.put(file).then(() => {
      storageRef.getDownloadURL().then((url) => {
        setPhotoURL(url);
      });
    });
  };

  // Fetch user profile data from Firestore
  const userRef = db.collection('users').doc(user.uid);
  const [userData] = useDocumentData(userRef);

  // Update local state with user profile data
  if (userData) {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setPhotoURL(userData.photoURL);
  }

  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center 
        shadow-md m-0 min-h-screen`}>
      <div className="container flex flex-row items-center justify-center">
        <div className="mr-8">
          <img src={photoURL || 'default-profile-photo.jpg'} alt="Profile" className="w-40 h-40 rounded-full" />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-4" />
        </div>
        <div>
          <div className="mb-4">
            <p className="font-bold">First Name:</p>
            <p>{firstName}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Last Name:</p>
            <p>{lastName}</p>
          </div>
          <div>
            <p className="font-bold">Journey:</p>
            <p>New to SuiteHaven</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfilePage;