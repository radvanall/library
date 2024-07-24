import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const RequireAuth = () => {
  const { user } = useAuthContext();
  return user.id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
