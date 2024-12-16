// import { create } from "zustand";
// import axios from "axios";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   setUser: (userData) => {
//     set({ 
//       user: userData,
//       isAuthenticated: true 
//     });
//   },
//   clearUser: async () => {
//     try {
//       await axios.post(
//         "https://easynomina-back.onrender.com/api/logout",
//         {},
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.error("Error en logout:", error);
//     } finally {
//       set({ 
//         user: null,
//         isAuthenticated: false 
//       });
//     }
//   }
// }));

import { create } from "zustand";
import axios from "axios";

// URL base de la API
const API_BASE_URL = "https://easynomina-back.onrender.com/api";

export const useAuthStore = create((set) => ({
  user: null, // Usuario actual
  isAuthenticated: false, // Estado de autenticación

  // Establecer el usuario actual
  setUser: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
  },

  // Limpiar el usuario actual y cerrar sesión
  clearUser: async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
