import React from "react";
import heroImg from "../assets/images/hero-right.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Hero = () => {
  return (
    <div className="relative bg-zinc-900 text-white min-h-screen w-11/12 mx-auto">
      {/* Background Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-[120px] opacity-30"></div>
      {/* <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500 rounded-full blur-[120px] opacity-30"></div> */}

      {/* Hero Content */}
      <div className="md:flex justify-between p-5 lg:p-16 gap-5">
        <div className="lg:w-[60%]">
          <h1 className="lg:text-6xl font-robotoCondensed lg:leading-[1.1] text-3xl leading-[1.3] p-4  font-bold">
            Elevate Your Spirit with Victory Scented Fragrances!
          </h1>
          <p className="font-robotoSlab lg:text-xl font-light p-4 text-gray-300">
            Indulge in the essence of success with Victory Scented Fragrances.
            Experience the perfect blend of luxury and confidence, designed to
            elevate your everyday moments. Shop now and discover a scent that
            speaks to your victory.
          </p>
          <div className="p-4 flex flex-wrap gap-3 lg:gap-4">
            {/* oreder button  */}
            <button className="px-6 py-3 lg:px-7 lg:py-3.5 rounded-lg text-black font-medium bg-amber-500 hover:bg-amber-600 cursor-pointer shadow-lg hover:shadow-amber-500/20 flex items-center transition group active:scale-95 active:shadow-inner">
              <MdOutlineShoppingCart className="mr-2 lg:mr-3 text-lg lg:text-xl group-hover:rotate-12 transition-transform" />
              <span className="text-base lg:text-xl">Shop Now</span>
            </button>

            {/* oreder button  */}
            <button className="px-6 py-3 lg:px-7 lg:py-3.5 rounded-lg text-white font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 group-hover:opacity-100 cursor-pointer flex items-center transition group active:scale-95 active:shadow-inner">
              <MdOutlineShoppingCart className="mr-2 lg:mr-3 text-lg opacity-70 lg:text-xl  transition-opacity" />
              <span className="text-base lg:text-xl">Shop Now</span>
            </button>
          </div>
        </div>
        <div className="lg:w-[40%]">
          <div className="flex justify-center items-center">
            <img className="h-[550px]" src={heroImg} alt="" />
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-8 left-8 lg:bottom-36 lg:left-10 animate-bounce">
        <div className="bg-neutral-900 text-white px-2.5 py-1.5 rounded-lg text-xs lg:text-sm flex items-center shadow-lg">
          <MdOutlineShoppingCart className="mr-1 text-amber-500" />
          <span>Order Now</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
