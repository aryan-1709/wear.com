import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10 h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Welcome to <span className="font-semibold">Carbon Copy</span>, your one-stop
          destination for custom merch printing! Our mission is to bring your ideas to life through
          high-quality, personalized apparel and merchandise. Whether you're an artist looking to
          showcase your work, a business building your brand, or someone celebrating a special
          moment, we’re here to help.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">High-Quality Printing</h3>
            <p className="text-gray-600">
              We use state-of-the-art technology to ensure every print is vibrant and durable.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly Materials</h3>
            <p className="text-gray-600">
              We prioritize sustainability with eco-friendly inks and fabrics.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Solutions</h3>
            <p className="text-gray-600">
              From t-shirts to mugs, we offer a wide range of customizable products.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Your custom creations delivered to your doorstep in no time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
