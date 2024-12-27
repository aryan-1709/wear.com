import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { Button } from "@headlessui/react";
import { Menu, SlidersHorizontal, Filter } from "lucide-react";
import { Slider } from "@radix-ui/react-slider";
import { getProducts } from "../controllers/Products/getProducts";

const categories = [
  "All",
  "T-Shirts",
  "Mugs",
  "Hoodies",
  "Keychains",
  "Pillows",
  "Caps",
];

const CollectionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { msg = "All" } = location.state || {};
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await getProducts();
        if (datas.error) {
          navigate("/serverError");
        } else {
          setProducts(datas.data);
        }
      } catch (error) {
        navigate("/serverError");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    setSelectedCategory(msg);
  }, [msg]);

  // Click outside handler for panels
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sort-panel') && !event.target.closest('.sort-button')) {
        setIsSortPanelOpen(false);
      }
      if (!event.target.closest('.filter-panel') && !event.target.closest('.filter-button')) {
        setIsFilterPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product._id);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 500);
  };

  const handleDescription = (item) => {
    navigate(`/description/${item._id}`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const sortProducts = (productsToSort) => {
    switch (sortBy) {
      case "priceLowToHigh":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "nameAZ":
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "nameZA":
        return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return productsToSort;
    }
  };

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    })
  );

  return (
    <div className="min-h-screen">
      {/* Top Control Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 filter-button"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </Button>
            <Button
              onClick={() => setIsSortPanelOpen(!isSortPanelOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 sort-button"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Sort</span>
            </Button>
          </div>
          <div className="text-gray-600">
            {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Sort Panel */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 filter-panel ${
        isSortPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-4">Sort By</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleSort('default')}
              className={`w-full text-left p-2 rounded ${sortBy === 'default' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Default
            </button>
            <button
              onClick={() => handleSort('priceLowToHigh')}
              className={`w-full text-left p-2 rounded ${sortBy === 'priceLowToHigh' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort('priceHighToLow')}
              className={`w-full text-left p-2 rounded ${sortBy === 'priceHighToLow' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleSort('nameAZ')}
              className={`w-full text-left p-2 rounded ${sortBy === 'nameAZ' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Name: A to Z
            </button>
            <button
              onClick={() => handleSort('nameZA')}
              className={`w-full text-left p-2 rounded ${sortBy === 'nameZA' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Name: Z to A
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 filter-panel ${
        isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-4">Filters</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Price Range</h4>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={5000}
                step={100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-10 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md group hover:shadow-xl transition-shadow duration-300 hover:cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    loading="lazy"
                    onClick={() => handleDescription(product)}
                    src={product.listImages[0][0]}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold truncate">{product.name}</h3>
                  <p className="mt-2 text-lg font-semibold">₹{product.price}</p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 p-2 rounded ${
                        showMessage && addedItem === product._id
                          ? "bg-gray-300"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {showMessage && addedItem === product._id
                        ? "Added!"
                        : "Add to Cart"}
                    </Button>
                    <Button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 p-2 rounded border border-gray-800 hover:bg-gray-100"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CollectionsPage;