import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { AuthPayload, User } from "@/types/auth";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas";

export async function registerUser(
  payload: RegisterInput
): Promise<AuthPayload> {
  const { data } = await api.post<ApiSuccessResponse<AuthPayload>>(
    "/auth/register",
    payload
  );

  return data.data;
}

export async function loginUser(payload: LoginInput): Promise<AuthPayload> {
  const { data } = await api.post<ApiSuccessResponse<AuthPayload>>(
    "/auth/login",
    payload
  );

  return data.data;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<ApiSuccessResponse<User>>("/auth/me");

  return data.data;
}
