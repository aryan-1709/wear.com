import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/userContext";
import { getOrders } from "../controllers/Orders/getOrders";
import { GridLoader } from "react-spinners";
import { ChevronRight, Package } from "lucide-react";

const Orders = () => {
  const { userInfo } = useContext(UserContext);
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (userInfo?._id) {
      try {
        const allOrders = await getOrders(userInfo._id);
        const groupedOrders = allOrders.reduce((acc, order, index) => {
          const orderNumber = `Order ${index + 1}`;
          acc[orderNumber] = order.products || [];
          return acc;
        }, {});
        setOrders(groupedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    setLoading(false);
  };

  const handleDescription = (product, color, size) => {
    navigate(`/description/${product.id}`, {
      state: { color: color, size: size },
    });
  };

  useEffect(() => {
    fetchOrders();
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <GridLoader size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <Package className="w-8 h-8 mr-3 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Orders</h1>
        </div>

        {Object.keys(orders).length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No orders found.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(orders).map(([orderNumber, products], orderIndex) => (
              <div
                key={orderIndex}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">{orderNumber}</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {products.map((product, productIndex) => (
                    <li
                      key={productIndex}
                      onClick={() => handleDescription(product, product.color, product.size)}
                      className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
                    >
                      <div className="p-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                loading="lazy"
                                src={product.pImg}
                                alt={product.name}
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                                {product.name}
                              </h3>
                              <div className="mt-1 flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                                <p className="flex items-center">
                                  <span className="font-medium mr-1">Size:</span>
                                  {product.size}
                                </p>
                                <p className="flex items-center">
                                  <span className="font-medium mr-1">Color:</span>
                                  {product.color}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0 flex items-center">
                            <span className="text-gray-400">
                              <ChevronRight className="w-5 h-5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;