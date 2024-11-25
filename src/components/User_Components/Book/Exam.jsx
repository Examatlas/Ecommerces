import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../Config';

const Exam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/category/getCategory`); // Replace with your API endpoint
        console.log("API Response:", response.data);
        setCategories(response.data.data || []); // Extract the `data` array
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle left arrow click
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Handle right arrow click
  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.ceil(categories.length / 4) - 1)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Get the slice of categories to display based on the current index
  const visibleCategories = categories.slice(
    currentIndex * 4,
    currentIndex * 4 + 4
  );

  const handleCategoryClick = (categoryName) => {
    navigate(`/books/${categoryName}`);
  };

  return (
    // <div className="relative">
    //   <div className="flex gap-6 p-4 ml-10">
    //     {visibleCategories.map((category) => (
    //       <div
    //         key={category._id}
    //         className="border rounded-lg shadow-md p-4 flex flex-col items-center w-[350px]"
    //         onClick={() => handleCategoryClick(category.categoryName)}
    //       >
           
    //         <h2 className="mt-4 text-xl font-semibold">{category.categoryName}</h2>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Left Arrow */}
    //   <button
    //     onClick={handlePrev}
    //     disabled={currentIndex === 0}
    //     className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
    //       currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
    //     }`}
    //   >
    //     ❮
    //   </button>

    //   {/* Right Arrow */}
    //   <button
    //     onClick={handleNext}
    //     disabled={currentIndex >= Math.ceil(categories.length / 4) - 1}
    //     className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
    //       currentIndex >= Math.ceil(categories.length / 4) - 1
    //         ? 'opacity-50 cursor-not-allowed'
    //         : ''
    //     }`}
    //   >
    //     ❯
    //   </button>
    // </div>

    <div className="relative">
  <div className="flex gap-6 p-4 ml-10 flex-wrap justify-center">
    {visibleCategories.map((category) => (
      <div
        key={category._id}
        className="border rounded-lg shadow-md p-4 flex flex-col items-center w-[350px] sm:w-[250px] lg:w-[350px]"
        onClick={() => handleCategoryClick(category.categoryName)}
      >
        <h2 className="mt-4 text-xl font-semibold">{category.categoryName}</h2>
      </div>
    ))}
  </div>

  {/* Left Arrow */}
  <button
    onClick={handlePrev}
    disabled={currentIndex === 0}
    className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
      currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    ❮
  </button>

  {/* Right Arrow */}
  <button
    onClick={handleNext}
    disabled={currentIndex >= Math.ceil(categories.length / 4) - 1}
    className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
      currentIndex >= Math.ceil(categories.length / 4) - 1
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
  >
    ❯
  </button>
</div>

  );
};

export default Exam;

