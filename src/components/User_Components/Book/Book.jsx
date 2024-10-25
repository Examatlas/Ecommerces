import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ex3 from "../images/ex3.png";
import Exam from "./Exam";
import API_BASE_URL from "../Config"
import axios from "axios";

const Book = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showEach, setShowEach] = useState(false);

  const userId = localStorage.getItem('user_userId');
  const navigate = useNavigate();

  // Fetch all books, wishlist, and cart
  const fetchAllBooks = async () => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
      const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
      setCategoryData(response?.data?.books || []);

      const storedWishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
      setWishlist(storedWishlist);

      const cartResponse = await axios.get(`${API_BASE_URL}/cart/get/${userId}`);
      setCart(cartResponse.data.cartItems || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleWishlist = async (bookId) => {
    if (!bookId) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist/toggleWishlist`, {
        userId,
        bookId,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setWishlist((prevWishlist) => {
          const isInWishlist = prevWishlist.includes(bookId);
          const updatedWishlist = isInWishlist
            ? prevWishlist.filter((id) => id !== bookId)
            : [...prevWishlist, bookId];

          localStorage.setItem('user_wishlist', JSON.stringify(updatedWishlist));
          return updatedWishlist;
        });
      } else {
        toast.error("Failed to update wishlist. Please try again.");
      }
    } catch (error) {
      console.error("Error in toggleWishlist:", error.response ? error.response.data : error.message);
      toast.error("Error adding/removing item to/from wishlist");
    }
  };

  const addToCart = async (bookId) => {
    if (!bookId) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add`, {
        userId,
        bookId,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setCart((prevCart) => {
          const isInCart = prevCart.includes(bookId);
          const updatedCart = isInCart
            ? prevCart.filter((id) => id !== bookId)
            : [...prevCart, bookId];
          return updatedCart;
        });
      } else {
        toast.error("Failed to update cart. Please try again.");
      }
    } catch (error) {
      console.error("Error in addToCart:", error.response ? error.response.data : error.message);
      toast.error("Error adding/removing item to/from cart");
    }
  };

  // Filter books by selected category
  const filteredBooks = categoryData.filter((dataItem) => {
    return selectedCategory ? dataItem.category === selectedCategory : true;
  });

  const goWishlist = () => {
    navigate("/ecommerce/wishlist");
  };

  const goToCart = () => {
    navigate("/ecommerce/cart");
  };

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  const handleViewEach = () => {
    setShowEach(!showEach)
  }

  const handleBoxClick = (id) => {
    navigate(`/bookdetail/${id}`);  // Navigate to the detail page with the ID
  };

  return (
    <>
    
      {/* Category Filter & Icons */}
      <div className="flex justify-between items-center px-8 mt-[80px]">
    
        {/* Image */}
        <div className="flex-shrink-0">
          <img src={ex3} className="w-[120px] ml-20 h-auto" alt="Example Image" />
        </div>

        {/* Category Dropdown */}
        <div className="flex-grow mx-8">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border-2 border-gray-300 p-3 rounded-lg w-full max-w-[590px] focus:outline-none focus:border-blue-500 ml-[500px] "
          >
            <option value="">Select Category</option>
            {Array.from(new Set(categoryData.map((book) => book.category))).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Icons for Cart and Wishlist */}
        <div className="flex items-center space-x-4 mr-12">
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 cursor-pointer">
            <FaShoppingCart className="text-xl text-gray-500" onClick={goToCart} />
          </div>
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 cursor-pointer">
            <FaHeart className="text-xl text-gray-500" onClick={goWishlist} />
          </div>
        </div>
      </div>

      
      {/* banner */}
      <div>
        <img src="" className="border border-gray-500 mt-1 w-[1450px] h-[300px] m-5 ml-16" />
      </div>


      {/* top exam category */}
      <div className="ml-16">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Top Exam Category</h1>
          {categoryData.length > 5 && (
            <button
              onClick={handleViewAll}
              className="mt-0 mr-20 p-2 font-bold text-xl rounded"
            >
              {showAll ? 'Show Less' : 'View All '}
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-5 mt-7 mr-14 mb-10">
          {categoryData.length > 0 ? (
            (showAll ? categoryData : categoryData.slice(0, 6)).map((dataItem) => (
              <div key={dataItem._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 border"
               onClick={() => handleBoxClick(dataItem._id)}>
                <div className="h-48 mb-4 flex justify-center items-center bg-gray-200">
                  <img
                    src={dataItem.imageUrl || "https://via.placeholder.com/150"}
                    alt={dataItem.title}
                    className="object-contain h-full"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">{dataItem.title}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No exam categories available.</p>
          )}
        </div>
      </div>


      {/* Display filtered books */}
      <div className="flex justify-between items-center">
        <h1 className="ml-16 font-semibold text-3xl mb-10">Books for all competitive Exams!
        </h1>
        {filteredBooks.length > 4 && (
          <button
            onClick={handleViewEach}
            className="mt-0 mr-20 p-2 font-bold text-xl rounded"
          >
            {showEach ? 'Show Less' : 'View All '}
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredBooks.length > 0 ? (
          // (showAll ? categoryData : categoryData.slice(0, 6)).map((dataItem) => (
          (showEach ? filteredBooks : filteredBooks.slice(0, 8)).map((dataItem) => (
            <div key={dataItem._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 border relative w-[350px] mb-10"
>
              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(dataItem._id)}
                className={`absolute top-2 right-2 w-7 h-7 mt-4 m-3 flex items-center justify-center rounded-full border-2 ${wishlist.includes(dataItem._id) ? "bg-red-500 border-red-500" : "bg-gray-200 border-gray-300"} transition duration-200`}
              >
                <FaHeart className={`text-md ${wishlist.includes(dataItem._id) ? "text-white" : "text-gray-500"}`} />
              </button>

              {/* Image Section */}
              <div className="h-48 mb-4 flex justify-center items-center bg-gray-200" >
                <img
                  src={dataItem.imageUrl || "https://via.placeholder.com/150"}
                  alt={dataItem.title}
                  className="object-contain h-full"
                />
              </div>

              {/* Book Details */}
              <div className="px-6 py-4" onClick={() => handleBoxClick(dataItem._id)}>
                <div className="font-bold text-xl mb-2">{dataItem.title}</div>
                <p className="text-gray-700 text-base"><strong>Author:</strong> {dataItem.author}</p>
                {/* <p className="text-gray-700 text-base"><strong>Category:</strong> {dataItem.category}</p> */}
                <p className="text-gray-700 text-base"><strong>Keyword:</strong> {dataItem.keyword}</p>
                
                <p className="text-gray-700 text-base">
                  <strong>MRP:</strong> &#x20B9;{dataItem.sellPrice} &nbsp;
                  <strike>&#x20B9;{dataItem.price}</strike>
                  {/* Calculate Discount Percentage */}
                  {dataItem.price > 0 && (
                    <span className="text-green-600 ml-2">
                      ({Math.round(((dataItem.price - dataItem.sellPrice) / dataItem.price) * 100)}% OFF)
                    </span>
                  )}
                </p>

                {dataItem.tags && dataItem.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap mt-2">
                      {dataItem.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="px-6 py-4 flex justify-center">
                <button
                  onClick={() => addToCart(dataItem._id)}
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold w-[300px]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No books available for this category.</p>
        )}
      </div>

      {/* banner */}
      <div>
        <img src="" className="border border-gray-500 mt-1 w-[1470px] h-[300px] m-5 ml-14" />
      </div>


      {/* top exam preparation */}
      <div>
        <h1 className="ml-14 mt-10 font-bold text-3xl ">Top Exam Preparation</h1>
        <Exam />
      </div>

      {/* banner */}
      <div>
        <img src="" className="border border-gray-500  w-[1470px] h-[300px] m-5 ml-14 mt-10" />
      </div>


    </>
  );
};

export default Book;

