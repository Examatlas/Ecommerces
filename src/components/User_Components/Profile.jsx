import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./Config";

const Profile = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user?.data?.name || "",
        email: user?.data?.email || "",
        mobile: user?.data?.mobile || "",  
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

    const userId = localStorage.getItem("user_userId")

        try {
            // Example API call to update user profile by ID
            const response = await axios.put(
                `${API_BASE_URL}/user/updateUser/${userId}`, // Assuming user ID is in user.data.id
                formData
            );
            window.location.reload();

            onSave(response.data); // Passing updated data to parent
           
            setIsLoading(false);
            onClose(); // Close modal on success
        } catch (err) {
            setError("Failed to update profile. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-30">
            <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
                <h2 className="text-3xl font-semibold mb-4 text-center text-blue-600">Edit Profile</h2>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                            required
                            pattern="^[0-9]{10}$" // Simple phone number validation (10 digits)
                            placeholder="Enter 10-digit mobile number"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="px-6 py-3 bg-gray-500 text-white rounded-md w-28 hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white rounded-md w-28 hover:bg-blue-400 disabled:bg-blue-300"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
