// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import API_BASE_URL from '../Config';
// import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';

// function BookDetails() {
//   const { id } = useParams(); 
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [wishlist, setWishlist] = useState([]);
//   const [mainImage, setMainImage] = useState(""); 
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [suggestedBooks, setSuggestedBooks] = useState([]); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/book/getBookById/${id}`);
//         setBook(response.data.book);
//         if (response.data.book.images.length > 0) {
//           setMainImage(response.data.book.images[0].url);
//         }
  
//         // Fetch books of the same category
//         const categoryResponse = await axios.get(`${API_BASE_URL}/category/getBooksByCategoryName/${response.data.book.category}`);
//         const filteredBooks = categoryResponse.data.books.filter(book => book._id !== id); 
//         setSuggestedBooks(filteredBooks);
//       } catch (error) {
//         console.error('Error fetching book data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchBook();
//   }, [id]);
  

//   const bookId = id;
//   const userId = localStorage.getItem("user_userId");
//   const toggleWishlist = async (id) => {
//     if (!id) return;

//     try {
//       const response = await axios.post(`${API_BASE_URL}/wishlist/toggleWishlist`, {
//         userId,
//         bookId,
//       });

//       if (response.status === 200) {
//         toast.success(response.data.message);
//         setWishlist((prevWishlist) => {
//           const isInWishlist = prevWishlist.includes(id);
//           const updatedWishlist = isInWishlist
//             ? prevWishlist.filter((id) => id !== id)
//             : [...prevWishlist, id];

//           localStorage.setItem('user_wishlist', JSON.stringify(updatedWishlist));
//           return updatedWishlist;
//         });
//       } else {
//         toast.error("Failed to update wishlist. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error in toggleWishlist:", error.response ? error.response.data : error.message);
//       toast.error("Please login first!!");
//     }
//   };

//   const handleBuyNow = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/cart/add`, {
//         userId,
//         bookId
//       });

//       if (response.status === 200) {
//         toast.success('Item added to cart successfully! You can buy now!');
//         navigate("/ecommerce/cart");
//       }
//     } catch (error) {
//       toast.error('Please login first!!');
//       console.error('API Error:', error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!book) return <p>Book not found!</p>;

//   const handleBoxClick = (id) => {
//     navigate(`/bookdetail/${id}`);
//   };

//   const handleScrollToTop = () =>{
//     window.scrollTo({top: 0, behavior: 'smooth'});
//   }

//   return (

// <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 mb-20 mt-10">
//   <div className="flex flex-col sm:flex-row w-full sm:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden mt-[80px]">
    
//     {/* Left Column - Book Image */}
//     <div className="w-full sm:w-1/3 p-4 flex flex-col items-center">
//       {book.images && book.images.length > 0 ? (
//         <>
//           {/* Main Image */}
//           <img
//             src={mainImage}
//             alt={book.title}
//             className="mb-4 max-w-full h-auto rounded-lg shadow-lg" // Make image responsive
//           />
//           {/* Thumbnails */}
//           <div className="flex space-x-2 overflow-x-auto pb-4">
//             {book.images.map((image) => (
//               <img
//                 key={image._id}
//                 src={image.url}
//                 alt={book.title}
//                 className="w-16 h-20 object-cover cursor-pointer rounded border border-gray-300 hover:shadow-md"
//                 onClick={() => setMainImage(image.url)} // Update main image on click
//               />
//             ))}
//           </div>
//         </>
//       ) : (
//         <p>No image available</p>
//       )}
//     </div>

//     {/* Center Column - Book Details */}
//     <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-2">{book.title}</h1>
//       <p className="text-gray-600 text-sm sm:text-base">{book.keyword}</p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Category:</strong> {book.category}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Author:</strong> {book.author}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Language:</strong> {book.subject}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Number of Pages:</strong> {book.page}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>ISBN:</strong> {book.isbn}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Stock:</strong> {book.stock}
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base">
//         <strong>Weight:</strong> {book.weight} g
//       </p>
//       <p className="text-gray-500 text-sm sm:text-base mb-5">
//         <strong>Dimensions:</strong> {book.dimension.length} x {book.dimension.breadth} x {book.dimension.height} mm
//       </p>
//       <div
//         data-html
//         className={isExpanded ? "" : "line-clamp-6 text-sm sm:text-base"}
//         dangerouslySetInnerHTML={{ __html: book.content }}
//       ></div>

//       {/* Read More / Read Less Button */}
//       <button
//         className="text-blue-500 hover:underline mt-2"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         {isExpanded ? "Read Less" : "Read More"}
//       </button>

//       {/* Tags */}
//       <div className="mt-4 mb-5">
//         <ul className="list-disc list-inside text-sm sm:text-base">
//           {book.tags.map((tag, index) => (
//             <li key={index} className="text-gray-600">{tag}</li>
//           ))}
//         </ul>
//       </div>
//     </div>

//     {/* Right Column - Cart Actions */}
//     <div className="w-full sm:w-1/4 p-6 border-t sm:border-l flex flex-col justify-between space-y-4">
//       <div>
//         <div className="flex items-center space-x-4 mb-4">
//           <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
//             Price: ₹{book.sellPrice} &nbsp;<strike>₹{book.price}</strike>
//           </span>
//           {book.price > 0 && (
//             <span className="text-green-600 ml-2 text-sm sm:text-base">
//               ({Math.round(((book.price - book.sellPrice) / book.price) * 100)}% OFF)
//             </span>
//           )}
//         </div>

//         <button
//           className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
//           onClick={handleBuyNow}
//         >
//           Buy Now
//         </button>
//         <button
//           className="w-full mt-4 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
//           onClick={() => toggleWishlist(id)}
//         >
//           Add to Wishlist
//         </button>

//         <div className="mt-6 text-xs sm:text-sm text-gray-500 text-center">
//           <p>Ships within 2-3 business days.</p>
//           <p>30-day return policy.</p>
//         </div>
//       </div>
//     </div>
//   </div>

//       {/* Book Suggestions - Same Category */}
//       <div className="w-full md:w-3/4 mt-8">
//   <h2 className="text-2xl font-semibold mb-4">You may also like</h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//     {suggestedBooks.map((suggestedBook) => (
//       <div
//         key={suggestedBook._id}
//         className="w-full max-w-xs mx-auto border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//       >
//         <div className="relative">
//           <img
//             src={suggestedBook.images[0]?.url}
//             alt={suggestedBook.title}
//             className="h-40 object-contain w-full  rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
//           />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-800 truncate">{suggestedBook.title}</h3>
//         <p className="text-sm text-gray-600 mb-4">{suggestedBook.author}</p>
//         <button
//           className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
//           onClick={() => {
//             handleBoxClick(suggestedBook._id)
//             handleScrollToTop()
//           }}
//         >
//           View Details
//         </button>
//       </div>
//     ))}
//   </div>
// </div>

//     </div>
//   );
// }

// export default BookDetails;




import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../Config';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import api from "../../User_Components/Api";

function BookDetails() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [mainImage, setMainImage] = useState(""); 
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestedBooks, setSuggestedBooks] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/book/getBookById/${id}`);
        setBook(response.data.book);
        if (response.data.book.images.length > 0) {
          setMainImage(response.data.book.images[0].url);
        }
  
        // Fetch books of the same category
        const categoryResponse = await axios.get(`${API_BASE_URL}/category/getBooksByCategoryName/${response.data.book.category}`);
        const filteredBooks = categoryResponse.data.books.filter(book => book._id !== id); 
        setSuggestedBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching book data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBook();
  }, [id]);
  

  const bookId = id;
  const userId = localStorage.getItem("user_userId");
  const toggleWishlist = async (id) => {
    if (!id) return;

    try {
      const response = await api.post(`/wishlist/toggleWishlist`, {
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
      toast.error("Please login first!!");
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await api.post(`/cart/add`, {
        userId,
        bookId
      });

      if (response.status === 200) {
        toast.success('Item added to cart successfully! You can buy now!');
        navigate("/ecommerce/cart");
      }
    } catch (error) {
      toast.error('Please login first!!');
      console.error('API Error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found!</p>;

  const handleBoxClick = (id) => {
    navigate(`/bookdetail/${id}`);
  };

  const handleScrollToTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 mb-20 mt-10">
  <div className="flex flex-col sm:flex-row w-full sm:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden mt-[80px]">
    
    {/* Left Column - Book Image */}
    <div className="w-full sm:w-1/3 p-4 flex flex-col items-center">
      {book.images && book.images.length > 0 ? (
        <>
          {/* Main Image */}
          <img
            src={mainImage}
            alt={book.title}
            className="mb-4 max-w-full h-auto rounded-lg shadow-lg" // Make image responsive
          />
          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-4">
            {book.images.map((image) => (
              <img
                key={image._id}
                src={image.url}
                alt={book.title}
                className="w-16 h-20 object-cover cursor-pointer rounded border border-gray-300 hover:shadow-md"
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
    <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 text-sm sm:text-base">{book.keyword}</p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Category:</strong> {book.category}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Language:</strong> {book.subject}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Number of Pages:</strong> {book.page}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Stock:</strong> {book.stock}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">
        <strong>Weight:</strong> {book.weight} g
      </p>
      <p className="text-gray-500 text-sm sm:text-base mb-5">
        <strong>Dimensions:</strong> {book.dimension.length} x {book.dimension.breadth} x {book.dimension.height} mm
      </p>
      <div
        data-html
        className={isExpanded ? "" : "line-clamp-6 text-sm sm:text-base"}
        dangerouslySetInnerHTML={{ __html: book.content }}
      ></div>

      {/* Read More / Read Less Button */}
      <button
        className="text-blue-500 hover:underline mt-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>

      {/* Tags */}
      <div className="mt-4 mb-5">
        <ul className="list-disc list-inside text-sm sm:text-base">
          {book.tags.map((tag, index) => (
            <li key={index} className="text-gray-600">{tag}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* Right Column - Cart Actions */}
    <div className="w-full sm:w-1/4 p-6 border-t sm:border-l flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
            Price: ₹{book.sellPrice} &nbsp;<strike>₹{book.price}</strike>
          </span>
          {book.price > 0 && (
            <span className="text-green-600 ml-2 text-sm sm:text-base">
              ({Math.round(((book.price - book.sellPrice) / book.price) * 100)}% OFF)
            </span>
          )}
        </div>

        <button
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
        <button
          className="w-full mt-4 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
          onClick={() => toggleWishlist(id)}
        >
          Add to Wishlist
        </button>

        <div className="mt-6 text-xs sm:text-sm text-gray-500 text-center">
          <p>Ships within 2-3 business days.</p>
          <p>30-day return policy.</p>
        </div>
      </div>
    </div>
  </div>

      {/* Book Suggestions - Same Category */}
      <div className="w-full md:w-3/4 mt-8">
  <h2 className="text-2xl font-semibold mb-4">You may also like</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {suggestedBooks.map((suggestedBook) => (
      <div
        key={suggestedBook._id}
        className="w-full max-w-xs mx-auto border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={suggestedBook.images[0]?.url}
            alt={suggestedBook.title}
            className="h-40 object-contain w-full  rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 truncate">{suggestedBook.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{suggestedBook.author}</p>
        <button
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          onClick={() => {
            handleBoxClick(suggestedBook._id)
            handleScrollToTop()
          }}
        >
          View Details
        </button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default BookDetails;