import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RxTwitterLogo } from "react-icons/rx";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-white py-10 bg-black h-[500px] ">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <div>
            <h1 className="text-3xl font-bold text-white">ExamAtlas</h1>
            <h3 className="text-xl font-bold mt-4">ExamAtlas Pvt. Ltd.</h3>
            <p>2nd Floor, Plot No. 4, Crown Publication,<br /> Ranchi,<br /> India, 122003</p>
            <p>Email: <a href="mailto:support@ExamAtlas.com" className="text-blue-400">support@ExamAtlas.com</a></p>
            <p>Toll Free: 1800 203 0577</p>
            <p>Office Hours: 10 AM to 7 PM (all 7 days)</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mt-12">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">About us</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers </a></li>
              <li><a href="#" className="hover:text-blue-400">Teach Online on ExamAtlas</a></li>
              <li><a href="#" className="hover:text-blue-400">Media</a></li>
              <li><a href="#" className="hover:text-blue-400">Sitemap</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mt-12">Products</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Test Series</a></li>
              <li><a href="#" className="hover:text-blue-400">Live Tests and Quizzes</a></li>
              <li><a href="#" className="hover:text-blue-400">ExamAtlas Pass</a></li>
              <li><a href="#" className="hover:text-blue-400">Online Videos</a></li>
              <li><a href="#" className="hover:text-blue-400">Practice</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mt-12">Our App</h3>
            <div className="flex space-x-4 mt-4">
              <img src="https://testbook.com/angular/assets/img/template-img/appstore.svg" alt="App Store"/>
              <img src="https://testbook.com/angular/assets/img/template-img/playstore.svg" alt="Play Store"/>
            </div>
            <h3 className="text-xl font-bold mt-6">Follow us on</h3>
            <p className="flex mt-4 text-2xl">
              <FaInstagram className="mr-3 hover:text-pink-500"/>
              <TiSocialFacebook className="mr-3 hover:text-blue-500"/>
              <RxTwitterLogo className="mr-3 hover:text-gray-500"/>
              <RiYoutubeLine className="mr-3 hover:text-red-700"/>
              <FaLinkedinIn className="hover:text-blue-500"/>
            </p>
          </div>
        </div>
        
        <hr className="mt-12 w-full max-w-6xl" />
        
        <div className="mt-6 text-center">
          <p>Copyright © 2014-2024 ExamAtlas Pvt. Ltd.: All rights reserved</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400">User Policy</a>
            <a href="#" className="hover:text-blue-400">Terms</a>
            <a href="#" className="hover:text-blue-400">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
