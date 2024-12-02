import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../User_Components/Auth/AuthContext";
import Profile from "./Profile"; // Import the Profile component
import logos from "../User_Components/images/logos.png"

const Header = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const [searchQuery, setSearchQuery] = useState("");

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
        setIsLoginOpen(false);  
    };

    const openProfile = () => {
        setIsProfileOpen(true);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const saveProfile = (updatedData) => {
        console.log(updatedData);
    };

    return (
        <>
            <div className="bg-customColor flex justify-between w-[100vw] z-10 fixed top-0 px-10 lg:px-[5rem] py-4 ">
                {/* <p className=" w-36 h-14 font-bold text-3xl whitespace-nowrap">Crown</p> */}
                <div className="flex items-center space-x-2">
                    <Link to="/">
                    <img src={logos} className="w-14" alt="Example Image" />
                    </Link>
                    <Link to="/" className="text-white text-2xl font-bold">CROWN PUBLICATIONS</Link>
                </div>

                <div className={`${toggleMenu ? "top-20 lg:top-0" : "-top-[100vh] lg:top-0"
                    } fixed lg:relative flex lg:flex-row justify-center lg:justify-between items-center left-0 w-[100vw] lg:w-fit mr-5 h-[90vh] lg:h-auto bg-customColor font-semibold duration-500`}>
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-5 h-full">


<Link to={"/user"} className={`${pathname === "/book" ? "text-white font-bold" : ""} text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu}>HOME</Link>

<Link to={"/blog"} className={`${pathname === "/blog" ? "text-white font-bold" : ""} text-lg lg:text-sm text-white cursor-pointer` } onClick={toggleHambergerMenu}  >BLOG</Link>


{/* <Link to={"/OrderHistory"} className={`${pathname === "/OrderHistory" ? "text-white font-bold" : ""} text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu} >MY ORDER</Link> */}

<Link to={"/bulkorder"} className={`${pathname === "/bulkorder" ? "text-white font-bold" : ""} text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu}>BULK ORDER</Link>
<Link to={"/author"} className={`${pathname === "/author" ? "text-white font-bold" : ""} text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu} >JOIN AS AUTHOR</Link>

                        {isLoggedIn ? (
                            <>
                                {user ? (
                                    <div className="flex items-center justify-center" onClick={openProfile}>
                                        <div className="w-10 h-10 flex items-center justify-center bg-blue-900 rounded-full cursor-pointer mr-1">
                                            <span className="text-xl font-semibold text-white">
                                                {user?.data?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <h1>Loading...</h1>
                                )}

                                {/* <p
                                    className="px-6 py-2 flex border border-red-400 bg-red-500 hover:bg-red-400 text-white rounded-lg w-fit cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </p> */}
                            </>
                        ) : (
                            <>
                                <p
                                    className="px-4 py-2 flex bg-blue-500 text-white rounded-lg w-fit hover:bg-blue-700 cursor-pointer"
                                    onClick={toggleSignup}
                                >
                                    Register
                                </p>
                                <p
                                    className="px-6 py-2 flex border border-white text-white rounded-lg w-fit  cursor-pointer"
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




// import React, { useState, useEffect, useContext } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { AuthContext } from "../User_Components/Auth/AuthContext";
// import logos from "../User_Components/images/logos.png";
// import axios from 'axios'; // Import axios for API requests
// import API_BASE_URL from "./Config";

// const Header = () => {
//     const [isSignupOpen, setIsSignupOpen] = useState(false);
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [toggleMenu, setToggleMenu] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showSearchResults, setShowSearchResults] = useState(false);

//     const { user } = useContext(AuthContext);
//     const { pathname } = useLocation();
//     const navigate = useNavigate();

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

//     const handleSearchChange = async (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);

//         if (query.length > 2) {
//             // Fetch search results when query length is greater than 2
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/book/getAllBooks?query=${query}`);
//                 setSearchResults(response.data); // Assuming response.data contains the books
//                 setShowSearchResults(true);
//             } catch (error) {
//                 console.error("Error searching books:", error);
//             }
//         } else {
//             setSearchResults([]);
//             setShowSearchResults(false);
//         }
//     };

//     const handleSearchClick = (bookId) => {
//         // Navigate to the book's page when a book is clicked
//         navigate(`/book/${bookId}`);
//         setShowSearchResults(false); // Hide the search results
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("user_token");
//         setIsLoggedIn(false);
//     };

//     return (
//         <div className="bg-customColor flex justify-between w-[100vw] z-10 fixed top-0 px-10 lg:px-[5rem] py-4">
//             <div className="flex items-center space-x-2">
//                 <Link to="/">
//                     <img src={logos} className="w-14" alt="Logo" />
//                 </Link>
//                 <Link to="/" className="text-white text-2xl font-bold">CROWN PUBLICATIONS</Link>
//             </div>

//             <div className="flex items-center space-x-4">
//                 {/* Search Bar */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         className="px-4 py-2 rounded-md text-sm"
//                         placeholder="Search for books..."
//                     />
//                     {showSearchResults && searchResults.length > 0 && (
//                         <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-2">
//                             <ul className="max-h-60 overflow-auto">
//                                 {searchResults.map((book) => (
//                                     <li
//                                         key={book.id}
//                                         className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//                                         onClick={() => handleSearchClick(book.id)}
//                                     >
//                                         {book.title}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 <Link to={"/user"} className={`${pathname === "/book" ? "text-white font-bold" : ""} text-lg  font-semibold  text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu}>HOME</Link>

//                 <Link to={"/blog"} className={`${pathname === "/blog" ? "text-white font-bold" : ""} text-lg font-semibold  lg:text-sm text-white cursor-pointer`} onClick={toggleHambergerMenu}  >BLOG</Link>


//                 {/* <Link to={"/OrderHistory"} className={`${pathname === "/OrderHistory" ? "text-white font-bold" : ""} text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu} >MY ORDER</Link> */}
 
//                 <Link to={"/bulkorder"} className={`${pathname === "/bulkorder" ? "text-white font-bold" : ""}  font-semibold text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu}>BULK ORDER</Link>
//                 <Link to={"/author"} className={`${pathname === "/author" ? "text-white font-bold" : ""}  font-semibold text-lg text-white lg:text-sm cursor-pointer`} onClick={toggleHambergerMenu} >JOIN AS AUTHOR</Link>


//                 {/* User Profile or Login */}
//                 {isLoggedIn ? (
//                     <div className="flex items-center justify-center">
//                         <div className="w-10 h-10 flex items-center justify-center bg-blue-900 rounded-full cursor-pointer mr-1">
//                             <span className="text-xl font-semibold text-white">
//                                 {user?.data?.name?.charAt(0).toUpperCase()}
//                             </span>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         <p className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">Register</p>
//                         <p className="px-6 py-2 border text-white rounded-lg cursor-pointer">Login</p>
//                     </>
//                 )}
//             </div>

//             {/* Hamburger Menu */}
//             <div className="absolute top-8 right-8 lg:hidden">
//                 {toggleMenu ? (
//                     <RxCross2 className="text-3xl cursor-pointer" onClick={toggleHambergerMenu} />
//                 ) : (
//                     <FiMenu className="text-3xl cursor-pointer" onClick={toggleHambergerMenu} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Header;
