import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  CreateEndpointPayload,
  EndpointDetail,
  EndpointSummary,
  UpdateEndpointPayload,
} from "@/types/endpoint";

type EndpointsResponse = ApiSuccessResponse<EndpointSummary[]> & {
  count: number;
};

export async function getEndpoints(): Promise<EndpointSummary[]> {
  const { data } = await api.get<EndpointsResponse>("/endpoints");

  return data.data;
}

export async function getEndpointById(
  endpointId: string
): Promise<EndpointDetail> {
  const { data } = await api.get<ApiSuccessResponse<EndpointDetail>>(
    `/endpoints/${endpointId}`
  );

  return data.data;
}

export async function createEndpoint(
  payload: CreateEndpointPayload
): Promise<EndpointDetail> {
  const { data } = await api.post<ApiSuccessResponse<EndpointDetail>>(
    "/endpoints",
    payload
  );

  return data.data;
}

export async function updateEndpoint(
  endpointId: string,
  payload: UpdateEndpointPayload
): Promise<EndpointDetail> {
  const { data } = await api.patch<ApiSuccessResponse<EndpointDetail>>(
    `/endpoints/${endpointId}`,
    payload
  );

  return data.data;
}

export async function deleteEndpoint(endpointId: string): Promise<void> {
  await api.delete(`/endpoints/${endpointId}`);
}
