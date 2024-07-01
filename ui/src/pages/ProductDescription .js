import React, { useState } from "react";
// import mug from "../images/mug.jpg";
// import keychain from "../images/keychain.jpg";
// import tshirt from "../images/T-shirt.jpg";
// import hoodie from "../images/hoodie.jpg";
import { useLocation } from "react-router-dom";
import { useCart } from "../controllers/CartContext";

const ProductDescription = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const { item } = location.state;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedcolor] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  console.log(item);
  const product = {
    name: item.name,
    description: "A stylish and comfo rtable t-shirt perfect for casual wear.",
    price: item.price,
    colors: item.colors,
    color_list: item.color_list,
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: [],
  };
  const [images, setImages] = useState(product.color_list[0]);
  const setSelectedColor = (index) => {
    setImages(product.color_list[index]);
    setSelectedcolor(index);
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleBuyNow = () => {
    // Buy now functionality
  };

  const handleReviewSubmit = () => {
    setReviews([...reviews, review]);
    setReview("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <img
            src={images[selectedImage]}
            alt="Product"
            className="w-[550px] h-[550px] rounded-lg"
          />
          <div className="flex mt-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 rounded-lg cursor-pointer mx-1 ${
                  selectedImage === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-800 my-4">₹{product.price}</p>
          <p>{product.description}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Sizes</h2>
            <div className="flex mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg mx-1 ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Colors</h2>
            <div className="flex mt-2">
              {product.colors.map((color, index) => (
                <img
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`px-0.5 py-0.5 rounded-lg mx-1 h-[40px] w-[40px] ${
                    selectedColor === index
                      ? "border-2 border-blue-500"
                      : "border-none"
                  }`}
                  src={color}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg mr-2"
            //   TODO ? set the color of the imge and sent to cart
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 py-2">
              <p>{review}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
