// src/components/Home.js
import React from 'react';

const SearchBar = ({ isDarkMode }) => {
  return (

    <section className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} transition-all duration-500 ease-in-out
        flex items-center justify-center p-15 my-20 mx-auto max-w-600 text-center rounded-lg border-4`}>
      
        
        <section className='p-15 my-20 mx-auto max-w-600 text-center rounded-lg border-4'>

            <section className='text-center '>
            <h1 className='text-6xl font-bold mb-4 items-center'>SuiteHaven</h1>
            <p className='text-lg'> Discover your next suite</p>
            </section>
            
            <br/>
            
            {/* Search Bar */}
            <section className="flex items-center justify-center">
                <input
                type="text"
                placeholder="Destination"
                className="px-4 py-2 border rounded-l focus:outline-none"
                />
                <input
                type="date"
                className="px-4 py-2 border focus:outline-none"
                />
                <input
                type="date"
                className="px-4 py-2 border focus:outline-none"
                />
                <input
                type="number"
                placeholder="Guests"
                className="px-4 py-2 border rounded-r focus:outline-none"
                />
                <button className="px-6 py-2 bg-blue-500 text-white rounded-l border-l focus:outline-none">
                Search
                </button>
            </section>
        </section>
        

    </section>
  );
};

export default SearchBar;
