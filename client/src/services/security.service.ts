import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { SecurityScan } from "@/types/report";

export async function runSecurityScan(
  endpointId: string
): Promise<SecurityScan> {
  const { data } = await api.post<ApiSuccessResponse<SecurityScan>>(
    `/security/scan/${endpointId}`
  );

  return data.data;
}
