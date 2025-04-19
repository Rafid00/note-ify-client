import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext for authentication context
import Logout from "../components/Logout";

const AddNote = () => {
   const navigate = useNavigate();
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const token = localStorage.getItem("user"); // Get the username from local storage

   useEffect(() => {
      document.title = `Add Note - Rafid 97`;

      if (token === null) {
         navigate("/login");
      }
   }, [navigate, token]);

   const handleSave = () => {
      if (!title.trim() || !content.trim()) {
         alert("Please fill out both title and content.");
         return;
      }

      const createNote = async () => {
         try {
            const response = await axios.post(
               "http://localhost:5001/api/notes/note",
               {
                  title,
                  content,
               },
               {
                  headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
               }
            );
            if (response.status === 201) {
               setTitle("");
               setContent("");
               navigate(-1); // Go back after saving
            }
         } catch (error) {
            console.error("Error saving note:", error);
            alert("An error occurred while saving the note. Please try again.");
         }
      };
      createNote();
   };

   const handleCancel = () => {
      setTitle("");
      setContent("");
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
         <Logout />
         <div className="w-full max-w-2xl border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
            <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
               <span>Add Note - Rafid 97</span>
               <span onClick={() => navigate(-1)} className="font-bold cursor-pointer">
                  🗙
               </span>
            </div>

            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="w-full p-1 mb-4 border-2 border-gray-600 bg-white focus:outline-none"
               placeholder="Title"
            />
            <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="w-full h-40 p-1 pr-3 mb-4 border-2 border-gray-600 bg-white focus:outline-none overflow-y-auto custom-scrollbar"
               placeholder="Write your note here..."
            />

            <div className="mt-4 flex justify-between items-center">
               <div className="space-x-2">
                  <button
                     onClick={handleSave}
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     Save
                  </button>
                  <button
                     onClick={handleCancel}
                     className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                     Clear
                  </button>
               </div>
               <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
               >
                  Go Back
               </button>
            </div>
         </div>
      </div>
   );
};

export default AddNote;
