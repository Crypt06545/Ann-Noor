import React from "react";
import { Outlet } from "react-router-dom";
import AdminLauout from "./AdminLauout";

const DashLayout = () => {
  return (
    <div className="flex">
      {/* Add sidebar links here */}
      
      <AdminLauout />

      {/* Main content area (flexible) */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;
