import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FooterThree } from "../common/Footer";

const Layout = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Outlet />
      <FooterThree />
    </div>
  );
};

export default Layout;
