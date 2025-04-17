import axios from "axios";
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});

export const userSignIn = async (data) => {
  try {
    const { response } = await api.post(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
