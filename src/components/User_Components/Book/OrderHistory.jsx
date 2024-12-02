import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../User_Components/Config";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsTruck, BsCheckCircle } from "react-icons/bs";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrderProgress, setSelectedOrderProgress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_userId");
        if (!userId) throw new Error("User ID not found in local storage.");
        const response = await axios.get(
          `${API_BASE_URL}/payment/getOrdersByUserId/${userId}`
        );
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          throw new Error("Failed to fetch orders.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  const showOrderProgress = (order) => {
    setSelectedOrderProgress(order);
    setModalVisible(true);
  };

  const hideOrderProgress = () => {
    setModalVisible(false);
    setSelectedOrderProgress(null);
  };

  const renderOrderProgress = (order) => {
    const trackingStages = [
      { status: "Order Placed", timestamp: order.createdAt },
      { status: "Shipped", timestamp: null },
      { status: "Pickup Scheduled", timestamp: null },
      { status: "Picked Up", timestamp: null },
      { status: "In Transit", timestamp: null },
      { status: "Out for Delivery", timestamp: null },
      { status: "Delivered", timestamp: null },
    ];

    return (
      <div>
        <h4 className="text-lg font-semibold mb-4">Order Progress</h4>
        <ul className="space-y-4">
          {trackingStages.map((stage, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 text-sm text-gray-700"
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full ${
                  stage.timestamp ? "bg-green-500" : "bg-gray-300"
                } flex items-center justify-center text-white`}
              >
                {stage.timestamp ? <BsCheckCircle /> : <BsTruck />}
              </div>
              <div>
                <p>{stage.status}</p>
                <p className="text-xs text-gray-500">
                  {stage.timestamp ?new Date(stage.timestamp).toLocaleString() : '--'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-24 text-3xl font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mb-24">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-24">
        Your Order History
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg border border-gray-300"
            >
              {/* Order Header */}
              <div
               onClick={() => toggleOrderDetails(order._id)}
  className="cursor-pointer flex justify-between items-center p-4 hover:bg-gray-100"
>
  {/* Left Side: Order Details */}
  <div>
    <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3>
    <p className="text-sm text-gray-600">
      <strong>Total:</strong> ₹{order.finalAmount} |{" "}
      <strong>Status:</strong>{" "}
      <span className="text-green-700 font-semibold">{order.status}</span>
    </p>
    <p className="text-xs text-gray-500">
      Placed on: {new Date(order.createdAt).toLocaleDateString()}
    </p>
  </div>

  {/* Right Side: Buttons */}
  <div className="flex items-center space-x-4">
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the parent div's click event
        showOrderProgress(order);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
    >
      Track Order
    </button>
    {expandedOrderId === order._id ? (
      <FaChevronUp className="text-gray-500 cursor-pointer" />
    ) : (
      <FaChevronDown className="text-gray-500 cursor-pointer" />
    )}
  </div>
</div>


              {/* Order Details */}
              {expandedOrderId === order._id && (
                <div className="p-4 border-t border-gray-200">
                  <div
                    className={`grid gap-4 ${
                      order.isShippingBillingSame ? "grid-cols-1" : "lg:grid-cols-2"
                    }`}
                  >
                    {/* Shipping Address */}
                    <div className="bg-gray-50 p-4 rounded-md shadow-md">
                      <h4 className="text-lg font-semibold mb-2">Shipping Address:</h4>
                      <p>
                        <strong>Name:</strong> {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {`${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}`}
                      </p>
                      <p>
                        <strong>State:</strong> {order.shippingAddress.state},{" "}
                        {order.shippingAddress.country}
                      </p>
                      <p>
                        <strong>Pin Code:</strong> {order.shippingAddress.pinCode}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.shippingAddress.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.shippingAddress.email}
                      </p>
                    </div>

                    {/* Billing Address */}
                    {!order.isShippingBillingSame && (
                      <div className="bg-gray-50 p-4 rounded-md shadow-md">
                        <h4 className="text-lg font-semibold mb-2">Billing Address:</h4>
                        <p>
                          <strong>Name:</strong> {order.billingAddress.firstName}{" "}
                          {order.billingAddress.lastName}
                        </p>
                        <p>
                          <strong>Address:</strong>{" "}
                          {`${order.billingAddress.streetAddress}, ${order.billingAddress.city}`}
                        </p>
                        <p>
                          <strong>State:</strong> {order.billingAddress.state},{" "}
                          {order.billingAddress.country}
                        </p>
                        <p>
                          <strong>Pin Code:</strong> {order.billingAddress.pinCode}
                        </p>
                        <p>
                          <strong>Phone:</strong> {order.billingAddress.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.billingAddress.email}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Order Items */}
                  <div className="p-4 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">Items</h4>
                  <ul className="divide-y divide-gray-200 mb-4">
                    {order.items.map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.bookId.images?.[0]?.url || "/placeholder.png"}
                            alt={item.bookId.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div>
                            <h5 className="text-sm font-semibold">
                              {item.bookId.title}
                            </h5>
                            <p className="text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold">
                          ₹{item.bookId.sellPrice}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
         {/* Modal */}
         {modalVisible && selectedOrderProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={hideOrderProgress}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            {renderOrderProgress(selectedOrderProgress)}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
