import React, { useState } from 'react';
import DashboardLayoutBasic from '../DashboardLayoutBasic';
import { Link, useNavigate } from 'react-router-dom';
//icons
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import BlogList from './BlogList';
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  return (
    <>
      <DashboardLayoutBasic>
        <div className="w-full">
          <div className=" border-b w-[98%] mx-auto -mt-6">
            <p className="text-left px-1 py-1 hover:bg-gray-100 w-fit cursor-pointer rounded flex justify-center items-center font-semibold"
              onClick={goBack}>
              <IoIosArrowBack className="text-lg" /> Back
            </p>
          </div>

          <div className=" flex justify-between mx-4 md:mx-12 my-4">
            <div>
              <h1 className=" text-2xl md:text-4xl text-left">Blog</h1>
              <p className=" text-base md:text-lg text-left">Welcome to Blog Dashboard</p>
            </div>

            <div className="flex items-center gap-2">
              {/* <button className="px-4 py-3 bg-gray-200 rounded-md hover:bg-gray-300 font-semibold flex justify-center items-center gap-2">
                <FiRepeat className="text-lg" /> REORDER
              </button> */}
              <Link to={'/admin/add-blog'}>
              <button className=" px-1 md:px-4 md:py-3 py-1 text-sm bg-green-500 rounded-md text-white hover:bg-green-600 font-semibold flex justify-center items-center gap-1">
                <IoMdAdd className="text-lg md:text-xl text-white font-bold" /> CREATE
              </button>
              </Link>
            </div>

          </div>
          {/* search and filter */}
          <div className=" w-[90%] my-4 mx-auto flex gap-1  ">
            <form className="">
              <input
                type="text"
                className="px-3 py-2 border outline-blue-200 text-base md:text-lg rounded-md w-[60%] md:w-[25rem]"
                name="search"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e?.target?.value)}
                placeholder="Search by title"
              />
            </form>
          </div>
        </div>
        <div className='w-[90%] mx-auto my-4'>
          <BlogList searchTerm={searchTerm}/>
        </div>
      </DashboardLayoutBasic>
    </>
  );
}

export default Blog;
