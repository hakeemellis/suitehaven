import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import { ReactComponent as SunIcon } from '../assets/images/sun.svg'; // Import SVG for light mode
import { ReactComponent as MoonIcon } from '../assets/images/moon.svg'; // Import SVG for dark mode
import { ReactComponent as ProfileIcon } from '../assets/images/profile.svg'; // Import SVG for profile icon

const Navbar = ({ isDarkMode, toggleDarkMode }) => {

  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
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
            <Link to="/hotelsearch" className="text-md font-bold mx-4">Hotel Search</Link>
          </div>
          {/* Profile Dropdown */}
          <div className="relative">
            <button className="px-4 py-2" onClick={handleProfileToggle}>
              <ProfileIcon className="w-8 h-8" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white text-black dark:bg-black dark:text-white transition-all 
              duration-500 ease-in-out py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-md shadow-stone-900 dark:shadow-cyan-950" 
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">My Profile</Link>

                <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">Sign Up</Link>

                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">Login</Link>

                <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-white
                hover:bg-zinc-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black rounded" role="menuitem" tabIndex="-1">Logout</Link>
              </div>
            )}
          </div>
          {/* End of Profile Dropdown */}
          {/* Light/Dark Mode Toggle */}
          <div>
            <button className="px-4 py-2" onClick={toggleDarkMode}>
              {isDarkMode ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
            </button>
          </div>
          {/* End of Light/Dark Mode Toggle */}
        </div>
        {/* End for NavBar Elements */}

      </nav>
      {/* End of Desktop Navbar */}

      {/* Mobile Navbar */}
      <nav className={`block md:hidden dark:bg-zinc-950 dark:text-white bg-slate-100 text-black p-4 transition-all 
        duration-500 ease-in-out container mx-auto flex 
        items-center justify-between shadow-md dark:shadow-zinc-900 z-0`}>

        {/* Container for NavBar Elements */}
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">SuiteHaven</Link>
          {/* Light/Dark Mode Toggle */}
          <div>
            <button className="px-4 py-2 border-2 rounded" onClick={toggleDarkMode}>
              {isDarkMode ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
            </button>
          </div>
          {/* End of Light/Dark Mode Toggle */}
        </div>
        {/* End for NavBar Elements */}

      </nav>
      {/* End of Mobile Navbar */}

    </header>
  );
};

export default Navbar;


