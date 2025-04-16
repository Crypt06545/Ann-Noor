import axios from "axios";
export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// get best seelling products
export const fetchBestSellingProducts = async () => {
  try {
    const response = await api.get("/products");
    // console.log(response);

    return response.data.slice(0, 8);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
// get procutdetails
export const getProductDetails = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
