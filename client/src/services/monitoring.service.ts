import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  MonitoringAnalytics,
  MonitoringLog,
} from "@/types/monitoring";

export async function getMonitoringLogs(
  endpointId: string,
  limit = 100
): Promise<MonitoringLog[]> {
  const { data } = await api.get<ApiSuccessResponse<MonitoringLog[]>>(
    `/monitoring/logs/${endpointId}`,
    { params: { limit } }
  );

  return data.data;
}

export async function getMonitoringAnalytics(
  endpointId: string
): Promise<MonitoringAnalytics> {
  const { data } = await api.get<ApiSuccessResponse<MonitoringAnalytics>>(
    `/monitoring/analytics/${endpointId}`
  );

  return data.data;
}

export async function runHealthCheck(endpointId: string): Promise<void> {
  await api.post(`/monitoring/check/${endpointId}`);
}

