import {
  DashboardStatsGridSkeleton,
} from "@/features/dashboard/components/DashboardStatsGrid";
import {
  EndpointStatusOverviewSkeleton,
} from "@/features/dashboard/components/EndpointStatusOverviewCard";
import {
  RecentAlertsCardSkeleton,
} from "@/features/dashboard/components/RecentAlertsCard";
import {
  RecentIncidentsCardSkeleton,
} from "@/features/dashboard/components/RecentIncidentsCard";
import { UptimeChartSkeleton } from "@/features/dashboard/components/UptimeChart";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <DashboardStatsGridSkeleton />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UptimeChartSkeleton />
        </div>
        <EndpointStatusOverviewSkeleton />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentAlertsCardSkeleton />
        <RecentIncidentsCardSkeleton />
      </div>
    </div>
  );
}
