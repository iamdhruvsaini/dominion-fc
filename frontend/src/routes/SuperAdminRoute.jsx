import React from "react";
import { Navigate } from "react-router-dom";

const SuperAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : null;

  if (token && role === "super-admin") {
    return children;
  }

  return <Navigate to="/admin/portal" replace={true} />;
};

export default SuperAdminRoute;
