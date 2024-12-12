import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (userData) => {
    set({ 
      user: userData,
      isAuthenticated: true 
    });
  },
  clearUser: async () => {
    try {
      await axios.post(
        "https://easynomina-back.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      set({ 
        user: null,
        isAuthenticated: false 
      });
    }
  }
}));