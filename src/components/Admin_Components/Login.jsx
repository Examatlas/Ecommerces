import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "./Config";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
     
        const response = await axios.post(`${API_BASE_URL}/user/adminLogin`,{ email, password });
        toast.success(response.data.message);
      setFormData({
        email: "",
        password: "",
      });

      const token = response.data.token
      localStorage.setItem('Admin_token', token);
      navigate('/admin/book');

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
   
  return (
    <>
      <div>
        <img
          src="https://examatlas.com/assets/images/logo.png"
          alt="Example Image"
          className="pl-6 w-48 h-20 ml-24 mt-6"
        />

        <div className="lg:ml-96 md:ml-64 sm:ml-56 ml-20">
          <h1 className="text-4xl mt-14 font-bold">Welcome back</h1>
          <p className="mt-3 text-lg">Login to manage account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm lg:ml-96 md:ml-64 sm:ml-56 ml-28 mt-10 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 block lg:w-[800px] md:w-[500px] sm:w-[300px] w-200px lg:ml-96 md:ml-64 sm:ml-56 ml-28 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6 mt-7">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 lg:ml-96 md:ml-64 sm:ml-56 ml-28"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block lg:w-[800px] md:w-[500px] sm:w-[300px] w-200px lg:ml-96 md:ml-64 sm:ml-56 ml-28 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

















          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="lg:w-[800px] md:w-[500px] sm:w-[300px] w-[220px] lg:ml-96 md:ml-64 sm:ml-56 ml-28 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6 mb-24"
            >
              Login
            </button>
            
          </div>
{/* 
          <p>
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-700 underline">
                Sign Up
              </Link>
            </p> */}
        </form>

        <Footer />
      </div>
    </>
  );
};

export default Login; 