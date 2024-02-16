// src/pages/regionsearch.js
import React, {useState, useEffect} from 'react';
import Navbar from '../components/header';
import { Helmet } from 'react-helmet-async';
import HotelDetailed from '../components/hoteldetailed';


const HotelSummary = () => {

    // Dark Mode //
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      // Check if dark mode is enabled in the system (if user prefers dark mode)
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // To set dark mode by default if enabled in their system
      setIsDarkMode(prefersDarkMode);
    }, []);

    useEffect(() => {
      // Apply dark mode class to html head based on if "dark" is present after toggle
      // of the element
      document.documentElement.classList.toggle('dark', isDarkMode);
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
    </div>
  );
};

export default HotelSummary;