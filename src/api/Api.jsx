import axiosInstance from "../lib/axios";

// fetch best selling products
export const fetchBestSellingProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/all-products");
    return response;
  } catch (error) {
    console.log(error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const producDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/product-details/${id}`);
    // reconsole.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
