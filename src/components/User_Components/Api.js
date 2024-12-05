import axios from "axios";

// Get the token from localStorage
const token = localStorage.getItem("user_token");

// Create an Axios instance with base configuration
const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000/api', // Replace with your actual base URL
  baseURL: 'https://ecommerce-backend-test.crownpublications.in/api' , // Replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "", // Attach token if available
  },
});

// Add an interceptor to update the Authorization header dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Fetch the token again in case it changes
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
