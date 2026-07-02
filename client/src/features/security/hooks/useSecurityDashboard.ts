import { useQuery } from "@tanstack/react-query";

import { securityKeys } from "@/lib/query-keys";
import { fetchSecurityDashboardData } from "@/services/security-dashboard.service";

export function useSecurityDashboard() {
  return useQuery({
    queryKey: securityKeys.overview(),
    queryFn: fetchSecurityDashboardData,
    staleTime: 60 * 1000,
  });
}
