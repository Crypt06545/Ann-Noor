import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  MdAddBox, 
  MdInventory,
  MdOutlineLocalShipping,
  MdPeople,
  MdDashboard
} from 'react-icons/md';

const DashLayout = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard className="w-6 h-6" /> },
    { name: "Add Product", path: "/dashboard/add-product", icon: <MdAddBox className="w-6 h-6" /> },
    { name: "Manage Products", path: "/dashboard/manage-products", icon: <MdInventory className="w-6 h-6" /> },
    { name: "Orders", path: "/dashboard/orders", icon: <MdOutlineLocalShipping className="w-6 h-6" /> },
    { name: "Users", path: "/dashboard/users", icon: <MdPeople className="w-6 h-6" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-zinc-900 text-white">
      
      {/* 🔼 Top Header */}
      <div className="flex items-center justify-between px-4 border-b border-zinc-700 py-3 bg-zinc-800">
        <NavLink to="/dashboard">
          <span className="text-amber-500 font-bold text-xl">Admin Panel</span>
        </NavLink>
        <div className="flex items-center gap-5 text-zinc-300">
          <p>Hi! Admin</p>
          <button className="border border-amber-500 rounded-full text-sm px-4 py-1 text-amber-500 hover:bg-amber-500/10 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* 🟨 Main Layout Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r text-base border-zinc-700 pt-4 flex flex-col bg-zinc-800">
          {sidebarLinks.map((item) => (
            <NavLink
              end
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] transition-colors
                ${
                  isActive 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                    : 'border-zinc-800 text-zinc-300 hover:bg-zinc-700/90'
                }`
              }
            >
              {item.icon}
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
