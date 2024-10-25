import React, { useState } from 'react';
// import DashboardLayoutBasic from '../DashboardLayoutBasic';
import { Link, useNavigate } from 'react-router-dom';

//icons
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import BookList from './BookList';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');  // Add searchTerm state
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* <DashboardLayoutBasic> */}
        <div className="w-full">
          <div className="border-b w-[98%] mx-auto mt-6">
            <p className="text-left px-1 py-1 hover:bg-gray-100 w-fit cursor-pointer rounded flex justify-center items-center font-semibold"
              onClick={goBack}>
              <IoIosArrowBack className="text-lg" /> Back
            </p>
          </div>

          <div className="flex justify-between mx-4  md:mx-12 my-4 mb-10">
            <div>
              <h1 className="text-2xl md:text-4xl  ml-9 text-left">Book</h1>
              <p className="text-base md:text-lg  ml-9 text-left">Welcome to Book Dashboard</p>
            </div>

            <div className="flex items-center gap-2">
            <Link to={'/ECommerce/orderRecieve'}>
                <button className="px-1 md:px-4 md:py-3 py-1 text-sm bg-green-500 rounded-md text-white hover:bg-green-600 font-semibold flex justify-center items-center gap-1">
                 Orders Received
                </button>
              </Link>

              <Link to={'/ECommerce/addBook'}>
                <button className="px-1 md:px-4 md:py-3 py-1 text-sm bg-green-500 rounded-md text-white hover:bg-green-600 font-semibold flex justify-center items-center gap-1">
                  <IoMdAdd className="text-lg md:text-xl text-white font-bold" /> CREATE
                </button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-[90%] my-4 mx-auto flex gap-1">
            <form>
              <input
                type="text"
                className="px-3 py-2 border outline-blue-200 text-base md:text-lg rounded-md w-[60%] md:w-[25rem]"
                name="search"
                placeholder="Search by title"
                value={searchTerm}      // Bind search term
                onChange={handleSearch}  // Update search term
              />
            </form>
          </div>
        </div>

        {/* Pass search term to BookList */}
        <div className="w-[90%] mx-auto my-4">
          <BookList searchTerm={searchTerm} />  
        </div>
      
    </>
  );
};

export default Books;
