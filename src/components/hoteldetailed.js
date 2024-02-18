import React, { useEffect, useState } from 'react';
import { HotelSummaryAPI, HotelDetailsAPI } from './hotelapi';
import Modal from './modal';

const HotelDetailed = () => {
  const [hotelName, setHotelName] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelScore, setHotelScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelId = sessionStorage.getItem('hotel_id');
        if (!hotelId) {
          throw new Error('Hotel ID not found in sessionStorage.');
        }

        const data = await HotelSummaryAPI(hotelId);
        if (!data || !data.summary || !data.summary.name) {
          throw new Error('Hotel details not found.');
        }
        setHotelName(data.summary.name);

        const detailsData = await HotelDetailsAPI(hotelId);
        if (!detailsData || !detailsData.reviewInfo || !detailsData.reviewInfo.summary || !detailsData.reviewInfo.summary.overallScoreWithDescriptionA11y) {
          throw new Error('Hotel score not found.');
        }
        setHotelScore(detailsData.reviewInfo.summary.overallScoreWithDescriptionA11y.value);

        if (detailsData && detailsData.propertyGallery && detailsData.propertyGallery.images) {
          setHotelImages(detailsData.propertyGallery.images);
        } else {
          setHotelImages([]);
        }
      } catch (error) {
        setError('Error fetching hotel details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, []);

  const handleShowMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center text-4xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <section className="dark:bg-black dark:text-white bg-white text-black p-4 transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center shadow-md m-0 h-screen">
      <section className="text-center dark:bg-zinc-950 bg-slate-100 shadow-md dark:shadow-cyan-950 transition-all duration-500 ease-in-out">
        {/* Display images */}
        <div className="flex mb-4 shadow-sm">
          {hotelImages.slice(0, 4).map((image, index) => (
            <img key={index} src={image.image.url} alt={`${index}`} className="w-64 h-64 object-cover m-2 shadow-sm" />
          ))}
        </div>
        {/* Show more button */}
        {hotelImages.length > 4 && (
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleShowMore}>
            Show me more
          </button>
        )}
        {/* Display hotel name */}
        <h1 className="text-6xl font-bold mb-4 mt-10 items-center">{hotelName}</h1>
        {/* Display hotel review score */}
        {hotelScore && <p className="text-lg font-semibold">{hotelScore}</p>}
      </section>
      {/* Modal */}
      {showModal && <Modal images={hotelImages} onClose={handleCloseModal} />}
    </section>
  );
};

export default HotelDetailed;


