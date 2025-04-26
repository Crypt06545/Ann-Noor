import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { producDetails } from "../../api/Api";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const { loading, setLoading } = useAppContext();

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => producDetails(id),
  });
  // console.log(data);

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    offerPrice: "",
    quantity: "",
    category: "",
    stockStatus: "",
    sizes: [],
    tags: [],
    sku: "",
  });

  // Set initial form data when API data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const product = data?.data?.data;

      // Parse sizes and tags which are stringified arrays
      const parsedSizes =
        typeof product.sizes === "string"
          ? JSON.parse(product.sizes)
          : product.sizes || [];

      const parsedTags =
        typeof product.tags === "string"
          ? JSON.parse(product.tags)
          : product.tags || [];

      setFormData({
        productName: product?.name || "",
        price: product?.price || "",
        offerPrice: product?.offerPrice || "",
        quantity: product?.quantity || "",
        category: product?.category || "",
        stockStatus: product?.stockStatus || "",
        sizes: parsedSizes.map((size) => ({ id: size, text: size })),
        tags: parsedTags.map((tag) => ({ id: tag, text: tag })),
        sku: product.sku || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSize = (tag) => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, tag],
    }));
  };

  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      // Prepare data for submission
      const submissionData = {
        name: formData.productName,
        price: parseFloat(formData.price),
        offerPrice: parseFloat(formData.offerPrice),
        quantity: parseInt(formData.quantity),
        category: formData.category,
        stockStatus: formData.stockStatus,
        sizes: formData.sizes.map((size) => size.text),
        tags: formData.tags.map((tag) => tag.text),
        sku: formData.sku,
      };

      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to update this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        // Send PUT request
        const { data } = await axiosInstance.put(
          `/products/update-product/${id}`,
          submissionData
        );

        // Show success message
        toast.success("Product updated successfully!");

        console.log("Update response:", data);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-zinc-900 border border-zinc-700 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">
        Update Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Product Name
            </label>
            <input
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Offer Price
              </label>
              <input
                type="number"
                step="0.01"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Category</option>
              <option value="Perfume">Perfume</option>
              <option value="Oil Perfume">Oil Perfume</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Stock Status
            </label>
            <select
              name="stockStatus"
              value={formData.stockStatus}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Status</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="lowStock">Low Stock</option>
            </select>
          </div>
        </div>

        {/* Sizes and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Sizes
            </label>
            <ReactTags
              tags={formData.sizes}
              handleDelete={handleRemoveSize}
              handleAddition={handleAddSize}
              placeholder="Add sizes (e.g., S, M, L)"
              inputFieldPosition="bottom"
              classNames={{
                tags: "react-tags",
                tagInput: "mb-2",
                tagInputField:
                  "w-full p-2 bg-zinc-800 text-zinc-200 placeholder-zinc-500 border border-zinc-600 rounded-md focus:ring-amber-500 focus:outline-none",
                selected: "flex flex-wrap gap-2",
                tag: "bg-amber-500 text-black px-3 py-1 rounded-md text-sm font-medium",
                remove: "ml-2 text-red-300 cursor-pointer",
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Tags
            </label>
            <ReactTags
              tags={formData.tags}
              handleDelete={handleRemoveTag}
              handleAddition={handleAddTag}
              placeholder="Add tags (e.g., summer, luxury)"
              inputFieldPosition="bottom"
              classNames={{
                tags: "react-tags",
                tagInput: "mb-2",
                tagInputField:
                  "w-full p-2 bg-zinc-800 text-zinc-200 placeholder-zinc-500 border border-zinc-600 rounded-md focus:ring-amber-500 focus:outline-none",
                selected: "flex flex-wrap gap-2",
                tag: "bg-amber-400 text-black px-3 py-1 rounded-md text-sm font-medium",
                remove: "ml-2 text-red-300 cursor-pointer",
              }}
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="block text-zinc-300 text-sm mb-1 font-medium">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="VAM-OIL-003"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
