import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//  // request interceptor for adding token
// axiosClient.interceptors.request.use((config) => {
//   // add token to request headers
//   const token = localStorage.getItem("token");
//   if (config.headers && token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosClient;
