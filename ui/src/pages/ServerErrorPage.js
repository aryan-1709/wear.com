import React from "react";
import { useNavigate } from "react-router-dom";

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">500 - Server Error</h1>
      <p className="mt-4 text-lg text-gray-700">
        Something went wrong on our end. Please try again later.
      </p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  );
};

export default ServerErrorPage;
