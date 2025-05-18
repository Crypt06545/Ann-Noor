import { useGSAP } from "@gsap/react";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  // console.log(user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Products", path: "/products" },
  ];

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const logOut = async () => {
    try {
      const { data } = await axiosInstance.post("/users/logout");
      if (data.success) {
        toast.success(data?.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

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
        <Link to={'/'} className="logo font-robotoSlab text-2xl font-extrabold">
          Ann Noor
        </Link>

        {/* Desktop Navigation */}
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
          {!user ? (
            <button>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 font-medium"
              >
                Login
              </NavLink>
            </button>
          ) : (
            <>
              <div className="relative group">
                <img
                  className="w-10 rounded-full"
                  src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                  alt="user"
                />
                <ul className="hidden group-hover:block absolute top-10 right-0 bg-zinc-800 shadow py-2.5 w-30 rounded-md text-sm z-40">
                  <li className="p-1.5 pl-3 hover:bg-zinc-600 cursor-pointer">
                    <NavLink
                      to={user.role === "admin" ? "/dashboard" : "/my-orders"}
                    >
                      {user.role === "admin" ? "Dashboard" : "My Orders"}
                    </NavLink>
                  </li>
                  <li className="p-1.5 pl-3 hover:bg-zinc-600 cursor-pointer">
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>

              <NavLink to="/cart" className="relative">
                <FiShoppingBag className="hover:text-amber-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {user?.cartItems?.reduce(
                    (total, item) => total + (item.quantity || 0),
                    0
                  ) || 0}
                </span>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNav}
          className="mobile-icon md:hidden text-xl"
          aria-label="Toggle menu"
        >
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-nav md:hidden fixed bg-zinc-800/95 backdrop-blur-sm p-6 top-16 left-0 w-full h-[calc(100vh-4rem)] shadow-xl border-t border-zinc-700 overflow-y-auto">
            <div className="flex flex-col h-full">
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

              {/* Auth Links */}
              <div className="py-6 border-b border-zinc-700 space-y-4">
                {!user ? (
                  <button>
                    <NavLink
                      to="/login"
                      className="block w-full py-3 px-6 text-center bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                  </button>
                ) : (
                  <>
                    <NavLink
                      to={user.role === "admin" ? "/dashboard" : "/my-orders"}
                      className="block w-full py-3 px-6 text-center bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors duration-200 mb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {user.role === "admin" ? "Dashboard" : "My Orders"}
                    </NavLink>
                    <button
                      onClick={() => {
                        logOut();
                        setIsOpen(false);
                      }}
                      className="block w-full py-3 px-6 text-center bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>

              {/* Cart Link */}
              <div className="py-6">
                <NavLink
                  to="/cart"
                  className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-zinc-700/50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <FiShoppingBag className="text-xl mr-3 text-amber-500" />
                    <span className="text-lg text-zinc-200">Shopping Cart</span>
                  </div>
                  <span className="bg-amber-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {user?.cartItems?.reduce(
                      (total, item) => total + (item.quantity || 0),
                      0
                    ) || 0}
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
