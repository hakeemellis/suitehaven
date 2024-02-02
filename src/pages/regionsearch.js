// src/pages/regionsearch.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const RegionSearch = () => {
  const location = useLocation();
  const { userQuery, jsonData } = location.query || {};

  return (
    <div>
      <h1>Region Search</h1>
      <p>User Query: {userQuery}</p>
      <p>JSON Data: {jsonData}</p>
      {/* Add your rendering logic for the data */}
    </div>
  );
};

export default RegionSearch;
