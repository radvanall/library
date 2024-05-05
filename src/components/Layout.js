import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
