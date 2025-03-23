import { useGSAP } from "@gsap/react";
import React, { useState, useRef, useEffect } from "react";
import { FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about-us" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".logo", { y: -10, opacity: 0, duration: 1, delay: 0.2 });
    tl.from(".nav-link", { opacity: 0, y: -25, duration: 0.54, stagger: 0.2 }, "-=0.5");
    tl.from(".dev-icons", { opacity: 0, y: -20, duration: 1 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.from('.mobile-nav', { opacity: 0, x: -60, duration: 0.5,stagger:0.25 });
    }
  }, [isOpen]);

  return (
    <nav className="bg-zinc-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-11/12 mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="logo font-robotoSlab text-2xl font-extrabold">Ann Noor</h1>

        {/* Desktop Nav */}
        <ul className="md:flex items-center hidden gap-10">
          {navLinks.map((link) => (
            <li className="nav-link" key={link.name}>
              <NavLink className={({ isActive }) => `hover:text-amber-600 transition ${isActive ? "text-amber-600" : ""}`} to={link.path}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="dev-icons hidden md:flex text-xl space-x-4">
          <button><FiUser className="hover:text-amber-600 cursor-pointer" /></button>
          <button><FiHeart className="hover:text-amber-600 cursor-pointer" /></button>
          <button><FiShoppingBag className="hover:text-amber-600 cursor-pointer" /></button>
        </div>

        {/* Mobile Icons */}
        <button onClick={toggleNav} className="md:hidden text-xl">
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden fixed font-bold bg-zinc-800 p-4 top-16 left-0 w-full shadow-lg">
            <ul className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <li className="mobile-nav" key={link.name}>
                  <NavLink className={({ isActive }) => `hover:text-amber-600 transition text-xl ${isActive ? "text-amber-600" : ""}`} to={link.path}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
