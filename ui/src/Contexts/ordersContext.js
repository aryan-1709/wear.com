import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrdersContext = createContext();

export const useCart = () => {
  return useContext(OrdersContext);
};

export const yourOrders = ({ children }) => {
    const [yourOrders, setyourOrders] = useState([])
    
    return (
        <OrdersContext.Provider
          value={{  }}
        >
          {children}
        </OrdersContext.Provider>
      );
}