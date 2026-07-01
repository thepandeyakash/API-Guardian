export type MonitoringLog = {
  id: string;
  endpointId: string;
  statusCode: number | null;
  latency: number | null;
  responseSize: number | null;
  isHealthy: boolean;
  isUp: boolean;
  errorMessage: string | null;
  checkedAt: string;
};

export type MonitoringAnalytics = {
  totalChecks: number;
  successfulChecks: number;
  failedChecks: number;
  healthyChecks: number;
  uptimePercentage: number;
  healthPercentage: number;
  averageLatency: number;
};

export type UptimeChartPoint = {
  label: string;
  uptime: number;
  checks: number;
};
