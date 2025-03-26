import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";

const products = [
  { id: 1, name: "Smartphone", image: "/images/smartphone.jpg", price: "$599" },
  { id: 2, name: "Headphones", image: "/images/headphones.jpg", price: "$99" },
  { id: 3, name: "Laptop", image: "/images/laptop.jpg", price: "$899" },
  { id: 4, name: "Tablet", image: "/images/tablet.jpg", price: "$399" },
  { id: 5, name: "Smartwatch", image: "/images/smartwatch.jpg", price: "$299" },
  { id: 6, name: "Camera", image: "/images/camera.jpg", price: "$499" },
  { id: 7, name: "Speaker", image: "/images/speaker.jpg", price: "$199" },
  { id: 8, name: "Monitor", image: "/images/monitor.jpg", price: "$349" },
  { id: 9, name: "Keyboard", image: "/images/keyboard.jpg", price: "$129" },
  { id: 10, name: "Mouse", image: "/images/mouse.jpg", price: "$59" },
  { id: 11, name: "Router", image: "/images/router.jpg", price: "$89" },
  { id: 12, name: "External SSD", image: "/images/ssd.jpg", price: "$149" },
  { id: 13, name: "Drone", image: "/images/drone.jpg", price: "$799" },
];

const PRODUCTS_PER_PAGE = 10;

const ManageProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Get current products
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-500 mb-6">Manage Products</h1>

        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Image</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Name</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Price</th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-700">
              {currentProducts.map((product) => (
                <tr key={product.id} className="bg-zinc-800 hover:bg-zinc-750 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-md" 
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-200 font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-amber-400">{product.price}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-3">
                      <button 
                        className="p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                        aria-label="Edit product"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                        aria-label="Delete product"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;