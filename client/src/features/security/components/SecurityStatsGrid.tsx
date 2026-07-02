import {
  AlertTriangle,
  Clock,
  ScanSearch,
  Shield,
  ShieldAlert,
} from "lucide-react";

import {
  StatCard,
  StatCardSkeleton,
} from "@/features/dashboard/components/StatCard";
import type { SecurityDashboardStats } from "@/types/security-dashboard";
import { formatDateTime, formatScore } from "@/lib/format";

type SecurityStatsGridProps = {
  stats: SecurityDashboardStats;
};

export function SecurityStatsGrid({ stats }: SecurityStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Scans"
        value={String(stats.totalScans)}
        description="Endpoints with scan results"
        icon={ScanSearch}
      />
      <StatCard
        title="Average Security Score"
        value={formatScore(stats.averageSecurityScore)}
        description="Across completed scans"
        icon={Shield}
        trend={
          stats.averageSecurityScore !== null &&
          stats.averageSecurityScore >= 70
            ? "positive"
            : stats.averageSecurityScore !== null
              ? "negative"
              : "neutral"
        }
      />
      <StatCard
        title="Critical Findings"
        value={String(stats.criticalFindings)}
        description="Requires immediate action"
        icon={ShieldAlert}
        trend={stats.criticalFindings > 0 ? "negative" : "positive"}
      />
      <StatCard
        title="High Findings"
        value={String(stats.highFindings)}
        description="High-priority vulnerabilities"
        icon={AlertTriangle}
        trend={stats.highFindings > 0 ? "negative" : "neutral"}
      />
      <StatCard
        title="Last Scan"
        value={formatDateTime(stats.lastScanTime)}
        description="Most recent scan across endpoints"
        icon={Clock}
      />
    </div>
  );
}

export function SecurityStatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
}
