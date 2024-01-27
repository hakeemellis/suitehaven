// src/components/Home.js
import React from 'react';

const Search = () => {
  return (

  <section className="relative h-screen overflow-hidden"> {/* Search Hero Code */}
    
    {/* Video Within Hero Banner */}
    <video className="absolute top-0 left-0 w-full h-full object-cover z-1" 
     autoPlay muted loop>
      <source src="/assets/videos/test2.mp4" type="video/mp4" />
      <source src="/assets/videos/test2.webm" type="video/webm" />
      <source src="/assets/videos/test2.ogv" type="video/ogg" />
      Your browser does not support the video tag.
    </video>

    {/* Overlay for Video */}
    <div className="absolute top-0 left-0 w-full h-full bg-gray-950 opacity-70 z-2"></div>

    {/* Search Section */}
    <section className={`relative z-0 dark:bg-zinc-950 dark:text-white bg-white text-black transition-all duration-500 ease-in-out
        flex flex-col items-center justify-center p-15 my-20 top-10 mx-auto max-w-5xl text-center 
        rounded-2xl shadow-2xl dark:shadow-zinc-900 opacity-85`}>
      
        
        <section className='p-15 my-20 mx-auto w-full text-center rounded-lg'>

            <section className='text-center '>
            <h1 className='text-6xl font-bold mb-4 items-center text-cyan-500'>SuiteHaven</h1>
            <p className='text-lg'> Discover your next suite</p>
            </section>
            
            <br/>
            
            {/* Search Bar */}
            <section className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-2">

                <input type="text" placeholder="Destination"
                className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                px-6 py-3 border rounded-xl focus:outline-none`}/>

                <input type="date"
                className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                px-4 py-3 border rounded-xl focus:outline-none`}/>

                <input type="date" 
                className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                px-4 py-3 border rounded-xl focus:outline-none`}/>

                <input type="number" placeholder="Guests"
                className= {`dark:bg-zinc-900 dark:text-white bg-white text-black transition-all duration-500 ease-in-out 
                px-4 py-3 border rounded-xl focus:outline-none`}/>

                <button className= "rounded-3xl focus:outline-none px-4 py-3 bg-sky-600 text-white">
                Search
                </button>

            </section>

        </section>
        

    </section>
  </section>
  );
};

export default Search;
