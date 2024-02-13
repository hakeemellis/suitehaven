import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router

const RegionResults = () => {
  // Access data from sessionStorage
  const userQuery = sessionStorage.getItem('destination');
  const jsonData = JSON.parse(sessionStorage.getItem('result'));
  const data = jsonData.data;

  return (
    <section className='relative overflow-hidden'>

        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full dark:bg-black bg-white transition-all duration-500 ease-in-out z-0"></div>

        <div className={`relative z-10 dark:bg-zinc-950 dark:text-white bg-white text-black transition-all duration-500 ease-in-out
            flex flex-col items-center justify-center p-15 my-20 top-10 mx-auto max-w-5xl text-center 
            rounded-2xl shadow-2xl dark:shadow-zinc-900 opacity-85`}>
        
            <br/>

            <h1 className='text-3xl text-center font-semibold'>Region Search</h1>
            <br/>
            <p className='font-medium text-lg'>Here are your results for the query: "{userQuery}"</p>
            <br/>
            {/* Render fetched data */}
            <div className=''>
                {data.map((item, index) => (
                <Link key={index} to={`/details/${item.id}`} className="block border border-gray-300 p-4 rounded-lg mb-4 shadow-md dark:shadow-cyan-900">
                    <p>{item.regionNames.displayName}</p>
                </Link>
                ))}
            </div>
        </div>

    </section>
  );
};

export default RegionResults;
