import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const RequireRole = ({ roles }) => {
  const { user } = useAuthContext();

  return roles.includes(parseInt(user.role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RequireRole;
