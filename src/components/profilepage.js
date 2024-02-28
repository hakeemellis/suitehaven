import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { db, collection, doc, getDoc, setDoc } from './firebase';
import { storage, ref, uploadBytes, getDownloadURL } from './firebase'; // Import storage from the firebase configuration file

const MyProfilePage = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 767)

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setPhotoURL(userData.photoURL || ''); // Set photo URL if available
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Function to handle photo upload
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `users/${user.uid}/profilePhoto`);
    
    try {
      // Upload photo to Firebase Storage
      await uploadBytes(storageRef, file);
      
      // Get download URL of uploaded photo
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);

      // Update user document in Firestore with photoURL
      await setDoc(doc(collection(db, 'users'), user.uid), { photoURL: downloadURL }, { merge: true });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out mx-auto flex items-center justify-center 
        shadow-md m-0 min-h-screen`}>
      <div className={`flex ${isMobileScreen ? 'flex-col' : 'flex-row'} mx-auto items-center justify-center`}>
        <div className="">
          <img src={photoURL || 'default-profile-photo.jpg'} alt="Profile" className="w-60 h-60 rounded-full border-4 flex mx-auto mb-5" />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-1 mb-5" />
        </div>
        <div>
          <div className="mb-4">
            <p className="font-bold">First Name:</p>
            <p className='text-xl'>{firstName}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Last Name:</p>
            <p className='text-xl'>{lastName}</p>
          </div>
          <div>
            <p className="font-bold">Journey:</p>
            <p className='text-xl'>New to SuiteHaven</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfilePage;
