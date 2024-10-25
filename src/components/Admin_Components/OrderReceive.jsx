import React, { useEffect, useState } from 'react';
// import DashboardLayoutBasic from '../DashboardLayoutBasic';
// import api from '../../Api/ApiConfig';
import axios from 'axios';
import API_BASE_URL from '../Admin_Components/Config';

const OrderReceive = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/payment/orders`);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          throw new Error('Failed to fetch orders.');
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
    return (
      // <DashboardLayoutBasic>
        <p className="text-center text-xl font-medium text-gray-500 animate-pulse">
          Loading orders...
        </p>
      // </DashboardLayoutBasic>
    );
  }

  if (error) {
    return (
      // <DashboardLayoutBasic>
        <p className="text-red-500 text-center">Error: {error}</p>
      // </DashboardLayoutBasic>
    );
  }

  return (
    // <DashboardLayoutBasic>
      <div className="w-[1000px] mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Orders Received
        </h2>
        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No orders found.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="flex justify-between items-start mb-4 text-left">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Order ID: {order._id}
                    </h3>
                    <p className="text-gray-700"><strong>Billing ID:</strong> {order.billingDetail._id}</p>
                    <p className="text-gray-700"><strong>Razorpay Order ID:</strong> {order.razorpay_order_id}</p>
                    <p className="text-gray-700"><strong>Razorpay Payment ID:</strong> {order.razorpay_payment_id}</p>
                    <p className="text-gray-700 mb-1">
                      <strong>Total Amount:</strong> ₹{order.totalAmount}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Status:</strong>{' '}
                      <span
                        className={`font-bold ${order.status === 'Delivered'
                            ? 'text-green-700'
                            : 'text-red-700'
                          }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                  </div>

                  {/* Billing Details Section */}
                  {order.billingDetail && (
                    <div className="p-4 rounded-md shadow-md w-1/3 text-sm text-left">
                      <h4 className="text-lg font-semibold mb-2">
                        Shipping To:
                      </h4>
                      <p>
                        <strong>Name:</strong>{' '}
                        {order.billingDetail.firstName}{' '}
                        {order.billingDetail.lastName}
                      </p>
                      <p>
                        <strong>Address:</strong>{' '}
                        {order.billingDetail.streetAddress},{' '}
                        {order.billingDetail.city}
                      </p>
                      <p>
                        <strong>State:</strong> {order.billingDetail.state}{' '}
                        {order.billingDetail.country}
                      </p>
                      <p>
                        <strong>Pin Code:</strong> {order.billingDetail.pinCode}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.billingDetail.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.billingDetail.email}
                      </p>
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-semibold mb-2">Ordered Items</h4>
                <div className="flex flex-col space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          Title: {item.bookId?.title || 'N/A'}
                        </span>
                        <span>
                          <strong>Quantity:</strong> {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span>
                          <strong>Price:</strong> ₹{item.bookId?.price || 'N/A'}
                        </span>
                        <span>
                          <strong>Sell Price:</strong> ₹
                          {item.bookId?.sellPrice || 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    // </DashboardLayoutBasic>
  );
};

export default OrderReceive;
