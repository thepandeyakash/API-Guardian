import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { EndpointSummary } from "@/types/endpoint";

type EndpointsResponse = ApiSuccessResponse<EndpointSummary[]> & {
  count: number;
};

export async function getEndpoints(): Promise<EndpointSummary[]> {
  const { data } = await api.get<EndpointsResponse>("/endpoints");

  return data.data;
}
