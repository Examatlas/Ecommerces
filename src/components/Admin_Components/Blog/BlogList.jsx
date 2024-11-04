import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../Config';
import axios from 'axios';
import Pagination from '../../Admin_Components/utils/Pagination';
import useDebounce from '../../Admin_Components/utils/Debounce';

const BlogList = ({ searchTerm }) => {
    const [blogData, setBlogData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    // Fetch all blogs
    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blog/getAllBlogs?page=${page}&per_page=10`);
            setBlogData(response?.data?.data);
            setTotalPages(response?.data?.pagination?.totalPages);
            setPage(response?.data?.pagination?.currentPage);
        } catch (error) {
            console.log("Error when fetching blogs", error);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, [page]);

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const fetchResults = async (searchQuery) => {
        if (!searchQuery) {
            fetchAllBlogs();
            return;
        }
        try {
            const response = await axios.get(`${API_BASE_URL}/blog/getAllBlogs?per_page=10&page=${page}&search=${searchQuery}`);
            if (response?.statusText === "OK") {
                setBlogData(response?.data?.data);
                setTotalPages(response?.data?.pagination?.totalPages);
                setPage(response?.data?.pagination?.currentPage);
            }
        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };

    useEffect(() => {
        if (searchTerm === '') {
            fetchAllBlogs();
        } else {
            fetchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    // Delete blog
    const deleteBlog = async (blogId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/blog/deleteBlog/${blogId}`);
            if (response?.data?.status === true) {
                toast.success(response?.data?.message, {
                    duration: 3000,
                    position: 'top-center',
                });
                fetchAllBlogs();
            }
        } catch (error) {
            toast.error(error?.message, {
                duration: 3000,
                position: 'top-center',
            });
            console.log("Error while deleting a blog", error);
        }
    }

    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Tags</th>
                            <th scope="col" className="px-6 py-3">Images</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogData && blogData.map((item) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.tags?.length > 0 && item.tags.map((tag, index) => (
                                                <span key={index}>{tag.replace(/["\[\]]/g, '')}, </span> // Clean up the tag string
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.images && item.images.length > 0 ? (
                                                <img
                                                    src={item.images[0].url}
                                                    alt={item.title}
                                                    className="h-20 w-20 object-cover rounded"
                                                />
                                            ) : (
                                                <span>No Image</span> // Fallback if no images are available
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/admin/edit-blog/${item._id}`}>
                                                <button
                                                    className='px-2 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mx-1'
                                                    title='Edit'>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => { deleteBlog(item._id) }}
                                                className='px-2 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md mx-1'
                                                title='Delete'>
                                                <RiDeleteBin6Fill />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default BlogList;
