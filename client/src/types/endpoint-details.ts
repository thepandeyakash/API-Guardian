import type { Alert } from "@/types/alert";
import type { MonitoringLog, UptimeChartPoint } from "@/types/monitoring";
import type { EndpointReport } from "@/types/report";

export type EndpointDetailsData = {
  report: EndpointReport;
  logs: MonitoringLog[];
  uptimeChartData: UptimeChartPoint[];
  alerts: Alert[];
};
