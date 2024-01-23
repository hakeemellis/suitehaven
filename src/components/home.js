// src/components/Home.js
import React from 'react';

const Home = ({ isDarkMode }) => {
  return (
    <section className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} transition-all duration-500 ease-in-out
    h-screen flex items-center justify-center`}>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4 items-center'>SuiteHaven</h1>
        <p className='text-lg'> Discover your next suite</p>
      </div>
    </section>
  );
};

export default Home;
