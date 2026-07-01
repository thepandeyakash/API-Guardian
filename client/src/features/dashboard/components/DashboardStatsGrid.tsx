import {
  Activity,
  AlertTriangle,
  FolderKanban,
  Globe,
  Shield,
} from "lucide-react";

import { StatCard, StatCardSkeleton } from "@/features/dashboard/components/StatCard";
import type { DashboardStats } from "@/types/dashboard";
import { formatPercentage, formatScore } from "@/lib/format";

type DashboardStatsGridProps = {
  stats: DashboardStats;
};

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Projects"
        value={String(stats.totalProjects)}
        description="Active workspaces"
        icon={FolderKanban}
      />
      <StatCard
        title="Total Endpoints"
        value={String(stats.totalEndpoints)}
        description="Monitored APIs"
        icon={Globe}
      />
      <StatCard
        title="Uptime"
        value={formatPercentage(stats.uptimePercentage)}
        description="Weighted across all checks"
        icon={Activity}
        trend={
          stats.uptimePercentage >= 99
            ? "positive"
            : stats.uptimePercentage >= 95
              ? "neutral"
              : "negative"
        }
      />
      <StatCard
        title="Active Incidents"
        value={String(stats.activeIncidents)}
        description="Open downtime events"
        icon={AlertTriangle}
        trend={stats.activeIncidents > 0 ? "negative" : "positive"}
      />
      <StatCard
        title="Security Score"
        value={formatScore(stats.averageSecurityScore)}
        description="Average of latest scans"
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

export function DashboardStatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
}
