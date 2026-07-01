import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<ApiSuccessResponse<Project[]>>("/projects");

  return data.data;
}

export async function getProjectById(projectId: string): Promise<Project> {
  const { data } = await api.get<ApiSuccessResponse<Project>>(
    `/projects/${projectId}`
  );

  return data.data;
}

export async function createProject(
  payload: CreateProjectPayload
): Promise<Project> {
  const { data } = await api.post<ApiSuccessResponse<Project>>(
    "/projects",
    payload
  );

  return data.data;
}

export async function updateProject(
  projectId: string,
  payload: UpdateProjectPayload
): Promise<Project> {
  const { data } = await api.patch<ApiSuccessResponse<Project>>(
    `/projects/${projectId}`,
    payload
  );

  return data.data;
}

export async function deleteProject(projectId: string): Promise<void> {
  await api.delete(`/projects/${projectId}`);
}
