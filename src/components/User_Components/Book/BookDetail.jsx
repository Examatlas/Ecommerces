import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../Config';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams(); // Extract the ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [mainImage, setMainImage] = useState(""); // State for the main image

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book/getBookById/${id}`);
        setBook(response.data.book); // Correctly access the nested book object
        if (response.data.book.images.length > 0) {
          setMainImage(response.data.book.images[0].url); // Set the first image as the main image
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const bookId = id
  const userId = localStorage.getItem("user_userId")
  const toggleWishlist = async (id) => {
    if (!id) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist/toggleWishlist`, {
        userId,
        bookId,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setWishlist((prevWishlist) => {
          const isInWishlist = prevWishlist.includes(id);
          const updatedWishlist = isInWishlist
            ? prevWishlist.filter((id) => id !== id)
            : [...prevWishlist, id];

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

  const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        bookId
      });

      if (response.status === 200) {
        toast.success('Item added to cart successfully! You can buy now!');
        navigate("/ecommerce/cart");
      }
    } catch (error) {
      toast.error('Failed to add item to cart.');
      console.error('API Error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden mt-[80px]">
        {/* Left Column - Book Image */}
        <div className="w-1/3 p-4 flex flex-col items-center">
          {book.images && book.images.length > 0 ? (
            <>
              {/* Main Image */}
              <img src={mainImage} alt={book.title} className="mb-4" />
              {/* Thumbnails */}
              <div className="flex space-x-2">
                {book.images.map((image) => (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={book.title}
                    className="w-16 h-20 object-cover cursor-pointer rounded border"
                    onClick={() => setMainImage(image.url)} // Update main image on click
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No image available</p>
          )}
        </div>

        {/* Center Column - Book Details */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">{book.keyword}</p>

            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: book.content }} // Render HTML safely
            ></div>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-xl font-semibold">Price: ₹{book.sellPrice} &nbsp;<strike>₹{book.price}</strike></span>
              {book.price > 0 && (
                <span className="text-green-600 ml-2">
                  ({Math.round(((book.price - book.sellPrice) / book.price) * 100)}% OFF)
                </span>
              )}
            </div>

            <p className="text-gray-500 mb-2">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-gray-500">
              <strong>Author:</strong> {book.author}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Tags:</h3>
              <ul className="list-disc list-inside">
                {book.tags.map((tag, index) => (
                  <li key={index} className="text-gray-600">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Cart Actions */}
        <div className="w-1/4 p-6 border-l flex flex-col justify-between">
          <div>
            <button className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button className="w-full mt-4 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
              onClick={() => toggleWishlist(id)}
            >
              Add to Wishlist
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Ships within 2-3 business days.</p>
            <p>30-day return policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
