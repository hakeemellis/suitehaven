// src/components/Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  console.log('isDarkMode:', isDarkMode);

  return (
    <header>
    <nav className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} p-4`}>
        <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">SuiteHaven</div>
        <div>
            <button className="px-4 py-2 border rounded" onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
        </div>
    </nav>
    </header>

  );
};

export default Navbar;

