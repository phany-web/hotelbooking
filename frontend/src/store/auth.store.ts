import { create } from "zustand";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  hotelId?: string | null;
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: AuthUser | null;

  setAuth: (token: string, role: string, user: AuthUser) => void;
  updateUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  setAuth: (token, role, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    set({ token, role, user });
  },

  updateUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    set({ token: null, role: null, user: null });
  },
}));