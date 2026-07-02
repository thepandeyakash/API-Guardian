import { SecurityStatsGridSkeleton } from "@/features/security/components/SecurityStatsGrid";
import { SecurityScoreChartSkeleton } from "@/features/security/components/SecurityScoreChart";
import { SeverityChartsSkeleton } from "@/features/security/components/SeverityCharts";
import { SecurityFindingsTableSkeleton } from "@/features/security/components/SecurityFindingsTable";
import { EndpointSecurityOverviewTableSkeleton } from "@/features/security/components/EndpointSecurityOverviewTable";

export function SecuritySkeleton() {
  return (
    <div className="space-y-6">
      <SecurityStatsGridSkeleton />

      <div className="grid gap-6 xl:grid-cols-2">
        <SecurityScoreChartSkeleton />
        <SeverityChartsSkeleton />
      </div>

      <SecurityFindingsTableSkeleton />

      <EndpointSecurityOverviewTableSkeleton />
    </div>
  );
}
