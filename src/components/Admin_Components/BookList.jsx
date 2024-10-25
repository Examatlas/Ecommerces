import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import API_BASE_URL from '../../config';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import api from '../../Api/ApiConfig';

import API_BASE_URL from './Config';

const BookList = ({ searchTerm }) => {  // Accept searchTerm as a prop
  const [bookData, setBookData] = useState([]);

  // Fetch all books
  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
      setBookData(response?.data?.books);
    } catch (error) {
      console.log("Error when fetching books", error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Filter books based on search term
  const filteredBooks = bookData.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete book
  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/book/deleteBook/${bookId}`);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message, {
          duration: 3000,
          position: 'top-center',
        });
        fetchAllBooks();
      }
    } catch (error) {
      toast.error(error?.message, {
        duration: 3000,
        position: 'top-center',
      });
      console.log("Error while deleting a book", error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Tags</th>

              <th scope='col' className='px-6 py-3'>Images</th>
              <th scope="col" className="px-6 py-3">Action</th>

            
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item?.title}
                  </th>
                  <td className="px-6 py-4">
                    {item?.tags?.map((tag, index) => (
                      <span key={index}>{tag}, </span>
                    ))}
                  </td>
                  <td>
                  {item?.images?.map((image, index) => (
                      <span key={index}>{image}, </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/ECommerce/editBook/${item?._id}`}>
                      <button className='px-2 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mx-1' title='Edit'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteBook(item?._id)}
                      className='px-2 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md mx-1'
                      title='Delete'>
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default BookList;
