import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../User_Components/Config";
import LoginForm from "./LoginForm";

const SignupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/createUser`, {
        name,
        email,
        mobile,
        password,
        confirmPassword,
      });

      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      onClose();
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      {isLoginOpen ? (
        <LoginForm onClose={onClose} />
      ) : (
        <div className="bg-white p-6 rounded-md shadow-lg w-96 h-[600px] relative">
          <IoMdClose
            className="absolute top-6 right-5 text-gray-700 cursor-pointer"
            size={24}
            onClick={onClose}
          />
          <h2 className="text-2xl font-semibold mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-1"
                required
                placeholder="Enter name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-1"
                required
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-1"
                required
                placeholder="Enter mobile number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-1"
                required
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                required
                placeholder="Confirm password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 font-semibold rounded-md hover:bg-blue-400"
            >
              Signup
            </button>
            <p className="text-center mt-2">
              Already Registered?{" "}
              <span
                className="underline text-blue-500 cursor-pointer"
                onClick={openLogin}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupForm;






// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import axios from "axios";
// import { toast } from 'react-hot-toast';
// import API_BASE_URL from "../User_Components/Config";
// import LoginForm from "./LoginForm";

// const SignupForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const toggleLogin = () => {
//     setIsLoginOpen(!isLoginOpen);
//     setIsSignupOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, mobile, password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       toast.error("Password do not match with confirm password!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/user/createUser`,
//         { name, email, mobile, password, confirmPassword }
//       );

//       onClose();

//       toast.success(response.data.message);

//       setFormData({
//         name: "",
//         email: "",
//         mobile: "",
//         password: "",
//         confirmPassword: "",
//       });

//       onClose();

//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden">
//       <div className="bg-white p-6 rounded-md shadow-lg w-96 h-[600px] relative">
//         <IoMdClose
//           className="absolute top-6 right-5 text-gray-700 cursor-pointer"
//           size={24}
//           onClick={onClose}
//         />
//         <h2 className="text-2xl font-semibold mb-4">Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-1"
//               required
//               placeholder="Enter name"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-1"
//               required
//               placeholder="Enter email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Mobile <span className="text-red-500">*</span></label>
//             <input
//               type="number"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-1"
//               required
//               placeholder="Enter mobile number"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-1"
//               required
//               placeholder="Enter password"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-2"
//               required
//               placeholder="Confirm password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 font-semibold rounded-md hover:bg-blue-400"
//           >
//             Signup
//           </button>
//           <p className="text-center mt-2">Already Registered ? <span className="underline text-blue-500 cursor-pointer" onClick={toggleLogin}>Login</span></p>
//         </form>
//       </div>

//       {isLoginOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-30">
//           <LoginForm onClose={toggleLogin} />
//         </div>
//       )}

//     </div>
//   );
// };

// export default SignupForm;
