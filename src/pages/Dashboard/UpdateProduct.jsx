import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";


export default function updateProduct() {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      productName: "",
      price: "",
      offerPrice: "",
      quantity: "",
      category: "",
      stockStatus: "",
      sizes: [],
      tags: [],
      slu:'',
      images: [null, null, null, null],
    },
  });

  const {loading,setLoading} = useAppContext()

  const images = watch("images") || [];
  const sizes = watch("sizes") || [];
  const tags = watch("tags") || [];

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updated = [...images];
    updated[index] = file;
    setValue("images", updated, { shouldValidate: true });
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated[index] = null;
    setValue("images", updated, { shouldValidate: true });
  };

  const handleAddSize = (tag) => {
    const updated = [...sizes, tag];
    setValue("sizes", updated, { shouldValidate: true });
  };

  const handleRemoveSize = (index) => {
    setValue(
      "sizes",
      sizes.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleAddTag = (tag) => {
    const updated = [...tags, tag];
    setValue("tags", updated, { shouldValidate: true });
  };

  const handleRemoveTag = (index) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const formData = new FormData();
      
      // Append basic fields
      formData.append("name", data.productName);
      formData.append("price", data.price);
      formData.append("offerPrice", data.offerPrice || data.price);
      formData.append("quantity", data.quantity);
      formData.append("category", data.category);
      formData.append("sku", data.sku);
      formData.append("stockStatus", data.stockStatus);
      
      // Append sizes and tags as arrays
      data.sizes.forEach((size) => {
        formData.append("sizes", size.text);
      });
      
      data.tags.forEach((tag) => {
        formData.append("tags", tag.text);
      });
      
      // Append images (only non-null ones)
      data.images.forEach((image) => {
        if (image) {
          formData.append("images", image);
        }
      });

      const response = await axiosInstance.put("/products/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product updated:", response);
      
      reset({
        productName: "",
        price: "",
        offerPrice: "",
        quantity: "",
        category: "",
        stockStatus: "",
        sizes: [],
        tags: [],
        sku:'',
        images: [null, null, null, null],
      });

      toast.success(response.data.message || "Product added successfully!");

    } catch (error) {
      setLoading(false)
      // console.error("Error:", error.response?.data || error.message);
      toast.error(`${error.response?.data?.message || error.message ||'Somethig Went Wrong!!'}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-zinc-900 border border-zinc-700 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Images Section */}
        <div>
          <label className="block mb-2 text-sm font-medium text-zinc-300">
            Product Images (Max 4)
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <label htmlFor={`image-${index}`} className="cursor-pointer">
                  <input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                  <div className="w-24 h-24 border-2 border-dashed border-zinc-600 rounded-md flex items-center justify-center overflow-hidden">
                    {image ? (
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-zinc-500 text-center p-2">
                        <span className="block text-3xl">+</span>
                        <span className="text-xs">Add Image</span>
                      </div>
                    )}
                  </div>
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Product Name *
            </label>
            <input
              {...register("productName", { required: true })}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
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
                {...register("offerPrice")}
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Quantity *
              </label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Category *
            </label>
            <select
              {...register("category", { required: true })}
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
              Stock Status *
            </label>
            <select
              {...register("stockStatus", { required: true })}
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
              tags={sizes}
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
              tags={tags}
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
              {...register("sku", { required: "SKU is required" })}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="VAM-OIL-003"
            />
          </div>

          <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading && (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        )}
        {loading ? "Adding..." : "Add Product"}
      </button>
      </form>
    </div>
  );
}
