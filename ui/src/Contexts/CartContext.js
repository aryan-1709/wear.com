import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import {
  cartHandler,
  deleteItem,
  getProducts,
  clearCartItems,
  addOrUpdateImageController
} from "../controllers/Cart/cartHandler";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const setPrevCart = async () => {
      if (userInfo.cart.length !== 0) {
        const items = await getProducts(userInfo.cart);
        if (items.error) {
          navigate("/serverError");
        }
        setCart(items);
      }
    };
    if (userInfo) {
      setPrevCart();
    } else {
      setCart([]);
    }
  }, [userInfo]);

  const addToCart = async ({product, selectedSize, selectedImage, selectedColor}) => {
    if (!userInfo) {
      navigate("/login");
    } else if (!cart.includes(product)) {
      const res = await cartHandler({
        product: product,
        userId: userInfo._id,
        qty: 1,
        size: selectedSize, 
        color: selectedColor
      });
      if (res.error) {
        navigate("/serverError");
      }
      const data = res.data.data;
      setCart((prevCart) => [...prevCart, { products: product, qty: data.qty, color: data.color, size:  data.size, _id:data._id, imageToPrint:data.imageToPrint}]);
    }
  };

  const removeFromCart = async (product) => {
    const res = await deleteItem({
      product: product,
      userId: userInfo._id,
      qty: 1,
    });
    if (res.error) {
      navigate("/serverError");
    }
    setCart((prevCart) => prevCart.filter((item) => item.products !== product));
  };

  const clearCart = async () => {
    const res = await clearCartItems({ userId: userInfo._id });
    if (res.error) {
      navigate("/serverError");
    }
    setCart([]);
  };

  const addOrUpdateImage = async ({cartId, formData}) => {
    const res = await addOrUpdateImageController({userId: userInfo._id, cartId, formData});
    if(res.error) {
      navigate("/serverError");
    }
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.products.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, addOrUpdateImage }}
    >
      {children}
    </CartContext.Provider>
  );
};
