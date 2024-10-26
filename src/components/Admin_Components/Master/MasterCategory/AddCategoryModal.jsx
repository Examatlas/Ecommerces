import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import API_BASE_URL from "../../Config";
import axios from "axios";

function AddCategoryModal({fetchAllCategory}) {

    const [showModal, setShowModal] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCategoryChange = (e) => setCategoryName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                categoryName: categoryName,
                description,
                tags,
            };
            const response = await axios.post(`${API_BASE_URL}/category/createCategory`, payload);
            if (response.data.status) {
                toast.success("Category created successfully!");
                setCategoryName("");
                setDescription("");
                setTags([]);
                setTimeout(() => {
                    setShowModal(false);
                    fetchAllCategory();
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error creating category:", error);
            toast.error("Failed to create category. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center relative">
            {/* Button to open modal */}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowModal(true)}
                title="Edit"
            >
                Add Category
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[1300] bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                        {/* <form onSubmit={handleSubmit}> */}
                        <form >
                            {/* Input Field */}
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type something..."
                                value={categoryName}
                                onChange={handleCategoryChange}
                            />

                            <textarea
                                id="description"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description of category"
                            ></textarea>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2 mr-[570px] mt-5">
                                    Tags
                                </label>
                                <div className="flex flex-wrap items-center mb-2">
                                    {tags?.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-sm bg-blue-300 text-gray-900 px-2 py-1 m-1 rounded-full"
                                        >
                                            <span className="mr-1">{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="text-red-400 hover:text-red-700 "
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
                                    className="w-full p-3 border border-gray-300 rounded outline-blue-500"
                                    placeholder="Enter a tag and press Enter"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Submit
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

export default AddCategoryModal;
