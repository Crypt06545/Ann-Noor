import React from "react";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const ProDemo = () => {
  return (
    <div className="bg-zinc-900 min-h-screen p-5">
      <div>
        <h1 className="text-white text-xl">This is heading</h1>
      </div>
      <div className="md:flex gap-5 mt-8 justify-between items-center">
        {/* right div  */}
        <div className="border lg:w-[50%] lg:h-[580px] w-[580px] h-[580px]  bg-amber-200"></div>

        {/* left div  */}
        <div className="border border-gray-50 lg:w-[48%] lg:h-[580px] w-[370px] h-[400px] p-3.5">
          <h1 className="text-white text-3xl">Red TBC Perfume Oil</h1>
          <div className="my-6">
            <Divider className="bg-gray-100" />
          </div>
          <div>
            <h1 className="text-amber-500 text-3xl font-robotoCondensed">
              490.00৳ – 990.00৳{" "}
            </h1>
          </div>
          <div className="text-white mt-4">
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
          <div>
            <h2 className="text-white">Size: 6 ML (Oil Version)</h2>
          </div>
          <div className="flex justify-between items-center w-[380px] mt-4">
            <Tooltip className="text-black" title="6 Ml" placement="top">
              <Button variant="contained" className="!bg-neutral-800">
                Contained
              </Button>
            </Tooltip>
            <Tooltip className="text-black" title="6 Ml" placement="top">
              <Button variant="contained" className="!bg-neutral-800">
                Contained
              </Button>
            </Tooltip>
            <Tooltip className="text-black" title="6 Ml" placement="top">
              <Button variant="contained" className="!bg-neutral-800">
                Contained
              </Button>
            </Tooltip>
          </div>
          <h1 className="text-amber-500 text-3xl font-robotoCondensed mt-4">
            490.00৳ – 990.00৳{" "}
          </h1>

          <div className="flex">
            <div className="border">
              <button></button>
              <h3></h3>
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDemo;
