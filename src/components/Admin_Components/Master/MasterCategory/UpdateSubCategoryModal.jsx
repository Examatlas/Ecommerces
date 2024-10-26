import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import API_BASE_URL from "../../Config";
import axios from "axios";

function UpdateSubCategoryModal({ id, subcategoryName,categoryId, description, tags,fetchAllCategory }) {
    
    const [showModal, setShowModal] = useState(false);
    const [tag,setTag]=useState([]);
    const [tagInput, setTagInput] = useState("");
    const [inputValue, setInputValue] = useState({
        subcategoryName: subcategoryName,
        description: description,
        tags: tags || [],
    });

    const handleChange = (e) => {
        setInputValue({ ...inputValue, [e?.target?.name]: e?.target?.value });
    }

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
          e.preventDefault();
          setTag([...tag, tagInput.trim()]);
          inputValue?.tags?.push(tagInput.trim());
          setTagInput("");
        }
      };
    
      const removeTag = (indexToRemove) => {
        setTag(tag.filter((_, index) => index !== indexToRemove));
      };

    const UpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/category/createSubCategory`, {
                id: id,
                categoryId,
                subCategoryName:inputValue?.subcategoryName,
                description:inputValue?.description,
                tags:inputValue?.tags,
            });

            if (res?.statusText === "OK") {
                toast.success(res?.data?.message);
                setTimeout(()=>{
                    setShowModal(false);
                    fetchAllCategory();
                },2000)
            }
        } catch (error) {
            toast.error(error?.message);
            console.log("Errror while Updateing the data", error);
        }
    };

    return (
        <div className="flex items-center justify-center relative ">
            {/* Button to open modal */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowModal(true)}
                title="Edit"
            >
                Edit
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[1300] bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-xl font-semibold mb-4">Update Category</h2>
                        <form >
                            {/* Input Field */}
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type something..."
                                name="subcategoryName"
                                value={inputValue?.subcategoryName}
                                onChange={handleChange}
                            />

                            <textarea
                                id="description"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="description"
                                value={inputValue?.description}
                                onChange={handleChange}
                                placeholder="Enter description of category"
                            ></textarea>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2 mr-[570px] mt-5">
                                    Tags
                                </label>
                                <div className="flex flex-wrap items-center mb-2">
                                    {inputValue?.tags?.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-blue-600 text-white font-bold p-2 m-1 rounded-full"
                                        >
                                            <span className="mr-2">{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="text-red-400 hover:text-red-700 pl-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    className="w-full p-3 border border-gray-300 rounded outline-blue-400"
                                    placeholder="Enter a tag and press Enter"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={UpdateCategory}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Update
                            </button>

                            {/* Close Button */}
                            <button className=" absolute top-4 right-4">
                                <FaXmark className="text-xl " onClick={() => setShowModal(false)} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateSubCategoryModal;
