import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import API_BASE_URL from "../../User_Components/Config";
import api from "../../User_Components/Api";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = localStorage.getItem('user_userId');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get(`/wishlist/getWishlist/${userId}`);
        console.log(response.data);

        const itemsWithBooks = response?.data?.wishlistItems?.filter(item => item.bookId) || [];
        setWishlistItems(itemsWithBooks);
      } catch (error) {
        toast.error("Failed to fetch wishlist");
        console.log(error.response ? error.response.data : error.message);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await api.delete(`/wishlist/remove/${itemId}`);
      
      const updatedWishlistItems = wishlistItems.filter(item => item._id !== itemId);
      setWishlistItems(updatedWishlistItems);
      
      const updatedWishlist = updatedWishlistItems.map(item => item.bookId._id);
      localStorage.setItem('user_wishlist', JSON.stringify(updatedWishlist));
      
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      await api.post(`/cart/add`, { userId, bookId });
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 mt-28">My Wishlist</h2>
      <p className="text-sm mb-4 text-center text-gray-500">Discover the books you love!</p>

      <div className="flex flex-wrap justify-center gap-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((wishlistItem) => (
            <div key={wishlistItem._id} className="w-full sm:w-64 max-w-xs rounded-lg overflow-hidden shadow-lg bg-white p-4 mb-4 transition-transform transform hover:scale-105">
              {wishlistItem.bookId ? (
                <>
                  <div className="w-[160px] h-[200px] overflow-hidden mb-4 flex justify-center items-center ml-5 ">
                    {wishlistItem.bookId.images && wishlistItem.bookId.images.length > 0 ? (
                      <img src={wishlistItem.bookId.images[0].url} alt={wishlistItem.bookId.title} className="w-full h-full object-contain" />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>

                  <div className="px-4 py-2 flex flex-col flex-grow">
                    <div className="font-bold text-lg mb-2 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                      {wishlistItem.bookId.title}
                    </div>
                    <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                      <strong>Author:</strong> {wishlistItem.bookId.author}
                    </p>
                    <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                      <strong>Price:</strong> {wishlistItem.bookId.price}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                        onClick={() => handleRemoveFromWishlist(wishlistItem._id)} 
                      >
                        Remove
                      </button>
                      <button
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
                        onClick={() => handleAddToCart(wishlistItem.bookId._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p>Book not available</p>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center mb-16">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxIUEMRi7XQdyjKVUx0tKyWDiydWFO_OMfg&s"
              alt="Empty Wishlist"
              className="w-[300px] object-contain"
            />
            <p className="text-sm text-gray-600 mt-4">Your wishlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;



// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import API_BASE_URL from "../../User_Components/Config";

// const Wishlist = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const userId = localStorage.getItem("user_userId");
//   const token = localStorage.getItem("user_token"); 

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/wishlist/getWishlist/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the Bearer token in headers
//             },
//           }
//         );
//         console.log(response.data);

//         const itemsWithBooks =
//           response?.data?.wishlistItems?.filter((item) => item.bookId) || [];
//         setWishlistItems(itemsWithBooks);
//       } catch (error) {
//         toast.error("Failed to fetch wishlist");
//         console.log(error.response ? error.response.data : error.message);
//       }
//     };

//     fetchWishlist();
//   }, [userId, token]);

//   const handleRemoveFromWishlist = async (itemId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/wishlist/remove/${itemId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       });

//       const updatedWishlistItems = wishlistItems.filter(
//         (item) => item._id !== itemId
//       );
//       setWishlistItems(updatedWishlistItems);

//       const updatedWishlist = updatedWishlistItems.map(
//         (item) => item.bookId._id
//       );
//       localStorage.setItem("user_wishlist", JSON.stringify(updatedWishlist));

//       toast.success("Item removed from wishlist");
//     } catch (error) {
//       toast.error("Failed to remove item from wishlist");
//       console.log(error.response ? error.response.data : error.message);
//     }
//   };

//   const handleAddToCart = async (bookId) => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/cart/add`,
//         { userId, bookId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the Bearer token in headers
//           },
//         }
//       );
//       toast.success("Item added to cart");
//     } catch (error) {
//       toast.error("Failed to add item to cart");
//       console.log(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="mt-10">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 mt-28">
//         My Wishlist
//       </h2>
//       <p className="text-sm mb-4 text-center text-gray-500">
//         Discover the books you love!
//       </p>

//       <div className="flex flex-wrap justify-center gap-4">
//         {wishlistItems.length > 0 ? (
//           wishlistItems.map((wishlistItem) => (
//             <div
//               key={wishlistItem._id}
//               className="w-full sm:w-64 max-w-xs rounded-lg overflow-hidden shadow-lg bg-white p-4 mb-4 transition-transform transform hover:scale-105"
//             >
//               {wishlistItem.bookId ? (
//                 <>
//                   <div className="w-[160px] h-[200px] overflow-hidden mb-4 flex justify-center items-center ml-5 ">
//                     {wishlistItem.bookId.images &&
//                     wishlistItem.bookId.images.length > 0 ? (
//                       <img
//                         src={wishlistItem.bookId.images[0].url}
//                         alt={wishlistItem.bookId.title}
//                         className="w-full h-full object-contain"
//                       />
//                     ) : (
//                       <p>No image available</p>
//                     )}
//                   </div>

//                   <div className="px-4 py-2 flex flex-col flex-grow">
//                     <div className="font-bold text-lg mb-2 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
//                       {wishlistItem.bookId.title}
//                     </div>
//                     <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
//                       <strong>Author:</strong> {wishlistItem.bookId.author}
//                     </p>
//                     <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
//                       <strong>Price:</strong> {wishlistItem.bookId.price}
//                     </p>
//                     <div className="flex gap-2 mt-4">
//                       <button
//                         className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
//                         onClick={() =>
//                           handleRemoveFromWishlist(wishlistItem._id)
//                         }
//                       >
//                         Remove
//                       </button>
//                       <button
//                         className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
//                         onClick={() =>
//                           handleAddToCart(wishlistItem.bookId._id)
//                         }
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <p>Book not available</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center mb-16">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxIUEMRi7XQdyjKVUx0tKyWDiydWFO_OMfg&s"
//               alt="Empty Wishlist"
//               className="w-[300px] object-contain"
//             />
//             <p className="text-sm text-gray-600 mt-4">
//               Your wishlist is empty.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;
