import React, { useState, useEffect , useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import API_BASE_URL from "../../config";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import ex2 from "../images/ex2.png";
import { AuthContext } from "../Auth/AuthContext";
// import api from "../../Components/Api/Api_config"
import API_BASE_URL from "../../User_Components/Config";
// import dotenv from "dotenv";
// dotenv.config()

const BillingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState(null);
  const userId = localStorage.getItem("user_userId");
  const [billingDetailId, setBillingDetailId] = useState(null); // Initialize billingDetailId state

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cart/get/${userId}`);
        setCartItems(response.data.cart?.items || []);
      } catch (error) {
        toast.error("Error fetching cart items.");
      }
    };
    fetchCartItems();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled out
    if (
      formData.firstName &&
      formData.lastName &&
      formData.city &&
      formData.state &&
      formData.pinCode &&
      formData.phone &&
      formData.email
    ) {
      try {
        // Sending the POST request to create billing detail
        const response = await axios.post(
        `${API_BASE_URL}/billing/createBillingDetail`,
          { ...formData, userId } // Sending form data along with userId
        );

        if (response.status === 201) {
          toast.success("Billing details submitted successfully!");

          // Extract billingDetailId from the response
          const billingDetailId = response.data.savedBillingDetail._id;
          setBillingDetailId(billingDetailId); // Store the billingDetailId

          // Optionally reset form after successful submission
          setFormData({
            firstName: "",
            lastName: "",
            country: "India",
            streetAddress: "",
            apartment: "",
            city: "",
            state: "",
            pinCode: "",
            phone: "",
            email: "",
          });
        }
      } catch (error) {
        toast.error("Error submitting billing details.");
        console.error("Error details:", error);
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

 
  const calculateSubtotal = () => {
    return cartItems.reduce((total, { bookId, quantity }) => {
      return total + (bookId?.sellPrice || 0) * quantity;
    }, 0);
  };

  const shippingCharge = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000 ? 0 : subtotal < 1000 ? 100 : 150;
  };

  // Calculate the total including shipping charge
  const calculateTotal = () => {
    return calculateSubtotal() + shippingCharge();
  };

  const subtotal = calculateSubtotal().toFixed(2); // Format subtotal to 2 decimal places
  const shipping = shippingCharge(); // Get shipping charge

  const { user } = useContext(AuthContext);


  // payment gateway
  const checkoutHandler = async (amount) => {
    console.log(billingDetailId)
    const { data: { order } } = await axios.post(`${API_BASE_URL}/payment/checkout`, { amount , cartItems , userId , billingDetailId }); 

    const token = localStorage.getItem('user_token');

 const REACT_APP_RAZORPAY_API_KEY= "rzp_test_Py5aXtaPQ5j9nu"

    const options = {
      key : REACT_APP_RAZORPAY_API_KEY ,
      amount: order.amount,
      currency: "INR",
      name: "ExamAtlas",
      description: "A Book Store",
      image: ex2,
      order_id: order.id,
      callback_url: "http://localhost:5000/api/payment/paymentverification",
      prefill: {
        name: "ExamAtlas",
        email: "crownclassesrnc@gmail.com",
        contact: "6205435760"
      },
      notes: {
        "address": "Ranchi crown publication"
      },
      theme: {
        "color": "#121212"
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <div className="flex flex-col md:flex-row mt-[120px] mx-auto max-w-7xl p-8">
      {/* Billing Form */}
      <div className="md:w-2/3 bg-gray-50 p-6 rounded-lg shadow-md mr-8">
        <h1 className="text-3xl font-semibold mb-6">Shipping Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country / Region *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="India">India</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Street Address *</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="House number and street name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Apartment, suite, unit, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Town / City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">PIN Code *</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-5 rounded-lg hover:bg-blue-700 transition font-semibold p-3"
          >
            Save & Continue
          </button>
        </form>
      </div>

      {/* Order Summary Box */}
      <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Order Summary</h1>

        <div className="mb-4">
          {cartItems.length > 0 ? (
            cartItems
              .filter(({ bookId }) => bookId && bookId.title && bookId.sellPrice) // Ensure valid bookId, title, and price
              .map(({ bookId, quantity }) => (
                <div key={bookId._id} className="flex justify-between mb-2">
                  <span>{bookId.title} (x{quantity})</span>
                  <span>₹{(bookId.sellPrice * quantity).toFixed(2)}</span>
                </div>
              ))
          ) : (
            <div>No items in the cart</div>
          )}
        </div>

        <hr className="my-4" />
        {/* Subtotal */}
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <hr className="my-4" />
      
        <div className="flex justify-between font-semibold">
          <span>Shipping</span>
         <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>
        <hr className="my-4" />
        {/* Total */}
        <div className="flex justify-between font-semibold text-xl">
          <span>Total</span>
     <span>₹{calculateTotal().toFixed(2)}</span>
        </div>

        <UserList calculateTotal={calculateTotal} checkoutHandler={checkoutHandler} setBillingDetailId={setBillingDetailId}/>

      </div>
    </div>
  );
};

export default BillingForm;



