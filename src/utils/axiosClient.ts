import axios from "axios";
import { setCookie, deleteCookie } from "./cookies";
import { API_BASE_URL } from "./config";

const createAxiosClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor
  client.interceptors.request.use(
    (config) => {
      // Get access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log('[Axios] Request with token:', {
          url: config.url,
          method: config.method,
          hasToken: true,
          tokenPreview: accessToken.substring(0, 20) + '...'
        });
      } else {
        console.warn('[Axios] Request without token:', {
          url: config.url,
          method: config.method,
          hasToken: false
        });
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
            // Always use the root API base URL for refresh endpoint
            const response = await axios.post(
              `${API_BASE_URL}/users/refresh`,
              {},
              {
                headers: {
                  refreshToken: refreshToken,
                },
              }
            );

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

            // Update tokens in storage
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            setCookie("accessToken", newAccessToken, 7);

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            deleteCookie("accessToken");

            // Only redirect if not already on login page
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
              window.location.href = "/";
            }

            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token available, clear storage and redirect
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          deleteCookie("accessToken");

          if (typeof window !== 'undefined' && window.location.pathname !== '/') {
            window.location.href = "/";
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
export default createAxiosClient;
