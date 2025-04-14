import { useGSAP } from "@gsap/react";
import React, { useState, useEffect, useRef } from "react";
import {
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import useUserStore from "../stores/useUserStore";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about-us" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/products" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { user, setUser } = useState(false);
  const { user, logOut } = useUserStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(1); // Cart items count
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut()
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".logo, .mobile-icon, .nav-link , .dev-icons", {
      y: -40,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.15,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.from(".mobile-nav", {
        opacity: 0,
        x: -60,
        duration: 0.5,
        stagger: 0.25,
      });
    }
  }, [isOpen]);

  return (
    <nav className="bg-zinc-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-11/12 mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="logo font-robotoSlab text-2xl font-extrabold">
          Ann Noor
        </h1>

        {/* Desktop Nav */}
        <ul className="md:flex items-center hidden gap-10">
          {navLinks.map((link) => (
            <li className="nav-link" key={link.name}>
              <NavLink
                className={({ isActive }) =>
                  `hover:text-amber-600 transition ${
                    isActive ? "text-amber-600" : ""
                  }`
                }
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="dev-icons hidden md:flex text-xl space-x-4 items-center">
          {user ? (
            <div
              className="relative group"
              ref={dropdownRef}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="cursor-pointer">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-amber-600"
                />
              </div>

              {/* Dropdown that appears on hover */}
              <div
                className={`absolute right-0 mt-2 w-32 bg-zinc-800 rounded-md shadow-lg py-1 z-50 transition-all duration-300 ${
                  showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-zinc-700 w-full text-left"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
                <NavLink
                  to="/my-orders"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-700"
                >
                  My Orders
                </NavLink>
              </div>
            </div>
          ) : (
            <button>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 font-medium"
              >
                Login
              </NavLink>
            </button>
          )}

          <button className="relative">
            <FiShoppingBag className="hover:text-amber-600 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </button>
        </div>

        {/* Mobile Icons */}
        <button onClick={toggleNav} className="mobile-icon md:hidden text-xl">
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="mobile-nav md:hidden fixed bg-zinc-800/95 backdrop-blur-sm p-6 top-16 left-0 w-full h-[calc(100vh-4rem)] shadow-xl border-t border-zinc-700 overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <ul className="space-y-6 py-4 border-b border-zinc-700">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg transition-all text-lg ${
                          isActive
                            ? "bg-amber-600/10 text-amber-500 font-semibold border-l-4 border-amber-500"
                            : "text-zinc-200 hover:bg-zinc-700/50 hover:text-white"
                        }`
                      }
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* User Section */}
              <div className="py-6 border-b border-zinc-700">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-white">Welcome back</p>
                        <p className="text-sm text-zinc-300">{user.email}</p>
                      </div>
                    </div>

                    <NavLink
                      to="/my-orders"
                      className={({ isActive }) =>
                        `flex items-center py-3 px-4 rounded-lg text-lg ${
                          isActive
                            ? "bg-amber-600/10 text-amber-500"
                            : "text-zinc-200 hover:bg-zinc-700/50"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <FiPackage className="mr-3" />
                      My Orders
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="flex items-center py-3 px-4 rounded-lg text-lg text-zinc-200 hover:bg-zinc-700/50 w-full"
                    >
                      <FiLogOut className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button>
                      <NavLink
                        to="/login"
                        className="block w-full py-3 px-6 text-center bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </NavLink>
                    </button>
                    <NavLink
                      to="/register"
                      className="block w-full py-3 px-6 text-center border border-zinc-600 hover:border-zinc-400 text-white font-medium rounded-lg transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Cart Section */}
              <div className="py-6">
                <NavLink
                  to={"/cart"}
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-zinc-700/50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <FiShoppingBag className="text-xl mr-3 text-amber-500" />
                    <span className="text-lg text-zinc-200">Shopping Cart</span>
                  </div>
                  <span className="bg-amber-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
