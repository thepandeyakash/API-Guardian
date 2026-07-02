import type { EndpointSummary } from "@/types/endpoint";
import type { EndpointReport, Severity } from "@/types/report";
import type {
  EndpointSecurityOverview,
  SecurityDashboardData,
  SecurityDashboardStats,
  SecurityFindingWithContext,
  SecurityScoreChartPoint,
  SeverityChartPoint,
} from "@/types/security-dashboard";

import { getEndpoints } from "@/services/endpoint.service";
import { getEndpointReport } from "@/services/report.service";
import { severityChartColor } from "@/lib/security";

type EndpointReportBundle = {
  endpoint: EndpointSummary;
  report: EndpointReport;
};

const SEVERITIES: Severity[] = [
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
];

async function fetchEndpointReportBundles(
  endpoints: EndpointSummary[]
): Promise<EndpointReportBundle[]> {
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const report = await getEndpointReport(endpoint.id);

      return {
        endpoint,
        report,
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

function buildStats(bundles: EndpointReportBundle[]): SecurityDashboardStats {
  const scans = bundles
    .map((bundle) => bundle.report.latestSecurityScan)
    .filter((scan) => scan !== null);

  const completedScores = scans
    .filter(
      (scan) =>
        scan.status === "COMPLETED" && typeof scan.score === "number"
    )
    .map((scan) => scan.score!);

  const allIssues = scans.flatMap(
    (scan) => scan.securityIssues
  );

  const lastScanTime =
    scans.length > 0
      ? scans.reduce((latest, scan) =>
          new Date(scan.scannedAt).getTime() >
          new Date(latest.scannedAt).getTime()
            ? scan
            : latest
        ).scannedAt
      : null;

  return {
    totalScans: scans.length,
    averageSecurityScore:
      completedScores.length > 0
        ? Number(
            (
              completedScores.reduce((sum, score) => sum + score, 0) /
              completedScores.length
            ).toFixed(1)
          )
        : null,
    criticalFindings: allIssues.filter(
      (issue) => issue.severity === "CRITICAL"
    ).length,
    highFindings: allIssues.filter(
      (issue) => issue.severity === "HIGH"
    ).length,
    mediumFindings: allIssues.filter(
      (issue) => issue.severity === "MEDIUM"
    ).length,
    lowFindings: allIssues.filter(
      (issue) => issue.severity === "LOW"
    ).length,
    lastScanTime,
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

function buildSeverityChartData(
  stats: SecurityDashboardStats
): SeverityChartPoint[] {
  const counts: Record<Severity, number> = {
    CRITICAL: stats.criticalFindings,
    HIGH: stats.highFindings,
    MEDIUM: stats.mediumFindings,
    LOW: stats.lowFindings,
  };

  return SEVERITIES.map((severity) => ({
    severity,
    label: severity.charAt(0) + severity.slice(1).toLowerCase(),
    count: counts[severity],
    fill: severityChartColor(severity),
  }));
}

function collectFindings(
  bundles: EndpointReportBundle[]
): SecurityFindingWithContext[] {
  return bundles.flatMap((bundle) => {
    const scan = bundle.report.latestSecurityScan;

    if (!scan) {
      return [];
    }

    return scan.securityIssues.map((issue) => ({
      ...issue,
      endpointId: bundle.endpoint.id,
      endpointName: bundle.endpoint.name,
      scanId: scan.id,
    }));
  });
}

function buildEndpointOverview(
  bundles: EndpointReportBundle[]
): EndpointSecurityOverview[] {
  return bundles.map((bundle) => {
    const scan = bundle.report.latestSecurityScan;

    return {
      endpointId: bundle.endpoint.id,
      endpointName: bundle.endpoint.name,
      url: bundle.endpoint.url,
      securityScore: scan?.score ?? null,
      scanStatus: scan?.status ?? null,
      scannedAt: scan?.scannedAt ?? null,
    };
  });
}

export async function fetchSecurityDashboardData(): Promise<SecurityDashboardData> {
  const endpoints = await getEndpoints();
  const bundles = await fetchEndpointReportBundles(endpoints);
  const stats = buildStats(bundles);

  return {
    endpoints,
    stats,
    scoreChartData: buildScoreChartData(bundles),
    severityChartData: buildSeverityChartData(stats),
    findings: collectFindings(bundles),
    endpointOverview: buildEndpointOverview(bundles),
  };
}
