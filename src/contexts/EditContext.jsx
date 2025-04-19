import React, { createContext, useState } from "react";

export const EditContext = createContext(null);

export const EditProvider = ({ children }) => {
   const [isEditing, setIsEditing] = useState(false);

   return <EditContext value={{ isEditing, setIsEditing }}>{children}</EditContext>;
};
