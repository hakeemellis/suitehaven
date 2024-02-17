import React from 'react';

const Modal = ({ images, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-100 bg-opacity-75 flex justify-center items-center z-50">
      <div className="dark:bg-zinc-950 bg-slate-100 p-4 rounded shadow-lg overflow-auto max-h-full max-w-full">
        <button className="absolute top-0 right-0 m-4 text-white hover:text-gray-700" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image.image.url} alt={`${index}`} className="object-cover w-full h-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
