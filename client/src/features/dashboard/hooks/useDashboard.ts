import { useQuery } from "@tanstack/react-query";

import { dashboardKeys } from "@/lib/query-keys";
import { fetchDashboardData } from "@/services/dashboard.service";

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: fetchDashboardData,
    staleTime: 60 * 1000,
  });
}
