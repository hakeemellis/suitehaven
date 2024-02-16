// src/components/HotelDetailed.js
import React, { useEffect, useState } from 'react';
import { HotelSummaryAPI } from './hotelapi';

const HotelDetailed = () => {
  const [hotelName, setHotelName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelId = sessionStorage.getItem('hotel_id');
        if (hotelId) {
          const data = await HotelSummaryAPI(hotelId);
          console.log(data)
          if (data && data.summary && data.summary.name) {
            setHotelName(data.summary.name);
          } else {
            setError('Hotel details not found.');
          }
        } else {
          setError('Hotel ID not found in sessionStorage.');
        }
      } catch (error) {
        setError('Error fetching hotel details: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchHotelDetails();
  }, []);

  if (loading) {
    return (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-semibold'>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">{error}</div>
    );
  }

  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center 
        shadow-md m-0 h-[calc(100vh-150px)]`}>
              
      <section className='text-center'>
        <h1 className='text-6xl font-bold mb-4 items-center'>SuiteHaven</h1>
        <p className='text-lg'> Discover your next suite</p>
        {hotelName && <p className="text-xl font-semibold mt-4">{hotelName}</p>}
      </section>

    </section>
  );
};

export default HotelDetailed;
