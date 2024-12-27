import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/userContext";
import { useCart } from "../Contexts/CartContext";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import hoodie from "../images/hoodie.png";
import UserProfileDrawer from "./UserProfile/UserProfileDrawer";

const Navbar = () => {
  const { userInfo, setuserInfo } = useContext(UserContext);
  const { cart } = useCart();
  const [logged, setLogged] = useState("Login/Signup");
  const [des, setDes] = useState("/login");
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const navbarItems = [
    "T-Shirts",
    "Mugs",
    "Hoodies",
    "Keychains",
    "Pillows",
    "Caps",
    "All",
  ];

  const buttonItems = [
    { name: "Home", des: "/" },
    { name: "Products", des: "/" },
    { name: "About", des: "/aboutus" },
    { name: "Contact Us", des: "/support" },
    { name: "Policies", des: '/policies'},
    { 
      name: "Cart",
      icon: <ShoppingCart className="w-5 h-5" />,
      badge: numberOfItems,
      des: "/cart"
    },
    { name: "Profile", icon: <User className="w-5 h-5" /> },
    { name: "Your Orders", des: "/orders" },
    { name: logged, color: true, des: `${des}` },
  ];

  useEffect(() => {
    if (userInfo) {
      setLogged("Logout");
      setDes("/logout");
    }
  }, [userInfo]);

  useEffect(() => {
    setNumberOfItems(cart.length);
  }, [cart]);

  useEffect(() => {
    if (searchQuery) {
      const results = navbarItems.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery]);

  const handleOnclick = (path, item) => {
    if (path === "/logout") {
      setuserInfo(null);
      setLogged("Login/Signup");
      setDes("/login");
      navigate("/");
    } else {
      navigate(path, { state: { msg: item } });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (item) => {
    setSearchQuery("");
    setIsSearchActive(false);
    navigate("/collections", { state: { msg: item } });
  };

  return (
    <div>
      {/* Main Navbar */}
      <nav className="fixed top-0 z-20 w-full bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mr-4"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto cursor-pointer"
                src={hoodie}
                alt="Store Logo"
                onClick={() => handleOnclick("/")}
              />
            </div>

            {/* Search bar */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {searchQuery && (
                  <div className="absolute mt-1 bg-white rounded-md shadow-lg">
                    {filteredItems.length > 0 ? (
                      <ul className="max-h-60 rounded-md py-1 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                        {filteredItems.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleSearch(item)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-700">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden min-[1005px]:flex items-center ml-6 space-x-4">
              {buttonItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.des ? handleOnclick(item.des) : toggleDrawer();
                  }}
                  className={`
                    inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${item.color
                      ? 'bg-blue-500 text-white hover:bg-blue-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                    transition duration-150 ease-in-out
                  `}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.name}
                  {item.badge > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block w-[300px]' : 'hidden'} `}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {buttonItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.des ? handleOnclick(item.des) : toggleDrawer();
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.name}
                  {item.badge > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="pt-16 bg-gray-700 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 h-12">
            {navbarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearch(item)}
                className="text-gray-300 whitespace-nowrap hover:bg-gray-600 hover:text-white px-3 py-2 my-1 rounded-md text-sm font-semibold transition duration-150 ease-in-out"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile Drawer */}
      {open && <UserProfileDrawer open={open} toggleDrawer={toggleDrawer} />}
    </div>
  );
};

export default Navbar;