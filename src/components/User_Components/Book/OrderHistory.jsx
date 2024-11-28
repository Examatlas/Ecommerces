import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../User_Components/Config";


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const fetchShiprocketToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shiprocket/token`);
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        throw new Error("Failed to fetch token.");
      }
    } catch (err) {
      console.error("Error fetching token:", err.message);
      setError("Failed to fetch token.");
    }
  };

  useEffect(() => {
    fetchShiprocketToken();

    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_userId");

        if (!userId) {
          throw new Error("User ID not found in local storage.");
        }

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

  const handleShiprocketOrder = async (order) => {
    try {
      if (!token) {
        throw new Error("Shiprocket token is missing.");
      }

      const orderPayload = {
        order_id: order._id,
        order_date: new Date().toISOString().split("T")[0],
        pickup_location: "Primary",
        channel_id: "5793038",
        comment: "Please handle with care",
        reseller_name: "Best Reseller",
        company_name: "CROWN PUBLICATIONS",
        billing_customer_name: `${order.billingDetail.firstName} `,
        billing_last_name: order.billingDetail.lastName || "",
        billing_address: order.billingDetail.streetAddress,
        billing_address_2: order.billingDetail.address2 || "",
        billing_isd_code: "+91",
        billing_city: order.billingDetail.city,
        billing_pincode: order.billingDetail.pinCode,
        billing_state: order.billingDetail.state,
        billing_country: order.billingDetail.country,
        billing_email: order.billingDetail.email,
        billing_phone: order.billingDetail.phone,
        billing_alternate_phone: order.billingDetail.alternatePhone || "",
        shipping_is_billing: true,
        shipping_customer_name: `${order.billingDetail.firstName}`,
        shipping_last_name: order.billingDetail.lastName || "",
        shipping_address: order.billingDetail.streetAddress,
        shipping_address_2: order.billingDetail.address2 || "",
        shipping_city: order.billingDetail.city,
        shipping_pincode: order.billingDetail.pinCode,
        shipping_state: order.billingDetail.state,
        shipping_country: order.billingDetail.country,
        shipping_email: order.billingDetail.email,
        shipping_phone: order.billingDetail.phone,
        order_items: order.items.map((item) => ({
          name: item.bookId.title,
          sku: item.bookId.sku || "DEFAULT_SKU2396786dfgdfgdfjmfghfgh50",
          units: item.quantity,
          selling_price: item.bookId.sellPrice,
          discount: 0,
          tax: 0,
          hsn: item.bookId.hsn || "",
        })),
        payment_method:
          order.paymentMethod.toLowerCase() === "cod" ? "COD" : "RAZORPAY",
        shipping_charges: 50,
        total_discount: 20,
        sub_total: order.totalAmount,
        length: 30,
        breadth: 20,
        height: 5,
        weight: 1.5,
        ewaybill_no: "",
        customer_gstin: "",
        invoice_number: `INV${order._id}`,
        order_type: "NON ESSENTIALS",
      };

      const orderResponse = await axios.post(
        `${API_BASE_URL}/shiprocket/order`,
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order response:", orderResponse.data);

      if (orderResponse.data.success) {
        const { orderId } = orderResponse.data;
        const { orderId: orderIdValue, shipmentId } = orderId;

        console.log("Order ID:", orderIdValue);
        console.log("Shipment ID:", shipmentId);

        if (orderIdValue && shipmentId) {
          const awbResponse = await axios.post(
            `${API_BASE_URL}/shiprocket/awb`,
            {
              order_id: orderIdValue,
              shipment_id: shipmentId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("AWB response:", awbResponse.data);

          alert(`Order processed successfully! AWB: ${awbResponse.data.awbCode}`);
        } else {
          throw new Error("Failed to retrieve orderId or shipmentId.");
        }
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (error) {
      console.error("Error processing order with Shiprocket:", error.message);
   
    }
  };

  const handleSchedulePickup = async (orderId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shiprocket/pickup`, {
        orderId,
      });
      if (response.data.success) {
        alert("Pickup scheduled successfully!");
      } else {
        throw new Error("Failed to schedule pickup.");
      }
    } catch (error) {
      console.error("Error scheduling pickup:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-[200px] mb-[200px] text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mb-[200px]">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-[100px]">
        Your Order History
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div className="w-full md:w-2/3 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="text-green-700 font-bold">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                </div>
                <div className="p-4 rounded-md shadow-md w-full md:w-1/3 text-sm text-left">
                  <h4 className="text-lg font-semibold mb-2">Shipping To:</h4>
                  <p>
                    <strong>Name:</strong> {order.billingDetail.firstName}{" "}
                    {order.billingDetail.lastName}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.billingDetail.streetAddress}
                    , {order.billingDetail.city}
                  </p>
                  <p>
                    <strong>State:</strong> {order.billingDetail.state}{" "}
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
              </div>

              <h4 className="text-lg font-semibold mb-2">Items:</h4>
              <div className="flex flex-col space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row items-start">
                     
                      <div>
                        <h5 className="text-lg font-medium">
                          {item.bookId.title}
                        </h5>
                        <p className="text-gray-600">
                          Price: ₹{item.bookId.sellPrice}
                        </p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 justify-start">
                <button
                  onClick={() => handleShiprocketOrder(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg"
                >
                  Process Order
                </button>
                <button
                  onClick={() => handleSchedulePickup(order._id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg"
                >
                  Schedule Pickup
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import API_BASE_URL from "../../User_Components/Config";

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userId = localStorage.getItem('user_userId');

//         if (!userId) {
//           throw new Error('User ID not found in local storage.');
//         }

//         // Send userId as a URL parameter
//         const response = await axios.get(`${API_BASE_URL}/payment/getOrdersByUserId/${userId}`);
//         console.log(response, "Response received");

//         if (response.data.success) {
//           setOrders(response.data.orders);
//           console.log(response.data.orders, "Orders received");
//         } else {
//           throw new Error('Failed to fetch orders.');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-[200px] mb-[200px] text-3xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4 mb-[200px]">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-[100px]">
//         Your Order History
//       </h2>
//       {orders.length === 0 ? (
//         <p className="text-center text-lg text-gray-600">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start mb-4">
//                 <div className="w-full md:w-2/3 mb-4 md:mb-0">
//                   <h3 className="text-xl font-semibold mb-2">
//                     Order ID: {order._id}
//                   </h3>
//                   <p className="text-gray-700 mb-1">
//                     <strong>Total Amount:</strong> ₹{order.totalAmount}
//                   </p>
//                   <p className="text-gray-700 mb-1">
//                     <strong>Status:</strong>{' '}
//                     <span className="text-green-700 font-bold">{order.status}</span>
//                   </p>
//                   <p className="text-gray-700 mb-4">
//                     <strong>Payment Method:</strong> {order.paymentMethod}
//                   </p>
//                 </div>

//                 <div className="p-4 rounded-md shadow-md w-full md:w-1/3 text-sm text-left">
//                   <h4 className="text-lg font-semibold mb-2">Shipping To:</h4>
//                   <p>
//                     <strong>Name:</strong> {order.billingDetail.firstName}{' '}
//                     {order.billingDetail.lastName}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {order.billingDetail.streetAddress},{' '}
//                     {order.billingDetail.city}
//                   </p>
//                   <p>
//                     <strong>State:</strong> {order.billingDetail.state}{' '}
//                     {order.billingDetail.country}
//                   </p>
//                   <p>
//                     <strong>Pin Code:</strong> {order.billingDetail.pinCode}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {order.billingDetail.phone}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {order.billingDetail.email}
//                   </p>
//                 </div>
//               </div>

//               <h4 className="text-lg font-semibold mb-2">Items:</h4>
//               <div className="flex flex-col space-y-4">
//                 {order.items.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
//                   >
//                     <div className="flex flex-col mb-2 sm:mb-0">
//                       <span className="font-semibold">
//                         Title: {item.bookId.title}
//                       </span>
//                       <span>
//                         <strong>Quantity:</strong> {item.quantity}
//                       </span>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span>
//                         <strong>Price:</strong> ₹{item.bookId.price}
//                       </span>
//                       <span>
//                         <strong>Sell Price:</strong> ₹{item.bookId.sellPrice}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;

