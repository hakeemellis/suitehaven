// src/components/Navbar.js
import React from 'react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header>

      {/* NavBar */}
      <nav className={`dark:bg-zinc-950 dark:text-white bg-slate-100 text-black p-4 transition-all 
        duration-500 ease-in-out container mx-auto flex 
        items-center justify-between shadow-md dark:shadow-zinc-900`}>

          {/* Container for NavBar Elements */}
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-semibold">SuiteHaven</div>

              {/* Light/Dark Mode Toggle */}
              <div>
                <button className="px-4 py-2 border-2 rounded" onClick={toggleDarkMode}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              {/* End of Light/Dark Mode Toggle */}

          </div>
          {/* End for NavBar Elements */}
          
      </nav>
      {/* NavBar */}

    </header>
  );
};

export default Navbar;

