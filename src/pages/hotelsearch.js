// src/pages/regionsearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import { Helmet } from 'react-helmet-async';
import HotelResults from '../components/hotelresults';
import Search from '../components/search';
import SearchButton from '../components/searchbutton';
import Footer from '../components/footer';

const HotelSearch = () => {
  
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

  const navigate = useNavigate(); // Hook to navigate between routes
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    navigate('/hotelsearch'); // Navigate to '/hotelsearch' when showSearch is toggled
  };

  return (
    <div className='antialiased'>
      <Helmet>
        <title>Hotel Search | SuiteHaven</title>
      </Helmet>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      {showSearch && <Search />}
      <SearchButton showSearch={showSearch} toggleSearch={toggleSearch} />
      <HotelResults/>
      <Footer/>
    </div>
  );
};

export default HotelSearch;


