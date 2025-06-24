import axios from "axios";

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
      // You can add any custom logic here before the request is sent
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    (response) => {
      // You can add any custom logic here after the response is received
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return client;
};
export default createAxiosClient;
