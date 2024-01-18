import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage'; // Import the correct page component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={           
          <div>
            <Helmet>
            <title>SuiteHaven</title>
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