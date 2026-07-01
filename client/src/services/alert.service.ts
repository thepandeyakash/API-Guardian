import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Alert } from "@/types/alert";

export async function getAlerts(): Promise<Alert[]> {
  const { data } = await api.get<ApiSuccessResponse<Alert[]>>("/alerts");

  return data.data;
}
