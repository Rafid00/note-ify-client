import React, { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect (() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         setUser(storedUser); // Set user from local storage if available
      }
   }, []);

   const login = (username) => {
      localStorage.setItem("user", username); // Store user token in local storage
   }
   const logout = () => {
      localStorage.removeItem("user"); // Remove user token from local storage
      alert("Logged out successfully.");
   };

   return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
