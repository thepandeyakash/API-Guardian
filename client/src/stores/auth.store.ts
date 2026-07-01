import { create } from "zustand";

import type { User } from "@/types/auth";

const TOKEN_KEY = "accessToken";

function readStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: readStoredToken(),
  user: null,
  isAuthenticated: Boolean(readStoredToken()),

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, user, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
