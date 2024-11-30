import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RxTwitterLogo } from "react-icons/rx";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import API_BASE_URL from "./Config";
// import ex2 from "./images/ex2.png"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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



  const handleCategoryClick = (categoryName) => {
    navigate(`/books/${categoryName}`);
  };


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="text-white py-10 bg-customColor px-8">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <div>

            <h3 className="text-2xl font-bold mt-10">Top Categories</h3>
            {categories.length > 0 ? (
              <div className="mt-2">
                {categories.map((category) => (
                  <div
                    key={category._id}

                  >
                    <h4 className="text-small font-semibold" onClick={() => {
                      handleCategoryClick(category.categoryName)
                      handleScrollToTop()
                    }}>{category.categoryName}</h4>

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
                <Link to="/aboutus" onClick={scrollToTop} className="hover:text-blue-900 ">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contactus" onClick={scrollToTop} className="hover:text-blue-900">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/condition" onClick={scrollToTop} className="hover:text-blue-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="privacy" onClick={scrollToTop} className="hover:text-blue-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/CancellationPolicy" onClick={scrollToTop} className="hover:text-blue-900">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link to="/ShipmentProcessing" onClick={scrollToTop} className="hover:text-blue-900">
                  Shipping & Delivery
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12 mb-5">My Accounts</h3>
            <ul>
              <li>
                <Link to="/OrderHistory" onClick={scrollToTop} className="hover:text-blue-900">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/ecommerce/wishlist" onClick={scrollToTop} className="hover:text-blue-900">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/billingForm" onClick={scrollToTop} className="hover:text-blue-900">
                  Address
                </Link>
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


              <a
                href="https://www.facebook.com/CROWNPUBLICATIONSRANCHI/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialFacebook className="mr-3 hover:text-blue-500 cursor-pointer" />
              </a>

              <a
                href="https://www.youtube.com/@CrownClassesrnc"
                target="_blank"
                rel="noopener noreferrer"
              >
              <RiYoutubeLine className="mr-3 hover:text-red-700 cursor-pointer" />
              </a>
              
            </p>
          </div>
        </div>

        <hr className="mt-5 w-full max-w-6xl" />

        <div className="mt-6 text-center">
          <p>Copyright © 2014-2024 Crown Publications : All rights reserved</p>
          <p>Developed & Maintained By ByteLab</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
