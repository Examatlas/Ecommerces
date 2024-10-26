import React, { useEffect, useState } from "react";
import DashboardLayoutBasic from "../DashboardLayoutBasic";
import API_BASE_URL from "../Config";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateSubjectModal from "./UpdateSubjectModal";
import Pagination from "../../Admin_Components/utils/Pagination";
import useDebounce from "../../Admin_Components/utils/Debounce";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const[page,setpage]=useState(1);
  const [totalPages,setTotalPages]=useState();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); 

  const handleInputChange = (e) => {
    setSubjectName(e.target.value);
  };
  
  const getAllSubject = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/subject/getSubject?page=${page}&per_page=10`);
      if (res?.status === 200) {
        setSubjectData(res?.data?.data);
        setTotalPages(res?.data?.pagination?.totalPages);
        setpage(res?.data?.pagination?.currentPage);
      }
    } catch (error) {
      console.log("Error while fetching subject", error);
    }
  };

  useEffect(() => {
    getAllSubject();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/subject/addSubject`, {
        title: subjectName
      });
      if (res?.status === 200) {
        toast?.success(res?.data?.message);
        getAllSubject();
        setSubjectName("");
      }
    } catch (error) {
      toast.error(error?.message);
      console.log("Error while submitting subject", error);
    }
  };


  const deleteSubject = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/subject/deleteSubject/${id}`);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        getAllSubject();
      }
    } catch (error) {
      toast.error(error?.message);
      console.log("Error while delete subject", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setpage(pageNumber);
  };

  const fetchResults = async (searchQuery) => {
    if (!searchQuery) {
      setSubjectData([]); 
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/subject/getSubject?search=${searchQuery}&page=${page}&per_page=10`);
      if(response?.statusText==="OK"){
        setSubjectData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  useEffect(() => {
    if(searchTerm===''){
      getAllSubject();
    }else{
      fetchResults(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <DashboardLayoutBasic>
        {/* Form with input for subject */}
        <form>
          <label className="block text-xl font-semibold mb-6">
            Enter Subject Name
          </label>
          <div className="flex gap-4 justify-center items-center">
            <input
            type="text"
            value={subjectName}
            onChange={handleInputChange}
            placeholder="Type subject name here"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
          </div>
          
        </form>
        {/* List of all subjects */}
        <div className="w-full px-[2rem] md:px-[5rem] flex items-center relative flex-col">
          {/* Search using debounce */}
          <div className="w-full py-4">
            <input 
            type="text" 
            placeholder="Serach" 
            name="search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e?.target?.value)}
            className=" border py-2 px-3 w-[50%] rounded-md text-start outline-sky-400"/>
          </div>
          <div className="relative overflow-x-auto w-[100%]">
            <table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Subject Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectData &&
                  subjectData?.map((item) => {
                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={item?._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item?.title}
                        </th>
                        <td className="px-6 flex gap-4 py-4 ">
                          <button
                            className="px-4 py-2 mx-2 rounded bg-red-500 hover:bg-red-600 active:bg-red-600 text-white"
                            title="Delete"
                            onClick={() => deleteSubject(item?._id)}
                          >
                            Delete
                          </button>
                          {/* Edit */}
                          <UpdateSubjectModal
                            id={item?._id}
                            title={item?.title}
                            getAllSubject={getAllSubject}
                          />
                        </td>
                      </tr>
                    );
                  })}
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
        </div>
      </DashboardLayoutBasic>
    </>
  );
};

export default Subject;



