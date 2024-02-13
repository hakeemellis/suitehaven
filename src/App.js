import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RegionSearch from './pages/regionsearch';
import HotelSearch from './pages/hotelsearch';


const App = () => {
  return (
  <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" element={           
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
            attached route has no title to load*/}
            </Helmet> 
            <HomePage />
          </div>
        } 
        />

        <Route path="/regionsearch" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <RegionSearch />
          </div>
        } />

        <Route path="/hotelsearch" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <HotelSearch />
          </div>
        } />

        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  </HelmetProvider>
  );
}

export default App;