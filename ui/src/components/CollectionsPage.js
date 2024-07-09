import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../controllers/getProducts";

const categories = [
  "All",
  "T-Shirts",
  "Mugs",
  "Hoodies",
  "Keychains",
  "Pillows",
  "Caps",
];

const datas = await getProducts();

const CollectionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { msg = "All" } = location.state || {};
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setproducts] = useState([]);



  useEffect(() => {
    if(datas.error){
      navigate("/serverError");
    } else
    setproducts(datas.data);
  }, [products, navigate]);

  useEffect(() => {
    setSelectedCategory(msg);
  }, [msg]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product._id);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 500);
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
                onClick={() => setSelectedCategory(category)}
              >
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
              key={product._id}
              id={`product-${product._id}`}
              className={`bg-white rounded-lg shadow-md group hover:cursor-pointer `}
            >
              <div className="transform transition-transform duration-500 group-hover:-translate-y-5">
                <img
                  loading="lazy"
                  onClick={() => handleDescription(product)}
                  src={product.listImages[0][0]}
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
                        {showMessage && addedItem === product._id
                          ? "Added to cart"
                          : "Add to Cart"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 px-2 py-2 bg-gray-700 text-white rounded-md w-32 text-center"
                    ><span className="truncate">
                    {"Buy Now"}
                  </span>
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
