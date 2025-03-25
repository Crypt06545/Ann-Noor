import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      stockStatus: "inStock",
      category: "",
      brand: "",
      images: [],
      sku: "",
      tags: [],
    }
  });

  const [tagInput, setTagInput] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [...previews];
    });

    // React Hook Form will handle the files through the register
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagAdd = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (tagInput.trim() !== "") {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      tags,
      images: imagePreviews.length // In a real app, you'd upload the actual files
    };
    
    console.log("Product data submitted:", formData);
    alert("Product added successfully!");
    
    // Reset form
    reset();
    setImagePreviews([]);
    setTags([]);
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 md:p-8 font-robotoCondensed">
      <div className="max-w-6xl mx-auto bg-zinc-950 rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Product Name*
                </label>
                <input
                  {...register("name", { required: "Product name is required" })}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Category*
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Garden</option>
                  <option value="beauty">Beauty</option>
                  <option value="sports">Sports & Outdoors</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  SKU
                </label>
                <input
                  {...register("sku")}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Description*
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows="4"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-500">
                    $
                  </span>
                  <input
                    type="number"
                    {...register("price", { 
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" }
                    })}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Quantity*
                </label>
                <input
                  type="number"
                  {...register("quantity", { 
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity must be positive" }
                  })}
                  min="0"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Stock Status*
                </label>
                <select
                  {...register("stockStatus", { required: true })}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                >
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                  <option value="backorder">Backorder</option>
                  <option value="preorder">Preorder</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Product Images
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Upload Images
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-amber-500"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-amber-500">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium hover:text-amber-600 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          {...register("images")}
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-amber-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Product Tags
            </h2>
            <div>
              <label className="block text-sm font-medium text-amber-500 mb-1">
                Add Tags
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Type a tag and press Enter"
                className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1.5 inline-flex text-amber-600 hover:text-amber-800 focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                reset();
                setImagePreviews([]);
                setTags([]);
              }}
              className="px-4 py-2 border border-zinc-700 rounded-md text-sm font-medium text-amber-500 bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-zinc-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;