import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RegionSearch from './pages/regionsearch';
import HotelSearch from './pages/hotelsearch';
import HotelSummary from './pages/hotelsummary';
import Login from './pages/login';
import Signup from './pages/signup';
import LogoutScreen from './components/logoutscreen';
import Profile from './pages/profile';


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
        }/>

        <Route path="/hotelsearch" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <HotelSearch />
          </div>
        } />

        <Route path="/hotelsearch/hotelsummary" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <HotelSummary />
          </div>
        } />

        <Route path="/login" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <Login />
          </div>
        } />

        <Route path="/signup" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <Signup />
          </div>
        } />

        <Route path="/logout" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <LogoutScreen />
          </div>
        } />

        <Route path="/profile" element={
          <div>
            <Helmet>
            <title>SuiteHaven</title> {/* to default to "SuiteHaven" if 
             attached route has no title to load*/}
            </Helmet> 
            <Profile />
          </div>
        } />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  </HelmetProvider>
  );
}

export default App;