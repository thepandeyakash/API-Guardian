import type { ReportsPageData } from "@/types/reports-page";

import { UptimeChart } from "@/features/dashboard/components/UptimeChart";
import { EndpointReportsTable } from "@/features/reports/components/EndpointReportsTable";
import { IncidentTrendChart } from "@/features/reports/components/IncidentTrendChart";
import { LatencyTrendChart } from "@/features/reports/components/LatencyTrendChart";
import { ReportsIncidentsSection } from "@/features/reports/components/ReportsIncidentsSection";
import { ReportsSecuritySection } from "@/features/reports/components/ReportsSecuritySection";
import { ReportsStatsGrid } from "@/features/reports/components/ReportsStatsGrid";

type ReportsContentProps = {
  data: ReportsPageData;
};

export function ReportsContent({ data }: ReportsContentProps) {
  return (
    <div className="space-y-8">
      <ReportsStatsGrid stats={data.stats} />

      <section className="space-y-4">
        <div className="text-left">
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitoring trends aggregated across all endpoints
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <UptimeChart data={data.uptimeChartData} />
          <LatencyTrendChart data={data.latencyChartData} />
          <IncidentTrendChart data={data.incidentChartData} />
        </div>
      </section>

      <EndpointReportsTable rows={data.endpointRows} />

      <ReportsSecuritySection
        stats={data.securityStats}
        scoreChartData={data.scoreChartData}
      />

      <ReportsIncidentsSection incidents={data.recentIncidents} />
    </div>
  );
}
