import type {
  DashboardData,
  DashboardStats,
  EndpointStatusOverview,
} from "@/types/dashboard";
import type { EndpointSummary } from "@/types/endpoint";
import type { MonitoringLog, UptimeChartPoint } from "@/types/monitoring";
import type { IncidentWithEndpoint } from "@/types/report";

import { getAlerts } from "@/services/alert.service";
import { getEndpoints } from "@/services/endpoint.service";
import {
  getMonitoringAnalytics,
  getMonitoringLogs,
} from "@/services/monitoring.service";
import { getProjects } from "@/services/project.service";
import { getEndpointReport } from "@/services/report.service";

type EndpointDetailBundle = {
  endpoint: EndpointSummary;
  analytics: Awaited<ReturnType<typeof getMonitoringAnalytics>>;
  report: Awaited<ReturnType<typeof getEndpointReport>>;
  logs: MonitoringLog[];
};

function buildEndpointStatusOverview(
  endpoints: EndpointSummary[]
): EndpointStatusOverview {
  return endpoints.reduce<EndpointStatusOverview>(
    (overview, endpoint) => {
      if (endpoint.lastStatus === "UP") {
        overview.up += 1;
      } else if (endpoint.lastStatus === "DOWN") {
        overview.down += 1;
      } else {
        overview.unknown += 1;
      }

      return overview;
    },
    { up: 0, down: 0, unknown: 0 }
  );
}

function calculateWeightedUptime(
  bundles: EndpointDetailBundle[]
): number {
  let weightedSum = 0;
  let totalChecks = 0;

  for (const bundle of bundles) {
    weightedSum +=
      bundle.analytics.uptimePercentage *
      bundle.analytics.totalChecks;
    totalChecks += bundle.analytics.totalChecks;
  }

  if (totalChecks === 0) {
    return 0;
  }

  return Number((weightedSum / totalChecks).toFixed(2));
}

function calculateAverageSecurityScore(
  bundles: EndpointDetailBundle[]
): number | null {
  const scores = bundles
    .map((bundle) => bundle.report.latestSecurityScan)
    .filter(
      (scan) =>
        scan?.status === "COMPLETED" && typeof scan.score === "number"
    )
    .map((scan) => scan!.score!);

  if (scores.length === 0) {
    return null;
  }

  const average =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return Number(average.toFixed(1));
}

function collectRecentIncidents(
  bundles: EndpointDetailBundle[],
  limit = 5
): IncidentWithEndpoint[] {
  return bundles
    .flatMap((bundle) =>
      bundle.report.incidents.map((incident) => ({
        ...incident,
        endpointName: bundle.endpoint.name,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() -
        new Date(a.startedAt).getTime()
    )
    .slice(0, limit);
}

function countActiveIncidents(bundles: EndpointDetailBundle[]): number {
  return bundles.reduce(
    (count, bundle) =>
      count +
      bundle.report.incidents.filter(
        (incident) => incident.status === "OPEN"
      ).length,
    0
  );
}

function buildUptimeChartData(
  logs: MonitoringLog[]
): UptimeChartPoint[] {
  const buckets = new Map<string, { up: number; total: number }>();

  for (const log of logs) {
    const date = new Date(log.checkedAt);
    const label = date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const bucketKey = `${date.toISOString().slice(0, 13)}|${label}`;
    const bucket = buckets.get(bucketKey) ?? { up: 0, total: 0 };

    bucket.total += 1;
    if (log.isUp) {
      bucket.up += 1;
    }

    buckets.set(bucketKey, bucket);
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, bucket]) => {
      const label = key.split("|")[1] ?? key;

      return {
        label,
        uptime: bucket.total
          ? Number(((bucket.up / bucket.total) * 100).toFixed(2))
          : 0,
        checks: bucket.total,
      };
    });
}

function buildStats(
  projectsCount: number,
  endpointsCount: number,
  bundles: EndpointDetailBundle[]
): DashboardStats {
  return {
    totalProjects: projectsCount,
    totalEndpoints: endpointsCount,
    uptimePercentage: calculateWeightedUptime(bundles),
    activeIncidents: countActiveIncidents(bundles),
    averageSecurityScore: calculateAverageSecurityScore(bundles),
  };
}

async function fetchEndpointBundles(
  endpoints: EndpointSummary[]
): Promise<EndpointDetailBundle[]> {
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const [analytics, report, logs] = await Promise.all([
        getMonitoringAnalytics(endpoint.id),
        getEndpointReport(endpoint.id),
        getMonitoringLogs(endpoint.id, 100),
      ]);

      return {
        endpoint,
        analytics,
        report,
        logs,
      };
    })
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<EndpointDetailBundle> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [projects, endpoints, alerts] = await Promise.all([
    getProjects(),
    getEndpoints(),
    getAlerts(),
  ]);

  const bundles = await fetchEndpointBundles(endpoints);
  const allLogs = bundles.flatMap((bundle) => bundle.logs);

  return {
    projects,
    endpoints,
    alerts,
    stats: buildStats(projects.length, endpoints.length, bundles),
    recentAlerts: alerts.slice(0, 5),
    recentIncidents: collectRecentIncidents(bundles),
    endpointStatusOverview: buildEndpointStatusOverview(endpoints),
    uptimeChartData: buildUptimeChartData(allLogs),
  };
}
