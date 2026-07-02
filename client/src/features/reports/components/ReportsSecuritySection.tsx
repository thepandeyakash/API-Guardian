import { AlertTriangle, ShieldAlert } from "lucide-react";

import {
  StatCard,
  StatCardSkeleton,
} from "@/features/dashboard/components/StatCard";
import { SecurityScoreChart } from "@/features/security/components/SecurityScoreChart";
import type { ReportsSecurityStats } from "@/types/reports-page";
import type { SecurityScoreChartPoint } from "@/types/security-dashboard";

type ReportsSecuritySectionProps = {
  stats: ReportsSecurityStats;
  scoreChartData: SecurityScoreChartPoint[];
};

export function ReportsSecuritySection({
  stats,
  scoreChartData,
}: ReportsSecuritySectionProps) {
  return (
    <section className="space-y-4">
      <div className="text-left">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Security
        </h2>
        <p className="text-sm text-muted-foreground">
          Findings and score distribution from latest scans
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <SecurityScoreChart data={scoreChartData} />
    </section>
  );
}

export function ReportsSecuritySectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="space-y-2 text-left">
        <StatCardSkeleton />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </section>
  );
}
