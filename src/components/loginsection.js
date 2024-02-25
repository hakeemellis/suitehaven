import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth'; // Import Firebase auth methods
import { app } from './firebase'; // Import your Firebase config and app instance

const LoginSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('username');
    const password = formData.get('password');

    try {
      const auth = getAuth(app); // Get the auth instance from your Firebase app
      await signInWithEmailAndPassword(auth, email, password); // Sign in user with email and password
      console.log('User logged in successfully');
      navigate('/'); // Redirect to Home Screen upon successful login
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert ('Details are incorrect. Please try again')
      // Handle authentication errors, display error messages, etc.
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app); // Get the auth instance from your Firebase app
      const provider = new GoogleAuthProvider(); // Create Google auth provider
      await signInWithPopup(auth, provider); // Sign in user with Google popup
      console.log('User logged in with Google successfully');
      navigate('/'); // Redirect to Home Screen upon successful login
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      alert ('Details are incorrect. Please try again')
      // Handle authentication errors, display error messages, etc.
    }
  };

  const handleGuestLogin = async () => {
    try {
      const auth = getAuth(app); // Get the auth instance from your Firebase app
      await signInAnonymously(auth); // Sign in user anonymously
      console.log('User logged in as guest');
      navigate('/'); // Redirect to Home Screen upon successful login
    } catch (error) {
      console.error('Error signing in as guest:', error.message);
      // Handle authentication errors, display error messages, etc.
    }
  };

  return (
    <section className={`dark:bg-zinc-950 dark:text-white bg-white text-black p-4 
        transition-all duration-500 ease-in-out container mx-auto flex items-center justify-center 
        shadow-md m-0 min-h-screen`}>
      <div className="text-center container">
        <h1 className="text-6xl font-bold mb-4">SuiteHaven</h1>
        <p className="text-lg">Please login to continue.</p>
      </div>

      <form onSubmit={handleEmailLogin} className="container mt-8">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2  font-bold">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <button type="submit" className="block w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Login</button>
        <p className='text-center text-xl font-semibold mt-2 '>or</p>
        <button className="block w-full mt-4 px-4 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none" onClick={handleGoogleLogin}>Sign in with Google</button>
        <button className="block w-full mt-4 px-4 py-3 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none" onClick={handleGuestLogin}>Sign in as Guest</button>
      </form>

    </section>
  );
};

export default LoginSection;