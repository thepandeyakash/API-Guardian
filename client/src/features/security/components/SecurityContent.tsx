import type { SecurityDashboardData } from "@/types/security-dashboard";

import { EndpointSecurityOverviewTable } from "@/features/security/components/EndpointSecurityOverviewTable";
import { SecurityFindingsTable } from "@/features/security/components/SecurityFindingsTable";
import { SecurityScoreChart } from "@/features/security/components/SecurityScoreChart";
import { SecurityStatsGrid } from "@/features/security/components/SecurityStatsGrid";
import { SeverityCharts } from "@/features/security/components/SeverityCharts";

type SecurityContentProps = {
  data: SecurityDashboardData;
};

export function SecurityContent({ data }: SecurityContentProps) {
  return (
    <div className="space-y-6">
      <SecurityStatsGrid stats={data.stats} />

      <div className="grid gap-6 xl:grid-cols-2">
        <SecurityScoreChart data={data.scoreChartData} />
        <SeverityCharts data={data.severityChartData} />
      </div>

      <SecurityFindingsTable findings={data.findings} />

      <EndpointSecurityOverviewTable endpoints={data.endpointOverview} />
    </div>
  );
}
