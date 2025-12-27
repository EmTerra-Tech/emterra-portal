import axios from "axios";
import { setCookie, deleteCookie } from "./cookies";

const createAxiosClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Add a request interceptor
  client.interceptors.request.use(
    (config) => {
      // Get access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    (response) => {
      // Return the data from the response wrapper
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If 401 and we have a refresh token, try to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axios.post(
              `${baseURL}/refresh`,
              {},
              {
                headers: {
                  refreshToken: refreshToken,
                },
              }
            );

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            setCookie("accessToken", newAccessToken, 7);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            deleteCookie("accessToken");
            window.location.href = "/";
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
export default createAxiosClient;
