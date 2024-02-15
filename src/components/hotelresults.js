import React, { useEffect, useState } from 'react';
import { HotelResultsAPI } from './hotelapi';

const HotelResults = () => {
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const destination = sessionStorage.getItem('selectedRegionId');
        const checkInDate = sessionStorage.getItem('checkInDate');
        const checkOutDate = sessionStorage.getItem('checkOutDate');

        if (destination && checkInDate && checkOutDate) {
          const data = await HotelResultsAPI(destination, checkInDate, checkOutDate);
          setHotelData(data.properties); // Update state with the array of properties
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, []);

  if (!hotelData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="dark:bg-zinc-950 dark:text-white bg-white text-black p-4 transition-all duration-500 ease-in-out container mx-auto flex items-start justify-center shadow-md m-0 min-h-screen relative">
      <div className="max-w-3xl w-full">
        {hotelData.map((property, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center p-4 mb-4">
            <div className="w-1/4 h-full overflow-hidden rounded-l-md">
              <img src={property.propertyImage?.image?.url || "placeholder-image.jpg"} alt={property.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-3/4 p-4">
              <h1 className="text-3xl font-semibold mb-2">{property.name}</h1>
              {/* You can add more fields here, such as location, rating, and price */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelResults;

