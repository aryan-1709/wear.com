import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { getProductById } from "../controllers/Products/getSingleProduct";
import { GridLoader } from "react-spinners";
import { Star, ShoppingCart, CreditCard, ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [state, setState] = useState("Add To Cart");
  const [showLightbox, setShowLightbox] = useState(false);

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
      <div className="flex justify-center items-center min-h-screen">
        <GridLoader size={60} />
      </div>
    );
  }

  const handleAddToCart = () => {
    setState("Added to Cart ✓");
    addToCart({
      product: product,
      selectedSize: selectedSize,
      selectedImage: selectedImage,
      selectedColor: selectedColor,
      qty: qty
    });
    setTimeout(() => {
      setState("Add To Cart");
    }, 1500);
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: { products: [{ id: id, qty: qty, color: selectedColor, size: selectedSize }] }
    });
  };

  const handleReviewSubmit = () => {
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview("");
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQty(prev => prev + 1);
    } else if (action === 'decrease' && qty > 1) {
      setQty(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.listImages[selectedColor][selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setShowLightbox(true)}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.listImages[selectedColor].map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden 
                      ${selectedImage === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-2 text-2xl font-bold text-gray-900">₹{product.price}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Colors</h2>
                  <div className="flex gap-2 mt-2">
                    {product.listImages.map((color, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded-lg overflow-hidden 
                          ${selectedColor === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}`}
                        onClick={() => setSelectedColor(index)}
                      >
                        <img
                          src={color[0]}
                          alt={`Color ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-900">Sizes</h2>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`py-2 px-4 text-sm font-medium rounded-md 
                          ${selectedSize === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                        onClick={() => setSelectedSize(index)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium">{qty}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {state}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="prose prose-sm mt-4">
                <h2 className="text-lg font-medium">Product Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 mt-8 p-4 md:p-8">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              <div className="max-w-2xl">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
                <button
                  onClick={handleReviewSubmit}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Submit Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                ) : (
                  reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800">{review}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.listImages[selectedColor][selectedImage]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDescription;