import React, { useState, useEffect, useRef } from 'react';
import mug from '../images/mug.jpg'
import keychain from '../images/keychain.jpg'
import tshirt from '../images/T-shirt.jpg'
import hoodie from '../images/hoodie.jpg'

const images = [
  mug,keychain,tshirt,hoodie
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    startSlideShow();

    return () => {
      clearInterval(slideInterval.current);
    };
  }, []);

  const startSlideShow = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const stopSlideShow = () => {
    clearInterval(slideInterval.current);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative w-full h-full bg-gray-800 py-8 mb-3"
      onMouseEnter={stopSlideShow}
      onMouseLeave={startSlideShow}
    >
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
        />
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Customized Designs
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Create your own happiness
        </p>
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={prevSlide}
      >
        &#9664;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={nextSlide}
      >
        &#9654;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
