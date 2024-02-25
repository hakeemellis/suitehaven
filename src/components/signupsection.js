import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { app } from './firebase';

const SignUpSection = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage('Error signing up. Please try again.');
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
        <h1 className="text-6xl font-bold mb-4">Sign Up</h1>
        <p className="text-lg">Create an account to get started.</p>
      </div>

      <form onSubmit={handleSignUp} className="container mt-8">
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2 font-bold">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2 font-bold">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 font-bold">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" className="w-full px-4 py-2 border rounded-md focus:outline-none text-black" required />
        </div>
        <button type="submit" className="block w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Sign Up</button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <p className='text-center text-xl font-semibold mt-2 '>or</p>
        <button className="block w-full mt-4 px-4 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none" onClick={handleGoogleLogin}>Sign in with Google</button>
        <button className="block w-full mt-4 px-4 py-3 text-white bg-gray-900 rounded-md hover:bg-black focus:outline-none" onClick={handleGuestLogin}>Sign in as Guest</button>
      </form>
    </section>
  );
};

export default SignUpSection;