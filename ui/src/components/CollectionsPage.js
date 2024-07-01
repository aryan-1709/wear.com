import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../controllers/CartContext";
import "react-toastify/dist/ReactToastify.css";
import mug from "../images/mug.jpg";
import keychain from "../images/keychain.jpg";
import tshirt from "../images/T-shirt.jpg";
import hoodie from "../images/hoodie.jpg";
import orange from "../images/orange-tshirt.jpeg"
import purple from "../images/purple-tshirt.jpeg"
import pink from "../images/pink tshirt.jpeg"
import green from "../images/green-tshirt.jpeg"

const products = [
  {
    id: 1,
    name: "T-Shirt 1",
    category: "T-Shirts",
    price: 60,
    image: tshirt,
    // images: [tshirt, hoodie, keychain, mug],
    // colors: [tshirt, hoodie, keychain, mug],
    colors: [orange, purple, pink, green],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  { id: 2, name: "Mug 1", category: "Mugs", price: 80, 
  image: mug, 
  // images: [tshirt, hoodie, keychain, mug],
  colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],

},
  {
    id: 3,
    name: "Hoodie 1",
    category: "Hoodies",
    price: 70,
    image: hoodie,
    // images: [tshirt, hoodie, keychain, mug],
    colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  {
    id: 4,
    name: "T-Shirt 1",
    category: "T-Shirts",
    price: 90,
    image: tshirt,
    // images: [tshirt, hoodie, keychain, mug],
    // colors: [tshirt, hoodie, keychain, mug],
    colors: [orange, purple, pink, green],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  { id: 5, name: "Mug 1", category: "Mugs", price: 90, image: mug,  colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]], },
  {
    id: 6,
    name: "Hoodie 1",
    category: "Hoodies",
    price: 30,
    image: hoodie,
    colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  {
    id: 7,
    name: "T-Shirt 1",
    category: "T-Shirts",
    price: 20,
    image: tshirt,
    // images: [tshirt, hoodie, keychain, mug],
    // colors: [tshirt, hoodie, keychain, mug],
    colors: [orange, purple, pink, green],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  { id: 8, name: "Mug 1", category: "Mugs", price: 40, image: mug,
  //  images: [tshirt, hoodie, keychain, mug], 
   colors: [tshirt, hoodie, keychain, mug],
   color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  {
    id: 9,
    name: "Hoodie 1",
    category: "Hoodies",
    price: 30,
    image: hoodie,
    // images: [tshirt, hoodie, keychain, mug],
    colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  {
    id: 10,
    name: "T-Shirt 1",
    category: "T-Shirts",
    price: 20,
    image: tshirt,
    // images: [tshirt, hoodie, keychain, mug],
    // colors: [tshirt, hoodie, keychain, mug],
    colors: [orange, purple, pink, green],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  { id: 11, name: "Mug 1", category: "Mugs", price: 110, image: mug,
  //  images: [tshirt, hoodie, keychain, mug],
  colors: [tshirt, hoodie, keychain, mug],
  color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],   
},
  {
    id: 12,
    name: "Hoodie 1",
    category: "Hoodies",
    price: 30,
    image: hoodie,
    // images: [tshirt, hoodie, keychain, mug],
    colors: [tshirt, hoodie, keychain, mug],
    color_list:[[ keychain, hoodie, mug, tshirt], [tshirt, keychain, mug, hoodie], [hoodie, tshirt, mug, keychain], [tshirt, hoodie, keychain, mug]],
  },
  // Add more products
];

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

  useEffect(() => {
    setSelectedCategory(msg);
  }, [msg]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product.id);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 500); // Hide the message after 0.5 seconds
  };

  const handleDescription = (item) => {
    navigate("/description", { state: { item: item } });
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="flex min-h-screen mb-5">
      <aside className="w-1/4 p-4 bg-gray-100 sticky top-16 h-screen">
        <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-2">
              <button
                className={`w-full text-left p-2 ${
                  selectedCategory === category ? "bg-gray-300" : "bg-white"
                } hover:bg-gray-200 rounded`}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className={`bg-white rounded-lg shadow-md group hover:cursor-pointer `} 
            >
              <div className="transform transition-transform duration-500 group-hover:-translate-y-5">
                <img
                  onClick={() => handleDescription(product)}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="mt-2">₹{product.price}</p>
                  <div className="flex content-center items-center space-x-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 px-2 py-2 bg-gray-700 text-white rounded-md w-32 text-center"
                    >
                      <span className="truncate">
                        {showMessage && addedItem === product.id
                          ? "Added to cart"
                          : "Add to Cart"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 px-2 py-2 bg-gray-700 text-white rounded-md w-32 text-center"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollectionsPage;
