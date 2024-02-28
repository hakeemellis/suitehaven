// src/components/Search.js
import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {HotelAPI} from './hotelapi';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Search = () => {

  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the current route is "/"
    if (location.pathname === "/") {
      // Clear sessionStorage
      sessionStorage.clear();
    }
  })

  const handleInputChange = (event) => {
    setDestination(event.target.value);
  };

// eslint-disable-next-line
{/* HTML 5 Way with Code Below

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  }; */}

  const handleCheckInDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD from ISO string
    setCheckInDate(formattedDate);
  };
  
  const handleCheckOutDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD from ISO string
    setCheckOutDate(formattedDate);
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          searchHotels();
        } else {
          alert("Sorry, you need to choose a sign-in option first");
          navigate("/login");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchHotels = async () => {
    try {
      // Call the HotelAPI with the entered destination
      const result = await HotelAPI(destination);
      console.log(result);

      // Save destination and result to sessionStorage
      sessionStorage.setItem('destination', destination);
      sessionStorage.setItem('result', JSON.stringify(result));

      // To save checkindate, checkoutdate and guests to sessionStorage
      sessionStorage.setItem('checkInDate', checkInDate);
      sessionStorage.setItem('checkOutDate', checkOutDate);
      sessionStorage.setItem('guests', guests);

    } catch (error) {
      console.error(error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  // Get today's date in the format "YYYY-MM-DD"
  //const today = new Date().toISOString().split('T')[0]; - Due to React Date Picker
  
  return (

    <section className="relative h-screen overflow-hidden"> {/* Search Hero Code */}
        
        {/* Video Within Hero Banner */}
        <video className="absolute top-0 left-0 w-full h-full object-cover z-1" 
        autoPlay playsInline muted loop>
          <source src={process.env.PUBLIC_URL + "/assets/videos/test2.mp4"} type="video/mp4" />
          <source src={process.env.PUBLIC_URL + "/assets/videos/test2.webm"} type="video/webm" />
          <source src={process.env.PUBLIC_URL + "/assets/videos/test2.ogv"} type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        {/* Video Within Hero Banner */}

        {/* Overlay for Video */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-950 opacity-70 z-2"></div>
        {/* End of Overlay Code */}

        {/* Search Section */}
        <section className={`relative z-0 dark:bg-zinc-950 dark:text-white bg-white text-black transition-all duration-500 ease-in-out
            flex flex-col items-center justify-center p-15 my-20 top-10 mx-auto max-w-5xl text-center 
            rounded-2xl shadow-2xl dark:shadow-zinc-900 opacity-85`}>
          
            {/* Inner Section within Search */}
            <section className='p-15 my-20 mx-auto w-full text-center rounded-lg'>
                <section className='text-center'>
                <h1 className='text-6xl font-bold mb-4 items-center text-cyan-500'>SuiteHaven</h1>
                <p className='text-lg'> Discover your next suite</p>
                </section>
                
                <br/>
                
                {/* The Search Bar */}
                <section className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-2">

                  {/* Elements within the Search Bar */}
                    <input type="text" placeholder="Destination" value={destination} onChange={handleInputChange}
                    className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                    px-6 py-3 border rounded-xl focus:outline-none`}/>

                    <DatePicker
                      selected={checkInDate}
                      onChange={date => handleCheckInDateChange(date)}
                      minDate={new Date()}
                      placeholderText="Check-In Date"
                      className="dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                      px-4 py-3 border rounded-xl focus:outline-none"
                    />

                    <DatePicker
                      selected={checkOutDate}
                      onChange={date => handleCheckOutDateChange(date)}
                      minDate={new Date()}
                      placeholderText="Check-Out Date"
                      className="dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                      px-4 py-3 border rounded-xl focus:outline-none"
                    />

                    {/* Made Obsolete due to React Date Picker || This Method relies on HTML 5

                    <input type="date" placeholder="Check-In Date" value={checkInDate} onChange={handleCheckInDateChange} min={today}
                    className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                    px-4 py-3 border rounded-xl focus:outline-none`}/>

                    <input type="date" placeholder="Check-Out Date" value={checkOutDate} onChange={handleCheckOutDateChange} min={today}
                    className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                    px-4 py-3 border rounded-xl focus:outline-none`}/>*/}

                    <input type="number" placeholder="Guests" value={guests} onChange={handleGuestsChange}
                    className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                    px-1 py-3 border rounded-xl focus:outline-none items-center text-center`}/>
                  

                    <Link to="/regionsearch">
                    <button
                      onClick={handleSearchClick}
                      className="rounded-3xl focus:outline-none px-4 py-3 bg-sky-600 text-white"
                      >
                      Search
                    </button>
                    </Link>

                </section>
              {/* End of Search Bar */}
            </section>
          {/* End of Inner Section within Search */}
        </section>
      {/* End of Search Section */}
      
    </section> 
  );
};

export default Search;
