import React, { useState } from 'react';
import Navbar from '../components/header';
import Home from '../components/home';
import { Helmet } from 'react-helmet-async';


const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(isDarkMode)
  return (
    <div>
      <Helmet>
        <title>Home | SuiteHaven</title>
      </Helmet>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default HomePage;
