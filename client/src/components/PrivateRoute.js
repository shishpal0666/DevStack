import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  // const userData = localStorage.getItem("blog-user");
  const isAuthenticated = true; // Replace with actual authentication check

  return isAuthenticated ? children : <Navigate to="/login" />;
};