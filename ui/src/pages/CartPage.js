import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { GridLoader } from "react-spinners";
import { Upload, Minus, Plus, X, ShoppingBag, Trash2 } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingItemId, setUploadingItemId] = useState(null);
  const { cart, removeFromCart, clearCart, totalPrice, addOrUpdateImage, updateQuantity } = useCart();

  // useEffect(() => {
  //   console.log(cart)
  // }, [cart])

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GridLoader size={60} />
      </div>
    );
  }

  
  

  const handleDescription = (item, color, size) => {
    navigate(`/description/${item._id}`, {
      state: { color, size },
    });
  };

  const handleAddImage = async (cartId, event, index) => {
    event.preventDefault();
    if (!selectedFile) {
      return alert("Please select an image before submitting.");
    }
    setIsUploading(true);
    setUploadingItemId(cartId);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const imgUrl = await addOrUpdateImage({ cartId, formData });
      cart[index].imageToPrint = imgUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadingItemId(null);
    }
  };

  const handleQuantityChange = (item, newQty) => {
    if (newQty >= 1) {
      updateQuantity({cartId:item._id, newQuantity:newQty});
    }
  };

  const handleCheckOut = async () => {
    const products = cart.map(item => ({
      id: item.products._id,
      qty: item.qty,
      color: item.color,
      size: item.size,
      imgUrl: item.imageToPrint,
      pImg: item.products.listImages[item.color][0]
    }));
    
    if (products.some(item => item.imgUrl === "#")) {
      alert("Please add images for all items before proceeding");
      return;
    }
    navigate("/checkout", { state: products });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8" />
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
              Clear Cart
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {cart.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
              <button
                onClick={() => navigate("/collections")}
                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <div key={index} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div 
                    className="flex-shrink-0 cursor-pointer group"
                    onClick={() => handleDescription(item.products, item.color, item.size)}
                  >
                    <img
                      loading="lazy"
                      src={item.products.listImages[item.color][0]}
                      alt={item.products.name}
                      className="w-24 h-24 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 
                      className="text-lg font-semibold cursor-pointer hover:text-gray-600"
                      onClick={() => handleDescription(item.products, item.color, item.size)}
                    >
                      {item.products.name}
                    </h3>
                    {/* <p className="text-gray-500 mt-1">Size: {item.size}</p>
                    <p className="text-gray-500">Color: {item.color}</p> */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item, item.qty - 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => handleQuantityChange(item, item.qty + 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold">₹{(item.products.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <form onSubmit={(e) => handleAddImage(item._id, e, index)} className="flex gap-2">
                      <input
                        type="file"
                        id={`file-input-${item._id}`}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor={`file-input-${item._id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {item.imageToPrint !== "#" ? "Change" : "Upload"}
                      </label>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          isUploading && uploadingItemId === item._id
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                        disabled={isUploading && uploadingItemId === item._id}
                      >
                        {isUploading && uploadingItemId === item._id ? (
                          "Uploading..."
                        ) : (
                          "Save"
                        )}
                      </button>
                    </form>
                    <button
                      onClick={() => removeFromCart(item.products)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-gray-600">Total Items: {cart.length}</p>
                    <p className="text-2xl font-bold mt-1">₹{totalPrice.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleCheckOut}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;