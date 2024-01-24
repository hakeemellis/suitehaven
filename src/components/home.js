// src/components/Home.js
import React from 'react';
import SearchBar from '../components/searhbar';

const Home = ({ isDarkMode }) => {
  return (
    <section>

      <SearchBar isDarkMode={isDarkMode} />
    
      <section className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} transition-all duration-500 ease-in-out
      flex items-center justify-center items-center m-0 h-[calc(100vh-150px)] border-4`}>
        
        <section className='text-center '>
          <h1 className='text-6xl font-bold mb-4 items-center'>SuiteHaven</h1>
          <p className='text-lg'> Discover your next suite</p>
        </section>

      </section>

    </section>
  );
};

export default Home;
