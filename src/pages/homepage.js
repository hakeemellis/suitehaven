import React from 'react';
import Navbar from '../components/header';
import Home from '../components/home';
import { Helmet } from 'react-helmet';


const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home | SuiteHaven</title>
      </Helmet>
      <Navbar /> 
      <Home />
    </div>
  );
};

export default HomePage;
