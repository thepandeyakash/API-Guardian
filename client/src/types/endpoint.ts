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
