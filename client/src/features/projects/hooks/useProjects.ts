import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  dashboardKeys,
  endpointKeys,
  projectKeys,
  projectsPageKeys,
} from "@/lib/query-keys";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "@/services/project.service";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/features/projects/schemas";

function invalidateProjectQueries(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: projectKeys.all });
  queryClient.invalidateQueries({ queryKey: projectsPageKeys.all });
  queryClient.invalidateQueries({ queryKey: endpointKeys.all });
  queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
}

export function useProject(projectId: string | null) {
  return useQuery({
    queryKey: projectKeys.detail(projectId ?? ""),
    queryFn: () => getProjectById(projectId!),
    enabled: Boolean(projectId),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectInput) => createProject(payload),
    onSuccess: () => {
      invalidateProjectQueries(queryClient);
      toast.success("Project created");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: UpdateProjectInput;
    }) => updateProject(projectId, payload),
    onSuccess: (_, { projectId }) => {
      invalidateProjectQueries(queryClient);
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
      toast.success("Project updated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      invalidateProjectQueries(queryClient);
      toast.success("Project deleted");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
