// Import necessary modules from React and React Router
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
   const navigator = useNavigate(); // Initialize the navigate function for navigation
   // useState hook to manage form input values: username, email, and password
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
   });

   // useEffect runs once when the component mounts
   // Sets the page title and auto-focuses the username field
   useEffect(() => {
      if (localStorage.getItem("user") !== null) {
         navigator("/dashboard"); // Redirect to dashboard if user is already logged in
      }
      document.title = "Register - Rafid 97";
      document.querySelector("input[name='username']")?.focus();
   }, [navigator]);

   // Generic function to handle input changes
   // It updates the specific field in formData based on the input name
   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Function to handle form submission
   const handleSubmit = (e) => {
      e.preventDefault(); // Prevents default form submission behavior (page reload)
      // Check if any field is empty; if so, show an alert
      if (!formData.username || !formData.email || !formData.password) {
         alert("Please fill in all fields.");
         return;
      }

      const registerFunction = async () => {
         await fetch("http://localhost:5001/api/users/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: formData.username,
               email: formData.email,
               password: formData.password,
            }),
         })
            .then((res) => {
               if (res.status === 201) {
                  alert("Registration successful! You can now log in.");
                  window.location.href = "/login"; // Redirect to login page after successful registration
               } else if (res.status === 400) {
                  alert("User already exists. Please try a different username or email.");
               } else if (res.status === 500) {
                  alert("Server error. Please try again later.");
               }
            })
            .catch((error) => {
               console.error("Error:", error);
            });
      };

      registerFunction(); // Call the register function
   };

   return (
      // Full screen background and center-aligned form
      <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
         {/* Container with styling for the form */}
         <div className="w-full max-w-sm border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
            {/* Header bar at the top of the form */}
            <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
               <span>Register - Rafid 97</span>
               <span className="font-bold cursor-pointer">🗙</span> {/* Close button (non-functional) */}
            </div>
            {/* Registration form */}
            <form onSubmit={handleSubmit}>
               {/* Username field */}
               <label className="text-sm block mb-2">
                  <span className="underline">U</span>sername
               </label>
               <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-1 mb-3 border-2 border-gray-600 bg-white focus:outline-none"
               />

               {/* Email field */}
               <label className="text-sm block mb-2">
                  <span className="underline">E</span>mail
               </label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-1 mb-3 border-2 border-gray-600 bg-white focus:outline-none"
               />

               {/* Password field */}
               <label className="text-sm block mb-2">
                  <span className="underline">P</span>assword
               </label>
               <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-1 mb-4 border-2 border-gray-600 bg-white focus:outline-none"
               />

               {/* Buttons: OK (submit), Cancel (clear form) */}
               <div className="flex justify-end gap-2 mb-3">
                  <button
                     type="submit"
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     OK
                  </button>
                  <button
                     type="button"
                     onClick={() => setFormData({ username: "", password: "", email: "" })}
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     Cancel
                  </button>
               </div>
            </form>

            {/* Link to Login page for users who already have an account */}
            <p className="text-xs text-center mt-4">
               Already have an account?{" "}
               <Link to="/login" className="underline text-blue-800 hover:text-blue-600">
                  Login here
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
