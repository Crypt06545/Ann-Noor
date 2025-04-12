import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkAuth: true,

  signUp: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Password do not match!!");
      return false;
    }
    try {
      const result = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      set({ user: result.data.user, loading: false });
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      return false; 
    }
  },
}));

export default useUserStore;
