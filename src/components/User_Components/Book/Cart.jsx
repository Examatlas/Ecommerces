import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../../config";
// import api from "../../Components/Api/Api_config"
import API_BASE_URL from "../../User_Components/Config";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('user_userId');
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      console.log("Fetching cart items...");
      const response = await axios.get(`${API_BASE_URL}/cart/get/${userId}`);
      console.log("Cart items response:", response.data);
      const itemsInCart = response.data.cart?.items || [];
      setCartItems(itemsInCart);
    } catch (error) {
      toast.error("Error fetching cart items.");
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/remove`, {
        data: {
          userId,
          itemId,
        },
      });

      if (response.status === 200) {
        await fetchCartItems();
        toast.success("Item removed from cart.");
      }
    } catch (error) {
      toast.error("Error removing item from cart.");
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/cart/update`, {
        userId,
        itemId,
        quantity: newQuantity,
      });

      if (response.status === 200) {
        await fetchCartItems(); // Fetch updated cart items
        toast.success("Cart updated successfully.");
      }
    } catch (error) {
      toast.error("Error updating cart quantity.");
      console.error("Error updating cart quantity:", error);
    }
  };

  const incrementQuantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity + 1);
  };

  const decrementQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      updateQuantity(itemId, quantity - 1);
    }
  };

  // Calculate subtotal based on cart items
  const calculateSubtotal = () => {
    return cartItems.reduce((total, { bookId, quantity }) => {
      return total + ((bookId?.sellPrice || 0) * quantity);
    }, 0).toFixed(2);
  };

  const goBilling = () => {
    navigate("/billingForm");
  };

  return (
    <div className="mt-[120px] mb-[200px] flex flex-col md:flex-row m-10">
      <div className="flex-grow md:w-1/2 lg:w-2/3">
        <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map(({ _id: itemId, bookId, quantity }) => (
              bookId ? (
                <div key={itemId} className="flex items-center justify-between bg-white rounded shadow-lg p-4 border">
                  <img
                    src={bookId.imageUrl || "https://via.placeholder.com/100"}
                    alt={bookId.title || "No Title Available"}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className="flex-grow ml-4">
                    <h2 className="text-lg font-bold">{bookId.title || "Untitled Book"}</h2>
                    <p className="text-gray-600">Price: ₹ {bookId.sellPrice?.toFixed(2) || "0.00"}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(itemId, quantity)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 mr-2"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => incrementQuantity(itemId, quantity)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 ml-2"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(itemId)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) :  null // Only render if bookId exists
            ))
          ) : (
            <p className="text-3xl font-mono mt-20">Your cart is empty.</p>
          )}
        </div>
      </div>
      
      <div className="md:w-1/2 lg:w-1/3 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Subtotal</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-[350px] flex flex-col justify-between">
          <ul className="mb-4 text-gray-700">
            {cartItems.map(({ bookId, quantity }) => (
              bookId ? (
                <li key={bookId._id} className="flex justify-between">
                  <span>{bookId.title || "Untitled Book"} (x{quantity})</span>
                  <span> ₹ {(bookId.sellPrice * quantity).toFixed(2)}</span>
                </li>
              ) : null // Only show if bookId exists
            ))}
          </ul>
          <hr className="my-2 border-gray-400" />
          <p className="text-2xl font-semibold text-gray-800">Total: ₹ {calculateSubtotal()}</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300" 
          onClick={goBilling}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
