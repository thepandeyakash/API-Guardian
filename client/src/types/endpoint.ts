export type EndpointStatus = "UP" | "DOWN" | "UNKNOWN";
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type EndpointSummary = {
  id: string;
  projectId: string;
  name: string;
  url: string;
  method: HttpMethod;
  monitoringEnabled: boolean;
  lastStatus: EndpointStatus;
  lastStatusCode: number | null;
  lastLatency: number | null;
  lastCheckedAt: string | null;
  createdAt: string;
};

export type EndpointDetail = {
  id: string;
  projectId: string;
  name: string;
  url: string;
  method: HttpMethod;
  expectedStatusCode: number;
  monitoringInterval: number;
  monitoringEnabled: boolean;
  headers: Record<string, string> | null;
  requestBody: Record<string, unknown> | null;
  authConfig: Record<string, unknown> | null;
  lastStatus: EndpointStatus;
  lastStatusCode: number | null;
  lastLatency: number | null;
  lastCheckedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateEndpointPayload = {
  projectId: string;
  name: string;
  url: string;
  method: HttpMethod;
  expectedStatusCode?: number;
  monitoringInterval?: number;
  monitoringEnabled?: boolean;
  headers?: Record<string, string>;
  requestBody?: Record<string, unknown>;
  authConfig?: Record<string, unknown>;
};

export type UpdateEndpointPayload = Partial<
  Omit<CreateEndpointPayload, "projectId">
>;
