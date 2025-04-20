import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      perfumeTitle: "",
      fragranceNotes: "",
      lastingTime: "",
      smellProjection: "",
      usage: "",
      price: "",
      quantity: "",
      stockStatus: "inStock",
      category: "",
      images: [],
      sku: "",
      tags: [],
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // Only store File objects
  const [tags, setTags] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Only store the File objects
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    // Simply remove the file from the array
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
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
      images: imageFiles, // Array of File objects
      imageCount: imageFiles.length,
    };

    console.log("Product data submitted:", {
      ...formData,
      // Detailed file information
      filesInfo: imageFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      })),
    });

    // Reset form
    reset();
    setImageFiles([]);
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
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* 
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
              </div> */}

              {/* category section  */}
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Category*
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Garden</option>
                  <option value="beauty">Beauty</option>
                  <option value="sports">Sports & Outdoors</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* sku field  */}
              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  SKU
                </label>
                <input
                  placeholder="VB-P-OIL-12ML-2"
                  {...register("sku")}
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-4">
                {/* Product Title */}
                <div>
                  <label className="block text-sm font-medium text-amber-500 mb-1">
                    Perfume Title*
                  </label>
                  <input
                    {...register("perfumeTitle", {
                      required: "Perfume title is required",
                    })}
                    type="text"
                    placeholder="e.g., VAMPIRE BLOOD – The Ultimate Long Lasting Perfume for Men & Women"
                    className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                  {errors.perfumeTitle && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.perfumeTitle.message}
                    </p>
                  )}
                </div>

                {/* Fragrance Notes */}
                <div>
                  <label className="block text-sm font-medium text-amber-500 mb-1">
                    Fragrance Notes*
                  </label>
                  <input
                    {...register("fragranceNotes", {
                      required: "Fragrance notes are required",
                    })}
                    type="text"
                    placeholder="e.g., Dark Berry, Sweet Vanilla, Refreshing Palm"
                    className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                  {errors.fragranceNotes && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fragranceNotes.message}
                    </p>
                  )}
                </div>

                {/* Lasting Time */}
                <div>
                  <label className="block text-sm font-medium text-amber-500 mb-1">
                    Lasting Time*
                  </label>
                  <input
                    {...register("lastingTime", {
                      required: "Lasting time is required",
                    })}
                    type="text"
                    placeholder="e.g., 8-16 Hours"
                    className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                  {errors.lastingTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastingTime.message}
                    </p>
                  )}
                </div>

                {/* Smell Projection */}
                <div>
                  <label className="block text-sm font-medium text-amber-500 mb-1">
                    Smell Projection*
                  </label>
                  <input
                    {...register("smellProjection", {
                      required: "Smell projection is required",
                    })}
                    type="text"
                    placeholder="e.g., 1-8 Feet"
                    className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                  {errors.smellProjection && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.smellProjection.message}
                    </p>
                  )}
                </div>

                {/* Usage */}
                <div>
                  <label className="block text-sm font-medium text-amber-500 mb-1">
                    Recommended Usage*
                  </label>
                  <input
                    {...register("usage", {
                      required: "Usage information is required",
                    })}
                    type="text"
                    placeholder="e.g., Perfect for office, special occasions, and masjid"
                    className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                  {errors.usage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.usage.message}
                    </p>
                  )}
                </div>
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
                    placeholder="100"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-500 mb-1">
                  Quantity*
                </label>
                <input
                  type="number"
                  placeholder="10"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity must be positive" },
                  })}
                  min="0"
                  className="w-full px-3 py-2 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-800 text-white"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantity.message}
                  </p>
                )}
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
                {imageFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative bg-zinc-800 p-3 rounded-md border border-zinc-700"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="bg-zinc-700 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-amber-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-amber-500 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
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
                  <div className="space-y-1 text-center ">
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
                        <span className="text-gray-200 px-[10px] py-[4px] active:scale-75 rounded-xl bg-amber-400">
                          Upload files
                        </span>
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
                setImageFiles([]);
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