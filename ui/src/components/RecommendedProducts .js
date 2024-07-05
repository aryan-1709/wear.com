import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../controllers/getProducts";

const items = await getProducts();

const RecommendedProducts = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState([]);
  const [products, setproduct] = useState([]);
  useEffect(() => {
    setproduct(items.data);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const visibleItems = products
        .map((product) => {
          const el = document.getElementById(`product-${product.id}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const threshold = windowHeight - el.offsetHeight * 0.45;
            return rect.top <= threshold;
          }
          return false;
        })
        .map((isVisible, index) => (isVisible ? index : -1))
        .filter((index) => index !== -1);
      setVisibleItems(visibleItems);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products]);

  const handleOnclick = (msg) => {
    navigate("/collections", { state: { msg: msg } });
  };

  return (
    <section className="py-4 px-4 bg-gray-100 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              onClick={() => handleOnclick(product.category)}
              key={index}
              id={`product-${product.id}`}
              className={`bg-white rounded-2xl shadow-md overflow-hidden  hover:cursor-pointer hover:translate-y-0 ${
                visibleItems.includes(index)
                  ? "transition-all duration-500 transform translate-y-4 opacity-100"
                  : "opacity-50 transform translate-y-20"
              }`}
              style={{
                transitionProperty: "transform, opacity",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={product.listImages[0]}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
              <div>{product.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
