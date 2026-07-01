import type { EndpointSummary } from "@/types/endpoint";
import type { Project } from "@/types/project";

export type ProjectMonitoringStatus =
  | "healthy"
  | "degraded"
  | "down"
  | "unknown"
  | "empty";

export type EnrichedEndpoint = EndpointSummary & {
  uptimePercentage: number;
  securityScore: number | null;
};

export type EnrichedProject = Project & {
  endpointCount: number;
  monitoringStatus: ProjectMonitoringStatus;
  averageUptime: number;
  averageSecurityScore: number | null;
  endpoints: EnrichedEndpoint[];
};

export type ProjectsPageData = {
  projects: EnrichedProject[];
};
