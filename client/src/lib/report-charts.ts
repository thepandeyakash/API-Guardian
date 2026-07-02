import type { MonitoringLog } from "@/types/monitoring";
import type { Incident } from "@/types/report";
import type {
  IncidentChartPoint,
  LatencyChartPoint,
} from "@/types/reports-page";

function bucketLabel(date: Date): string {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function bucketKey(date: Date): string {
  return `${date.toISOString().slice(0, 13)}|${bucketLabel(date)}`;
}

export function buildLatencyChartData(
  logs: MonitoringLog[]
): LatencyChartPoint[] {
  const buckets = new Map<
    string,
    { totalLatency: number; total: number }
  >();

  for (const log of logs) {
    if (log.latency === null) {
      continue;
    }

    const date = new Date(log.checkedAt);
    const key = bucketKey(date);
    const bucket = buckets.get(key) ?? {
      totalLatency: 0,
      total: 0,
    };

    bucket.totalLatency += log.latency;
    bucket.total += 1;
    buckets.set(key, bucket);
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, bucket]) => {
      const label = key.split("|")[1] ?? key;

      return {
        label,
        latency: bucket.total
          ? Math.round(bucket.totalLatency / bucket.total)
          : 0,
        checks: bucket.total,
      };
    });
}

export function buildIncidentTrendChartData(
  incidents: Incident[]
): IncidentChartPoint[] {
  const buckets = new Map<string, number>();

  for (const incident of incidents) {
    const date = new Date(incident.startedAt);
    const key = bucketKey(date);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => ({
      label: key.split("|")[1] ?? key,
      count,
    }));
}
