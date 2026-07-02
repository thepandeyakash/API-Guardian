import type { EndpointSummary } from "@/types/endpoint";
import type {
  SecurityIssue,
  SecurityScanStatus,
  Severity,
} from "@/types/report";

export type SecurityDashboardStats = {
  totalScans: number;
  averageSecurityScore: number | null;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  lastScanTime: string | null;
};

export type SecurityFindingWithContext = SecurityIssue & {
  endpointId: string;
  endpointName: string;
  scanId: string;
};

export type EndpointSecurityOverview = {
  endpointId: string;
  endpointName: string;
  url: string;
  securityScore: number | null;
  scanStatus: SecurityScanStatus | null;
  scannedAt: string | null;
};

export type SecurityScoreChartPoint = {
  endpointName: string;
  score: number;
};

export type SeverityChartPoint = {
  severity: Severity;
  label: string;
  count: number;
  fill: string;
};

export type SecurityDashboardData = {
  endpoints: EndpointSummary[];
  stats: SecurityDashboardStats;
  scoreChartData: SecurityScoreChartPoint[];
  severityChartData: SeverityChartPoint[];
  findings: SecurityFindingWithContext[];
  endpointOverview: EndpointSecurityOverview[];
};
