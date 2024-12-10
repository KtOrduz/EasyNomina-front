import axios from "axios";

const API = "https://easynomina-back.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginRequest = (user) => axiosInstance.post(`/login`, user);
export const registerEmployeeRequest = (employee) =>
  axiosInstance.post(`/employee`, employee);

export default axiosInstance;
