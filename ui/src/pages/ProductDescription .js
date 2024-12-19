import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { getProductById } from "../controllers/Products/getSingleProduct";
import { GridLoader } from "react-spinners";
import PreviewImage from "./PreviewImage";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const { id } = useParams(); // Retrieve the _id from the URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [state, setState] = useState("Add To Cart");
  useEffect(() => {
    if (data) {
      setSelectedSize(data.size);
      setSelectedColor(data.color);
    }
  }, [data]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      if (response.error) {
        console.error("error: ", response.error);
      } else {
        setProduct(response.data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <GridLoader size={60} />
      </div>
    );
  }

  const handleAddToCart = () => {
    setState("Added to Cart");
    setTimeout(() => {
      setState("Add To Cart");
    }, 500);
    addToCart({
      product: product,
      selectedSize: selectedSize,
      selectedImage: selectedImage,
      selectedColor: selectedColor,
    });
  };

  const handleBuyNow = async (e) => {
    navigate("/checkout", { state : { products: [{id:id, qty:qty, color:selectedColor, size:selectedSize}] } });
  }

  const handleReviewSubmit = () => {
    setReviews([...reviews, review]);
    setReview("");
  };

  const handlePreview = (images) => {
    console.log("Clicked")
    return(
      <PreviewImage images={images}/>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 ">
          <img
            onClick={()=>handlePreview(product.listImages[selectedColor])}
            loading="lazy"
            src={product.listImages[selectedColor][selectedImage]}
            alt="Product"
            className="w-[550px] h-[550px] rounded-lg border-black border-2 p-5 hover:cursor-pointer"
          />
          <div className="flex mt-4">
            {product.listImages[selectedColor].map((image, index) => (
              <img
                loading="lazy"
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
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg mx-1 ${
                    selectedSize === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(index)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Colors</h2>
            <div className="flex mt-2">
              {product.listImages.map((color, index) => (
                <img
                  loading="lazy"
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`px-0.5 py-0.5 rounded-lg mx-1 h-[40px] w-[40px] ${
                    selectedColor === index
                      ? "border-2 border-blue-500"
                      : "border-none"
                  }`}
                  src={color[0]}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg mr-2"
              onClick={handleAddToCart}
            >
              {state}
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg mr-2"
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
