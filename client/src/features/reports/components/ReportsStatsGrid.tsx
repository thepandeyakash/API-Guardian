import {
  Activity,
  AlertTriangle,
  Globe,
  Shield,
  Timer,
} from "lucide-react";

import {
  StatCard,
  StatCardSkeleton,
} from "@/features/dashboard/components/StatCard";
import type { ReportsPageStats } from "@/types/reports-page";
import {
  formatLatency,
  formatPercentage,
  formatScore,
} from "@/lib/format";

type ReportsStatsGridProps = {
  stats: ReportsPageStats;
};

export function ReportsStatsGrid({ stats }: ReportsStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Endpoints"
        value={String(stats.totalEndpoints)}
        description="Monitored APIs"
        icon={Globe}
      />
      <StatCard
        title="Average Uptime"
        value={formatPercentage(stats.averageUptime)}
        description="Weighted across all checks"
        icon={Activity}
        trend={
          stats.averageUptime >= 99
            ? "positive"
            : stats.averageUptime >= 95
              ? "neutral"
              : "negative"
        }
      />
      <StatCard
        title="Average Latency"
        value={formatLatency(stats.averageLatency)}
        description="Weighted across all checks"
        icon={Timer}
        trend={
          stats.averageLatency <= 200
            ? "positive"
            : stats.averageLatency <= 500
              ? "neutral"
              : "negative"
        }
      />
      <StatCard
        title="Total Incidents"
        value={String(stats.totalIncidents)}
        description="All recorded downtime events"
        icon={AlertTriangle}
        trend={stats.totalIncidents > 0 ? "negative" : "positive"}
      />
      <StatCard
        title="Average Security Score"
        value={formatScore(stats.averageSecurityScore)}
        description="Across completed scans"
        icon={Shield}
        trend={
          stats.averageSecurityScore === null
            ? "neutral"
            : stats.averageSecurityScore >= 80
              ? "positive"
              : stats.averageSecurityScore >= 60
                ? "neutral"
                : "negative"
        }
      />
    </div>
  );
}

export function ReportsStatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
}
