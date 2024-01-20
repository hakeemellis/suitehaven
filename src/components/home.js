// src/components/Home.js
import React from 'react';

const Home = ({ isDarkMode }) => {
  return (
    <section className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} transition-all duration-500 ease-in-out`}>
      <p>Some THING</p>
    </section>
  );
};

export default Home;
