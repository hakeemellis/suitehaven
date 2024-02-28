import React from 'react';
import { Link } from 'react-router-dom';

const LogoutScreen = () => {
  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out mx-auto flex items-center justify-center 
        shadow-md m-0 min-h-screen`}>
      <div className="text-center container">
        <h1 className="text-6xl font-bold mb-4">Logout</h1>
        <p className="text-lg">You have logged out successfully.</p>
        <Link to="/" className="container max-w-3xl mx-auto text-center items-center block w-full mt-4 px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Go back to Home</Link>
      </div>
    </section>
  );
};

export default LogoutScreen;