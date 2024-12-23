import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { GridLoader } from "react-spinners";

const CartPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Prevent multiple submissions
  const { cart, removeFromCart, clearCart, totalPrice, addOrUpdateImage } =
    useCart();

  const handleDescription = (item, color, size) => {
    navigate(`/description/${item._id}`, {
      state: { color: color, size: size },
    });
  };

  if (!cart) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <GridLoader size={60} />
      </div>
    );
  }
  const handleAddImage = async (cartId, event, index) => {
    event.preventDefault();
    if (isUploading) return;
    if (!selectedFile) {
      return alert("Please select an image before submitting.");
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      await addOrUpdateImage({ cartId, formData });
      cart[index].imageToPrint = "some Image"
      setIsUploading(false); 
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false); 
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <div
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      handleDescription(item.products, item.color, item.size);
                    }}
                  >
                    <img
                      loading="lazy"
                      src={item.products.listImages[item.color][0]}
                      alt={item.products.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{item.products.name}</h3>
                      <p className="text-gray-500">₹{item.products.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <form
                      onSubmit={(e) => handleAddImage(item._id, e, index)}
                      className="mr-3"
                    >
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-input"
                        className="px-4 py-2.5 bg-blue-500 text-white rounded-md cursor-pointer focus:outline-none hover:bg-blue-600 mr-1"
                      >
                        {item.imageToPrint !== "#" ? "Change" : "Upload"}
                      </label>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer focus:outline-none hover:bg-green-600"
                        disabled={isUploading} // Disable button during upload
                      >
                        {isUploading ? "Uploading..." : <i className="fas fa-cloud-upload-alt"></i>}
                      </button>
                    </form>
                    <button
                      onClick={() => removeFromCart(item.products)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
              <div>
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => alert("Proceeding to checkout...")}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
