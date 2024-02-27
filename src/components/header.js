import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'; // Importing necessary Firebase auth methods
import { ReactComponent as SunIcon } from '../assets/images/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/images/moon.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/profile.svg';
import { db, getDoc, doc } from './firebase'; // Importing the Firestore instance from firebase.js

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate();

  useEffect(() => {
    // Getting the authentication instance
    const auth = getAuth();
  
    // Setting up a listener for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If a user is logged in, fetch user data from Firestore based on the user's UID
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          console.log('User document:', userDoc.data()); // Log user document data
  
          if (userDoc.exists()) {
            // Accessing the user data
            const userData = userDoc.data();
            console.log('User data:', userData); // Log user data
  
            if (userData) {
              // Accessing the correct field name (assuming it's 'firstname')
              const firstName = userData.firstName;
              console.log('First Name:', firstName); // Log first name
  
              // Setting user state with data from Firestore
              setUser(userData);
            } else {
              console.log('User data is empty');
            }
          } else {
            const guestUserData = { firstName: 'Guest' };
            setUser(guestUserData);
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // If no user is logged in, set user state to null
        setUser(null);
      }
    });
  
    // Clean up subscription
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only once on component mount
  
  
  

  // Set up a listener for changes to the user's authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe1 = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        console.log(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up subscription
    return () => unsubscribe1();
  }, []);

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          console.log('User logged out successfully');
          setUser(null); // Clear user state
          navigate('/logout');
        })
        .catch((error) => {
          console.error('Error signing out:', error.message);
        });
    } else {
      alert("Can't log out. You're not logged in");
    }
  };

  return (
    <header>
      {/* Desktop Navbar */}
      <nav className={`z-50 relative hidden md:block dark:bg-zinc-950 dark:text-white bg-slate-100 text-black p-4 transition-all 
        duration-500 ease-in-out container mx-auto flex 
        items-center justify-between shadow-md dark:shadow-zinc-900`}>

        {/* Container for NavBar Elements */}
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">SuiteHaven</Link>
          <div className="flex flex-grow justify-center">
            <Link to="/" className="text-md font-bold mx-4">Home</Link>
            <Link to="/profile" className="text-md font-bold mx-4">Profile</Link>
            <Link to="/hotelsearch" className="text-md font-bold mx-4">Suite Listing</Link>
          </div>
          <div className="relative">
            <button className="px-4 py-2" onClick={handleProfileToggle}>
              <ProfileIcon className="w-8 h-8" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black dark:bg-black dark:text-white transition-all 
              duration-500 ease-in-out py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-md shadow-stone-900 dark:shadow-cyan-950" 
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                {user ? (
                  <>
                    <p className="block px-4 py-2 text-sm text-gray-700 dark:text-white rounded">
                      Hi, {user.firstName}
                    </p>
                    <button className="container block px-4 py-2 text-sm text-red-600 bg-transparent border-none text-left hover:bg-red-50 rounded" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                    hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">Sign Up</Link>

                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                    hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">Login</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div>
            <button className="px-4 py-2" onClick={toggleDarkMode}>
              {isDarkMode ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


