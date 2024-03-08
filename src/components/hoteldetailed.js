import React, { useEffect, useState } from 'react';
import { HotelSummaryAPI, HotelDetailsAPI } from './hotelapi'; // importing the APIs to use
import Modal from './modal'; // importation of a compontent (for the photos)
import parse from 'html-react-parser' // to allow for react to automatically render html from JSON

const HotelDetailed = () => {

  // STATE MANAGEMENT // 
  const [hotelName, setHotelName] = useState(null); // to display hotel name from JSON
  const [hotelImages, setHotelImages] = useState([]); // to display hotel images from JSON
  const [hotelScore, setHotelScore] = useState(null); // to display hotel ratings from JSON
  const [aboutProperty, setAboutProperty] = useState(''); // to display information about the property from JSON
  const [aboutLanguages, setAboutLanguages] = useState('');// to display information regarding languages from JSON
  const [aboutPolicies, setAboutPolicies] = useState(''); // to display information about policies from JSON
  const [aboutExtras, setAboutExtras] = useState(''); // to display information about optional extras title from JSON
  const [extrasContent, setExtrasContent] = useState(''); // to display information about optional extras from JSON
  const [aboutHeaderText, setAboutHeaderText] = useState('');
  const [loading, setLoading] = useState(true); // loading screen
  const [error, setError] = useState(null); // for debugging, to show only if error occurs.
  const [showModal, setShowModal] = useState(false); // to set modal (photo modal) to show to the user
  const [amenities, setAmenities] = useState([]); // to display information about amenities offered
  const [initialImageCount, setInitialImageCount] = useState(''); // to assist with conditionally rendering images from JSON
  const [alertTriggered, setAlertTriggered] = useState(false) // to set alert
  // END OF STATE MANAGEMENT //


  // STATES & EFFECTS //

  // Ultimately to read, check and change the respective state of various variables
  // To allow us to call later in our file regarding the hotel and the respective JSON data
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelId = sessionStorage.getItem('hotel_id'); // to get the respective value from sessionstorage
        if (!hotelId) {
          throw new Error('Hotel ID not found in sessionStorage.'); // will only throw this error if no value is found for hotelID
        }

        // To access hotel name from JSON. We use "hotelId" due to the code above having the params.
        const data = await HotelSummaryAPI(hotelId); // Writing "await HotelSummaryAPI(hotelId)" sets us at the root of the JSON data
        if (!data || !data.summary || !data.summary.name) { // navigating the route of the JSON but unique way.
          throw new Error('Hotel details not found.');
        }
        // Due to "NOT!" operator making the statement change from false to true due to condition being met
        // Operator "NOT!" has the tendency to change false to true and true to false depending on criteria
        // Ultimately, due to all params in the if statement being true (due to actually fetching data), no error was thrown

        setHotelName(data.summary.name); // Assign respective state so we can dynamically use it to call the JSON path


        // To access hotel rating from JSON
        const detailsData = await HotelDetailsAPI(hotelId);
        if (!detailsData || !detailsData.reviewInfo || !detailsData.reviewInfo.summary || !detailsData.reviewInfo.summary.overallScoreWithDescriptionA11y) {
          throw new Error('Hotel score not found.');
        }
        setHotelScore(detailsData.reviewInfo.summary.overallScoreWithDescriptionA11y.value);


        // Because we're using the same API, for readability we continue below

        // To access hotel images from JSON
        if (detailsData && detailsData.propertyGallery && detailsData.propertyGallery.images) { // also navigates route of the JSON but in a unique way
          // will only navigate if each route after the other is true or else it will fail at whichever params is not true (has null or no data to load)
          setHotelImages(detailsData.propertyGallery.images);
        } else {
          setHotelImages([]); // to prevent the code from crashing abruptly, we added this to set the answer to "null" or nothing
        }

        // To access hotel amenities from JSON
        if (detailsData && detailsData.summary && detailsData.summary.amenities && detailsData.summary.amenities.topAmenities && detailsData.summary.amenities.topAmenities.items) {
          setAmenities(detailsData.summary.amenities.topAmenities.items);
        } else {
          setAmenities([]);
        }

        // To access information about the hotel from JSON
        const aboutPropertyText = detailsData.propertyContentSectionGroups?.aboutThisProperty?.sections[0]?.bodySubSections[0]?.elements[0]?.items[0]?.content?.text || '';
        // Method above is a more direct way to access the JSON data. There are no underlying conditions. If it gives "null" the OR operator will chip in
        setAboutProperty(aboutPropertyText);

        // To access information about the languages of the hotel from JSON
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


