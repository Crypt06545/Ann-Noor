import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSellingProducts } from "../../api/Api";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAppContext } from "../../context/AppContext";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const PRODUCTS_PER_PAGE = 10;

const ManageProducts = () => {
  const navigate = useNavigate()
  const { currency } = useAppContext();
  const {
    data: mProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchBestSellingProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        Failed to load products.
      </div>
    );
  }

  const products = mProducts?.data?.data || [];

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Get current products
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // hadle delete
  const handleProductDelete = async (id) => {
    try {
      // Show confirmation dialog first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // Only proceed if user confirmed
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(
          `/products/delete-product/${id}`
        );
        // console.log(response);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  // handle Edit
  const handleProductEdit = async(id)=>{
    console.log(id);
    navigate(`/dashboard/update-product/${id}`)
    
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-500 mb-6">
          Manage Products
        </h1>

        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Image
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Price
                </th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-700">
              {currentProducts.map((product) => (
                <tr
                  key={product?._id}
                  className="bg-zinc-800 hover:bg-zinc-750 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={product?.images?.[0]}
                        alt={product?.name || "Product Image"}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-200 font-medium">
                    {product?.name || "No name"}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {product?.category || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-amber-400">
                    {product?.price ? `${product.price} ${currency}` : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => {
                          handleProductEdit(product?._id);
                        }}
                        className="cursor-pointer p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                        aria-label="Edit product"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          handleProductDelete(product?._id);
                        }}
                        className="cursor-pointer p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
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
