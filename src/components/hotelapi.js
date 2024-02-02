// lib/HotelAPI.js

const HotelAPI = async (userQuery) => {
  const url = `https://hotels-com-provider.p.rapidapi.com/v2/regions?query=${encodeURIComponent(userQuery)}&domain=US&locale=en_US`;
  const headers = {
    'X-RapidAPI-Key': '8808d13062msh5d8020d2ac63481p198a9bjsna8215521a10e', // Replace with your RapidAPI key
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

export default HotelAPI;

  