import React from 'react';


const RegionResults = () => {
  // Access data from sessionStorage
  const userQuery = sessionStorage.getItem('destination');
  const jsonData = JSON.parse(sessionStorage.getItem('result'));
  const data = jsonData.data;

  return (
    <div className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
    transition-all duration-500 ease-in-out h-[calc(100vh-50px)] z-10`}>
      <h1>Region Search</h1>
      <p>User Query: {userQuery}</p>
      {/* Render fetched data */}
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <p>{item.regionNames.displayName}</p>
            {/* Render other properties as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionResults;

  

