// src/components/Home.js
import React from 'react';

const Home = () => {
  return (

    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center 
        shadow-md m-0 h-[calc(100vh-150px)]`}>
              
      <section className='text-center'>
        <h1 className='text-6xl font-bold mb-4 items-center'>SuiteHaven</h1>
        <p className='text-lg'> Discover your next suite</p>
      </section>

    </section>
    
  );
};

export default Home;
