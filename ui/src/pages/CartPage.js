import React from "react";
import { useCart } from "../Contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
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
                  <div className="flex items-center">
                    <img
                      src={item.products.listImages[0][0]}
                      alt={item.products.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">
                        {item.products.name}
                      </h3>
                      <p className="text-gray-500">₹{item.products.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.products)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-bold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
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
