import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Assuming you're using react-router for routing
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../User_Components/Config";

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate()

    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/user/resetpassword`, {
                token,
                newPassword: password
            });
            if (response.data.status) {
                toast.success("Password reset successfully");
            } else {
                toast.error(response.data.message);
            }
            setPassword('')
            setConfirmPassword('')
            navigate('/')
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded mt-36 mb-14 h-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold text-center m-4 mb-10">Reset Password</h1>

                <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-4">
                    New Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Enter your new password"
                    required
                />

                <label htmlFor="confirmPassword" className="block text-xl font-semibold text-gray-700 mb-4">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Confirm your new password"
                    required
                />

                <button
                    type="submit"
                    className={`w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Resetting Password..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
