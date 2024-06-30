import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 bg-gray-800 text-gray-300 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} T-Shirt Store. All rights reserved.
          </div>
          <div className="space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
