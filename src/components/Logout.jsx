import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Logout = () => {
   const { logout } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <button
         onClick={() => handleLogout()}
         className="absolute top-5 right-5 px-2 py-1 border-2 border-gray-600 bg-gray-200 text-xs cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
      >
         Logout
      </button>
   );
};

export default Logout;
