import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";

export default function AddProduct() {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      productName: "",
      price: "",
      quantity: "",
      category: "",
      sizes: [],
      tags: [],
      images: [null, null, null, null],
    },
  });
  const images = watch("images") || [];

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updated = [...images];
    updated[index] = file; // Set selected image
    setValue("images", updated, { shouldValidate: true });
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated[index] = null; // Reset image to null (remove)
    setValue("images", updated, { shouldValidate: true });
  };

  const sizes = watch("sizes") || [];
  const tags = watch("tags") || [];

  const handleAddSize = (tag) => {
    const updated = [...sizes, tag];
    setValue("sizes", updated, { shouldValidate: true });
  };

  const handleRemoveSize = (index) => {
    setValue(
      "sizes",
      sizes.filter((_, i) => i !== index),
      {
        shouldValidate: true,
      }
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
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", {
      ...data,
      sizes: data.sizes.map((tag) => tag.text),
      tags: data.tags.map((tag) => tag.text),
      images: data.images,
    });

    reset({
      productName: "",
      price: "",
      quantity: "",
      category: "",
      sizes: [],
      tags: [],
      images: [null, null, null, null],
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-zinc-900 border border-zinc-700 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-amber-500 mb-6 text-center">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* images field  */}
        <div>
          <label className="block mb-2 text-sm font-medium text-zinc-300">
            Product Images
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="relative">
                  <label htmlFor={`image${index}`}>
                    <input
                      accept="image/*"
                      type="file"
                      id={`image${index}`}
                      hidden
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    <img
                      className="max-w-24 cursor-pointer border border-zinc-600 rounded-md"
                      src={
                        images[index]
                          ? URL.createObjectURL(images[index]) // Preview selected image
                          : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png" // Default image if not selected
                      }
                      alt="uploadArea"
                      width={100}
                      height={100}
                    />
                  </label>

                  {images[index] && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)} // Remove image when clicked
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                    >
                      <span className="text-xl">×</span> {/* Close icon */}
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* price offerprce  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Product Name
            </label>
            <input
              {...register("productName")}
              placeholder="Enter product name"
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Price */}
          {/* Price, Offer Price, Quantity in one row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="Enter price"
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Offer Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Offer Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("offerPrice")}
                placeholder="offer price"
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
 
            {/* Quantity */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity")}
                placeholder="Enter quantity"
                className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Category *
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue=""
            >
              <option value="">Select Category</option>
              <option value="Perfume">Perfume</option>
              <option value="Oil Perfume">Oil Perfume</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <label className="block mb-2 text-sm font-medium text-zinc-300">
            Stock Status *
          </label>
          <select
            {...register("stockStatus", { required: true })}
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select Stock Status
            </option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
            <option value="lowStock">Low in Stock</option>
          </select>
        </div>
        {/* Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sizes */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Sizes
            </label>
            <ReactTags
              tags={sizes}
              handleDelete={handleRemoveSize}
              handleAddition={handleAddSize}
              placeholder="Add sizes (e.g., M, L, XL)"
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

          {/* Tags */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Tags
            </label>
            <ReactTags
              tags={tags}
              handleDelete={handleRemoveTag}
              handleAddition={handleAddTag}
              placeholder="Add product tags"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-md transition duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
