import type { MonitoringLog, UptimeChartPoint } from "@/types/monitoring";

export function buildUptimeChartData(
  logs: MonitoringLog[]
): UptimeChartPoint[] {
  const buckets = new Map<string, { up: number; total: number }>();

  for (const log of logs) {
    const date = new Date(log.checkedAt);
    const label = date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const bucketKey = `${date.toISOString().slice(0, 13)}|${label}`;
    const bucket = buckets.get(bucketKey) ?? { up: 0, total: 0 };

    bucket.total += 1;
    if (log.isUp) {
      bucket.up += 1;
    }

    buckets.set(bucketKey, bucket);
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, bucket]) => {
      const label = key.split("|")[1] ?? key;

      return {
        label,
        uptime: bucket.total
          ? Number(((bucket.up / bucket.total) * 100).toFixed(2))
          : 0,
        checks: bucket.total,
      };
    });
}
