import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { authKeys } from "@/lib/query-keys";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas";

export function useCurrentUser() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginInput) => loginUser(payload),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      queryClient.setQueryData(authKeys.me(), user);
      toast.success("Welcome back");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterInput) => registerUser(payload),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      queryClient.setQueryData(authKeys.me(), user);
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    queryClient.removeQueries({ queryKey: authKeys.all });
    toast.success("Signed out");
  };
}
