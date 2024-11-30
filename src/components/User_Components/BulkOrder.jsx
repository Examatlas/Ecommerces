import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "./Config";
import api from "../User_Components/Api";

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    personName: "",
    location: "",
    city: "",
    state: "",
    contactNumber: "",
    email: "",
    message:""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const {
      storeName,
      personName,
      location,
      city,
      state,
      contactNumber,
      email,
      message
    } = formData;

    if (
      !storeName ||
      !personName ||
      !location ||
      !city ||
      !state ||
      !contactNumber ||
      !email ||
      !message
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/bulkorder/createBulkOrder`, formData);
      toast.success(response.data.message);
      setFormData({
        storeName: "",
        personName: "",
        location: "",
        city: "",
        state: "",
        contactNumber: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto  mb-20 p-8 border border-gray-200 rounded-sm shadow-lg bg-white mt-[120px]">
      <h2 className="text-2xl font-bold mb-6 text-center ">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="storeName">
            Store Name
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="personName">
            Person Name
          </label>
          <input
            type="text"
            id="personName"
            name="personName"
            value={formData.personName}
            onChange={handleChange}
            className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="location">
            Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="message">
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
     
    </div>
  );
};

export default BulkOrder;
