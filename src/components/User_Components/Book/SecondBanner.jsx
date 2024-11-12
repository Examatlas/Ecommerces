import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../Config";

const SecondBanner = () => {
  const [banner, setBanner] = useState(null); // State to store banner data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/banner/getSecondBanner`); // Replace with your actual endpoint
        if (response.data.status) {
          setBanner(response.data.data); // Assuming `data` contains the banner object
        } else {
          setError("Banner not found.");
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
        setError("Error fetching banner data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) return <p>Loading banner...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="banner-container">
      {banner && banner.images && banner.images.length > 0 && (
        <img
          src={banner.images[0].url}
          alt="Banner"
          className="w-full h-auto object-cover"
        />
      )}
    </div>
  );
};

export default SecondBanner;
