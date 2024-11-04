// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../Config"; // Ensure you have this configured

// const BlogData = () => {
//   const { id } = useParams(); // Extract the blog ID from the URL
//   const [blog, setBlog] = useState(null); // State to store the fetched blog data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch blog data by ID
//   const fetchBlogById = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/blog/getBlogById/${id}`);

//       // Access the nested 'blog' object from the response
//       if (response.data.status) {
//         setBlog(response.data.blog);
//       } else {
//         setError("Blog not found.");
//       }
//     } catch (err) {
//       setError("Error fetching the blog data.");
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     fetchBlogById();
//   }, [id]); 

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="border border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-xl bg-white">
//         <img
//           src={blog.images[0].url}
//           alt={blog.title}
//           className="w-full h-52 object-cover rounded-lg mb-4"
//         />
//         <h1 className="text-3xl font-bold text-blue-800 mb-2">{blog.title}</h1>
//         <p className="text-gray-500 mb-4 italic">{blog.keyword}</p>
//         <div
//           className="text-gray-800 mb-6"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />
//         <div className="mt-4">
//           <span className="font-semibold text-gray-700">Tags: </span>
//           {blog.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-lg mr-2 text-sm transition-colors duration-200 hover:bg-green-200"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogData;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Config";

const BlogData = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store the fetched blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedImage, setSelectedImage] = useState(null); // State for the main image

  // Fetch blog data by ID
  const fetchBlogById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/getBlogById/${id}`);

      if (response.data.status) {
        setBlog(response.data.blog);
        setSelectedImage(response.data.blog.images[0]?.url); // Set the initial main image
      } else {
        setError("Blog not found.");
      }
    } catch (err) {
      setError("Error fetching the blog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen  p-4 mt-28">
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-xl bg-white">
        {/* Main Image Display */}
        <img
          src={selectedImage || blog.images[0].url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        {/* Small Image Thumbnails */}
        <div className="flex space-x-2 mb-4">
          {blog.images.map((img, index) => (
            <img
              key={img._id}
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(img.url)} // Set the clicked image as main
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition transform hover:scale-105 ${
                selectedImage === img.url ? "border-2 border-blue-500" : "border border-gray-300"
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-blue-800 mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4 italic">{blog.keyword}</p>
        <div
          className="text-gray-800 mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="mt-4">
          <span className="font-semibold text-gray-700">Tags: </span>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-lg mr-2 text-sm transition-colors duration-200 hover:bg-green-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogData;
