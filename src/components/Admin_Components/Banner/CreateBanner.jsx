import React, { useState } from "react";
import axios from "axios";
import DashboardLayoutBasic from "../DashboardLayoutBasic";
import API_BASE_URL from "../Config";

const CreateBanner = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 images only.");
      setFiles([]);
    } else {
      setError("");
      setFiles(selectedFiles);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append selected files to formData
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/banner/create-banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        setSuccessMessage(response.data.message);
        setFiles([]); // Reset the files after successful upload
      }
    } catch (error) {
      setError("There was an error uploading the images.");
      console.error("Error uploading banner:", error);
    }
  };

  return (
    <DashboardLayoutBasic>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create First Banner</h2>
        
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Images (Max 5 Images)</label>
            <input
              type="file"
              name="files"
              multiple
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="mt-2 block w-1/2 border border-gray-300 rounded-md mx-auto"
            />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Upload Banner Images
          </button>
        </form>
      </div>
    </DashboardLayoutBasic>
  );
};

export default CreateBanner;
