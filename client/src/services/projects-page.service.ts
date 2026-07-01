import type { EndpointSummary } from "@/types/endpoint";
import type {
  EnrichedEndpoint,
  EnrichedProject,
  ProjectMonitoringStatus,
  ProjectsPageData,
} from "@/types/projects-page";
import type { Project } from "@/types/project";

import { getEndpoints } from "@/services/endpoint.service";
import {
  getMonitoringAnalytics,
} from "@/services/monitoring.service";
import { getProjects } from "@/services/project.service";
import { getEndpointReport } from "@/services/report.service";

type EndpointMetrics = {
  uptimePercentage: number;
  securityScore: number | null;
};

function getProjectMonitoringStatus(
  endpoints: EndpointSummary[]
): ProjectMonitoringStatus {
  if (endpoints.length === 0) {
    return "empty";
  }

  const hasDown = endpoints.some(
    (endpoint) => endpoint.lastStatus === "DOWN"
  );
  const hasUp = endpoints.some((endpoint) => endpoint.lastStatus === "UP");

  if (hasDown && !hasUp) {
    return "down";
  }

  if (hasDown && hasUp) {
    return "degraded";
  }

  if (hasUp) {
    return "healthy";
  }

  return "unknown";
}

function calculateAverageUptime(
  endpoints: EnrichedEndpoint[]
): number {
  if (endpoints.length === 0) {
    return 0;
  }

  const average =
    endpoints.reduce((sum, endpoint) => sum + endpoint.uptimePercentage, 0) /
    endpoints.length;

  return Number(average.toFixed(2));
}

function calculateAverageSecurityScore(
  endpoints: EnrichedEndpoint[]
): number | null {
  const scores = endpoints
    .map((endpoint) => endpoint.securityScore)
    .filter((score): score is number => score !== null);

  if (scores.length === 0) {
    return null;
  }

  const average =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return Number(average.toFixed(1));
}

async function fetchEndpointMetrics(
  endpointId: string
): Promise<EndpointMetrics> {
  const [analytics, report] = await Promise.all([
    getMonitoringAnalytics(endpointId),
    getEndpointReport(endpointId),
  ]);

  const latestScan = report.latestSecurityScan;
  const securityScore =
    latestScan?.status === "COMPLETED" && typeof latestScan.score === "number"
      ? latestScan.score
      : null;

  return {
    uptimePercentage: analytics.uptimePercentage,
    securityScore,
  };
}

function buildEnrichedProject(
  project: Project,
  endpoints: EndpointSummary[],
  metricsByEndpointId: Map<string, EndpointMetrics>
): EnrichedProject {
  const projectEndpoints = endpoints.filter(
    (endpoint) => endpoint.projectId === project.id
  );

  const enrichedEndpoints: EnrichedEndpoint[] = projectEndpoints.map(
    (endpoint) => {
      const metrics = metricsByEndpointId.get(endpoint.id);

      return {
        ...endpoint,
        uptimePercentage: metrics?.uptimePercentage ?? 0,
        securityScore: metrics?.securityScore ?? null,
      };
    }
  );

  return {
    ...project,
    endpointCount: enrichedEndpoints.length,
    monitoringStatus: getProjectMonitoringStatus(projectEndpoints),
    averageUptime: calculateAverageUptime(enrichedEndpoints),
    averageSecurityScore: calculateAverageSecurityScore(enrichedEndpoints),
    endpoints: enrichedEndpoints,
  };
}

export async function fetchProjectsPageData(): Promise<ProjectsPageData> {
  const [projects, endpoints] = await Promise.all([
    getProjects(),
    getEndpoints(),
  ]);

  const metricsResults = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const metrics = await fetchEndpointMetrics(endpoint.id);

      return {
        endpointId: endpoint.id,
        metrics,
      };
    })
  );

  const metricsByEndpointId = new Map<string, EndpointMetrics>();

  for (const result of metricsResults) {
    if (result.status === "fulfilled") {
      metricsByEndpointId.set(result.value.endpointId, result.value.metrics);
    }
  }

  return {
    projects: projects.map((project) =>
      buildEnrichedProject(project, endpoints, metricsByEndpointId)
    ),
  };
}
