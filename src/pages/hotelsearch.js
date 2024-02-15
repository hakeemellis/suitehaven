// src/pages/regionsearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import { Helmet } from 'react-helmet-async';
import HotelResults from '../components/hotelresults';
import Search from '../components/search';
import SearchButton from '../components/searchbutton';

const HotelSearch = () => {
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
    </div>
  );
};

export default HotelSearch;


