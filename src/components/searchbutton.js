// src/components/SearchButton.js
import React from 'react';

const SearchButton = ({ showSearch, toggleSearch }) => {
  return (
    <section className="dark:bg-black dark:text-white bg-white text-black p-4 
    transition-all duration-500 ease-in-out text-center z-20">
      <button onClick={toggleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">
        {showSearch ? 'Hide Search' : 'Show Search'}
      </button>
    </section>
  );
};

export default SearchButton;
