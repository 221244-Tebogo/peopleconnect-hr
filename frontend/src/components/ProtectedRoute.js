import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("Token:", token); // Debug token
  console.log("User Role:", role); // Debug user role
  console.log("Required Role:", requiredRole); // Debug required role

  if (!token || role !== requiredRole) {
    return <Navigate to="/" />; // Redirect to login
  }

  return children;
};

export default RoleProtectedRoute;
