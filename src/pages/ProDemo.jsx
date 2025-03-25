import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FaMinus, FaPlus } from "react-icons/fa";
import atorImg from "../assets/images/atorsec.png";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const ProDemo = () => {
  const [productPrice, setProductPrice] = useState(200.67);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-zinc-900 min-h-screen p-4 md:p-5">
      {/* breadcrumbs  */}
      <div>
        <Breadcrumbs aria-label="breadcrumb" className="!text-gray-200">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link>Products</Link>
          <Typography className="!text-gray-200">Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-8 justify-between mb-10">
        {/* Image section - responsive sizing */}
        <div className="w-full md:w-[50%] h-[300px] sm:h-[400px] md:h-[580px] flex justify-center items-cente mx-auto">
          <div className="flex justify-center items-center">
            <img
              src={atorImg}
              className="w-[200px] sm:w-[300px] md:w-[350px]"
              alt=""
            />
          </div>
        </div>

        {/* Product details section */}
        <div className="w-full md:w-[48%] p-3.5">
          <h1 className="text-white text-2xl md:text-3xl">
            Red TBC Perfume Oil
          </h1>

          <div className="my-6">
            <Divider className="bg-gray-100" />
          </div>

          <div>
            <h1 className="text-[#AB572D] text-2xl md:text-3xl font-robotoCondensed">
              490.00৳ – 990.00৳
            </h1>
          </div>

          {/* Product details - responsive text */}
          <div className="text-white mt-4 text-sm md:text-base">
            <h3>RED TBC – A Bold & Refreshing Everyday Scent</h3>
            <h3>
              Fragrance Notes: Red Apple, Sweet, Vanilla, Refreshing, Warm Spicy
            </h3>
            <h3>Lasting Time: 3-5 Hours</h3>
            <h3>Smell Projection: 1-4 Feet</h3>
            <h3>Usage: Ideal for office, corporate settings, and daily wear</h3>
          </div>

          <div className="my-6">
            <Divider className="bg-gray-100" />
          </div>

          {/* Size selection */}
          <div>
            <h2 className="text-white">Size: 6 ML (Oil Version)</h2>
          </div>

          {/* Responsive size buttons */}
          <div className="flex flex-wrap gap-2 md:justify-between md:w-[380px] mt-4">
            <Tooltip title="6 Ml" placement="top">
              <Button
                variant="contained"
                className="!bg-neutral-800 min-w-[100px]"
              >
                Contained
              </Button>
            </Tooltip>
            <Tooltip title="6 Ml" placement="top">
              <Button
                variant="contained"
                className="!bg-neutral-800 min-w-[100px]"
              >
                Contained
              </Button>
            </Tooltip>
            <Tooltip title="6 Ml" placement="top">
              <Button
                variant="contained"
                className="!bg-neutral-800 min-w-[100px]"
              >
                Contained
              </Button>
            </Tooltip>
          </div>

          {/* Total price */}
          <h1 className="text-[#AB572D] text-2xl md:text-3xl font-robotoCondensed mt-4">
            {(quantity * productPrice).toFixed(2)}৳
          </h1>

          {/* Quantity and buttons - responsive layout */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex items-center">
              <div className="border border-[#858585] px-[15px] py-[4px] rounded-[10px] flex justify-center items-center">
                <button
                  onClick={() => {
                    setQuantity((prev) => Math.max(1, prev - 1));
                  }}
                  className="p-2 cursor-pointer"
                >
                  <FaMinus className="text-gray-300" />
                </button>

                <h3 className="p-2 text-xl text-[#AB572D]">{quantity}</h3>

                <button
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                  className="p-2 cursor-pointer"
                >
                  <FaPlus className="text-[#AB572D]" />
                </button>
              </div>
            </div>

            {/* Button group */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="py-3 px-4 rounded-lg active:scale-95 cursor-pointer bg-[#AB572D] font-semibold whitespace-nowrap">
                Add to cart
              </button>

              <button className="py-3 px-4 rounded-lg active:scale-95 cursor-pointer bg-amber-500 font-semibold whitespace-nowrap">
                Buy Now
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-2 text-white text-sm md:text-base">
            <h3>Categories: Best SellerPerfume CollectionSweet Collection</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDemo;
