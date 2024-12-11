import { create } from "zustand";
import axios from "axios";


export const useAuthStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: async () => {
    try {
      await axios.post("https://easynomina-back.onrender.com/api/logout"); 
      set({ user: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));
