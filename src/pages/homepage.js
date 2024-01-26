import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import Home from '../components/home';
import { Helmet } from 'react-helmet-async';


const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in the system
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply dark mode if enabled in the system or based on user preference
    setIsDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode class to the existing html element
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(isDarkMode)
  return (
    <div className={`dark:bg-black bg-slate-100 transition-all duration-500 ease-in-out`}>
      <Helmet>
        <title>Home | SuiteHaven</title>
      </Helmet>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Home/>
    </div>
  );
};

export default HomePage;
