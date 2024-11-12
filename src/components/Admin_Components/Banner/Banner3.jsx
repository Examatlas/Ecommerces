import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Assuming you want to use react-hot-toast for notifications
import DashboardLayoutBasic from "../DashboardLayoutBasic";
import API_BASE_URL from "../Config";

const Banner3 = () => {
  const [image, setImage] = useState(null); // State for the uploaded image
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/banner/createThirdBanner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        toast.success("Banner created successfully!");
      } else {
        toast.error(response.data.message || "Error creating banner.");
      }
    } catch (error) {
      console.error("Error creating banner:", error);
      toast.error("Server error occurred while creating the banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayoutBasic>
      <div className="container mx-auto mt-5">
        <h2 className="text-2xl font-bold mb-4">Create Third Banner</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload Banner Image
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-1/2 text-sm  text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mx-auto"
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2 text-white ${loading ? "bg-gray-500" : "bg-blue-500"} rounded-md`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Banner"}
          </button>
        </form>
      </div>
    </DashboardLayoutBasic>
  );
};

export default Banner3;
