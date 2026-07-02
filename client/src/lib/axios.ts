import axios from "axios";

import { queryClient } from "@/lib/queryClient";
import { authKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/stores/auth.store";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url ?? "";
      const isAuthRequest =
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/register");

      if (!isAuthRequest) {
        useAuthStore.getState().logout();
        queryClient.removeQueries({ queryKey: authKeys.all });
      }
    }

    return Promise.reject(error);
  }
);
