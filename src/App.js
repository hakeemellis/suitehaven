import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage'; // Import the correct page component
import { Helmet } from 'react-helmet';


function App() {
  return (
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
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;