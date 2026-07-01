import {
  Activity,
  AlertTriangle,
  Clock,
  HeartPulse,
  Shield,
  Timer,
} from "lucide-react";

import {
  StatCard,
  StatCardSkeleton,
} from "@/features/dashboard/components/StatCard";
import type { MonitoringAnalytics } from "@/types/monitoring";
import type { SecurityScan } from "@/types/report";
import { formatPercentage, formatScore } from "@/lib/format";

type EndpointDetailsStatsGridProps = {
  analytics: MonitoringAnalytics;
  latestSecurityScan: SecurityScan | null;
};

function resolveSecurityScore(
  scan: SecurityScan | null
): number | null {
  if (!scan || scan.status !== "COMPLETED") {
    return null;
  }

  return scan.score;
}

export function EndpointDetailsStatsGrid({
  analytics,
  latestSecurityScan,
}: EndpointDetailsStatsGridProps) {
  const securityScore = resolveSecurityScore(latestSecurityScan);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <StatCard
        title="Uptime"
        value={formatPercentage(analytics.uptimePercentage)}
        description="Successful health checks"
        icon={Activity}
        trend={
          analytics.uptimePercentage >= 99
            ? "positive"
            : analytics.uptimePercentage >= 95
              ? "neutral"
              : "negative"
        }
      />
      <StatCard
        title="Health"
        value={formatPercentage(analytics.healthPercentage)}
        description="Passed health validation"
        icon={HeartPulse}
        trend={
          analytics.healthPercentage >= 99
            ? "positive"
            : analytics.healthPercentage >= 95
              ? "neutral"
              : "negative"
        }
      />
      <StatCard
        title="Avg Latency"
        value={`${analytics.averageLatency}ms`}
        description="Mean response time"
        icon={Clock}
        trend="neutral"
      />
      <StatCard
        title="Total Checks"
        value={String(analytics.totalChecks)}
        description="Monitoring samples"
        icon={Timer}
        trend="neutral"
      />
      <StatCard
        title="Failed Checks"
        value={String(analytics.failedChecks)}
        description="Unsuccessful probes"
        icon={AlertTriangle}
        trend={analytics.failedChecks > 0 ? "negative" : "positive"}
      />
      <StatCard
        title="Security Score"
        value={formatScore(securityScore)}
        description={
          latestSecurityScan
            ? `Latest scan · ${latestSecurityScan.status}`
            : "No scan available"
        }
        icon={Shield}
        trend={
          securityScore === null
            ? "neutral"
            : securityScore >= 80
              ? "positive"
              : securityScore >= 60
                ? "neutral"
                : "negative"
        }
      />
    </div>
  );
}

export function EndpointDetailsStatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
}
