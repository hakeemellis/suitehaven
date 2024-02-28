import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RegionResults = () => {
  const [jsonData, setJsonData] = useState(null); // State to hold JSON data
  const [loading, setLoading] = useState(true); // Loading state
  const userQuery = sessionStorage.getItem('destination');
  
  useEffect(() => {
    // Access data from sessionStorage and update state
    const data = sessionStorage.getItem('result');
    if (data) {
      setJsonData(JSON.parse(data));
      setLoading(false); // Set loading to false once data is loaded
    }

    // Check if the component is mounted on the route "/regionsearch"
    const isRegionSearch = window.location.pathname === '/suitehaven/regionsearch';

    // Check if the refresh hasn't occurred yet in this session or if sessionStorage refreshed value is false
    const refreshFlag = sessionStorage.getItem('refreshed');
    if (isRegionSearch && (refreshFlag !== 'true' || refreshFlag === 'false')) {
    // Change loading state to true when refresh is triggered
    setLoading(true);

    // Set a timeout to refresh the page after 2 seconds
    const timeoutId = setTimeout(() => {
        window.location.reload(); // Reload the page
        // Update sessionStorage to indicate that the refresh has occurred in this session
        sessionStorage.setItem('refreshed', 'true');
    }, 2000); // 2000 milliseconds = 2 seconds
    
    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
    }

    // Change loading state to false when refreshed turns back to true
    if (refreshFlag === 'true') {
    setLoading(false);
    }
    }, []); // Empty dependency array
    
  // Handle selecting a region and navigating to /hotelresults route
  const handleRegionSelect = async (regionId) => {
    try {
      // Store the selected region ID to sessionStorage
      sessionStorage.setItem('selectedRegionId', regionId);
      
      // Set refreshed to false or remove it to trigger autorefresh
      const refreshed = sessionStorage.getItem('refreshed');
      if (refreshed === 'true') {
        sessionStorage.setItem('refreshed', 'false');
      }

    } catch (error) {
      console.error(error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  // Render loading indicator while data is being fetched
  if (loading) {
    return (
      <div className="dark:bg-black dark:text-white absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="text-center text-4xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Render nothing if jsonData or userQuery is null (waiting for data to load)
  if (jsonData === null || userQuery === null) {
    return null;
  }

  // Render the component when jsonData and userQuery are available
  return (
    <section className='relative overflow-hidden'>
        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full dark:bg-black bg-white transition-all duration-500 ease-in-out z-0"></div>
        <div className={`relative z-10 dark:bg-zinc-950 dark:text-white bg-slate-50 text-black transition-all duration-500 ease-in-out
            flex flex-col items-center justify-center p-15 my-20 top-10 mx-auto max-w-5xl text-center 
            rounded-2xl shadow-2xl shadow-zinc-350 dark:shadow-zinc-900 opacity-85`}>
            <br/>
            <h1 className='text-3xl text-center font-semibold'>Region Search</h1>
            <br/>
            <p className='font-medium text-lg'>Here are your results for the query: "{userQuery}"</p>
            <br/>
            {/* Render fetched data */}
            <div className=''>
                {jsonData.data.map((item, index) => (
                  <Link
                  key={index}
                  to= "/hotelsearch"
                  onClick={() => handleRegionSelect(item.gaiaId || item.cityId || item.hotelId)} // Pass the region ID to handleRegionSelect
                  className="block border border-gray-300 p-4 rounded-lg mb-4 shadow-md dark:shadow-cyan-900"
                >
                  <p>{item.regionNames.displayName}</p>
                </Link>
                ))}
            </div>
        </div>
    </section>
  );
};

export default RegionResults;


