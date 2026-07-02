import { useQuery } from "@tanstack/react-query";

import { reportsPageKeys } from "@/lib/query-keys";
import { fetchReportsPageData } from "@/services/reports-page.service";

export function useReportsPage() {
  return useQuery({
    queryKey: reportsPageKeys.overview(),
    queryFn: fetchReportsPageData,
    staleTime: 60 * 1000,
  });
}
