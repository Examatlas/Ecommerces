import React, { useState,useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RxTwitterLogo } from "react-icons/rx";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import API_BASE_URL from "./Config";
// import ex2 from "./images/ex2.png"
import axios from "axios"
import {Link} from "react-router-dom";


const Footer = () => {
  
  const [categories , setCategories] = useState([]);
  
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/getCategory`); // Replace with your API endpoint
      console.log("API Response:", response.data);
      setCategories(response.data.data || []); // Extract the `data` array
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);

  return (
    <footer className="text-white py-10 bg-slate-950 px-8">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <div>
           
            <h3 className="text-2xl font-bold mt-10">Top Categories</h3>
            {categories.length > 0 ? (
        <div className="mt-2">
          {categories.map((category) => (
            <div
              key={category._id}
              // className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h4 className="text-small font-semibold">{category.categoryName}</h4>
             
            </div>
          ))}
        </div>
      ) : (
        <p>Loading categories...</p>
      )}
           
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12 mb-5">Information</h3>
            <ul>
              <li>
                <Link to ="/aboutus" className="hover:text-blue-400 ">
                  About us
                </Link>
              </li>
              <li>
                <Link to ="/contactus" className="hover:text-blue-400">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/condition" className="hover:text-blue-400">
                   Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="privacy" className="hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/CancellationPolicy" className="hover:text-blue-400">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link to="/ShipmentProcessing" className="hover:text-blue-400">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/ShipmentProcessing" className="hover:text-blue-400">
                  Return Policy : No Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12 mb-5">My Accounts</h3>
            <ul>
              <li>
                <Link to="/OrderHistory" className="hover:text-blue-400">
                   Order History
                </Link>
              </li>
              <li>
                <Link to="/ecommerce/wishlist" className="hover:text-blue-400">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/billingForm" className="hover:text-blue-400">
                  Address
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                 Account Details
                </a>
              </li>
             
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12">Our App</h3>
            <div className="flex flex-wrap gap-4 mt-4">
             
              <img
                src="https://testbook.com/angular/assets/img/template-img/playstore.svg"
                alt="Play Store"
              />
            </div>
            <h3 className="text-xl font-bold mt-6">Follow us on</h3>
            <p className="flex mt-4 text-2xl">
              <FaInstagram className="mr-3 hover:text-pink-500 cursor-pointer" />
              <TiSocialFacebook className="mr-3 hover:text-blue-500 cursor-pointer" />
            
              <RiYoutubeLine className="mr-3 hover:text-red-700 cursor-pointer" />
          
            </p>
          </div>
        </div>

        <hr className="mt-5 w-full max-w-6xl" />

        <div className="mt-6 text-center">
          <p>Copyright © 2014-2024 ByteLab Pvt. Ltd.: All rights reserved</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400">
              User Policy
            </a>
            <a href="#" className="hover:text-blue-400">
              Terms
            </a>
            <a href="#" className="hover:text-blue-400">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
