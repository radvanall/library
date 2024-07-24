import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const RequireUnauth = () => {
  const { user } = useAuthContext();
  console.log("runauth=", user);
  return user.id === null ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireUnauth;
