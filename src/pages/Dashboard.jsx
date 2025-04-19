import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EditContext } from "../contexts/EditContext";
import Logout from "../components/Logout";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
   const navigate = useNavigate();
   const { setIsEditing } = useContext(EditContext);
   const [notes, setNotes] = useState([]);
   const { user } = useContext(AuthContext);
   const scrollRef = useRef(null);
   const [hasScrollbar, setHasScrollbar] = useState(false);

   useEffect(() => {
      document.title = "Dashboard - Rafid 97";

      if (localStorage.getItem("user") === null) {
         navigate("/login");
      }

      const fetchNotes = async () => {
         const token = localStorage.getItem("user");
         try {
            const response = await axios.get("http://localhost:5001/api/notes/notes", { 
               headers: { Authorization: `Bearer ${token}` }
             });
            if (response.data) {
               setNotes(response.data);
            }
         } catch (error) {
            console.error("Error fetching notes:", error);
         }
      };
      fetchNotes();

      const checkScrollbar = () => {
         if (scrollRef.current) {
            const hasScroll = scrollRef.current.scrollHeight > scrollRef.current.clientHeight;
            setHasScrollbar(hasScroll);
         }
      };

      checkScrollbar();

      // Optional: recheck on window resize
      window.addEventListener("resize", checkScrollbar);
      return () => window.removeEventListener("resize", checkScrollbar);
   }, [notes, navigate, user]);

   const handleEdit = (id) => {
      setIsEditing(true);
      navigate(`/note/${id}`);
   };

   const handleExpand = (id) => {
      setIsEditing(false);
      navigate(`/note/${id}`);
   };

   const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this note?");
      if (!confirmDelete) return;
      try {
         const response = await axios.delete(`http://localhost:5001/api/notes/note/${id}`);
         if (response.status === 200) {
            alert("Note deleted successfully!");
         }
         setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } catch (error) {
         console.error("Error deleting note:", error);
      }
   };

   const handleAdd = () => {
      setIsEditing(false);
      navigate("/add-note");
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
         <Logout />
         <div className="relative w-full max-w-3xl border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
            {/* Top bar */}
            <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between items-center">
               <span>Dashboard - Rafid 97</span>
               <span className="font-bold cursor-pointer">🗙</span>
            </div>

            {/* Title and Add Button side-by-side */}
            <div className="flex justify-between items-center mb-4">
               <h1 className="text-xl font-bold">Your Notes</h1>
               <button
                  onClick={handleAdd}
                  className="px-2 py-1 border-2 border-gray-600 bg-gray-200 text-xs cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
               >
                  ✚ Add Note
               </button>
            </div>

            {/* Scrollable Notes Grid */}
            <div ref={scrollRef} className={`h-[400px] overflow-y-auto ${hasScrollbar ? "pr-4" : "pr-0"}`}>
               <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {notes.length > 0 ? (
                     notes.map((note) => (
                        <div key={note._id} className="border-2 border-gray-600 bg-white p-3 flex flex-col justify-between">
                           <div>
                              <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                              <p className="text-sm truncate">{note.content}</p>
                           </div>

                           <div className="flex justify-end gap-2 mt-3">
                              <button
                                 onClick={() => handleEdit(note._id)}
                                 className="px-2 py-1 border-2 border-gray-600 bg-gray-200 text-xs cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDelete(note._id)}
                                 className="px-2 py-1 border-2 border-gray-600 bg-gray-200 text-xs cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                              >
                                 Delete
                              </button>
                              <button
                                 onClick={() => handleExpand(note._id)}
                                 className="px-2 py-1 border-2 border-gray-600 bg-gray-200 text-xs cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                              >
                                 Expand
                              </button>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="col-span-3 text-center text-gray-500">No notes available</div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
