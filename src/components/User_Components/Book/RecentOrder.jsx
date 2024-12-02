import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../User_Components/Config";
import axios from "axios";
import { BsTruck, BsCheckCircle } from "react-icons/bs";

const RecentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderProgress, setSelectedOrderProgress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_userId");
        if (!userId) {
          throw new Error("User ID not found in local storage.");
        }

        const response = await api.get(`/payment/getOneOrderByUserId/${userId}`);
        if (response.data.success) {
          setOrders([response.data.order]);
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : 
      (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Order ID: {order?.orderId} ({order?._id})
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Total Amount:</strong> ₹{order.finalAmount}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="text-green-700 font-bold">{order.status}</span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <button
                    onClick={() => showOrderProgress(order)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-5"
                  >
                    Track Order
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-md shadow-md w-full lg:w-1/3 text-sm">
                  <h4 className="text-lg font-semibold mb-2">Shipping To:</h4>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.streetAddress},{" "}
                    {order.shippingAddress.city}
                  </p>
                  <p>
                    <strong>State:</strong> {order.shippingAddress.state}{" "}
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
              </div>

              <h4 className="text-lg font-semibold mb-4">Items:</h4>
              <div className="flex flex-col gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    {/* Image */}
                    <img
                      src={item.bookId.images?.[0]?.url || "/placeholder.png"}
                      alt={item.bookId.title}
                      className="w-16 h-16 object-cover rounded-md border border-gray-300"
                    />

                    {/* Item Details */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.bookId.title}</p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>

                    {/* Pricing Details */}
                    <div className="text-right">
                      <p>
                        <strong>Price:</strong> ₹{item.bookId.price}
                      </p>
                      <p>
                        <strong>Sell Price:</strong> ₹{item.bookId.sellPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Summary */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h4 className="text-lg font-semibold mb-4">Bill Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Sub Total Amount:</span>
                    <span>₹{order?.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges:</span>
                    <span>₹{order?.shippingCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Amount:</span>
                    <span>₹{order?.taxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discounts:</span>
                    <span>-₹{order?.discounts}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{order?.finalAmount}</span>
                </div>
              </div>
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

export default RecentOrder;
