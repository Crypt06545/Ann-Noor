import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdAddBox, MdInventory} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard /> ,},
  { name: "Add Product", path: "/dashboard/add-product", icon: <MdAddBox />},
  { name: "Manage Products", path: "/dashboard/manage-products", icon: <MdInventory />},
  { name: "Orders", path: "/dashboard/orders" ,icon: <TbTruckDelivery /> },
  { name: "Users", path: "/dashboard/users" ,icon:  <FaUsers />},
];

const AdminLayout = () => {
    return (
      <div className="w-64 min-h-screen bg-zinc-900 p-4 text-zinc-200 border-r border-zinc-700">
        <h1 className="text-xl font-bold mb-6 text-white pl-2">Admin Panel</h1>
  
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-amber-600 text-white font-medium"
                      : "hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
};
  

export default AdminLayout;
