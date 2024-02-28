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
  const [aboutExtras, setAboutExtras] = useState('');
  const [extrasContent, setExtrasContent] = useState('');
  const [aboutHeaderText, setAboutHeaderText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [initialImageCount, setInitialImageCount] = useState(''); // Initial image count for desktop
  const [alertTriggered, setAlertTriggered] = useState(false)

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

        // Load the value from the path elements[0] > header > text separately
        const headerText = detailsData.propertyContentSectionGroups?.policies?.sections[0]?.bodySubSections[1]?.elements[0]?.header?.text || '';
        setAboutHeaderText(headerText)
        console.log(headerText);

        // Load the value from the path elements[0] > header > text separately
        const optionalTitle = detailsData.propertyContentSectionGroups?.policies?.sections[0]?.bodySubSections[0]?.elements[0]?.header?.text || '';
        setAboutExtras(optionalTitle)
        console.log(optionalTitle);

        const optionalSection = detailsData.propertyContentSectionGroups?.policies?.sections[0]?.bodySubSections[0]?.elements[0]?.items || '';
        const optionalText = optionalSection.map(item => item?.content?.text || '');
        setExtrasContent(optionalText)

        //const policyItems = policiesSection?.bodySubSections[0]?.elements[0]?.items || [];
        //const policyTexts = policyItems.map(item => item?.content?.text || '');
        //const policiesSection = detailsData.propertyContentSectionGroups?.policies?.sections[0];
        //const policyItems = policiesSection?.bodySubSections[0]?.elements[0]?.items || [];
        //const policyTexts = policyItems.map(item => item?.content?.text || '');

        const policiesSection = (detailsData.propertyContentSectionGroups?.policies?.sections[0]?.bodySubSections[1]?.elements[0]?.items[0]?.contents
          || detailsData.propertyContentSectionGroups?.policies?.sections[0]?.bodySubSections[1]?.elements[0]?.items);
        const policyTexts = policiesSection.map(item => item?.primary?.value || item?.content?.text || '');
        //const bodySubSections = policiesSection?.bodySubSections || [];
        // Use flatMap to iterate over all elements of bodySubSections
        //const policyTexts = bodySubSections.flatMap(subSection => {
          // For each subSection, extract items and map over them to get the text
          //const items = subSection?.elements[0]?.items || [];
          //return items.map(item => item?.content?.text || '');
        //});
        setAboutPolicies(policyTexts);
        console.log(policyTexts)
      } catch (error) {
        setError('Error fetching hotel details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, []);

  const handleShowMore = () => {
    if (!alertTriggered) {
      alert(`You'll have to close this modal and reclick the button to see all images`);
      setAlertTriggered(true);
      setShowModal (true)
    }
    else{
    setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      const isMobile = window.innerWidth <= 1024; // Adjust the threshold as needed
      if (isMobile) {
        setInitialImageCount(1);
      } else {
        setInitialImageCount(4);
      }
    };

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  if (loading) {
    return (
      <div className="dark:bg-black dark:text-white absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="text-center text-4xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <section className="dark:bg-black dark:text-white bg-white text-black p-4 transition-all duration-500 ease-in-out mx-auto shadow-md m-0 min-h-screen">
    {/* Hero Section */}
    <div className="flex flex-col items-center mb-8">
      <section className="text-center dark:bg-zinc-950 bg-white shadow-md shadow-zinc-300 dark:shadow-cyan-950 transition-all duration-500 ease-in-out max-w-6xl">
        {/* Display images */}
        <div className="flex mb-4 shadow-sm">
        {hotelImages.slice(0, initialImageCount).map((image, index) => (
            <img key={index} src={image.image.url} alt={`${index}`} className="w-64 h-64 object-cover m-2 shadow-sm flex mx-auto" />
          ))}
        </div>
        {/* Show more button */}
        <button 
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${hotelImages.length <= 4 ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleShowMore} 
          disabled={hotelImages.length <= 4}>
          Show me more
        </button>
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
      <section className="text-left dark:bg-zinc-950 bg-white shadow-md shadow-zinc-300 dark:shadow-cyan-950 transition-all duration-500 ease-in-out p-4 mt-8 container mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold mb-2">About this property:</h2>
        <div>{aboutProperty}</div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">Languages:</h2>
        <div>{aboutLanguages}</div>
      </section>

      {/* Policies */}
      <section className="text-left dark:bg-zinc-950 bg-white shadow-md dark:shadow-cyan-950 transition-all duration-500 ease-in-out p-4 mt-8 container mx-auto max-w-6xl">
        <h2 className='text-2xl font-semibold mb-3'>{aboutHeaderText}</h2>
        <div>{aboutPolicies.map(policy => parse(policy))}</div>
        <h2 className='text-2xl font-semibold mt-8 mb-3'>{aboutExtras}</h2>
        <div>{extrasContent.map(content => parse(content))}</div>
      </section>
      {/* End of About this property section */}
    </div>
    {/* Modal */}
    {showModal && <Modal images={hotelImages} onClose={handleCloseModal} />}
  </section>
  );
};

export default HotelDetailed;


