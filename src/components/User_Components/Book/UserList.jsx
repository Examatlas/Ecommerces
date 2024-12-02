import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../User_Components/Config";

const UserList = ({ calculateTotal, checkoutHandler }) => {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  const userId = localStorage.getItem("user_userId");

  const fetchAddresses = async (addressType) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/billing/billing/user/${userId}`,
        { params: { addressType } }
      );
      if (addressType === "shipping") {
        setShippingAddresses(response.data);
      } else {
        setBillingAddresses(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error fetching addresses");
    }
  };

  useEffect(() => {
    fetchAddresses("shipping");
    if (!isSameAddress) fetchAddresses("billing");
  }, [isSameAddress]);

  const handleProceedToPayment = () => {
    if (!selectedShippingId) {
      setValidationError("Please select a shipping address to proceed.");
      return;
    }
    if (!isSameAddress && !selectedBillingId) {
      setValidationError("Please select a billing address to proceed.");
      return;
    }
    setValidationError("");
    console.log("Shipping ID:", selectedShippingId);
    console.log("Billing ID:", selectedBillingId || selectedShippingId);
    checkoutHandler(calculateTotal(), selectedShippingId, isSameAddress, selectedBillingId);
  };

  const handleToggleChange = () => {
    setIsSameAddress((prev) => !prev);
    setSelectedBillingId(null); // Reset billing ID when switching
  };

  const handleAddressSelect = (id, type) => {
    if (type === "shipping") {
      setSelectedShippingId(id);
    } else {
      setSelectedBillingId(id);
    }
    setValidationError("");
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-5 max-w-screen-lg">
      <h1 className="text-2xl font-semibold mb-6">Shipping & Billing Address</h1>
      {validationError && <div className="text-red-500 mb-4">{validationError}</div>}

      <div className="flex items-center mb-6">
        <label className="mr-3 text-sm font-medium">Use same address for billing?</label>
        <input
          type="checkbox"
          checked={isSameAddress}
          onChange={handleToggleChange}
          className="toggle-checkbox"
        />
      </div>

      <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
      {shippingAddresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {shippingAddresses.map((address) => (
            <div
              key={address._id}
              className="flex items-center justify-between border p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shippingAddress"
                  value={address._id}
                  checked={selectedShippingId === address._id}
                  onChange={() => handleAddressSelect(address._id, "shipping")}
                  className="mr-3"
                />
                <div className="text-sm">
                  <p className="font-semibold">{`${address.firstName} ${address.lastName}`}</p>
                  <p>{`${address.streetAddress}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Shipping details available!</p>
      )}

      {!isSameAddress && (
        <>
          <h2 className="text-xl font-medium mt-6 mb-4">Billing Address</h2>
          {billingAddresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {billingAddresses.map((address) => (
                <div
                  key={address._id}
                  className="flex items-center justify-between border p-4 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="billingAddress"
                      value={address._id}
                      checked={selectedBillingId === address._id}
                      onChange={() => handleAddressSelect(address._id, "billing")}
                      className="mr-3"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">{`${address.firstName} ${address.lastName}`}</p>
                      <p>{`${address.streetAddress}, ${address.city}, ${address.state}, ${address.pinCode}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No Billing details available!</p>
          )}
        </>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleProceedToPayment}
          className="p-3 bg-blue-500 text-white rounded-lg font-semibold"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default UserList;
