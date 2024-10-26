import React, { useState } from "react";
// import api from "../../Api/ApiConfig";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import API_BASE_URL from "../Config";
import axios from "axios";

function UpdateSubjectModal({ id, title,getAllSubject }) {
   
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/subject/addSubject`, {
                id: id,
                title: inputValue
            });
            
            if (res?.statusText === "OK") {
                toast.success(res?.data?.message);
                setTimeout(()=>{
                    setShowModal(false);
                    getAllSubject();
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
                        <h2 className="text-xl font-semibold mb-4">Update Subject</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Input Field */}
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type something..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
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

export default UpdateSubjectModal;
