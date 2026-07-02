import type { EndpointSummary } from "@/types/endpoint";
import type { MonitoringLog } from "@/types/monitoring";
import type { EndpointReport, IncidentWithEndpoint } from "@/types/report";
import type {
  EndpointReportRow,
  ReportsPageData,
  ReportsPageStats,
  ReportsSecurityStats,
} from "@/types/reports-page";
import type { SecurityScoreChartPoint } from "@/types/security-dashboard";

import { getEndpoints } from "@/services/endpoint.service";
import {
  getMonitoringLogs,
} from "@/services/monitoring.service";
import { getEndpointReport } from "@/services/report.service";
import {
  buildIncidentTrendChartData,
  buildLatencyChartData,
} from "@/lib/report-charts";
import { buildUptimeChartData } from "@/lib/uptime-chart";

type EndpointReportBundle = {
  endpoint: EndpointSummary;
  report: EndpointReport;
  logs: MonitoringLog[];
};

function calculateWeightedAverage(
  bundles: EndpointReportBundle[],
  selector: (bundle: EndpointReportBundle) => number
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const bundle of bundles) {
    const weight = bundle.report.analytics.totalChecks;

    if (weight === 0) {
      continue;
    }

    weightedSum += selector(bundle) * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return 0;
  }

  return Number((weightedSum / totalWeight).toFixed(2));
}

function calculateAverageSecurityScore(
  bundles: EndpointReportBundle[]
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

function buildStats(bundles: EndpointReportBundle[]): ReportsPageStats {
  return {
    totalEndpoints: bundles.length,
    averageUptime: calculateWeightedAverage(
      bundles,
      (bundle) => bundle.report.analytics.uptimePercentage
    ),
    averageLatency: calculateWeightedAverage(
      bundles,
      (bundle) => bundle.report.analytics.averageLatency
    ),
    totalIncidents: bundles.reduce(
      (count, bundle) => count + bundle.report.incidents.length,
      0
    ),
    averageSecurityScore: calculateAverageSecurityScore(bundles),
  };
}

function buildEndpointRows(
  bundles: EndpointReportBundle[]
): EndpointReportRow[] {
  return bundles.map((bundle) => ({
    endpointId: bundle.endpoint.id,
    endpointName: bundle.endpoint.name,
    uptimePercentage: bundle.report.analytics.uptimePercentage,
    healthPercentage: bundle.report.analytics.healthPercentage,
    averageLatency: bundle.report.analytics.averageLatency,
    securityScore:
      bundle.report.latestSecurityScan?.status === "COMPLETED"
        ? (bundle.report.latestSecurityScan.score ?? null)
        : null,
    totalIncidents: bundle.report.incidents.length,
  }));
}

function buildSecurityStats(
  bundles: EndpointReportBundle[]
): ReportsSecurityStats {
  const allIssues = bundles.flatMap((bundle) =>
    bundle.report.latestSecurityScan
      ? bundle.report.latestSecurityScan.securityIssues
      : []
  );

  return {
    criticalFindings: allIssues.filter(
      (issue) => issue.severity === "CRITICAL"
    ).length,
    highFindings: allIssues.filter(
      (issue) => issue.severity === "HIGH"
    ).length,
  };
}

function buildScoreChartData(
  bundles: EndpointReportBundle[]
): SecurityScoreChartPoint[] {
  return bundles
    .filter(
      (bundle) =>
        bundle.report.latestSecurityScan?.status === "COMPLETED" &&
        typeof bundle.report.latestSecurityScan.score === "number"
    )
    .map((bundle) => ({
      endpointName: bundle.endpoint.name,
      score: bundle.report.latestSecurityScan!.score!,
    }))
    .sort((a, b) => a.score - b.score);
}

function collectRecentIncidents(
  bundles: EndpointReportBundle[],
  limit = 10
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

async function fetchEndpointReportBundles(
  endpoints: EndpointSummary[]
): Promise<EndpointReportBundle[]> {
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const [report, logs] = await Promise.all([
        getEndpointReport(endpoint.id),
        getMonitoringLogs(endpoint.id, 100),
      ]);

      return {
        endpoint,
        report,
        logs,
      };
    })
  );

  return results
    .filter(
      (result): result is PromiseFulfilledResult<EndpointReportBundle> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value);
}

export async function fetchReportsPageData(): Promise<ReportsPageData> {
  const endpoints = await getEndpoints();
  const bundles = await fetchEndpointReportBundles(endpoints);
  const allLogs = bundles.flatMap((bundle) => bundle.logs);
  const allIncidents = bundles.flatMap(
    (bundle) => bundle.report.incidents
  );

  return {
    stats: buildStats(bundles),
    uptimeChartData: buildUptimeChartData(allLogs),
    latencyChartData: buildLatencyChartData(allLogs),
    incidentChartData: buildIncidentTrendChartData(allIncidents),
    endpointRows: buildEndpointRows(bundles),
    securityStats: buildSecurityStats(bundles),
    scoreChartData: buildScoreChartData(bundles),
    recentIncidents: collectRecentIncidents(bundles),
    generatedAt: new Date().toISOString(),
  };
}
