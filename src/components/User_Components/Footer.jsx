import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RxTwitterLogo } from "react-icons/rx";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
// import ex2 from "./images/ex2.png"

const Footer = () => {
  return (
    <footer className="text-white py-10 bg-slate-950 px-8">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <div>
            {/* <h1 className="text-3xl font-bold text-white">ExamAtlas</h1> */}
            {/* <img
              src={ex2}
              alt="Example Image"
              className=" w-36 h-14"
            /> */}
            <h3 className="text-2xl font-bold mt-10">Crown Publications</h3>
            <p>
              2nd Floor, Plot No. 4, Crown Publication,
              <br /> Ranchi,
              <br /> India, 122003
            </p>
            <p>
              Email:{" "}
              <a href="mailto:support@ExamAtlas.com" className="text-blue-400">
                support@Crown.com
              </a>
            </p>
            <p>Toll Free: 1800 203 0577</p>
            <p>Office Hours: 10 AM to 7 PM (all 7 days)</p>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Careers{" "}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Teach Online on ExamAtlas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12">Products</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Test Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Live Tests and Quizzes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  ExamAtlas Pass
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Online Videos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Practice
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold md:mt-12">Our App</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              <img
                src="https://testbook.com/angular/assets/img/template-img/appstore.svg"
                alt="App Store"
              />
              <img
                src="https://testbook.com/angular/assets/img/template-img/playstore.svg"
                alt="Play Store"
              />
            </div>
            <h3 className="text-xl font-bold mt-6">Follow us on</h3>
            <p className="flex mt-4 text-2xl">
              <FaInstagram className="mr-3 hover:text-pink-500 cursor-pointer" />
              <TiSocialFacebook className="mr-3 hover:text-blue-500 cursor-pointer" />
              <RxTwitterLogo className="mr-3 hover:text-gray-500 cursor-pointer" />
              <RiYoutubeLine className="mr-3 hover:text-red-700 cursor-pointer" />
              <FaLinkedinIn className="hover:text-blue-500 cursor-pointer" />
            </p>
          </div>
        </div>

        <hr className="mt-12 w-full max-w-6xl" />

        <div className="mt-6 text-center">
          <p>Copyright © 2014-2024 ExamAtlas Pvt. Ltd.: All rights reserved</p>
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
