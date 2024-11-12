// import React, { useState, useEffect, useContext } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import SignupForm from "./SignupForm";
// import LoginForm from "./LoginForm";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { AuthContext } from "../User_Components/Auth/AuthContext";

// const Header = () => {
//     const [isSignupOpen, setIsSignupOpen] = useState(false);
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [toggleMenu, setToggleMenu] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const navigate = useNavigate();

//     const { user } = useContext(AuthContext);

//     const { pathname } = useLocation();

//     useEffect(() => {
//         const token = localStorage.getItem("user_token");
//         if (token) {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     const toggleHambergerMenu = () => {
//         setToggleMenu(!toggleMenu);
//     };

//     const toggleSignup = () => {
//         setIsSignupOpen(!isSignupOpen);
//         setIsLoginOpen(false);
//     };

//     const toggleLogin = () => {
//         setIsLoginOpen(!isLoginOpen);
//         setIsSignupOpen(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("user_token");
//         localStorage.removeItem("user_userId");
//         localStorage.removeItem("user_wishlist");
//         setIsLoggedIn(false);
//     };

//     const handleLoginSuccess = () => {
//         setIsLoggedIn(true);
//         setIsLoginOpen(false);  // Close the login form after success
//     };

//     return (
//         <>
//             <div className="bg-blue-100 flex justify-between w-[100vw] z-10 fixed top-0 px-10 lg:px-[5rem] py-4">
//                 <p
//                     className=" w-36 h-14 font-bold text-3xl whitespace-nowrap"
//                 > Crown 
//                     </p>
//                 <div
//                     className={`${toggleMenu ? "top-20 lg:top-0" : "-top-[100vh] lg:top-0"
//                         } fixed lg:relative flex lg:flex-row justify-center lg:justify-between items-center left-0 w-[100vw] lg:w-fit mr-5 h-[90vh] lg:h-auto bg-blue-100 font-semibold duration-500`}
//                 >
//                     <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-5 h-full">

//                         <Link
//                             to={"/user"}
//                             className={`${pathname === "/book" ? "text-blue-400 font-bold" : ""
//                                 }  text-lg lg:text-sm cursor-pointer`}
//                             onClick={toggleHambergerMenu}
//                         >
//                             HOME
//                         </Link>

//                         <Link  to={"/blog"}
//                             className={`${pathname === "/blog" ? "text-blue-400 font-bold" : ""
//                                 }  text-lg lg:text-sm cursor-pointer`}
                           
//                         >
//                            BLOG
//                         </Link>

//                         <Link  to={"/OrderHistory"}
//                             className={`${pathname === "/OrderHistory" ? "text-blue-400 font-bold" : ""
//                                 }  text-lg lg:text-sm cursor-pointer`}
//                         >
//                             MY ORDER
//                         </Link>

//                         <Link

//                         >
//                             GIFTING
//                         </Link>

//                         <Link
//                         >
//                             BRAND STORE
//                         </Link>


//                         {isLoggedIn ? (
//                             <>
//                                 {user ? (
//                                     <div className="flex items-center justify-center">
//                                         <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
//                                             <span className="text-xl font-semibold text-white">
//                                                 {user?.data?.name?.charAt(0).toUpperCase()}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <h1 >Loading...</h1>
//                                 )}

//                                 <p
//                                     className="px-6 py-2 flex border border-red-400 bg-red-500 hover:bg-red-400 text-white rounded-lg w-fit cursor-pointer"
//                                     onClick={handleLogout}
//                                 >
//                                     Logout
//                                 </p>
//                             </>
//                         ) : (
//                             <>
//                                 <p
//                                     className="px-4 py-2 flex bg-blue-500 text-white rounded-lg w-fit hover:bg-blue-400 cursor-pointer"
//                                     onClick={toggleSignup}
//                                 >
//                                     Register
//                                 </p>
//                                 <p
//                                     className="px-6 py-2 flex border border-blue-400 hover:bg-blue-200 rounded-lg w-fit text-black cursor-pointer"
//                                     onClick={toggleLogin}
                               
//                                 >
//                                     Login
//                                 </p>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="absolute top-8 right-8 lg:hidden">
//                     {toggleMenu === false ? (
//                         <FiMenu
//                             className="text-3xl cursor-pointer"
//                             onClick={toggleHambergerMenu}
//                         />
//                     ) : (
//                         <RxCross2
//                             className="text-3xl cursor-pointer"
//                             onClick={toggleHambergerMenu}
//                         />
//                     )}
//                 </div>
//             </div>

//             {isSignupOpen && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
//                     <SignupForm onClose={toggleSignup} />
//                 </div>
//             )}

//             {isLoginOpen && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
//                     <LoginForm onClose={toggleLogin} onLoginSuccess={handleLoginSuccess} />
//                 </div>
//             )}
//         </>
//     );
// };

// export default Header;

import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../User_Components/Auth/AuthContext";
import Profile from "./Profile"; // Import the Profile component

const Header = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); // State to handle profile modal

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const { pathname } = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const toggleHambergerMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    const toggleSignup = () => {
        setIsSignupOpen(!isSignupOpen);
        setIsLoginOpen(false);
    };

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsSignupOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_userId");
        localStorage.removeItem("user_wishlist");
        setIsLoggedIn(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginOpen(false);  // Close the login form after success
    };

    const openProfile = () => {
        setIsProfileOpen(true);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const saveProfile = (updatedData) => {
        // Handle saving profile (e.g., make an API call to save the updated data)
        console.log(updatedData);
        // If the save is successful, you can update the user context/state here
    };

    return (
        <>
            <div className="bg-blue-100 flex justify-between w-[100vw] z-10 fixed top-0 px-10 lg:px-[5rem] py-4">
                <p className=" w-36 h-14 font-bold text-3xl whitespace-nowrap">Crown</p>
                <div className={`${toggleMenu ? "top-20 lg:top-0" : "-top-[100vh] lg:top-0"
                    } fixed lg:relative flex lg:flex-row justify-center lg:justify-between items-center left-0 w-[100vw] lg:w-fit mr-5 h-[90vh] lg:h-auto bg-blue-100 font-semibold duration-500`}>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-5 h-full">
                        <Link to={"/user"} className={`${pathname === "/book" ? "text-blue-400 font-bold" : ""} text-lg lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu}>HOME</Link>
                        <Link to={"/blog"} className={`${pathname === "/blog" ? "text-blue-400 font-bold" : ""} text-lg lg:text-sm cursor-pointer`}>BLOG</Link>
                        <Link to={"/OrderHistory"} className={`${pathname === "/OrderHistory" ? "text-blue-400 font-bold" : ""} text-lg lg:text-sm cursor-pointer`}>MY ORDER</Link>
                        <Link>GIFTING</Link>
                        <Link>BRAND STORE</Link>

                        {isLoggedIn ? (
                            <>
                                {user ? (
                                    <div className="flex items-center justify-center" onClick={openProfile}>
                                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full cursor-pointer">
                                            <span className="text-xl font-semibold text-white">
                                                {user?.data?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <h1>Loading...</h1>
                                )}

                                <p
                                    className="px-6 py-2 flex border border-red-400 bg-red-500 hover:bg-red-400 text-white rounded-lg w-fit cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </p>
                            </>
                        ) : (
                            <>
                                <p
                                    className="px-4 py-2 flex bg-blue-500 text-white rounded-lg w-fit hover:bg-blue-400 cursor-pointer"
                                    onClick={toggleSignup}
                                >
                                    Register
                                </p>
                                <p
                                    className="px-6 py-2 flex border border-blue-400 hover:bg-blue-200 rounded-lg w-fit text-black cursor-pointer"
                                    onClick={toggleLogin}
                                >
                                    Login
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="absolute top-8 right-8 lg:hidden">
                    {toggleMenu === false ? (
                        <FiMenu className="text-3xl cursor-pointer" onClick={toggleHambergerMenu} />
                    ) : (
                        <RxCross2 className="text-3xl cursor-pointer" onClick={toggleHambergerMenu} />
                    )}
                </div>
            </div>

            {isSignupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
                    <SignupForm onClose={toggleSignup} />
                </div>
            )}

            {isLoginOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
                    <LoginForm onClose={toggleLogin} onLoginSuccess={handleLoginSuccess} />
                </div>
            )}

            {isProfileOpen && (
                <Profile user={user} onClose={closeProfile} onSave={saveProfile} />
            )}
        </>
    );
};

export default Header;
