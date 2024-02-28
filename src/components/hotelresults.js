import React, { useEffect, useState } from 'react';
import { HotelResultsAPI } from './hotelapi';
import { Link } from 'react-router-dom';

const HotelResults = () => {
  const [hotelData, setHotelData] = useState([]); // Initialize as empty array
  const [displayCount, setDisplayCount] = useState(10); // State variable to track number of results to display
  const [loading, setLoading] = useState(true); // State variable to track loading status

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const destination = sessionStorage.getItem('selectedRegionId');
        const checkInDate = sessionStorage.getItem('checkInDate');
        const checkOutDate = sessionStorage.getItem('checkOutDate');

        if (destination && checkInDate && checkOutDate) {
          const data = await HotelResultsAPI(destination, checkInDate, checkOutDate);
          setHotelData(data.properties); // Update state with the array of properties
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, []);

  const loadMoreResults = () => {
    setDisplayCount(prevCount => prevCount + 10); // Increase the display count by 10
  };

  // Show loading screen if data is still being fetched
  if (loading) {
    return (
      <div className="dark:bg-black dark:text-white absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="text-center text-4xl font-semibold">Loading...</div>
      </div>
    );
  }

  const handleResultClick = (hotelId) => {
    sessionStorage.setItem('hotel_id', hotelId); // Save the hotel ID to sessionStorage
  };

  return (
    <section className="dark:bg-black dark:text-white bg-white text-black p-4 transition-all duration-500 ease-in-out mx-auto flex items-start justify-center shadow-md m-0 min-h-screen relative z-20">
      <div className="max-w-3xl w-full">
        {hotelData.slice(0, displayCount).map((property, index) => (
          <Link key={index} to={`/hotelsearch/hotelsummary`} onClick={() => handleResultClick(property.id)}>
          <div className="bg-slate-50 dark:bg-zinc-950 rounded-md flex items-center justify-center p-4 mb-7 mt-3 shadow-md shadow-zinc-300 dark:shadow-cyan-950">
            <div className="w-1/4 h-full overflow-hidden rounded-l-md">
              <img src={property.propertyImage?.image?.url || "placeholder-image.jpg"} alt={property.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-3/4 p-4">
              <h1 className="text-xl font-semibold mb-2">{property.name}</h1>
              <p className="text-md font-semibold mb-2">Rating: {property.reviews.score}</p>
              <p className="text-md font-semibold mb-2">{property.price.lead.currencyInfo.code} {property.price.options[0]?.formattedDisplayPrice} per night</p>
              {/* You can add more fields here, such as location, rating, and price */}
            </div>
          </div>
        </Link>
        ))}
        <br/>
        {displayCount < hotelData.length && (
          <div className="flex justify-center mt-4">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={loadMoreResults}>
            Show More
          </button>
        </div>
        )}
      </div>
    </section>
  );
};

export default HotelResults;
