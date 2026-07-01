import type { DashboardData } from "@/types/dashboard";

import { DashboardStatsGrid } from "@/features/dashboard/components/DashboardStatsGrid";
import {
  EndpointStatusOverviewCard,
} from "@/features/dashboard/components/EndpointStatusOverviewCard";
import { RecentAlertsCard } from "@/features/dashboard/components/RecentAlertsCard";
import { RecentIncidentsCard } from "@/features/dashboard/components/RecentIncidentsCard";
import { UptimeChart } from "@/features/dashboard/components/UptimeChart";

type DashboardContentProps = {
  data: DashboardData;
};

export function DashboardContent({ data }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <DashboardStatsGrid stats={data.stats} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UptimeChart data={data.uptimeChartData} />
        </div>
        <EndpointStatusOverviewCard
          overview={data.endpointStatusOverview}
          total={data.endpoints.length}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentAlertsCard alerts={data.recentAlerts} />
        <RecentIncidentsCard incidents={data.recentIncidents} />
      </div>
    </div>
  );
}
