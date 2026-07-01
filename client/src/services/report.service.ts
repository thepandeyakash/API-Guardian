import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { EndpointReport } from "@/types/report";

export async function getEndpointReport(
  endpointId: string
): Promise<EndpointReport> {
  const { data } = await api.get<ApiSuccessResponse<EndpointReport>>(
    `/reports/${endpointId}`
  );

  return data.data;
}
