import { useEffect, useState } from "react";
import useDebounce from "../../../Admin_Components/utils/Debounce";
import API_BASE_URL from "../../Config";
import axios from "axios";
import UpdateCategoryModal from "./UpdateCategoryModal";

const Categorytable = ({ categoryData, deletecategory, setCategoryData, fetchAllCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const fetchResults = async (searchQuery) => {
        if (!searchQuery) {
            setCategoryData([]);
            return;
        }
        try {
            const response = await axios.get(`${API_BASE_URL}/category/getCategory?search=${searchQuery}&per_page=10`);
            if (response?.statusText === "OK") {
                setCategoryData(response?.data?.data);
            }
        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };
    useEffect(() => {
        fetchResults(debouncedSearchTerm);
        if (searchTerm === '') {
            fetchAllCategory();
        } else {
            fetchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);
    return (
        <div className='w-full'>
            <div>
                <div className=" flex w-full py-4">
                    <input
                        type="text"
                        placeholder="Serach"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e?.target?.value)}
                        className=" border py-2 px-3 w-[50%] rounded-md text-start outline-sky-400" />
                </div>
            </div>
            <div className="relative overflow-x-auto w-[100%]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoryData && categoryData?.map((item, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item?.categoryName}
                                        </th>
                                        <td className="px-6 py-4 flex gap-4">
                                            <button
                                                className='text-white bg-red-500 px-2 py-1 rounded-md'
                                                onClick={() => deletecategory(item?._id)}
                                            >Delete</button>
                                            <UpdateCategoryModal
                                                id={item?._id}
                                                categoryName={item?.categoryName}
                                                description={item?.description}
                                                tags={item?.tags}
                                                fetchAllCategory={fetchAllCategory}
                                            />
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Categorytable;
