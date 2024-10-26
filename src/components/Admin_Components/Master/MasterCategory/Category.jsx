import React, { useEffect, useState } from "react";
import DashboardLayoutBasic from "../../DashboardLayoutBasic";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../Config"
import axios from "axios";
import Categorytable from "./Categorytable";
import Pagination from "../../../Admin_Components/utils/Pagination";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const [categoryData, setCategoryData] = useState();
  // / Pagination
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handlePageChange = (pageNumber) => {
    setpage(pageNumber);
  };
  // table content
  const fetchAllCategory = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/category/getCategory?page=${page}&per_page=10`
      );

      if (res?.status === 200) {
        setCategoryData(res?.data?.data);
        setpage(res?.data?.pagination?.currentPage);
        setTotalPages(res?.data?.pagination?.totalPages);
      }
    } catch (error) {
      console.log("error while fetching sub-category data", error);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const deletecategory = async (id) => {
    try {
      const res = await axios?.delete(`${API_BASE_URL}/category/deleteCategory/${id}`);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        fetchAllCategory();
      }
    } catch (error) {
      toast.error(error?.message);
      console.log("Error while delete category", error);
    }
  };
  
  return (
    <DashboardLayoutBasic>
      <div className="flex w-full justify-end px-10 ">
        <AddCategoryModal fetchAllCategory={fetchAllCategory}/>
      </div>
      <div className="w-full px-[2rem] md:px-[5rem]">
        <Categorytable
          categoryData={categoryData}
          deletecategory={deletecategory}
          setCategoryData={setCategoryData}
          fetchAllCategory={fetchAllCategory}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayoutBasic>
  );
};

export default Category;
