import { useQuery } from "@tanstack/react-query";

import { endpointDetailsKeys } from "@/lib/query-keys";
import { fetchEndpointDetails } from "@/services/endpoint-details.service";

export function useEndpointDetails(endpointId: string) {
  return useQuery({
    queryKey: endpointDetailsKeys.detail(endpointId),
    queryFn: () => fetchEndpointDetails(endpointId),
    enabled: Boolean(endpointId),
    staleTime: 5 * 1000,
    refetchInterval: 5 * 1000,
    refetchIntervalInBackground: true,
  });
}