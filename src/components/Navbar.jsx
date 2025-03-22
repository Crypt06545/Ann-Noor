import { useGSAP } from "@gsap/react";
import React, { useState } from "react";
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

      // create timeline
      const tl = gsap.timeline()
      // logo animation
      tl.from(".logo", {
        y: -10,
        opacity: 0,
        duration: 1,
        delay: 0.20,
      });

      // navlink animation
      tl.from('.nav-link',{
          opacity:0,
          y:-25,
          duration:0.54,
          stagger:0.2,
      },'-=0.5')

      tl.from('.dev-icons',{
          opacity:0,
          y:-20,
          duration:1
      })

    },[]);
  return (
    <nav className="bg-zinc-950 text-white sticky z-50">
      <div className="max-w-11/12 mx-auto flex justify-between items-center p-4">
        {/* logo  */}
        <h1 className="logo font-robotoSlab text-2xl font-extrabold">
          Ann Noor
        </h1>

        {/* desktop nav  */}
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

        {/* desktop icons  */}
        <div className="dev-icons hidden md:flex text-xl space-x-4">
          <button>
            <FiUser className="hover:text-amber-600 cursor-pointer" />
          </button>
          <button>
            <FiHeart className="hover:text-amber-600 cursor-pointer" />
          </button>
          <button>
            <FiShoppingBag className="hover:text-amber-600 cursor-pointer" />
          </button>
        </div>

        {/* mobile icons  */}
        <button onClick={toggleNav} className="md:hidden text-xl">
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
        {/* mobile nav  */}
        {isOpen && (
          <div
            className={`md:hidden absolute g-black p-4 top-16 left-0 w-full shadow-lg`}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
