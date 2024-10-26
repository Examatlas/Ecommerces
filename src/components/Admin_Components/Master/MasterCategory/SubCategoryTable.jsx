import { useEffect, useState } from "react";
import useDebounce from "../../../Admin_Components/utils/Debounce";
import API_BASE_URL from "../../Config";
import axios from "axios";
import UpdateCategoryModal from "./UpdateCategoryModal";
import UpdateSubCategoryModal from "./UpdateSubCategoryModal";

const SubCategoryTable = ({ subCategoryData, categoryData, deleteSubCategory, setSubCategoryData, fetchSubCategoty }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [categoryid, setCategoryid] = useState();

    const fetchResultByCategoryId = async () => {
        try {
            const res = await api.get(`api/category/getSubCategory?categoryId=${categoryid}&per_page=10`);
            if (res?.status === 200) {
                setSubCategoryData(res?.data?.data);
            }
        } catch (error) {
            console.log('Error occured when filtering data', error);
        }
    }

    useEffect(() => {
        if (categoryid) {
            fetchResultByCategoryId();
        }
    }, [categoryid]);

    const fetchResults = async (searchQuery) => {
        if (!searchQuery) {
            setSubCategoryData([]);
            return;
        }
        try {
            const response = await axios.get(`${API_BASE_URL}/category/getSubCategory?search=${searchQuery}&per_page=10`);
            if (response?.statusText === "OK") {
                setSubCategoryData(response?.data?.data);
            }
        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };
    useEffect(() => {
        fetchResults(debouncedSearchTerm);
        if (searchTerm === '') {
            fetchSubCategoty();
        } else {
            fetchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);
    return (
        <div className='w-full'>
            <div>
                <div className="w-full py-4 flex gap-4">
                    <input
                        type="text"
                        placeholder="Serach"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e?.target?.value)}
                        className=" border py-2 px-3 w-[50%] rounded-md text-start outline-sky-400"
                    />
                    <select
                        name="filter"
                        id="filter"
                        // value={categoryid}
                        onChange={(e) => setCategoryid(e?.target?.value)}
                        className=" border py-2 px-3 w-[30%] rounded-md text-start outline-sky-400"
                        defaultValue={'filter'}
                    >
                        <option disabled value={'filter'}>Filter</option>
                        {
                            categoryData && categoryData?.map((item, index) => {
                                return (<option value={item?._id} key={index}>{item?.categoryName}</option>)
                            })
                        }
                    </select>
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
                            subCategoryData && subCategoryData?.map((item, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item?.subCategoryName}
                                        </th>
                                        <td className="px-6 py-4 flex gap-4">
                                            <button
                                                className='text-white bg-red-500 px-2 py-1 rounded-md'
                                                onClick={() => deleteSubCategory(item?._id)}
                                            >Delete</button>
                                            <UpdateSubCategoryModal
                                                id={item?._id}
                                                subcategoryName={item?.subCategoryName}
                                                description={item?.description}
                                                tags={item?.tags}
                                                categoryId={item?.categoryId}
                                                fetchAllCategory={fetchSubCategoty}
                                            />
                                            {/* <button className='text-white bg-green-500 px-2 py-1 rounded-md'>Edit</button> */}
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

export default SubCategoryTable;
