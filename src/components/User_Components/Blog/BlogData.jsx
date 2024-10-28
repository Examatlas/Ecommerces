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
//       setBlog(response.data); // Set the blog data in state
//     } catch (err) {
//       setError("Error fetching the blog data.");
//     } finally {
//       setLoading(false); // Stop loading once data is fetched
//     }
//   };

//   useEffect(() => {
//     fetchBlogById();
//   }, [id]); // Call fetchBlogById whenever the id changes

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="border border-gray-300 p-6 rounded-lg shadow-lg w-[90%] max-w-xl">
//         <h1 className="text-2xl font-bold text-blue-700 mb-4 mt-[200px]">{blog?.title}</h1>
//         <p className="text-gray-600 mb-4">{blog?.keyword}</p>
//         <div
//           className="text-gray-800"
//           dangerouslySetInnerHTML={{ __html: blog?.content }}
//         />
//         <div className="mt-4">
//           <span className="font-semibold">Tags: </span>
//           {blog?.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded-lg mr-2 text-sm"
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
import API_BASE_URL from "../Config"; // Ensure you have this configured

const BlogData = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store the fetched blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch blog data by ID
  const fetchBlogById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/getBlogById/${id}`);
      
      // Access the nested 'blog' object from the response
      if (response.data.status) {
        setBlog(response.data.blog);
      } else {
        setError("Blog not found.");
      }
    } catch (err) {
      setError("Error fetching the blog data.");
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [id]); // Call fetchBlogById whenever the id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg w-[90%] max-w-xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 mt-[200px]">
          {blog.title}
        </h1>
        <p className="text-gray-600 mb-4">{blog.keyword}</p>
        <div
          className="text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="mt-4">
          <span className="font-semibold">Tags: </span>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded-lg mr-2 text-sm"
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
