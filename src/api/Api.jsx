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

export const updateProdut= async(id) =>{
  try {
    const response = await axiosInstance.put(`/products/update-product/${id}`)
    return response
  } catch (error) {
    console.log(error);
    
  }
}