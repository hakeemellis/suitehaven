import React from 'react';

const LoginSection = () => {
  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // Example: Log the form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center 
        shadow-md m-0 min-h-screen`}>
      <div className="text-center container">
        <h1 className="text-6xl font-bold mb-4">SuiteHaven</h1>
        <p className="text-lg">Please login to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="container mt-8">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2  font-bold">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <button type="submit" className="block w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Login</button>
      </form>
    </section>
  );
};

export default LoginSection;