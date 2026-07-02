import { UptimeChartSkeleton } from "@/features/dashboard/components/UptimeChart";
import { EndpointReportsTableSkeleton } from "@/features/reports/components/EndpointReportsTable";
import { IncidentTrendChartSkeleton } from "@/features/reports/components/IncidentTrendChart";
import { LatencyTrendChartSkeleton } from "@/features/reports/components/LatencyTrendChart";
import { ReportsIncidentsSectionSkeleton } from "@/features/reports/components/ReportsIncidentsSection";
import { ReportsStatsGridSkeleton } from "@/features/reports/components/ReportsStatsGrid";
import { SecurityScoreChartSkeleton } from "@/features/security/components/SecurityScoreChart";
import { StatCardSkeleton } from "@/features/dashboard/components/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ReportsSkeleton() {
  return (
    <div className="space-y-8">
      <ReportsStatsGridSkeleton />

      <section className="space-y-4">
        <div className="space-y-2 text-left">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          <UptimeChartSkeleton />
          <LatencyTrendChartSkeleton />
          <IncidentTrendChartSkeleton />
        </div>
      </section>

      <EndpointReportsTableSkeleton />

      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <SecurityScoreChartSkeleton />
      </section>

      <ReportsIncidentsSectionSkeleton />
    </div>
  );
}
