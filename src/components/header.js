// src/components/Navbar.js
import React from 'react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
      <header>
        <nav className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} p-4 transition-all duration-500 ease-in-out`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-semibold">SuiteHaven</div>
            <div>
              <button className="px-4 py-2 border-2 rounded" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Navbar;
