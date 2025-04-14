import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

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
      console.log(result);
      set({ user: result.data.message.user, loading: false });
      // console.log(user);

      toast.success("Registration successful!");
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong!!");
      return false;
    }
  },

  signIn: async ({ email, password }) => {
    set({ loading: true });
    try {
      const result = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      // console.log(result.data.message.user);
      set({ user: result.data.message.user, loading: false });
      toast.success("login successful!");
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong!!");
      return false;
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get("/users/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log(error);
    }
  },
}));

export default useUserStore;
