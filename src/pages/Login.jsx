// Import necessary modules from React and React Router
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext for authentication context
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Define the Login component
const Login = () => {

   const navigator = useNavigate(); // Initialize the navigate function for navigation
   // State to store input values for username and password
   const [formData, setFormData] = useState({ username: "", password: "" });

   const { user, login } = useContext(AuthContext); // Get the login function from AuthContext

   // useEffect runs after the component mounts
   useEffect(() => {
      if (localStorage.getItem("user") !== null) {
         navigator("/dashboard"); // Redirect to dashboard if user is already logged in
      }
      // Set the document title to show the current page
      document.title = "Login - Rafid 97";
      // Automatically focus on the username input field when the page loads
      document.querySelector("input[name='username']")?.focus();
   }, [navigator, user]); // Empty dependency array means this runs once when component mounts

   // Handle changes in input fields and update the formData state
   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default page reload on form submit

      // Check if both fields are filled, show alert if not
      if (!formData.username || !formData.password) {
         alert("Please fill in all fields.");
         return;
      }

      const loginFunction = async () => {
         await axios
            .post("http://localhost:5001/api/users/login", {
               username: formData.username,
               password: formData.password,
            })
            .then((res) => {
               // Check if the response status is 200 (OK)
               if (res.status === 200) {
                  login(res.data.token); // Call the login function from AuthContext
                  navigator("/dashboard"); // Redirect to the dashboard page
               }
            })
            .catch((error) => {
               if (error.response) {
                  // Handle specific error responses from the server
                  if (error.response.status === 400) {
                     alert("Invalid username or password.");
                  } else if (error.response.status === 500) {
                     alert("Server error. Please try again later.");
                  }
               }
            });
      };

      loginFunction(); // Call the login function
   };

   return (
      // Outer container with full screen height, centered content, and teal background
      <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
         {/* Login form box with border and shadow for vintage style UI */}
         <div className="w-full max-w-sm border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
            {/* Top header bar styled like a title bar in older OS windows */}
            <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
               <span>Login - Rafid 97</span>
               <span className="font-bold cursor-pointer">🗙</span> {/* Placeholder for close icon */}
            </div>

            {/* Form begins */}
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

               {/* Form action buttons */}
               <div className="flex justify-end gap-2 mb-3">
                  {/* Submit button */}
                  <button
                     type="submit"
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     OK
                  </button>

                  {/* Cancel button resets formData to empty values */}
                  <button
                     type="button"
                     onClick={() => setFormData({ username: "", password: "" })}
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     Cancel
                  </button>
               </div>
            </form>

            {/* Link to Register page */}
            <p className="text-xs text-center mt-4">
               Don't have an account?{" "}
               <Link to="/register" className="underline text-blue-800 hover:text-blue-600">
                  Register here
               </Link>
            </p>
         </div>
      </div>
   );
};

// Export the Login component so it can be used in other files
export default Login;
