import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/hakeem-ellis/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600
          dark:text-white dark:hover:text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />{/* style={{ color: '#FF5733' }} if color */}
          </a>
          <a href="https://github.com/hakeemellis" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600
          dark:text-white dark:hover:text-gray-400">
            <FontAwesomeIcon icon={faGithubSquare} size="2x" />
          </a>
        </div>
        <p className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400"><Link to='https://hakeemellis.com/' target='_blank'>
        <b>All rights reserved &copy; 2024 Designed by Hakeem Ellis</b></Link></p>
      </div>
    </footer>
  );
};

export default Footer;