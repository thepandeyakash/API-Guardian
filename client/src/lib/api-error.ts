import axios from "axios";

import type { ApiErrorResponse } from "@/types/api";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.errors) {
      const firstFieldError = Object.values(data.errors)[0]?.[0];
      if (firstFieldError) {
        return firstFieldError;
      }
    }

    if (data?.message) {
      return data.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function getApiFieldErrors(
  error: unknown
): Record<string, string[]> | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  const data = error.response?.data as ApiErrorResponse | undefined;
  return data?.errors;
}
