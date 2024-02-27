// src/pages/regionsearch.js
import React, {useState, useEffect} from 'react';
import Navbar from '../components/header';
import { Helmet } from 'react-helmet-async';
import HotelDetailed from '../components/hoteldetailed';
import Footer from '../components/footer';


const HotelSummary = () => {

  // Dark Mode //
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a preferred dark mode state stored in local storage
    const preferredDarkMode = localStorage.getItem('preferredDarkMode');

    // If there's a preferred mode in local storage, use that value
    if (preferredDarkMode !== null) {
      return preferredDarkMode === 'true';
    } else {
      // Otherwise, set dark mode based on system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDarkMode;
    }
  });

  useEffect(() => {
    // Apply dark mode class to html head based on if "dark" is present after toggle
    // of the element
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Update preferred dark mode state in local storage
    localStorage.setItem('preferredDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(isDarkMode)
  // End of Dark Mode //

  return (
    <div className='antialiased'>
      <Helmet>
        <title>Hotel Summary | SuiteHaven</title>
      </Helmet>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <HotelDetailed/>
      <Footer/>
    </div>
  );
};

export default HotelSummary;