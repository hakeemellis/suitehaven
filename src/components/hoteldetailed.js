import React, { useEffect, useState } from 'react';
import { HotelSummaryAPI, HotelDetailsAPI } from './hotelapi';
import Modal from './modal';
import parse from 'html-react-parser'

const HotelDetailed = () => {
  const [hotelName, setHotelName] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelScore, setHotelScore] = useState(null);
  const [aboutProperty, setAboutProperty] = useState('');
  const [aboutLanguages, setAboutLanguages] = useState('');
  const [aboutPolicies, setAboutPolicies] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amenities, setAmenities] = useState([]);

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

        if (detailsData && detailsData.summary && detailsData.summary.amenities && detailsData.summary.amenities.topAmenities && detailsData.summary.amenities.topAmenities.items) {
          setAmenities(detailsData.summary.amenities.topAmenities.items);
        } else {
          setAmenities([]);
        }
      
        const aboutPropertyText = detailsData.propertyContentSectionGroups?.aboutThisProperty?.sections[0]?.bodySubSections[0]?.elements[0]?.items[0]?.content?.text || '';
        setAboutProperty(aboutPropertyText);

        const aboutLanguagesText = detailsData.propertyContentSectionGroups?.aboutThisProperty?.sections[0]?.bodySubSections[1]?.elements[0]?.items[0]?.content?.primary?.value || '';
        setAboutLanguages(aboutLanguagesText);

        const policiesSection = detailsData.propertyContentSectionGroups?.policies?.sections[0];
        const policyItems = policiesSection?.bodySubSections[0]?.elements[0]?.items || [];
        const policyTexts = policyItems.map(item => item?.content?.text || '');
        setAboutPolicies(policyTexts);
        console.log(policyItems)
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
    <section className="dark:bg-black dark:text-white bg-white text-black p-4 transition-all duration-500 ease-in-out container mx-auto shadow-md m-0 min-h-screen">
    {/* Hero Section */}
    <div className="flex flex-col items-center mb-8">
      <section className="text-center dark:bg-zinc-950 bg-slate-100 shadow-md dark:shadow-cyan-950 transition-all duration-500 ease-in-out max-w-6xl">
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
        <h1 className="text-6xl font-bold mb-4 mt-10">{hotelName}</h1>
        {/* Display hotel review score */}
        {hotelScore && <p className="text-lg font-semibold">{hotelScore}</p>}
        {/* Display amenities */}
        <div className="text-left mt-10">
          <h2 className="text-2xl font-semibold mb-2 ml-2">Popular amenities:</h2>
          <div className="flex flex-wrap justify-start font-semibold">
            {amenities.map((item, index) => (
              <div key={index} className="w-1/2 px-4">
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End of Hero Section */}
      {/* About this property section */}
      <section className="text-left dark:bg-zinc-950 bg-slate-100 shadow-md dark:shadow-cyan-950 transition-all duration-500 ease-in-out p-4 mt-8 container mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold mb-2">About this property:</h2>
        <div>{aboutProperty}</div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">Languages:</h2>
        <div>{aboutLanguages}</div>
      </section>

      {/* Policies */}
      <section className="text-left dark:bg-zinc-950 bg-slate-100 shadow-md dark:shadow-cyan-950 transition-all duration-500 ease-in-out p-4 mt-8 container mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold mb-2">Policies</h2>
        <div>{aboutPolicies.map(policy => parse(policy))}</div>
      </section>
      {/* End of About this property section */}
    </div>
    {/* Modal */}
    {showModal && <Modal images={hotelImages} onClose={handleCloseModal} />}
  </section>
  );
};

export default HotelDetailed;


