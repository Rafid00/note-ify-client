import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext for authentication context
import Logout from "../components/Logout";


const NotFound = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext); // Get the user from AuthContext

  useEffect(() => {
    document.title = `404 - Rafid 97`;
    if (localStorage.getItem("user") === null) {
      navigate("/login");
   }
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
      <Logout />
      <div className="w-full max-w-md border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
        <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
          <span>Error - Rafid 97</span>
          <span onClick={()=>navigate(-1)} className="font-bold cursor-pointer">🗙</span>
        </div>
        <p className="text-sm text-center text-gray-700 mb-4">
          The request could not be found here.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
