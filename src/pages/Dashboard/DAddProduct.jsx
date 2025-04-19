import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const DAddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviews = [...images];
      const newFiles = [...imageFiles];
      newPreviews[index] = URL.createObjectURL(file);
      newFiles[index] = file;
      setImages(newPreviews);
      setImageFiles(newFiles);
    }
  };

  const handleImageRemove = (index) => {
    const newPreviews = [...images];
    const newFiles = [...imageFiles];
    newPreviews[index] = null;
    newFiles[index] = null;
    setImages(newPreviews);
    setImageFiles(newFiles);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Convert comma-separated tags to array
      data.tags = data.tags
        ? data.tags.split(",").map((tag) => tag.trim())
        : [];
      data.sizes = data.sizes
        ? data.sizes
            .split(",")
            .map((size) => size.trim())
            .filter((size) => size)
        : [];

      // Create FormData for file upload
      const formData = new FormData();

      // Append all non-empty image files
      imageFiles.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });

      // Append other form data
      const productData = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        offerPrice: Number(data.offerPrice),
        quantity: Number(data.quantity),
        availability: data.availability,
        stockStatus: data.stockStatus,
        category: data.category,
        sku: data.sku,
        sizes: data.sizes,
        tags: data.tags,
      };

      // Append all fields to FormData
      Object.keys(productData).forEach((key) => {
        if (key === "tags" || key === "sizes") {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });

      // Send the request
      const response = await axiosInstance.post(
        "/products/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);

      toast.success(response?.data?.message || "Product added successfully!");
      reset();
      setImages([null, null, null, null]);
      setImageFiles([null, null, null, null]);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 text-zinc-200">
      <div className="max-w-4xl mx-auto bg-zinc-800 p-6 md:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-amber-500 mb-6">
          Add New Product
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Product Images */}
          <div>
            <label className="block text-amber-500 font-medium mb-2">
              Product Images (Max 4) *
            </label>
            <div className="flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <label htmlFor={`image${index}`}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`image${index}`}
                      hidden
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    <img
                      src={
                        img
                          ? img
                          : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                      }
                      alt="upload"
                      className="w-24 h-24 object-cover border border-zinc-600 rounded cursor-pointer hover:scale-105 transition"
                    />
                  </label>
                  {img && (
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {imageFiles.every((file) => file === null) && (
              <p className="text-red-500 text-sm mt-1">
                At least one image is required
              </p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Product Name *
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Brand *
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand is required" })}
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          {/* Price Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Price (₹) *
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Offer Price (₹) *
              </label>
              <input
                type="number"
                {...register("offerPrice", {
                  required: "Offer price is required",
                  min: { value: 0, message: "Offer price must be positive" },
                })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.offerPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.offerPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Quantity *
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 0, message: "Quantity must be positive" },
              })}
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* sizes  */}

          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Sizes (comma separated) *
            </label>
            <input
              type="text"
              {...register("sizes", {
                required: "At least one size is required",
                validate: (value) => {
                  const sizes = value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s);
                  return sizes.length > 0 || "Please enter at least one size";
                },
              })}
              placeholder="e.g. 50ml, 100ml, XL, L"
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.sizes && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sizes.message}
              </p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              SKU (Stock Keeping Unit) *
            </label>
            <input
              type="text"
              {...register("sku", { required: "SKU is required" })}
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.sku && (
              <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Category *
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Category</option>
              <option value="Perfume">Perfume</option>
              <option value="Oil Perfume">Oil Perfume</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Stock Status *
            </label>
            <select
              {...register("stockStatus", {
                required: "Stock status is required",
              })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="lowStock">Low in Stock</option>
            </select>
            {errors.stockStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stockStatus.message}
              </p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Availability *
            </label>
            <input
              type="text"
              {...register("availability", {
                required: "Availability is required",
              })}
              placeholder="e.g. Ships in 1-2 days"
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availability.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Tags (comma separated)
            </label>
            <input
              type="text"
              {...register("tags")}
              placeholder="e.g. premium, luxury, summer"
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={
                isSubmitting || imageFiles.every((file) => file === null)
              }
              className={`bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-6 py-2 rounded shadow-md transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DAddProduct;
