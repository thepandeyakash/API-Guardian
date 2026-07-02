import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  dashboardKeys,
  endpointDetailsKeys,
  endpointKeys,
  monitoringKeys,
  projectsPageKeys,
  reportKeys,
  securityKeys,
} from "@/lib/query-keys";
import {
  createEndpoint,
  deleteEndpoint,
  getEndpointById,
  updateEndpoint,
} from "@/services/endpoint.service";
import { runHealthCheck } from "@/services/monitoring.service";
import { runSecurityScan } from "@/services/security.service";
import type {
  CreateEndpointInput,
  UpdateEndpointInput,
} from "@/features/projects/schemas";

function invalidateEndpointQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  endpointId?: string
) {
  queryClient.invalidateQueries({ queryKey: endpointKeys.all });
  queryClient.invalidateQueries({ queryKey: projectsPageKeys.all });
  queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
  queryClient.invalidateQueries({ queryKey: securityKeys.all });

  if (endpointId) {
    queryClient.invalidateQueries({
      queryKey: endpointKeys.detail(endpointId),
    });
    queryClient.invalidateQueries({
      queryKey: endpointDetailsKeys.detail(endpointId),
    });
    queryClient.invalidateQueries({
      queryKey: reportKeys.detail(endpointId),
    });
    queryClient.invalidateQueries({
      queryKey: monitoringKeys.analytics(endpointId),
    });
  }
}

export function useEndpoint(endpointId: string | null) {
  return useQuery({
    queryKey: endpointKeys.detail(endpointId ?? ""),
    queryFn: () => getEndpointById(endpointId!),
    enabled: Boolean(endpointId),
  });
}

export function useCreateEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEndpointInput) => createEndpoint(payload),
    onSuccess: () => {
      invalidateEndpointQueries(queryClient);
      toast.success("Endpoint created");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      endpointId,
      payload,
    }: {
      endpointId: string;
      payload: UpdateEndpointInput;
    }) => updateEndpoint(endpointId, payload),
    onSuccess: (_, { endpointId }) => {
      invalidateEndpointQueries(queryClient, endpointId);
      toast.success("Endpoint updated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (endpointId: string) => deleteEndpoint(endpointId),
    onSuccess: (_, endpointId) => {
      invalidateEndpointQueries(queryClient, endpointId);
      toast.success("Endpoint deleted");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useRunHealthCheck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (endpointId: string) => runHealthCheck(endpointId),
    onSuccess: (_, endpointId) => {
      invalidateEndpointQueries(queryClient, endpointId);
      toast.success("Health check queued");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useRunSecurityScan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (endpointId: string) => runSecurityScan(endpointId),
    onSuccess: (_, endpointId) => {
      invalidateEndpointQueries(queryClient, endpointId);
      toast.success("Security scan started");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
