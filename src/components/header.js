import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // navigation methods within react (similar to html anchor element in a sense, especially Link)
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'; // for authentication
import { ReactComponent as SunIcon } from '../assets/images/sun.svg'; // to import and use images, has to be done this way
import { ReactComponent as MoonIcon } from '../assets/images/moon.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/profile.svg';
import { db, getDoc, doc } from './firebase'; // for database retrieval
import './header.css'


// { isDarkMode, toggleDarkMode } is present due to be defined in an external file and those variables can be triggered here
const Navbar = ({ isDarkMode, toggleDarkMode }) => {

  // STATE MANAGEMENT // 
  const [isProfileOpen, setProfileOpen] = useState(false); // State to check if profile menu is open
  const [user, setUser] = useState(null); // State to store user information
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to check if mobile menu is open
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 767); // State to check screen size
  // END OF STATE MANAGEMENT //

  // DEFINING VARIABLES //

  const navigate = useNavigate();

  // END OF DEFINING VARIABLES //


  // STATES & EFFECTS //

  // Checking who is logged in to display first name in nav (in a non-clickable button)  //
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
          } else { // defaults to say 'Guest' assuming user signed in as guest
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

  // Checking who is logged in to display first name in nav (in a non-clickable button)  //


  // checking if user is (was) signed in//
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
  // checking if user is (was) signed in //


   // Function to check and update the screen size //
   const checkScreenSize = () => { // the logic
    setIsMobileScreen(window.innerWidth <= 767);
  };

  useEffect(() => { // the action
    // Add an event listener for window resize
    window.addEventListener('resize', checkScreenSize); // Syntax window.addEventListener(eventName, eventHandlerFunction);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  // Function to check and update the screen size //

  // END OF STATES & EFFECTS //


  // TOGGLE OPTIONS //

  // Sign user out //
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
  // Sign user out //


  // Just to populate message when clicking "Suite Listing" if not signed in
  const handleSuiteListingClick = () => {
    if (!user) {
      alert("You're not logged in. Will not work.");
    } else if (!sessionStorage.getItem('selectedRegionId')) {
      alert("You haven't used search yet. Will not work.");
    } else {
      console.log('Will work')
    }
  };

  // Just to populate message when clicking "Profile" if not signed in 
  const handleProfileClick = () => {
    if (!user) {
      alert("You're not logged in. Will not work.");
    } 
    else {
      console.log('Will work')
    }
  };

  // Item/function to toggle state for if mobile menu opens
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // To handle state change of profile button being clicked to open sub menu //
  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  // END OF TOGGLE OPTIONS //

  return (
    <header>
      {/* Desktop Navbar */}
      <nav className={`z-50 relative dark:bg-zinc-950 dark:text-white bg-white text-black p-4 transition-all 
        duration-500 ease-in-out mx-0 flex 
        items-center justify-between shadow-md dark:shadow-zinc-900`}>

        {/* Container for NavBar Elements */}
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">SuiteHaven</Link>

            {/* Hamburger Mobile Menu Button */}
            <button className={`md:hidden absolute top-1/2 transform -translate-y-1/2 left-0 right-0 mx-auto 
            flex items-center justify-center transition-transform duration-500 
            ${isMobileMenuOpen ? 'rotate-90' : ''}`} onClick={toggleMobileMenu}>
              {/* The SVG Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7 text-black dark:text-white cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>


              {/* Render the mobile menu only for small screens */}
              {isMobileScreen && isMobileMenuOpen && (
              <div className="md:hidden absolute dark:bg-black bg-white p-4 rounded-md shadow-md dark:shadow-zinc-900 shadow-zinc-300 top-20 left-1/2 transform -translate-x-1/2">
                {/* Mobile menu content */}
                <div className="flex flex-col gap-2">
                  <Link to="/" className="text-md font-bold">Home</Link>
                  <Link to='/profile' className="text-md font-bold" onClick={handleProfileClick}>Profile</Link>
                  <Link to='/hotelsearch' className="text-md font-bold" onClick={handleSuiteListingClick}>Suite Listing</Link>
                </div>
              </div>
              )}

            {/* Render the desktop menu only for large screens */}
            {!isMobileScreen && (
            <div className="flex flex-grow justify-center">
              <Link to="/" className="text-md font-bold mx-4">Home</Link>
              <Link to='/profile' className="text-md font-bold mx-4" onClick={handleProfileClick}>Profile</Link>
              <Link to='/hotelsearch' className="text-md font-bold mx-4" onClick={handleSuiteListingClick}>Suite Listing</Link>
            </div>
            )}

          <div className="relative">
            <button className="px-4 py-2" onClick={handleProfileToggle}>
              <ProfileIcon className="w-8 h-8" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black dark:bg-black dark:text-white transition-all 
              duration-500 ease-in-out py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-md shadow-stone-400 dark:shadow-stone-900" 
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


