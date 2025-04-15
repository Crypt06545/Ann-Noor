import React, { useState } from "react";
import { useForm } from "react-hook-form";

const DAddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);

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

  const onSubmit = (data) => {
    // Convert comma-separated tags and sizes to arrays
    data.tags = data.tags.split(",").map((tag) => tag.trim());
    data.sizes = data.sizes.split(",").map((size) => size.trim());

    console.log("Form Data:", data);
    console.log(
      "Selected Image Files:",
      imageFiles.filter((img) => img !== null)
    );

    reset();
    setImages([null, null, null, null]);
    setImageFiles([null, null, null, null]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 text-zinc-200">
      <div className="max-w-4xl mx-auto bg-zinc-800 p-6 md:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-amber-500 mb-6">
          Add New Product
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload */}
          <div>
            <label className="block text-amber-500 font-medium mb-2">
              Product Images
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
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Arabian Oud Supreme"
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-amber-500 mb-1 font-medium">
              Product Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Briefly describe the features and benefits of your product."
              className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-600 resize-none outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* SKU, Tags, Sizes */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                SKU
              </label>
              <input
                type="text"
                {...register("sku")}
                placeholder="e.g. PERF-1001"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Tags{" "}
                <span className="text-xs text-zinc-400">(comma separated)</span>
              </label>
              <input
                type="text"
                {...register("tags")}
                placeholder="e.g. Fresh, Long-lasting, Floral"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Sizes{" "}
                <span className="text-xs text-zinc-400">(comma separated)</span>
              </label>
              <input
                type="text"
                {...register("sizes")}
                placeholder="e.g. 50ml, 100ml, 150ml"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Price & Offer Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Price
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="e.g. 4500"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Offer Price
              </label>
              <input
                type="number"
                {...register("offerPrice")}
                placeholder="e.g. 3999"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select</option>
                <option value="Perfume">Perfume</option>
                <option value="Oil Perfume">Oil Perfume</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Brand
              </label>
              <input
                type="text"
                {...register("brand")}
                placeholder="e.g. Oud Arabia"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Stock & Availability */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Stock Status
              </label>
              <select
                {...register("stockStatus")}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="low in Stock">Low in Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-amber-500 mb-1 font-medium">
                Availability
              </label>
              <input
                type="text"
                {...register("availability")}
                placeholder="e.g. Ships in 1-2 days"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-6 py-2 rounded shadow-md transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DAddProduct;
