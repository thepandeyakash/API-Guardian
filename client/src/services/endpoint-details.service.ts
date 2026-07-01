import { buildUptimeChartData } from "@/lib/uptime-chart";
import type { EndpointDetailsData } from "@/types/endpoint-details";

import { getAlerts } from "@/services/alert.service";
import { getMonitoringLogs } from "@/services/monitoring.service";
import { getEndpointReport } from "@/services/report.service";

export async function fetchEndpointDetails(
  endpointId: string
): Promise<EndpointDetailsData> {
  const [report, logs, alerts] = await Promise.all([
    getEndpointReport(endpointId),
    getMonitoringLogs(endpointId, 100),
    getAlerts(),
  ]);

  const endpointAlerts = alerts
    .filter((alert) => alert.endpointId === endpointId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  return {
    report,
    logs,
    uptimeChartData: buildUptimeChartData(logs),
    alerts: endpointAlerts,
  };
}
