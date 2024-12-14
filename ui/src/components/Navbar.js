import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/userContext";
import { useCart } from "../Contexts/CartContext";
import hoodie from "../images/hoodie.png";

const Navbar = () => {
  const {userInfo, setuserInfo} = useContext(UserContext);
  const { cart } = useCart();
  const [logged, setLogged] = useState("Login/Signup");
  const [des, setdes] = useState("/login")
  const [numberOfItems, setNumberOfItems] = useState(0)

  useEffect(() => {
    if(userInfo){
      setLogged("Logout");
      setdes("/logout");
    }
  }, [userInfo])

  useEffect(() => {
    const numberOfItems = cart.length;
    setNumberOfItems(numberOfItems)

  },[cart])
  

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
  let buttonItems = [
    { name: "Home", des: "/" },
    { name: "Products", des: "/" },
    { name: "About", des: "/" },
    { name: "Contact Us", des: "/support" },
    { name: `<${numberOfItems}>`, icon: true, des: "/cart" },
    { name: logged, color: true, des: `${des}` },
  ];

  const handleOnclick = (path, item) => {
    if(path === "/logout"){
      setuserInfo();
      setLogged("Login/Signup");
      setdes("/login");
      navigate("/");
    } else
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
                  src={hoodie}
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
                  onClick={() => {
                    handleOnclick(item.des);
                  }}
                  key={index}
                  className={`text-gray-300 ${
                    item.color ? `bg-blue-500 hover:bg-blue-400` : null
                  } hover:text-white px-3 py-2 hover:bg-gray-700 rounded-md text-sm font-medium flex items-center`}
                >
                  {item.name}
                  {item.icon && (
                    <div className="pt-1 flex align-bottom">
                      <i className="fas fa-shopping-cart ml-2"></i>
                    </div>
                  )}
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
