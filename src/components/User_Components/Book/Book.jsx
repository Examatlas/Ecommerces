import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ex3 from "../images/ex3.png";
import Exam from "./Exam";
import API_BASE_URL from "../Config"
import axios from "axios";
import Banner from "./Banner";
import logos from "../images/logos.png";
import pic6 from "../images/pic6.png";
import pic3 from "../images/pic3.png";
import SecondBanner from "./SecondBanner";
import ThirdBanner from "./ThirdBanner";
import api from "../../User_Components/Api";

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
      const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
      // setCategoryData(response?.data?.books || []);
      setCategoryData(response?.data.data || []);

      const storedWishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
      setWishlist(storedWishlist);

      const cartResponse = await api.get(`/cart/get/${userId}`);
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


// for wishlist
  const toggleWishlist = async (bookId) => {
    if (!bookId) return;

    try {
      const response = await api.post(`/wishlist/toggleWishlist`, {
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
      toast.error("Please Login first !!");
    }
  };

  const addToCart = async (bookId) => {
    if (!bookId) return;

    try {
      const response = await api.post(`/cart/add`, {
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
      // toast.error("Error adding/removing item to/from cart");
      toast.error("Please Login first !!");
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
    navigate(`/bookdetail/${id}`);
  };

  return (
    <>
<div className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-8 mt-8 lg:mt-[80px]">
  <h1 className="text-xl lg:text-3xl font-semibold italic text-center lg:text-left mt-20 lg:mt-10 mb-4 lg:mb-10 lg:ml-[530px]">
    The Infinite Universe of Literary Wonders and Enchantments
  </h1>

  {/* Icons for Cart and Wishlist */}
  <div className="flex items-center justify-center space-x-4 mt-4 lg:mt-10 lg:mb-10 mb-2 mr-14">
    <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 cursor-pointer">
      <FaShoppingCart className="text-xl text-gray-500" onClick={goToCart} />
    </div>
    <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 cursor-pointer">
      <FaHeart className="text-xl text-gray-500" onClick={goWishlist} />
    </div>
  </div>
</div>

      <Banner />

<h2 className="text-3xl font-bold text-start mt-10 ml-5 lg:ml-20 mb-5">
  Top 6 Books
</h2>
<div className="flex flex-wrap justify-center gap-5 mt-10 mb-10 px-4 lg:px-0">
  {categoryData.length > 0 ? (
    categoryData.slice(-6).reverse().map((dataItem) => (
      <div
        key={dataItem._id}
        className="rounded overflow-hidden shadow-lg bg-white border w-full sm:w-[200px]"
        onClick={() => handleBoxClick(dataItem._id)}
      >
        {/* Image container */}
        <div className="w-full h-auto flex justify-center items-center bg-gray-200 overflow-hidden">
          {dataItem.images && dataItem.images.length > 0 ? (
            <img
              src={dataItem.images[0].url}
              alt={dataItem.title}
              className="w-full h-auto object-contain"
            />
          ) : (
            <p className="text-xs text-center">No image available</p>
          )}
        </div>
        {/* Text section */}
        <div className="px-2 py-2">
          <div className="font-medium text-sm text-center break-words">
            {dataItem.title}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No exam categories available.</p>
  )}
</div>


<div className="flex flex-wrap items-center justify-between mb-10 mx-4 md:mx-16">
  {/* Title and Dropdown Group */}
  <div className="flex flex-wrap items-center">
    <h1 className="font-semibold text-2xl md:text-3xl text-center md:text-left">
      Books for all competitive Exams!
    </h1>
    <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-10">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border-2 border-gray-300 mt-5 rounded-lg w-full md:w-[350px] focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Category</option>
        {Array.from(new Set(categoryData.map((book) => book.category))).map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Button */}
  {filteredBooks.length > 4 && (
    <button
      onClick={handleViewEach}
      className="w-full md:w-auto mt-4 md:mt-0 bg-blue-500 text-white p-2 font-bold text-lg rounded hover:bg-blue-400"
    >
      {showEach ? 'Show Less' : 'View All'}
    </button>
  )}
</div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredBooks.length > 0 ? (
          // (showAll ? categoryData : categoryData.slice(0, 6)).map((dataItem) => (
          (showEach ? filteredBooks : filteredBooks.slice(0, 12)).map((dataItem) => (
            <div key={dataItem._id}
              className="max-w-xs rounded overflow-hidden shadow-lg bg-white p-2  border relative w-[220px] mb-6"
            >
              
              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(dataItem._id)}
                className={`absolute top-9 right-10 w-6 h-6 flex items-center justify-center  rounded-full border-2 ${wishlist.includes(dataItem._id) ? "bg-red-500 border-red-500" : "bg-gray-200 border-gray-300"
                  } transition duration-200`}
              >
                <FaHeart
                  className={`text-sm ${wishlist.includes(dataItem._id) ? "text-white" : "text-gray-500"
                    }`}
                />
              </button>

              <div className="w-[200px] h-auto flex justify-center items-center  overflow-hidden ">
                {dataItem.images && dataItem.images.length > 0 ? (
                  <img
                    src={dataItem.images[0].url}
                    alt={dataItem.title}
                    className="w-full h-auto object-contain"
                    onClick={() => handleBoxClick(dataItem._id)}
                  />
                ) : (
                  <p className="text-xs text-center">No image available</p>
                )}
              </div>

              {/* Book Details */}
              <div className="px-6 " onClick={() => handleBoxClick(dataItem._id)}>
                <div className="font-bold text-small overflow-hidden text-ellipsis whitespace-nowrap">{dataItem.title}</div>
                <p className="text-gray-700 text-sm whitespace-nowrap"><strong>Author:</strong> {dataItem.author}</p>
                
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

              </div>

              {/* Add to Cart Button */}
              <div className="px-6 py-4 flex justify-center">
                <button
                  onClick={() => addToCart(dataItem._id)}
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold w-[200px]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mx-auto">No books available for this category.</p>
        )}
      </div>
      <SecondBanner />

      {/* top exam preparation */}
      <div>
        <h1 className="ml-14 mt-10 font-bold text-3xl ">Top Exam Preparation</h1>
        <Exam />
      </div>
      <ThirdBanner />
    </>
  );
};

export default Book;









