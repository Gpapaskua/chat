import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
});

// request interceptor for adding token
axiosClient.interceptors.request.use((config) => {
  // add token to request headers
  const token = localStorage.getItem("token");
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
