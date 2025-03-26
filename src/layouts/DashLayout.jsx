import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { FaBars, FaTimes } from "react-icons/fa";

const DashLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button 
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          {sidebarOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar - Hidden on mobile by default */}
      <div 
        className={`fixed md:relative z-10 w-64 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'left-0' : '-left-full md:left-0'}`}
      >
        <AdminLayout />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;