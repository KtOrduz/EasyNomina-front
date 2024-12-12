import axios from "axios";

const API = "https://easynomina-back.onrender.com/api";

// Crear instancia de axios con configuración base
const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Interceptor para manejar el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const loginRequest = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    // Verificar si hay un token en los headers de la respuesta
    const token = response.headers['authorization'] || response.headers['x-auth-token'];
    if (token) {
      sessionStorage.setItem('token', token.replace('Bearer ', ''));
    }
    return response;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const registerEmployeeRequest = async (employee) => {
  try {
    console.log('Enviando datos del empleado:', employee);
    const response = await axiosInstance.post('/employee', employee);
    console.log('Respuesta del servidor:', response);
    return response;
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
};