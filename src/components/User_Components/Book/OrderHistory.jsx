import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import API_BASE_URL from "../../User_Components/Config";
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('user_userId');

        if (!userId) {
          throw new Error('User ID not found in local storage.');
        }

        // Send userId as a URL parameter
        const response = await axios.get(`${API_BASE_URL}/payment/getOrdersByUserId/${userId}`);
        console.log(response, "response is this");

        // Check if response contains orders
        if (response.data.success) {
          setOrders(response.data.orders); // Set the fetched orders
          console.log(response.data.orders, "order is this");
        } else {
          throw new Error('Failed to fetch orders.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>; // Show error state
  }

  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-[100px]">Your Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4"> {/* Vertical space between cards */}
          {orders.map(order => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              {/* <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-700 mb-1"><strong>Total Amount:</strong> {order.totalAmount}</p>
              <p className="text-gray-700 mb-1"><strong>Status:</strong><span className='text-green-700 font-bold '> {order.status}</span></p>
              <p className="text-gray-700 mb-4"><strong>Payment Method:</strong> {order.paymentMethod}</p> */}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Status:</strong> <span className="text-green-700 font-bold">{order.status}</span>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                </div>

                {/* Billing Details Section */}
                <div className=" p-4 rounded-md shadow-md w-1/3 text-sm text-left">
                  <h4 className="text-lg font-semibold mb-2">Shipping To : </h4>
                  <p><strong>Name:</strong> {order.billingDetail.firstName} {order.billingDetail.lastName}</p>
                  {/* <p><strong>Country:</strong> {order.billingDetail.country}</p> */}
                  <p><strong>Address:</strong> {order.billingDetail.streetAddress}, {order.billingDetail.city}</p>
                  <p><strong>State:</strong> {order.billingDetail.state}  {order.billingDetail.country}</p>
                  <p><strong>Pin Code:</strong> {order.billingDetail.pinCode}</p>
                  <p><strong>Phone:</strong> {order.billingDetail.phone}</p>
                  <p><strong>Email:</strong> {order.billingDetail.email}</p>
                </div>
              </div>


              <h4 className="text-lg font-semibold mb-2">Items:</h4>
              <div className="flex flex-col space-y-4"> {/* Flexbox for items */}
                {order.items.map(item => (
                  <div key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold">Title: {item.bookId.title}</span>
                      <span><strong>Quantity:</strong> {item.quantity}</span>
                    </div>
                    <div className="flex flex-col items-end ">
                      <span><strong>Price:</strong> {item.bookId.price}</span>
                      <span><strong>Sell Price:</strong> {item.bookId.sellPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
