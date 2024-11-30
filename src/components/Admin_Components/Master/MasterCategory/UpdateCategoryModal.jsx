// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { FaXmark } from "react-icons/fa6";
// import API_BASE_URL from "../../Config";
// import axios from "axios";
// import { useFormik } from "formik";

// function UpdateCategoryModal({ id, categoryName, description, tags, fetchAllCategory }) {
//     const [showModal, setShowModal] = useState(false);
//     const [tagInput, setTagInput] = useState("");
//     const [image, setImage] = useState(null);

//     // Formik for handling form data
//     const formik = useFormik({
//         initialValues: {
//             categoryName: categoryName || "",
//             description: description || "",
//             tags: tags || [],
//         },
//         onSubmit: async (values) => {
//             const formData = new FormData();
//             formData.append("id", id);
//             formData.append("categoryName", values.categoryName);
//             formData.append("description", values.description);
//             formData.append("tags", JSON.stringify(values.tags));
//             if (image) {
//                 formData.append("image", image);
//             }

//             try {
//                 const response = await axios.put(
//                     `${API_BASE_URL}/category/updateCategory`,
//                     formData,
//                     {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                     }
//                 );

//                 if (response?.status === 200) {
//                     toast.success(response?.data?.message);
//                     setTimeout(() => {
//                         setShowModal(false);
//                         fetchAllCategory();
//                     }, 2000);
//                 }
//             } catch (error) {
//                 toast.error(error?.message || "Error while updating category");
//                 console.error("Error while updating the data", error);
//             }
//         },
//     });

//     // Handling tag input
//     const handleTagKeyDown = (e) => {
//         if (e.key === "Enter" && tagInput.trim() !== "") {
//             e.preventDefault();
//             formik.setFieldValue("tags", [...formik.values.tags, tagInput.trim()]);
//             setTagInput("");  // Clear input after adding
//         }
//     };

//     // Removing a tag
//     const removeTag = (index) => {
//         const updatedTags = formik.values.tags.filter((_, i) => i !== index);
//         formik.setFieldValue("tags", updatedTags);
//     };

//     // Handling image upload
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImage(file);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center relative">
//             {/* Button to open modal */}
//             <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => setShowModal(true)}
//                 title="Edit Category"
//             >
//                 Edit
//             </button>

//             {/* Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center z-[1300] bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//                         <h2 className="text-xl font-semibold mb-4">Update Category</h2>
//                         <form onSubmit={formik.handleSubmit}>
//                             {/* Category Name Input */}
//                             <input
//                                 type="text"
//                                 className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Category Name"
//                                 name="categoryName"
//                                 value={formik.values.categoryName}
//                                 onChange={formik.handleChange}
//                             />

//                             {/* Description Input */}
//                             <textarea
//                                 id="description"
//                                 className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 name="description"
//                                 value={formik.values.description}
//                                 onChange={formik.handleChange}
//                                 placeholder="Enter description of category"
//                             ></textarea>

//                             {/* Image Upload */}
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 font-medium mb-2">Category Image</label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>

//                             {/* Tags Section */}
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 font-medium mb-2">Tags</label>
//                                 <div className="flex flex-wrap items-center mb-2">
//                                     {formik.values.tags.map((tag, index) => (
//                                         <div
//                                             key={index}
//                                             className="flex items-center bg-blue-600 text-white font-bold p-2 m-1 rounded-full"
//                                         >
//                                             <span className="mr-2">{tag}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeTag(index)}
//                                                 className="text-red-400 hover:text-red-700 pl-2"
//                                             >
//                                                 ✕
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <input
//                                     type="text"
//                                     value={tagInput}
//                                     onChange={(e) => setTagInput(e.target.value)}
//                                     onKeyDown={handleTagKeyDown}
//                                     className="w-full p-3 border border-gray-300 rounded outline-blue-400"
//                                     placeholder="Enter a tag and press Enter"
//                                 />
//                             </div>

//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                             >
//                                 Update
//                             </button>

//                             {/* Close Modal Button */}
//                             <button
//                                 type="button"
//                                 className="absolute top-4 right-4"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 <FaXmark className="text-xl" />
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UpdateCategoryModal;





import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import API_BASE_URL from "../../Config";
import axios from "axios";
import { useFormik } from 'formik';

function UpdateCategoryModal({ id, categoryName, description, tags, fetchAllCategory }) {
    const [showModal, setShowModal] = useState(false);
    const [tagInput, setTagInput] = useState("");

    const formik = useFormik({
        initialValues: {
            categoryName: categoryName || '',
            description: description || '',
            tags: tags || [],
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${API_BASE_URL}/category/createCategory`, {
                    id: id,
                    categoryName: values.categoryName,
                    description: values.description,
                    tags: values.tags,
                });

                if (res?.statusText === "OK") {
                    toast.success(res?.data?.message);
                    setTimeout(() => {
                        setShowModal(false);
                        fetchAllCategory();
                    }, 2000);
                }
            } catch (error) {
                toast.error(error?.message);
                console.log("Error while updating the data", error);
            }
        }
    });

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            formik.setFieldValue("tags", [...formik.values.tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (index) => {
        const newTags = formik.values.tags.filter((_, i) => i !== index);
        formik.setFieldValue("tags", newTags);
    };

    return (
        <div className="flex items-center justify-center relative">
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
                        <form onSubmit={formik.handleSubmit}>
                            {/* Input Field */}
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Category Name"
                                name="categoryName"
                                value={formik.values.categoryName}
                                onChange={formik.handleChange}
                            />

                            <textarea
                                id="description"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder="Enter description of category"
                            ></textarea>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Tags
                                </label>
                                <div className="flex flex-wrap items-center mb-2">
                                    {formik.values.tags.map((tag, index) => (
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
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Update
                            </button>

                            {/* Close Button */}
                            <button className="absolute top-4 right-4" onClick={() => setShowModal(false)}>
                                <FaXmark className="text-xl" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateCategoryModal;
