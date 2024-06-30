import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const items = [
    "T-Shirts",
    "Mugs",
    "Hoodies",
    "Keychains",
    "Pillows",
    "Caps",
    "All",
  ];
  const buttonItems = [
    { name: "Home", des: '/' },
    { name: "Products", des: '/' },
    { name: "About", des: '/' },
    { name: "Contact", des: '/'},
    {name: '<>', icon: true, des: '/cart' }
  ];
  const handleOnclick = (path, item) => {
    navigate(path, { state: { msg: item } });
  };

  return (
    <div>
      <nav className="fixed top-0 z-10 w-full bg-gray-800">
        <div className="top-0 z-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center justify-start">
              <div
                onClick={() => handleOnclick("/")}
                className="flex-shrink-0 hover:cursor-pointer"
              >
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <input
                type="text"
                className="w-full max-w-md px-4 py-2 rounded-md text-gray-900"
                placeholder="Search for products"
              />
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-end space-x-4">
              {buttonItems.map((item, index) => (
                <button
                  onClick={()=>{handleOnclick(item.des)}}
                  key={index}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.name}
                  {item.icon && <div className="pt-1 flex align-bottom"><i className="fas fa-shopping-cart ml-2"></i></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <nav className="pt-16 z-10 bg-gray-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleOnclick("/collections", item)}
                className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
