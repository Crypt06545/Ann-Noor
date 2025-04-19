import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});




let isRefreshing = false;
let failedRequestsQueue = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );

        failedRequestsQueue.forEach((pending) => pending.resolve());
        failedRequestsQueue = [];

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        failedRequestsQueue.forEach((pending) => pending.reject(refreshError));
        failedRequestsQueue = [];

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
