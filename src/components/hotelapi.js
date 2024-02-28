// lib/HotelAPI.js

const HotelAPI = async (userQuery) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/regions?query=${encodeURIComponent(userQuery)}&domain=US&locale=en_US`;
  const headers = {
    'X-RapidAPI-Key': '8bd5cecc54mshd6bc34c135a908cp19df6djsn68c15ab7ab1c', // Replace with your RapidAPI key
    'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
  };

  try {
    const response = await fetch(url, { method: 'GET', headers });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

const HotelResultsAPI = async (regionId, checkInDate, checkOutDate) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?region_id=${regionId}&locale=en_US&checkin_date=${checkInDate}&sort_order=RECOMMENDED&adults_number=1&domain=US&checkout_date=${checkOutDate}`;
  const headers = {
    'X-RapidAPI-Key': '8bd5cecc54mshd6bc34c135a908cp19df6djsn68c15ab7ab1c', // Replace with your RapidAPI key
    'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
  };

  try {
    const response = await fetch(url, { method: 'GET', headers });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};


const HotelSummaryAPI = async (hotelId) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/summary?hotel_id=${hotelId}&domain=US&locale=en_US&domain=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8bd5cecc54mshd6bc34c135a908cp19df6djsn68c15ab7ab1c',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch hotel details');
    }
    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};


const HotelInfoAPI = async (hotelId) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/info?hotel_id=${hotelId}&domain=US&locale=en_US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8bd5cecc54mshd6bc34c135a908cp19df6djsn68c15ab7ab1c',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const HotelDetailsAPI = async (hotelId) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/details?domain=US&hotel_id=${hotelId}&locale=en_US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8bd5cecc54mshd6bc34c135a908cp19df6djsn68c15ab7ab1c',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse the response as JSON
    return result; // Return the parsed JSON data
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching hotel details');
  }
};


export { HotelAPI, HotelResultsAPI, HotelSummaryAPI, HotelInfoAPI, HotelDetailsAPI };

  