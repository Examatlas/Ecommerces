import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Import jwt-decode
import API_BASE_URL from '../Config';
// import api from '../Api/Api_config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('user_token');
      const userId = localStorage.getItem('user_userId')
   
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);  // Log the entire decoded token
          
          // const userId = decodedToken?.userId || decodedToken?._id; 
          console.log("userId is ",userId)
  
          const response = await axios.get(`${API_BASE_URL}/user/getUserById/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response,"response")
  
          if (response.data) {
            setUser(response.data);
          } else {
            console.error("No data received from the API");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchUser();
  }, []);
  
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

