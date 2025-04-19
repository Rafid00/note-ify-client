import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EditProvider } from "./contexts/EditContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NoteDetail from "./pages/NoteDetail";
import AddNote from "./pages/AddNote";
import NotFound from "./pages/NotFound";

const App = () => {
   return (
      <Router>
         <AuthProvider>
            <EditProvider>
               <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/note/:noteId" element={<NoteDetail />} />
                  <Route path="/add-note" element={<AddNote />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </EditProvider>
         </AuthProvider>
      </Router>
   );
};

export default App;
