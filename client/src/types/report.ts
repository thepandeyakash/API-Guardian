import type { EndpointStatus, HttpMethod } from "@/types/endpoint";
import type { MonitoringAnalytics } from "@/types/monitoring";

export type IncidentStatus = "OPEN" | "CLOSED";
export type SecurityScanStatus = "PENDING" | "COMPLETED" | "FAILED";
export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Incident = {
  id: string;
  endpointId: string;
  startedAt: string;
  endedAt: string | null;
  duration: number | null;
  status: IncidentStatus;
  failureCount: number;
  lastErrorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SecurityIssue = {
  id: string;
  securityScanId: string;
  code: string;
  title: string;
  severity: Severity;
  description: string;
  recommendation: string;
  aiExplanation: string | null;
  aiSuggestedFix: string | null;
  createdAt: string;
};

export type SecurityScan = {
  id: string;
  endpointId: string;
  status: SecurityScanStatus;
  score: number | null;
  scanDuration: number | null;
  scannedAt: string;
  securityIssues: SecurityIssue[];
};

export type ReportEndpoint = {
  id: string;
  projectId: string;
  name: string;
  url: string;
  method: HttpMethod;
  expectedStatusCode: number;
  monitoringEnabled: boolean;
  monitoringInterval: number;
  lastStatus: EndpointStatus;
  lastHealthCheckPassed: boolean | null;
  lastStatusCode: number | null;
  lastLatency: number | null;
  lastCheckedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type EndpointReport = {
  endpoint: ReportEndpoint;
  analytics: MonitoringAnalytics;
  incidents: Incident[];
  latestSecurityScan: SecurityScan | null;
};

export type IncidentWithEndpoint = Incident & {
  endpointName: string;
};
