import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import API_BASE_URL from "../User_Components/Config"

const EmailBox = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setError('');
            try {
                setLoading(true);
                const response = await axios.post(
                    "http://localhost:5000/api/user/forgotpassword", 
                    { email }
                );

                if (response.data.status) {
                    toast.success("Password reset link sent. Please check your email.");
                } else {
                    toast.error(response.data.message);
                }
                setEmail('');
            } catch (error) {
                console.error("Error:", error);
                toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please enter a valid email address.');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded mt-36 mb-14 h-[300px]">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold text-center m-4 mb-10">Forgot Password</h1>
                <label htmlFor="email" className="block text-xl font-semibold  text-gray-700 mb-4">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Enter your email"
                    required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <button
                    type="submit"
                    className={`w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 h-12 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default EmailBox;
