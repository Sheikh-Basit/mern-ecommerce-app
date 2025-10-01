import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.login);

  if (!token) {
    return <Navigate to="/login" replace />; // not logged in
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/401" replace />; // logged in but wrong role
  }

  return <Outlet />; //  authorized -> render child route
};

export default ProtectedRoute;