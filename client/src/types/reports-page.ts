import type { UptimeChartPoint } from "@/types/monitoring";
import type { IncidentWithEndpoint } from "@/types/report";
import type { SecurityScoreChartPoint } from "@/types/security-dashboard";

export type ReportsPageStats = {
  totalEndpoints: number;
  averageUptime: number;
  averageLatency: number;
  totalIncidents: number;
  averageSecurityScore: number | null;
};

export type EndpointReportRow = {
  endpointId: string;
  endpointName: string;
  uptimePercentage: number;
  healthPercentage: number;
  averageLatency: number;
  securityScore: number | null;
  totalIncidents: number;
};

export type LatencyChartPoint = {
  label: string;
  latency: number;
  checks: number;
};

export type IncidentChartPoint = {
  label: string;
  count: number;
};

export type ReportsSecurityStats = {
  criticalFindings: number;
  highFindings: number;
};

export type ReportsPageData = {
  stats: ReportsPageStats;
  uptimeChartData: UptimeChartPoint[];
  latencyChartData: LatencyChartPoint[];
  incidentChartData: IncidentChartPoint[];
  endpointRows: EndpointReportRow[];
  securityStats: ReportsSecurityStats;
  scoreChartData: SecurityScoreChartPoint[];
  recentIncidents: IncidentWithEndpoint[];
  generatedAt: string;
};
