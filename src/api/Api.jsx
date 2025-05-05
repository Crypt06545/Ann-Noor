import axiosInstance from "../lib/axios";

// fetch best selling products
export const fetchBestSellingProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/all-products");
    return response;
  } catch (error) {
    // console.log(error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

// single product details
export const producDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/product-details/${id}`);
    // reconsole.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/all-users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get user orders
export const getOrders = async (email) => {
  try {
    const response = await axiosInstance.get(`/users/orders/${email}`);
    return response;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};
