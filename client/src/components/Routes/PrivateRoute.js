import React from "react";
// ...existing code...
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem("blog-user");
  
  return userData ? children : <Navigate to="/login" replace/>
};