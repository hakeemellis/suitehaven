// src/pages/regionsearch.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import { Helmet } from 'react-helmet-async';
import SignUpSection from '../components/signupsection';


const Signup = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='antialiased'>
      <Helmet>
        <title>Sign Up | SuiteHaven</title>
      </Helmet>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <SignUpSection/>
    </div>
  );
};

export default Signup;