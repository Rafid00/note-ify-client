import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditContext } from "../contexts/EditContext";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Logout from "../components/Logout";

const NoteDetail = () => {
   const { noteId } = useParams();
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);
   const [note, setNote] = useState();
   const { isEditing, setIsEditing } = useContext(EditContext);
   const [editedTitle, setEditedTitle] = useState(note?.title || "");
   const [editedContent, setEditedContent] = useState(note?.content || "");

   useEffect(() => {
      document.title = `Note Detail - Rafid 97`;
      if (localStorage.getItem("user") === null) {
         navigate("/login");
      }
      const fetchNote = async () => {
         try {
            const response = await fetch(`http://localhost:5001/api/notes/note/${noteId}`);
            const data = await response.json();
            if (data) {
               setNote(data);
               setEditedTitle(data.title);
               setEditedContent(data.content);
            } else {
               console.error("Note not found");
            }
         } catch (error) {
            console.error("Error fetching note:", error);
         }
      };
      fetchNote();
   }, [noteId, navigate, user]);

   function handleEdit() {
      return setIsEditing(true);
   }

   const handleSave = () => {
      if (editedTitle.trim() === "" || editedContent.trim() === "") {
         alert("Title and content cannot be empty!");
         return;
      }
      if (editedTitle.length > 50) {
         alert("Title cannot exceed 50 characters!");
         return;
      }
      if (editedTitle === note.title && editedContent === note.content) {
         alert("No changes made!");
         return;
      }

      const updateNote = async () => {
         try {
            const response = await axios.put(`http://localhost:5001/api/notes/note/${noteId}`, {
               title: editedTitle,
               content: editedContent,
            });
            if (!response.ok) {
               throw new Error("Failed to update note");
            }
         } catch (error) {
            console.error("Error updating note:", error);
         }
      };

      updateNote();

      setNote({ ...note, title: editedTitle, content: editedContent });
      setIsEditing(false);
      navigate(-1);
      alert("Note updated successfully!");
   };
   const handleCancel = () => {
      setEditedTitle(note.title);
      setEditedContent(note.content);
      setIsEditing(false);
   };

   const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this note?");
      if (!confirmDelete) return;
      try {
         await axios.delete(`http://localhost:5001/api/notes/note/${noteId}`);
      } catch (error) {
         console.error("Error deleting note:", error);
      }
      navigate(-1);
   };

   if (!note) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
            <Logout />
            <div className="w-full max-w-md border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
               <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
                  <span>Note Not Found - Rafid 97</span>
                  <span
                     onClick={() => {
                        navigate(-1);
                     }}
                     className="font-bold cursor-pointer"
                  >
                     🗙
                  </span>
               </div>
               <p className="text-sm text-center text-gray-700 mb-4">The requested note could not be found.</p>
               <div className="flex justify-end">
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
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-[#008080] p-4">
         <Logout />
         <div className="w-full max-w-2xl border-4 border-gray-700 bg-gray-100 p-4 shadow-window">
            <div className="bg-blue-700 text-white px-2 py-1 text-sm mb-4 border-b-2 border-gray-700 flex justify-between">
               <span>Note Detail - Rafid 97</span>
               <span
                  onClick={() => {
                     navigate(-1);
                  }}
                  className="font-bold cursor-pointer"
               >
                  🗙
               </span>
            </div>

            {isEditing ? (
               <>
                  <input
                     type="text"
                     value={editedTitle}
                     onChange={(e) => setEditedTitle(e.target.value)}
                     className="w-full p-1 mb-4 border-2 border-gray-600 bg-white focus:outline-none"
                  />
                  <textarea
                     value={editedContent}
                     onChange={(e) => setEditedContent(e.target.value)}
                     className="w-full h-40 p-1 pr-3 mb-4 border-2 border-gray-600 bg-white focus:outline-none overflow-y-auto custom-scrollbar"
                  />
               </>
            ) : (
               <>
                  <h1 className="text-xl font-bold mb-2">{note.title}</h1>
                  <p className="p-1 mb-4 border-2 border-gray-600 bg-white focus:outline-none text-sm text-gray-800 overflow-y-auto max-h-[400px] custom-scrollbar text-left">
                     {note.content}
                  </p>
               </>
            )}

            <div className="mt-4 flex justify-between items-center">
               <div className="space-x-2">
                  {isEditing ? (
                     <>
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
                           Cancel
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           onClick={handleEdit}
                           className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                        >
                           Edit
                        </button>
                        <button
                           onClick={handleDelete}
                           className="px-4 py-1 border-2 border-gray-600 bg-gray-200 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                        >
                           Delete
                        </button>
                     </>
                  )}
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

export default NoteDetail;
