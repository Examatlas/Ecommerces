import React, { useState, useEffect } from "react";
import axios from "axios";
import RecentBlog from "./RecentBlog";
import BlogLoading from "../loading/BlogLoading";
import API_BASE_URL from "../Config";
import { useNavigate } from "react-router-dom";

const UserBlog = () => {

  const navigate = useNavigate()
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs
  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/getAllBlogs`);
      console.log("Fetched Blogs:", response.data);
      setBlogData(response?.data?.data || []);
    } catch (error) {
      console.error("Error when fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Adding delay to mimic loading state
    setTimeout(() => {
      fetchAllBlogs();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-4 mx-[5rem] mt-28 gap-4">
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
        <BlogLoading />
      </div>
    );
  }

  if (blogData.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold text-gray-600">No Blogs Available</h1>
      </div>
    );
  }

  const handleBoxClick = (id) => {
    navigate(`/blogdata/${id}`)
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row mt-28">
        <div className="lg:w-[850px] px-2 xl:pl-44" >
          <h1 className="text-3xl text-blue-700 font-extrabold">Latest Blogs</h1>
          <img
            src={blogData[0].images[0].url}
            alt={blogData.title}
            className="rounded-lg mt-10 lg:w-[900px] h-[5rem] xl:h-[380px] object-cover"
          />
          <p className="mt-7 text-gray-800 text-xl font-extrabold">{blogData[0].title}</p>
          <p className="mt-5 text-gray-700 font-semibold">{blogData[0].keyword}</p>

        </div>

        <div className="flex flex-col my-4 px-4 md:pl-16">
          <h1 className="text-xl md:text-3xl text-blue-700 font-extrabold">Trending Blogs</h1>

          {blogData.slice(1).map((item, index) => (
            <div key={item._id} className="pt-7" >
              <div className="flex" onClick={() => handleBoxClick(item._id)}>
                <p className="text-gray-800 font-bold">
                  {item.title}
                  <br />
                  <br />
                  <span className="text-gray-600 font-normal">{item.keyword}</span>
                </p>
                <img
                  src={item.images[0].url}
                  alt={item.title}
                  className="w-[200px] object-cover h-[112px] ml-3 rounded-lg"

                />

              </div>
              {index < blogData.length - 2 && (
                <hr className="lg:w-[520px] border-gray-300 mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="w-[90%] mx-auto border-blue-900 border-t-2 mt-12 mb-12" />
      <RecentBlog />
    </>
  );
};

export default UserBlog;
