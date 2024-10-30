import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../Config";
import { useNavigate } from "react-router-dom";

const ExamBook = () => {
  const { examName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const getBooksByExamName = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/exam/books/${examName}`);
      console.log("Response:", response.data); 
      setBooks(response.data.books); 
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Exam Name:", examName); 
    getBooksByExamName();
  }, [examName]);

const userId =  localStorage.getItem("user_userId")

  const addToCart = async (bookId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add`, { bookId  , userId });
      toast.success("Book added to cart!"); 
      navigate("/ecommerce/cart")
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    console.log("Exam Name:", examName);
    getBooksByExamName();
  }, [examName]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const handleBoxClicks = (bookId) =>{
    navigate(`/bookdetail/${bookId}`)
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 mt-20 ">
        Books for {examName}
      </h1>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ml-40 mx-36 my-10 " > 
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-full max-w-xs mb-10" 
              onClick={() => handleBoxClicks(book._id)}
            >
            
              <div className="h-48 bg-gray-200">
                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-1 text-blue-600">
                  {book.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  Author: <span className="font-medium">{book.author}</span>
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Category:</strong> {book.category}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Exam:</strong> {book.examName}
                </p>
                <p className="text-gray-700 mb-3">{book.content}</p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Section with Price and Buy Button */}
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-lg font-semibold text-green-600">
                      ₹{book.sellPrice}{" "}
                      <span className="line-through text-red-400">
                        ₹{book.price}
                      </span>
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
                    onClick={() => addToCart(book._id)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          No books found for {examName}.
        </p>
      )}
    </div>
  );
};

export default ExamBook;
